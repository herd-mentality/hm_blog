import siteMetadata from '@/data/siteMetadata'
import { allAuthors } from 'contentlayer/generated'
import AuthorCard from '@/components/AuthorCard'
import { PageSEO } from '@/components/SEO'

export default function Authors() {
  return (
    <>
      <PageSEO title={`Authors - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Authors
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Meet the Herd</p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap justify-center md:justify-start">
            {allAuthors.map((a) => (
              <AuthorCard
                key={a.name}
                name={a.name}
                role={a.role}
                description={a.body.raw}
                avatar={a.avatar}
                href={'/'}
                email={a.email}
                github={a.github}
                linkedin={a.linkedin}
                twitter={a.twitter}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
