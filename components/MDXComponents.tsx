/* eslint-disable react/display-name */
import React from 'react'
import { MDXLayout, ComponentMap } from 'pliny/mdx-components'
import { TOCInline } from 'pliny/ui/TOCInline'
import { Pre } from 'pliny/ui/Pre'
import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'
import { useRouter } from 'next/router'

import Image from './Image'
import CustomLink from './Link'

export const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

interface AutoLinkedHeadingProps {
  tag: keyof JSX.IntrinsicElements
  id: string
  children: React.ReactNode
}

// This is necessary to extract text from the children of the node
// which actually looks like this:
// "children": [
//   "<CustomLink />",
//   "Introduction"
// ]
const getTextContent = (children: React.ReactNode): string => {
  let text = ''
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      text += child
    }
  })
  return text
}

const AutoLinkedHeading: React.FC<AutoLinkedHeadingProps> = ({
  tag: Tag,
  id,
  children,
  ...props
}) => {
  const router = useRouter()
  const textContent = getTextContent(children)

  // Remove any existing slug from the URL
  const basePath = router.asPath.split('#')[0]

  return (
    <Tag id={id} className="heading-anchor" {...props}>
      <CustomLink href={`${basePath}#${id}`} aria-label={`Link to ${id}`}>
        {textContent}
      </CustomLink>
    </Tag>
  )
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  h1: (props) => <AutoLinkedHeading tag="h1" {...props} />,
  h2: (props) => <AutoLinkedHeading tag="h2" {...props} />,
  h3: (props) => <AutoLinkedHeading tag="h3" {...props} />,
  h4: (props) => <AutoLinkedHeading tag="h4" {...props} />,
  h5: (props) => <AutoLinkedHeading tag="h5" {...props} />,
  h6: (props) => <AutoLinkedHeading tag="h6" {...props} />,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}
