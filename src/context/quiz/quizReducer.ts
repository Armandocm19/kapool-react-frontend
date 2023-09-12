import { type QuizState, type IQuizQuestions } from '../../interfaces'

type QuizActionType =
| { type: '[Game] - Add questions and answers', payload: IQuizQuestions }
| { type: '[Game] - Edit questions and answers', payload: IQuizQuestions }
| { type: '[Game] - Change number question in UI', payload: number }

export const quizReducer = (state: QuizState, action: QuizActionType): QuizState => {
  switch (action.type) {
    case '[Game] - Add questions and answers':
      return {
        ...state,
        questionsGame: [...state.questionsGame, action.payload].filter(item => item.questions.question !== '')
      }
    case '[Game] - Edit questions and answers':
      return {
        ...state,
        questionsGame: [action.payload]
      }
    case '[Game] - Change number question in UI':
      return {
        ...state,
        currentQuestionNumber: action.payload
      }
  }
}
