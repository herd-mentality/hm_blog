import { generateRSS } from 'pliny/utils/generate-rss.js'
import siteMetadata from '../data/siteMetadata.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const rss = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const allBlogs = JSON.parse(
    readFileSync(resolve(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
  )
  const visibleBlogs = allBlogs.filter((post) => post.draft !== true)
  generateRSS(siteMetadata, visibleBlogs)
  console.log('RSS feed generated...')
}
export default rss
