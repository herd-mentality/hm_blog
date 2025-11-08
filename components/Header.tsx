import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div
                id="hm-title"
                className="hidden h-6 text-2xl font-semibold text-gray-900 duration-300 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 sm:block"
              >
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="ml-6 flex flex-1 items-center justify-end gap-5 text-base leading-5 sm:ml-8 md:ml-12">
        <div className="ml-auto hidden space-x-6 sm:flex">
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href} className="nav-link">
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
