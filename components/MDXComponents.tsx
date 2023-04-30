/* eslint-disable react/display-name */
import React from 'react'
import { MDXLayout, ComponentMap } from 'pliny/mdx-components'
import { TOCInline } from 'pliny/ui/TOCInline'
import { Pre } from 'pliny/ui/Pre'
import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Image from './Image'
import CustomLink from './Link'

export const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

interface AutoLinkedHeadingProps {
  tag: keyof JSX.IntrinsicElements
  id: string
}

const AutoLinkedHeading: React.FC<AutoLinkedHeadingProps> = ({ tag: Tag, id, ...props }) => {
  const router = useRouter()

  return (
    <Link href={`${router.asPath}#${id}`} passHref>
      <Tag id={id} {...props} />
    </Link>
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
