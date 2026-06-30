// Submits the live site's URLs to IndexNow (Bing, Yandex, etc.).
//
// IndexNow verifies ownership by fetching the key file at keyLocation, so this
// must run AGAINST THE DEPLOYED SITE — i.e. after a Vercel deploy completes, not
// during `next build`. Run it locally after a deploy, or from a CI step that
// triggers post-deploy:
//
//   node scripts/indexnow.mjs            # submit every URL in the sitemap
//   node scripts/indexnow.mjs <url> ...  # submit only specific URLs
//
import siteMetadata from '../data/siteMetadata.js'

const KEY = '5fcefdf40901514f2b888a2ae8a5f318'
const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '')
const host = new URL(siteUrl).host

async function getUrlsFromSitemap() {
  const res = await fetch(`${siteUrl}/sitemap.xml`)
  if (!res.ok) throw new Error(`Could not fetch sitemap: HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

async function main() {
  const cliUrls = process.argv.slice(2)
  const urlList = cliUrls.length > 0 ? cliUrls : await getUrlsFromSitemap()

  if (urlList.length === 0) {
    console.log('No URLs to submit.')
    return
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: KEY,
      keyLocation: `${siteUrl}/${KEY}.txt`,
      urlList,
    }),
  })

  // IndexNow returns 200 or 202 on success.
  if (res.ok) {
    console.log(`Submitted ${urlList.length} URLs to IndexNow (HTTP ${res.status}).`)
  } else {
    console.error(`IndexNow submission failed: HTTP ${res.status} ${await res.text()}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
