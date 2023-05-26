interface Props {
  text: string
}

const Caption = ({ text }: Props) => {
  return (
    <p className="mono tracking-tighter" style={{ fontStyle: 'italic', textAlign: 'center' }}>
      {text}
    </p>
  )
}

// Repurposed from https://katiekodes.com/link-underline-grow-tailwind-css/
const Highlight = ({ text }: Props) => {
  return <span className="highlight">{text}</span>
}

export { Caption, Highlight }
