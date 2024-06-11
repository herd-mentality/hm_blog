import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import { allBlogs } from '../.contentlayer/generated/index.mjs'

function createTagCount() {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('data/tag-data.json', JSON.stringify(tagCount))
  console.log('Tag counts generated...')
}

export default createTagCount
