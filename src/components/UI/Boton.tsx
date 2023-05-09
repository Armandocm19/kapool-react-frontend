import { useContext } from 'react'
import { QuizContext } from '../../context/quiz'
// import { type MouseEvent } from 'react'

interface Props {
  message: string
  name?: string
  value?: number
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
}

export const Boton = ({ onClick, className, message, value = 0, type = 'button' }: Props) => {
  const { changeNumberQuestion } = useContext(QuizContext)

  return (
    <button className={className} onClick={() => {
      if (onClick) {
        onClick()
      }
      value !== 0 && changeNumberQuestion(+value)
    }} type={type}>
      {message}
    </button>
  )
}
