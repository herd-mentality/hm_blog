import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource/dm-mono/300.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import '@fontsource-variable/space-grotesk'
// import '@/css/docsearch.css' // Uncomment if using algolia docsearch
// import '@docsearch/css' // Uncomment if using algolia docsearch

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
// import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import LayoutWrapper from '@/components/LayoutWrapper'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import * as ga from '../src/ga'

const CommandPalette = dynamic(() => import('@/components/CommandPalette'), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {/* <Analytics analyticsConfig={siteMetadata.analytics} /> */}
      <CommandPalette />
      <LayoutWrapper>
        <SearchProvider searchConfig={siteMetadata.search}>
          <Component {...pageProps} />
        </SearchProvider>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
