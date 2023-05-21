// import { useState, ReacftNode } from 'react'
// import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from './Link'
// import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

// export const getStaticProps = async (context) => {
//   //   const author = context.params.author as string
//   const postsWithinNest = allCoreContent(
//     // `path` will be passed from PostLayout on to this component, so that's how we'll get
//     // the path to know what nested route we'll be filtering for here
//     allBlogs.filter(
//       (post) => post.draft !== true && post.authors && post.authors.includes(author) // .map((t) => kebabCase(t))
//     )
//   )

//   return { props: { posts: postsWithinNest } }
// }

// Unsure if we'll be able to get the full list of blogs here - need to figure that out

// Get full list of blogs from getStaticProps
// Filter down to the correct nested route; will need to be done within the component code
//    Not particularly efficient since it loads all of the blog posts then does the filtering in the component
// Then use info to build the component

interface LayoutProps {
  path?: string
  //   content: CoreContent<Blog>
  //   authorDetails: CoreContent<Authors>[]
  //   next?: { path: string; title: string }
  //   prev?: { path: string; title: string }
  //   children: ReactNode
}

export default function MultiPartTracker({
  path,
}: //   content,
//   authorDetails,
//   next,
//   prev,
//   children,
LayoutProps) {
  const split_path = path.split('/')
  // const nested_group = split_path.slice(1, split_path.length - 1)
  const full_nested_path = split_path.slice(0, split_path.length - 1).join('/')

  // Inputs:
  //   Full list of blog posts available in allBlogs
  //   Info for this post passed down from <PostLayout/>

  // Filter allBlogs for those that share the same nested slug path as this post
  const filteredBlogs = allBlogs
    .filter((post) => post.draft !== true && post.path.includes(full_nested_path))
    // @ts-ignore
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div>
      <ol>
        {filteredBlogs.map((post, index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>Author: {post.authors.join(', ')}</p>
            <a href={`/blog/${post.slug}`}>Read More</a>
          </li>
        ))}
      </ol>
    </div>
  )
}
