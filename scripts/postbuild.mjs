import rss from './rss.mjs'
import sitemap from './sitemap.mjs'
import search from './search.mjs'
import rssRBloggers from './rss-rbloggers.mjs'

async function postbuild() {
  await Promise.all([rss(), sitemap(), search(), rssRBloggers()])
}

postbuild()
