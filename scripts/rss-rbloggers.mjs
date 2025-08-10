import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname, resolve } from 'path'
import GithubSlugger from 'github-slugger'
import siteMetadata from '../data/siteMetadata.js'

// unified/remark/rehype toolchain to convert Markdown (sanitized MDX) to HTML
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'

const buildHtmlFromMarkdown = async (markdown) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  return String(file)
}

const escapeXml = (unsafe) =>
  unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const wrapCdata = (html) => `<![CDATA[${html}]]>`

const sanitizeMdxForFeed = (mdx) => {
  if (!mdx) return ''
  let out = mdx
  // Remove MDX ESM imports/exports
  out = out.replace(/^import\s+[^\n]*$/gm, '')
  out = out.replace(/^export\s+[^\n]*$/gm, '')
  // Remove Pliny TOC component if present
  out = out.replace(/<TOCInline[^>]*\/?>/g, '')
  // Convert Next/Image MDX component to img if present
  out = out.replace(/<Image([^>]*)\/>/g, '<img$1/>')
  out = out.replace(/<Image([^>]*)>/g, '<img$1>')
  out = out.replace(/<\/Image>/g, '')
  // Drop unknown custom MDX components (self-closing)
  out = out.replace(/<([A-Z][A-Za-z0-9]*)[^>]*\/>/g, '')
  // Drop unknown custom MDX components with children
  out = out.replace(/<([A-Z][A-Za-z0-9]*)[^>]*>[\s\S]*?<\/\1>/g, '')
  // Trim excessive blank lines
  out = out.replace(/\n{3,}/g, '\n\n')
  return out
}

const absolutizeUrls = (html) => {
  if (!html) return html
  const base = siteMetadata.siteUrl.replace(/\/$/, '')
  // src="/path" -> src="https://site/path"
  html = html.replace(/src="\/(?!\/)/g, `src="${base}/`)
  // href="/path" -> href="https://site/path" (but keep anchors like href="#...")
  html = html.replace(/href="\/(?!\/|#)/g, `href="${base}/`)
  return html
}

const generateItem = (post, html) => {
  const categories = (post.tags || [])
    .map((t) => `<category>${escapeXml(String(t))}</category>`)
    .join('')
  return `
    <item>
      <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
      <title>${escapeXml(String(post.title))}</title>
      <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
      ${post.summary ? `<description>${escapeXml(String(post.summary))}</description>` : ''}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(String(siteMetadata.email || ''))} (${escapeXml(
    String(siteMetadata.author || '')
  )})</author>
      ${categories}
      <content:encoded>${wrapCdata(absolutizeUrls(html))}</content:encoded>
    </item>
  `
}

const generateRss = (items) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(String(siteMetadata.title))}</title>
    <link>${siteMetadata.siteUrl}/blog</link>
    <description>${escapeXml(String(siteMetadata.description))}</description>
    <language>${escapeXml(String(siteMetadata.language))}</language>
    <managingEditor>${escapeXml(String(siteMetadata.email || ''))} (${escapeXml(
  String(siteMetadata.author || '')
)})</managingEditor>
    <webMaster>${escapeXml(String(siteMetadata.email || ''))} (${escapeXml(
  String(siteMetadata.author || '')
)})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${
      siteMetadata.siteUrl
    }/tags/r/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.join('\n')}
  </channel>
</rss>`

const rssRBloggers = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const allBlogs = JSON.parse(
    readFileSync(resolve(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
  )

  const publishPosts = allBlogs.filter((post) => post.draft !== true)

  const rSlug = 'r'
  const slugger = new GithubSlugger()
  const rPosts = publishPosts.filter((post) => {
    const slugs = (post.tags || []).map((t) => slugger.slug(t))
    slugger.reset()
    return slugs.includes(rSlug)
  })

  if (rPosts.length === 0) {
    console.log('No R-tagged posts found. Skipping R-bloggers RSS generation.')
    return
  }

  const items = []
  for (const post of rPosts) {
    const cleaned = sanitizeMdxForFeed(post.body?.raw || '')
    const html = await buildHtmlFromMarkdown(cleaned)
    items.push(generateItem(post, html))
  }

  const rssXml = generateRss(items)
  const rssPath = path.join(process.cwd(), 'public', 'tags', 'r')
  mkdirSync(rssPath, { recursive: true })
  writeFileSync(path.join(rssPath, 'feed.xml'), rssXml)
  console.log('R-bloggers full-content RSS generated at public/tags/r/feed.xml')
}

export default rssRBloggers
