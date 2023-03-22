import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
// import { kebabCase } from 'pliny/utils/kebabCase'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getAllAuthors } from 'src/getAllAuthors'
import { InferGetStaticPropsType } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'
console.log(allAuthors)
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
  // Capitalize first letter and convert space to dash
  const title = author[0].toUpperCase() //+ author.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${author} - ${siteMetadata.title}`}
        description={`${author} posts - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
