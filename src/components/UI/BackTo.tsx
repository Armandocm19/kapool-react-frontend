import { ArrowLeft } from '../../icons'

interface Props {
  text?: string
  to?: string
  fontSize?: string
}

export function BackTo ({ text, to, fontSize }: Props) {
  return (
    <a
      className={`flex scale absolute font-bold text-[#EF8354] top-10 left-10 tracking-tighter text-base gap-1 justify-center items-center  
      md:text-xl lg:${fontSize ?? 'text-2xl'} duration-100 hover:scale-110`}
      href={to ?? '#'}
    >
      <ArrowLeft /> {text}
    </a>
  )
}
