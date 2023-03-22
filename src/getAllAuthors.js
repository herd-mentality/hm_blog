import GithubSlugger from 'github-slugger'

async function getAllAuthors(allBlogs) {
  const authorCount = {}
  allBlogs.forEach((file) => {
    if (file.authors && file.draft !== true) {
      file.authors.forEach((author) => {
        const formattedAuthor = GithubSlugger.slug(author)
        if (formattedAuthor in authorCount) {
          authorCount[formattedAuthor] += 1
        } else {
          authorCount[formattedAuthor] = 1
        }
      })
    }
  })
  return authorCount
}

export { getAllAuthors }
