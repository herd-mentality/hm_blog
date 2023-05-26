interface Props {
  text: string
}

const Caption = ({ text }: Props) => {
  return (
    <div className="mono flex flex-row items-start tracking-tighter">
      <span className="main-gradient inline-block bg-clip-text font-bold italic text-transparent">
        {'//'}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <span>{text}</span>
    </div>
  )
}

// Repurposed from https://katiekodes.com/link-underline-grow-tailwind-css/
const Highlight = ({ text }: Props) => {
  return <span className="highlight main-gradient">{text}</span>
}

export { Caption, Highlight }
