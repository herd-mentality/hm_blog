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

export { Caption }
