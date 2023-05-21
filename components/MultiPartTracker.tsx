// import { useState, ReacftNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
// import Link from './Link'
// import { allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'

interface TrackerProps {
  path?: string
  allPosts: CoreContent<Blog>[]
}

const MultiPartTracker = ({ path, allPosts }: TrackerProps) => {
  // Split path and pull path to directory this post is in
  const split_path = path.split('/')
  const full_nested_path = split_path.slice(0, split_path.length - 1).join('/')

  // Filter allPosts for those that share the same nested slug path as this post
  const filteredBlogs = allPosts
    .filter((post) => post.draft !== true && post.path.includes(full_nested_path))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="p-2">
      <ol className="">
        {filteredBlogs.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default MultiPartTracker
