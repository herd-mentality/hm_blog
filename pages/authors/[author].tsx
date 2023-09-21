import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getAllAuthors } from 'src/getAllAuthors'
import { InferGetStaticPropsType } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'

export async function getStaticPaths() {
  const authors = await getAllAuthors(allBlogs)

  return {
    paths: Object.keys(authors).map((author) => ({
      params: {
        author,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const author = context.params.author as string
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.authors && post.authors.includes(author) // .map((t) => kebabCase(t))
    )
  )

  return { props: { posts: filteredPosts, author } }
}

export default function Author({ posts, author }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Find author in author data (allAuthors) matching on username first (e.g. sparrowhawk) to pull full name (e.g. 'Sparrow Hawk')
  const author_full_name = allAuthors.filter((i) => i.slug.includes(author))[0].name
  const first_name = (author_full_name.match(/^(\w+)\s/) || ['', author_full_name])[1]

  const title = first_name + "'s posts"
  return (
    <>
      <TagSEO
        title={`${author_full_name} - ${siteMetadata.title}`}
        description={`${author_full_name} posts - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
