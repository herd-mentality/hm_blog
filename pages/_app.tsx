import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource/dm-mono/300.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
// import '@/css/docsearch.css' // Uncomment if using algolia docsearch
// import '@docsearch/css' // Uncomment if using algolia docsearch

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
// import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import LayoutWrapper from '@/components/LayoutWrapper'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_ANALYTICS_ID}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '` +
            process.env.GOOGLE_ANALYTICS_ID +
            `', {
            page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* <Analytics analyticsConfig={siteMetadata.analytics} /> */}
      <LayoutWrapper>
        <SearchProvider searchConfig={siteMetadata.search}>
          <Component {...pageProps} />
        </SearchProvider>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
