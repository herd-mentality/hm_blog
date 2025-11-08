import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'

interface Props {
  className?: string
}

export default function RegularPillHeader({ className = '' }: Props) {
  return (
    <div className={`mt-2 mb-6 flex justify-center md:mb-10 ${className}`}>
      <div className="mx-auto grid h-12 w-full max-w-3xl grid-cols-[1fr_auto] items-center gap-3 rounded-full border border-gray-200/20 bg-white/70 px-6 font-grotesk backdrop-blur-md dark:border-white/10 dark:bg-black/30 md:h-14 md:grid-cols-[1fr_auto_1fr] xl:max-w-5xl">
        {/* Brand */}
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex min-w-0 items-center gap-2 justify-self-start"
        >
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">
            <Logo className="h-full w-full" />
          </span>
          <span className="hidden truncate text-sm font-medium text-gray-900 dark:text-gray-100 sm:inline">
            {siteMetadata.headerTitle}
          </span>
        </Link>
        {/* Centered nav (show at md+ to avoid squish) */}
        <div className="hidden items-center justify-center gap-5 justify-self-center md:flex">
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} className="nav-link">
              {link.title}
            </Link>
          ))}
        </div>
        {/* Right controls - better mobile alignment */}
        <div className="flex items-center justify-end gap-3 justify-self-end">
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </div>
  )
}
