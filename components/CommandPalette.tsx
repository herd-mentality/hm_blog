import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  useRegisterActions,
} from 'kbar'

function Results() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div
            style={{
              padding: '8px 12px',
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            {item}
          </div>
        ) : (
          <div
            style={{
              padding: '10px 12px',
              background: active ? 'rgba(0,0,0,0.06)' : 'transparent',
              borderRadius: 6,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
            {item.subtitle && <div style={{ fontSize: 12, opacity: 0.7 }}>{item.subtitle}</div>}
          </div>
        )
      }
    />
  )
}

// Minimal shape from pliny allCoreContent
type SearchDoc = {
  title: string
  slug: string
  summary?: string
  date?: string
  tags?: string[]
  authors?: string[]
}

let cachedDocs: SearchDoc[] | null = null
let docsPromise: Promise<SearchDoc[]> | null = null
async function fetchSearchDocs(path = '/search.json'): Promise<SearchDoc[]> {
  if (cachedDocs) return cachedDocs
  if (docsPromise) return docsPromise
  docsPromise = fetch(path)
    .then((res) => (res.ok ? res.json() : []))
    .then((json) => {
      cachedDocs = json as SearchDoc[]
      return cachedDocs
    })
    .catch(() => [])
  return docsPromise
}

function RegisterPostActions({ shouldShowAll }: { shouldShowAll: boolean }) {
  const router = useRouter()
  const [allPostActions, setAllPostActions] = useState<any[]>([])
  const [topPostActions, setTopPostActions] = useState<any[]>([])

  useEffect(() => {
    let isMounted = true
    fetchSearchDocs().then((docs) => {
      if (!isMounted) return
      const all = docs.map((post) => ({
        id: `post-${post.slug}`,
        name: post.title,
        subtitle: post.summary,
        keywords: [post.tags?.join(' '), post.authors?.join(' ')].filter(Boolean).join(' '),
        perform: () => router.push(`/blog/${post.slug}`),
        section: 'Posts',
      }))
      setAllPostActions(all)
      const top = [...docs]
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
        .slice(0, 5)
        .map((post) => ({
          id: `post-${post.slug}`,
          name: post.title,
          subtitle: post.summary,
          keywords: [post.tags?.join(' '), post.authors?.join(' ')].filter(Boolean).join(' '),
          perform: () => router.push(`/blog/${post.slug}`),
          section: 'Posts',
        }))
      setTopPostActions(top)
    })
    return () => {
      isMounted = false
    }
  }, [router])

  useRegisterActions(shouldShowAll ? allPostActions : topPostActions, [
    shouldShowAll,
    allPostActions,
    topPostActions,
  ])
  return null
}

function RegisterTagActions({ shouldShowAll }: { shouldShowAll: boolean }) {
  const router = useRouter()
  const [allTagActions, setAllTagActions] = useState<any[]>([])
  const [topTagActions, setTopTagActions] = useState<any[]>([])

  useEffect(() => {
    let isMounted = true
    fetchSearchDocs().then((docs) => {
      if (!isMounted) return
      const counts = new Map<string, number>()
      docs.forEach((post) => {
        ;(post.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1))
      })
      const all = Array.from(counts.entries()).map(([tag, count]) => ({
        id: `tag-${tag}`,
        name: `#${tag}`,
        subtitle: `${count} post${count === 1 ? '' : 's'}`,
        keywords: tag,
        perform: () => router.push(`/tags/${tag}`),
        section: 'Tags',
      }))
      setAllTagActions(all)
      const top = Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, count]) => ({
          id: `tag-${tag}`,
          name: `#${tag}`,
          subtitle: `${count} post${count === 1 ? '' : 's'}`,
          keywords: tag,
          perform: () => router.push(`/tags/${tag}`),
          section: 'Tags',
        }))
      setTopTagActions(top)
    })
    return () => {
      isMounted = false
    }
  }, [router])

  useRegisterActions(shouldShowAll ? allTagActions : topTagActions, [
    shouldShowAll,
    allTagActions,
    topTagActions,
  ])
  return null
}

export default function CommandPalette() {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 120)
    return () => clearTimeout(id)
  }, [searchQuery])

  // Warm up the docs cache after idle to make first open snappy
  useEffect(() => {
    // @ts-ignore
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
    ric(() => {
      fetchSearchDocs()
    })
  }, [])

  const navActions = useMemo(() => {
    return [
      {
        id: 'home',
        name: 'Home',
        shortcut: ['h'],
        keywords: 'home index',
        perform: () => router.push('/'),
        section: 'Navigation',
      },
      {
        id: 'blog',
        name: 'Blog',
        shortcut: ['b'],
        keywords: 'posts articles',
        perform: () => router.push('/blog'),
        section: 'Navigation',
      },
      {
        id: 'tags',
        name: 'Tags',
        shortcut: ['t'],
        keywords: 'topics',
        perform: () => router.push('/tags'),
        section: 'Navigation',
      },
      {
        id: 'authors',
        name: 'Authors',
        shortcut: ['a'],
        keywords: 'people',
        perform: () => router.push('/authors'),
        section: 'Navigation',
      },
      {
        id: 'projects',
        name: 'Projects',
        shortcut: ['p'],
        keywords: 'work portfolio',
        perform: () => router.push('/projects'),
        section: 'Navigation',
      },
    ]
  }, [router])

  const themeActions = useMemo(() => {
    return [
      {
        id: 'theme-light',
        name: 'Theme: Light',
        keywords: 'theme light appearance',
        subtitle: theme === 'light' ? 'Current' : undefined,
        perform: () => setTheme('light'),
        section: 'Theme',
      },
      {
        id: 'theme-dark',
        name: 'Theme: Dark',
        keywords: 'theme dark appearance',
        subtitle: theme === 'dark' ? 'Current' : undefined,
        perform: () => setTheme('dark'),
        section: 'Theme',
      },
      {
        id: 'theme-system',
        name: 'Theme: System',
        keywords: 'theme system appearance auto',
        subtitle: theme === 'system' ? 'Current' : undefined,
        perform: () => setTheme('system'),
        section: 'Theme',
      },
    ]
  }, [setTheme, theme])

  const shouldShowAll = debouncedQuery.trim().length > 0

  return (
    <KBarProvider actions={[...navActions, ...themeActions]}>
      <RegisterPostActions shouldShowAll={shouldShowAll} />
      <RegisterTagActions shouldShowAll={shouldShowAll} />
      <KBarPortal>
        <KBarPositioner
          style={{
            zIndex: 50,
            background: 'rgba(0,0,0,0.3)',
          }}
        >
          <KBarAnimator
            style={{
              maxWidth: '600px',
              width: '100%',
              background: 'white',
              color: 'black',
              borderRadius: 8,
              boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
              willChange: 'transform, opacity',
              overflow: 'hidden',
            }}
          >
            <KBarSearch
              style={{
                padding: '12px 16px',
                fontSize: 16,
                width: '100%',
                boxSizing: 'border-box',
                outline: 'none',
                border: 'none',
                background: 'transparent',
                color: 'inherit',
              }}
              placeholder="Search…"
              onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            />
            <div style={{ padding: '8px 8px 12px' }}>
              <Results />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  )
}
