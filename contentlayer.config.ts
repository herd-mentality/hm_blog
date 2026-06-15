import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import path from 'path'
import { visit } from 'unist-util-visit'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

// Shiki-based syntax highlighting. A single theme is used (rather than a dual
// light/dark theme) because this project's MDX toolchain (mdx-bundler /
// @mdx-js/esbuild 2.3.0) drops CSS custom properties from inline styles, which
// breaks Shiki's `--shiki-light`/`--shiki-dark` variable approach. A single theme
// emits a normal `color` property that survives compilation. Code blocks render
// on a dark background in both light and dark site modes, so `night-owl` (which
// the previous Prism theme was based on) is a natural fit. `keepBackground` is
// disabled so the existing container styling controls the background.
const rehypePrettyCodeOptions = {
  theme: 'night-owl',
  keepBackground: false,
  defaultLang: 'plaintext',
}

// Shiki language IDs are lowercase and case-sensitive (e.g. `r`, not `R`).
// rehype-prism-plus silently lowercased these, but rehype-pretty-code does not,
// so fenced blocks like ```R would fall back to plaintext. Lowercase the code
// language here. This runs AFTER remarkCodeTitles so that titles such as
// `plumber.R` or `cardList.js` (taken from the original `lang:title` string)
// keep their original casing.
function remarkLowercaseCodeLang() {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang) node.lang = node.lang.toLowerCase()
    })
  }
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields,
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    role: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    personal: { type: 'string' },
    layout: { type: 'string' },
    preferred_social: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkLowercaseCodeLang,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      // Cast to `any`: rehype-pretty-code bundles a newer unified/vfile (hast v9)
      // generation than the rest of this project (unified 10), so the Transformer
      // types are nominally incompatible at compile time even though they are
      // runtime-compatible. The cast avoids a spurious `next build` type error.
      [rehypePrettyCode as any, rehypePrettyCodeOptions],
      rehypePresetMinify,
    ],
  },
})
