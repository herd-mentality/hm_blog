import Link from './Link'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'

export const getStaticProps = async (context) => {
  //   const author = context.params.author as string
  const postsWithinNest = allCoreContent(
    // `path` will be passed from PostLayout on to this component, so that's how we'll get
    // the path to know what nested route we'll be filtering for here
    allBlogs.filter(
      (post) => post.draft !== true && post.authors && post.authors.includes(author) // .map((t) => kebabCase(t))
    )
  )

  return { props: { posts: postsWithinNest } }
}

// Unsure if we'll be able to get the full list of blogs here - need to figure that out

// Get full list of blogs from getStaticProps
// Filter down to the correct nested route; will need to be done within the component code
//    Not particularly efficient since it loads all of the blog posts then does the filtering in the component
// Then use info to build the component
