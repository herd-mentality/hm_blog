import Image from './Image'
import Link from './Link'
import SocialIcon from '@/components/social-icons'

// TODO: find a way to list all author's posts
const AuthorCard = ({
  name,
  description,
  role,
  avatar,
  href,
  email,
  github,
  linkedin,
  twitter,
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
            (href ? (
              <Link href={href} aria-label={`See ${name}'s posts`}>
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
          <Link href={href} aria-label={`See ${name}'s posts`}>
            <h2 className="nav-link mb-0 text-2xl !font-bold leading-8 tracking-tight">{name}</h2>
          </Link>
          <h3 className="prose text-gray-500 dark:text-gray-400">{role}</h3>
          <div className="flex space-x-3 py-1">
            {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
            {github && <SocialIcon kind="github" href={github} size={6} />}
            {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
            {twitter && <SocialIcon kind="twitter" href={twitter} size={6} />}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {/* {href && (
          <Link
            href={href}
            className="tag-link text-base font-medium leading-6"
            aria-label={`See ${name}'s posts`}
          >
            See {name.match(/^\w+/g)[0]}'s posts &rarr;
          </Link>
        )} */}
      </div>
    </div>
  </div>
)

export default AuthorCard
