import { useEffect, useState } from 'react'
import Link from '@/components/Link'

type FeedItem = { title: string; link: string }

export default function RBloggersSidebar() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/rbloggers')
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        if (isMounted && Array.isArray(data?.items)) {
          setItems(data.items.slice(0, 5))
        }
      } catch (e) {
        if (isMounted) setError('')
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="py-4 xl:py-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        R-bloggers
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link
            href="https://www.r-bloggers.com/"
            className="tag-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit R-bloggers
          </Link>
          <span className="text-gray-500 dark:text-gray-400">•</span>
          <Link
            href="http://feeds.feedburner.com/RBloggers"
            className="tag-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            feed
          </Link>
        </div>
        {items.length > 0 && (
          <div className="mt-2">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Latest R-bloggers headlines
            </div>
            <ul className="mt-2 space-y-1">
              {items.map((item) => (
                <li key={item.link} className="leading-snug">
                  <a
                    className="tag-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
