interface Props {
  text: string
}

const Caption = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} className="tag-link mr-3 text-sm font-medium uppercase">
      {text.split(' ').join('-')}
    </Link>
    <p className="mono tracking-tight" style={{ fontStyle: 'italic', textAlign: 'center' }}>{text}</p>
  )
}

export { Caption }
