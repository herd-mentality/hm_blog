import { generateSitemap } from 'pliny/utils/generate-sitemap.js'
import siteMetadata from '../data/siteMetadata.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const sitemap = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const allBlogs = JSON.parse(
    readFileSync(resolve(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
  )
  generateSitemap(siteMetadata.siteUrl, allBlogs)
  console.log('Sitemap generated...')
}
export default sitemap
