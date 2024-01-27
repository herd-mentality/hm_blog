import rss from './rss.mjs'
import sitemap from './sitemap.mjs'
import search from './search.mjs'
import createTagCount from './tag-data.mjs'

async function postbuild() {
  await Promise.all([rss(), sitemap(), search(), createTagCount()])
}

postbuild()
