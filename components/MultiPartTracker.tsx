import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from './Link'

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
    <div className="mt-2 max-h-[130px] overflow-y-scroll rounded-2xl border-2 border-gray-300 p-2 dark:border-gray-500">
      <ol className="">
        {filteredBlogs.map((post, index) => (
          <li key={index}>
            <div className="flex items-center">
              <div className="mono mr-[0.5rem] w-6 flex-shrink-0 text-center text-gray-500">
                {index + 1}
              </div>
              <div className="posts-in-series min-w-0">
                <p className="relative my-1 h-11 overflow-hidden whitespace-normal text-sm font-medium">
                  {post.path === path ? (
                    <span className="text-gray-500">{post.title}</span>
                  ) : (
                    <Link
                      href={'/' + post.path}
                      aria-label={`Click through to the article ${post.title}`}
                    >
                      {post.title}
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default MultiPartTracker
