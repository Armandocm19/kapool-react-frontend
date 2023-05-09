import { type FC, useReducer } from 'react'
import { QuizContext, quizReducer } from '.'
import { type IQuizQuestions, type QuizState } from '../../interfaces'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const GAME_INITIAL_STATE: QuizState = {
  questionsGame: [{
    questions: {
      questionNumber: 1,
      question: '',
      timeForQuestion: 0
    },
    answers: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: ''
    }
  }],
  winner: 'none',
  questionNumberState: 1
}

export const QuizProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, GAME_INITIAL_STATE)

  const addQuestion = (question: IQuizQuestions) => {
    const { questionNumberState } = state
    console.log('estado: ', state.questionsGame[questionNumberState].questions.questionNumber)
    console.log('actual: ', question.questions.questionNumber)
    if (state.questionsGame.find(item => item.questions.questionNumber === question.questions.questionNumber) != null) {
      dispatch({ type: '[Game] - Edit questions and answers', payload: question })
    } else {
      dispatch({ type: '[Game] - Add questions and answers', payload: question })
    }
    // if (questionNumberState === state.questionsGame[questionNumberState].questions.questionNumber) {
    //   dispatch({ type: '[Game] - Edit questions and answers', payload: question })
    // } else {
    //   dispatch({ type: '[Game] - Add questions and answers', payload: question })
    // }
  }

  const changeNumberQuestion = (value: number) => {
    const newValue = Math.max(state.questionNumberState + value, 0)
    dispatch({ type: '[Game] - Change number question in UI', payload: newValue })
  }

  return (
       < QuizContext.Provider value={{
         ...state,

         // Methods
         addQuestion,
         changeNumberQuestion
       }}>
          { children }
        </ QuizContext.Provider>
  )
}
