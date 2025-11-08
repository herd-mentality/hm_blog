import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const mobileMenuOverlay = (
    <div
      className={`fixed inset-0 z-50 min-h-screen bg-white/70 backdrop-blur-xl transition-transform duration-300 ease-in-out dark:bg-gray-900/70 sm:hidden ${
        navShow ? 'translate-x-0' : 'invisible translate-x-full'
      }`}
    >
      <div className="flex justify-end p-5">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close Menu"
          onClick={onToggleNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="-mt-20 flex min-h-screen flex-col items-center justify-center px-8">
        {headerNavLinks.map((link) => (
          <div key={link.title} className="w-full py-4 text-center">
            <Link
              href={link.href}
              className="block font-grotesk text-3xl font-bold tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <button
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 sm:hidden"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {mounted && createPortal(mobileMenuOverlay, document.body)}
    </>
  )
}

export default MobileNav
