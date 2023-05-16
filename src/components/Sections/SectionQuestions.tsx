import { Input } from '../UI'

interface Props {
  questionNumberState: number
  onchangeData: (e: React.ChangeEvent<HTMLInputElement>) => void
  question: string
}

export const SectionQuestions = ({ questionNumberState, onchangeData, question }: Props) => {
  return (
        <>
         <h1 className='text-white text-5xl font-bold tracking-tight'
          >{`PREGUNTA NUMERO ${questionNumberState}`}
          </h1>

          <Input
            type="text"
            name='question'
            onChange={onchangeData}
            value={question}
            className='outline-0 font-bold tracking-tight shadow w-6/12 bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-5 focus:shadow-zinc-500 ease-in duration-100'
            placeholder='Escribe tu pregunta...'
          />
        </>
  )
}
