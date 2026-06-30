import siteMetadata from '../data/siteMetadata.js'
import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Static top-level routes worth indexing. We intentionally exclude /tags/* detail
// pages (thin, near-duplicate list pages) so Google spends its limited crawl budget
// on real posts. Tag pages are still crawlable + carry `noindex, follow` (see SEO.tsx),
// so they continue to pass link equity without competing for the index.
const staticRoutes = ['', 'blog', 'tags', 'projects', 'authors']

const sitemap = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const allBlogs = JSON.parse(
    readFileSync(resolve(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
  )
  const visibleBlogs = allBlogs.filter((post) => post.draft !== true && !post.canonicalUrl)

  const urls = [
    ...staticRoutes.map((route) => ({ loc: route, lastmod: null })),
    ...visibleBlogs.map((post) => ({
      loc: post.path,
      lastmod: new Date(post.lastmod || post.date).toISOString().split('T')[0],
    })),
  ]

  const body = urls
    .map(({ loc, lastmod }) => {
      const url = `${siteMetadata.siteUrl}${loc ? `/${loc}` : ''}`
      return `  <url>\n    <loc>${url}</loc>${
        lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
      }\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

  writeFileSync('public/sitemap.xml', xml)
  console.log(`Sitemap generated (${urls.length} URLs, tag pages excluded)...`)
}
export default sitemap
