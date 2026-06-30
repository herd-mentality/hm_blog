import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'

interface RelatedPostsProps {
  currentPath: string
  tags: string[]
  allPosts: CoreContent<Blog>[]
  maxPosts?: number
}

// Surfaces posts that share the most tags with the current one, creating topical
// internal links between related articles. Isolated posts (linked only from the
// sitemap) are a common cause of "Crawled - currently not indexed"; cross-linking
// them gives Google a reason to treat each post as part of a connected, valuable set.
export default function RelatedPosts({
  currentPath,
  tags,
  allPosts,
  maxPosts = 4,
}: RelatedPostsProps) {
  const tagSet = new Set((tags || []).map((t) => t.toLowerCase()))

  const related = allPosts
    .filter((post) => post.path !== currentPath && post.draft !== true)
    .map((post) => ({
      post,
      shared: (post.tags || []).filter((t) => tagSet.has(t.toLowerCase())).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || +new Date(b.post.date) - +new Date(a.post.date))
    .slice(0, maxPosts)
    .map(({ post }) => post)

  if (related.length === 0) return null

  return (
    <div className="py-4 xl:py-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Related posts
      </h2>
      <ul className="mt-1 space-y-2">
        {related.map((post) => (
          <li key={post.path}>
            <div className="tag-link">
              <Link href={`/${post.path}`}>{post.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
