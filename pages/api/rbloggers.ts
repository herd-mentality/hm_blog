import type { NextApiRequest, NextApiResponse } from 'next'

const FEED_URL = 'http://feeds.feedburner.com/RBloggers'

const parseItems = (xml: string): Array<{ title: string; link: string }> => {
  const items: Array<{ title: string; link: string }> = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let m: RegExpExecArray | null
  while ((m = itemRegex.exec(xml))) {
    const itemXml = m[1]
    const titleMatch = itemXml.match(
      /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/
    )
    const linkMatch = itemXml.match(/<link>([^<]+)<\/link>/)
    const title = (titleMatch?.[1] || titleMatch?.[2] || '').trim()
    const link = (linkMatch?.[1] || '').trim()
    if (title && link) items.push({ title, link })
  }
  return items
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const r = await fetch(FEED_URL, {
      signal: controller.signal,
      headers: { 'User-Agent': 'hm-blog/1.0' },
    })
    clearTimeout(timeout)
    if (!r.ok) {
      return res.status(200).json({ items: [] })
    }
    const xml = await r.text()
    const items = parseItems(xml)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ items })
  } catch (e) {
    return res.status(200).json({ items: [] })
  }
}
