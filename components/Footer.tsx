import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400 ">
          {/* <div>{siteMetadata.author}</div>
          <div>{` • `}</div> */}
          <Link
            href="/"
            // TODO: Should be a way to set default styles for certain components
            className="underline duration-500 hover:text-gray-400 dark:hover:text-gray-300"
          >
            {siteMetadata.title}
          </Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="underline duration-500 hover:text-gray-400 dark:hover:text-gray-300"
          >
            Tailwind Nextjs Theme
          </Link>
          <div>{` • `}</div>
          <div className="flex space-x-1">
            <Link
              href="https://iconscout.com/icons/sheep"
              className="underline duration-500 hover:text-gray-400 dark:hover:text-gray-300"
            >
              Sheep Icon
            </Link>
            <div>{`by`}</div>
            <Link
              href="https://iconscout.com/contributors/icograms"
              className="underline duration-500 hover:text-gray-400 dark:hover:text-gray-300"
            >
              Icograms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
