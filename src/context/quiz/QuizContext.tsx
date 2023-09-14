import { createContext } from 'react'
import { type QuizState, type IQuizQuestions } from '../../interfaces'

interface ContextProps {
  questionsGame: QuizState['questionsGame']
  winner: string
  currentQuestionNumber: number
  changeNumberQuestion: (value: number) => void
  addQuestion: (question: IQuizQuestions) => void
}

export const QuizContext = createContext({} as ContextProps)
