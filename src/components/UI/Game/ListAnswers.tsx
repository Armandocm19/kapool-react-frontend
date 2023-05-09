import { type answerItem } from '../../../interfaces'
import { Answer } from './Answer'

interface Props {
  host?: boolean
  currentAnswerProps: answerItem | undefined
}

export const ListAnswers = ({ host = false, currentAnswerProps }: Props) => {
  return (
        <>
            <Answer
                className={
                `flex items-center w-full bg-red-600 
                p-10 justify-between rounded ${!host && 'cursor-pointer'} scale duration-100 ${!host && 'hover:scale-105'}`
                }
                name='firstButton'
                icon='circle'
                Disabled={host}
                Text={host ? currentAnswerProps?.answer1 : ''}
              />
              <Answer
                className={
                `flex items-center w-full bg-green-600
                p-10 justify-between rounded ${!host && 'cursor-pointer'} scale duration-100 ${!host && 'hover:scale-105'}`
                }
                name='firstButton'
                icon='triangle'
                Disabled={host}
                Text={host ? currentAnswerProps?.answer2 : ''}
              />
              <Answer
                className={
                `flex items-center w-full bg-yellow-600 
                p-10 justify-between rounded ${!host && 'cursor-pointer'} scale duration-100 ${!host && 'hover:scale-105'}`
                }
                name='firstButton'
                icon='square'
                Disabled={host}
                Text={host ? currentAnswerProps?.answer3 : ''}
              />
              <Answer
                className={
                `flex items-center w-full bg-blue-600 
                p-10 justify-between rounded ${!host && 'cursor-pointer'} scale duration-100 ${!host && 'hover:scale-105'}`
                }
                name='firstButton'
                icon='diamond'
                Disabled={host}
                Text={host ? currentAnswerProps?.answer4 : ''}
              />
        </>
  )
}
