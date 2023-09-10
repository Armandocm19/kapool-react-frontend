
export interface QuizStateInDB {
  questionsGame: questionItem[]
  answers: answerItem[]
  creatorId?: string
}

export interface QuizState {
  questionsGame: IQuizQuestions[]
  winner: string
  questionNumberState: number
}

export interface IQuizQuestionsParameters {
  question: questionItem
  answer: answerItem
}

export interface IQuizQuestions {
  questions: questionItem
  answers: answerItem
}

export interface questionItem {
  questionNumber?: number
  question: string
  timeForQuestion: number
  image: ImageResponse | null
}

export interface ImageResponse {
  ok: boolean
  key: string
  url: string
}

export interface answerItem {
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  correctAnswer: string
}
