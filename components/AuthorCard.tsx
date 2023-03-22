import Image from './Image'
import Link from './Link'
import SocialIcon from '@/components/social-icons'
import { allBlogs } from 'contentlayer/generated'

const AuthorCard = ({
  name,
  description,
  role,
  avatar,
  // href,
  email,
  github,
  linkedin,
  twitter,
  personal,
  slug,
}) => (
  <div className="w-4/5 min-w-[350px] max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        avatar && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      <div className="mt-6 ml-6 flex">
        <div className="flex flex-col justify-center">
          {avatar &&
            (allBlogs.filter((b) => b.authors.includes(slug)).length != 0 ? (
              <Link href={'/authors/' + slug} aria-label={`See ${name.match(/^\w+/g)[0]}'s posts`}>
                <Image
                  alt={name}
                  src={avatar}
                  className="h-20 w-20 rounded-full"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={name}
                src={avatar}
                className="h-20 w-20 rounded-full"
                width={544}
                height={306}
              />
            ))}
        </div>
        <div className="ml-4 flex flex-col justify-center">
          {allBlogs.filter((b) => b.authors.includes(slug)).length != 0 ? (
            <Link href={'/authors/' + slug} aria-label={`See ${name.match(/^\w+/g)[0]}'s posts`}>
              <h2 className="nav-link mb-0 text-2xl !font-bold leading-8 tracking-tight">{name}</h2>
            </Link>
          ) : (
            <h2 className="nav-link mb-0 text-2xl !font-bold leading-8 tracking-tight">{name}</h2>
          )}
          <h3 className="prose text-gray-500 dark:text-gray-400">{role}</h3>
          <div className="flex space-x-3 py-1">
            {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
            {personal && <SocialIcon kind="personal" href={personal} size={6} />}
            {github && <SocialIcon kind="github" href={github} size={6} />}
            {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
            {twitter && <SocialIcon kind="twitter" href={twitter} size={6} />}
          </div>
        </div>
      </div>
      <div className="p-6">
        {description.length != 0 && (
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        )}
        {allBlogs.filter((b) => b.authors.includes(slug)).length != 0 && slug && (
          <Link
            href={'/authors/' + slug}
            className="tag-link text-base font-medium leading-6"
            aria-label={`See ${name.match(/^\w+/g)[0]}'s posts`}
          >
            See {name.match(/^\w+/g)[0]}'s posts &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default AuthorCard
