import { writeFileSync } from 'fs'
import { allCoreContent } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const search = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const allBlogs = JSON.parse(
    readFileSync(resolve(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
  )
  if (siteMetadata?.search?.kbarConfig?.searchDocumentsPath) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(allBlogs))
    )
    console.log('Local search index generated...')
  }
}
export default search
