import { Inter } from '@next/font/google'
import SectionContainer, { siteContainerClass } from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import LandingPillHeader from './PillHeader'
import RegularPillHeader from './RegularPillHeader'

interface Props {
  children: ReactNode
  hideHeader?: boolean
  fullWidthMain?: boolean
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children, hideHeader = false, fullWidthMain = false }: Props) => {
  return (
    <div className={`${inter.className} flex min-h-screen flex-col justify-between font-sans`}>
      {!hideHeader &&
        (fullWidthMain ? (
          // Overlay style for the landing page - positioned above dither
          <div className="pointer-events-none fixed top-0 left-0 z-20 w-full">
            <div className={`pointer-events-auto ${siteContainerClass}`}>
              <LandingPillHeader className="mb-6 md:mb-10" />
            </div>
          </div>
        ) : (
          // Regular pages - use sticky positioning for consistency with landing page
          <div className="sticky top-0 z-20 w-full">
            <div className={siteContainerClass}>
              <RegularPillHeader />
            </div>
          </div>
        ))}
      <main className="mb-auto">
        {fullWidthMain ? children : <SectionContainer>{children}</SectionContainer>}
      </main>
      <SectionContainer>
        <Footer />
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
