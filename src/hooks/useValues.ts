import { type ChangeEvent, useContext, useState, useRef, type FormEvent } from 'react'
import { INITIAL_STATE, INITIAL_STATE_CHECKBOX, INITIAL_STATE_INPUTS } from '../services/INITIAL_STATES'
import { type QuizStateInDB, type ICheckboxProps, type IInputsProps, type IGame, type ImageResponse } from '../interfaces'
import { QuizContext } from '../context/quiz'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { createGame, createQuiz, removeImage, uploadImage } from '../api'
import { generateCode } from '../utils'
import { toast } from 'sonner'

export const useValues = () => {
  const { questionNumberState, changeNumberQuestion } = useContext(QuizContext)
  const navigate = useNavigate()

  const [questionData, setQuestionData] = useState<QuizStateInDB>(INITIAL_STATE)
  const [image, setImage] = useState<ImageResponse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [checkboxAnswers, setCheckboxAnswers] = useState<ICheckboxProps>(INITIAL_STATE_CHECKBOX)
  const [timeForQuestion, setTimeForQuestion] = useState(0)
  const [inputsValue, setInputsValue] = useState<IInputsProps>(INITIAL_STATE_INPUTS)

  const onFileSelected = async () => {
    const selectedFile = fileInputRef.current ? fileInputRef.current.files[0] : null
    const responseImage = await uploadImage(selectedFile)
    if (!responseImage) return
    if (!responseImage?.ok) {
      toast.error('Ocurrió un problema al cargar la imagen')
      return
    }
    toast.success('Imagen cargada correctamente')
    setImage(responseImage.data)
  }

  const onRemoveImage = async (event: FormEvent) => {
    event.preventDefault()
    const res = await removeImage(image!.key)
    if (!res?.ok) {
      toast.error('Ocurrió un problema al remover la imagen')
      return
    }
    toast.success('Imagen removida correctamente')
    setImage(null)
  }

  const onNextQuestion = (questionNumber?: number) => {
    changeNumberQuestion(+1) // Check if the parameter comes, since if it comes it means that a new question will not be added
    const newQuestions = {
      questionNumber: questionNumberState,
      question: inputsValue.question,
      timeForQuestion,
      image
    }

    const newAnswers: any = {
      answer1: inputsValue.answer1,
      answer2: inputsValue.answer2,
      answer3: inputsValue.answer3,
      answer4: inputsValue.answer4
    }

    const correctAnswer = Object.entries(checkboxAnswers).find(([key, value]) => value === true)
    if (correctAnswer) newAnswers.correctAnswer = newAnswers[correctAnswer[0]]

    if (questionNumber) {
      const questionIndex = questionData.questionsGame.findIndex(question => question.questionNumber === questionNumber)
      const updatedQuestions = questionData.questionsGame.map((question, i) => {
        if (i === questionIndex) {
          const newQuestionValues = questionData.questionsGame[questionIndex] = newQuestions
          return newQuestionValues
        }
        return question
      })
      const updatedAnswers = questionData.answers.map((answer, i) => {
        if (i === questionIndex) {
          const newAnswerValues = questionData.answers[questionIndex] = newAnswers
          return newAnswerValues
        }
        return answer
      })
      setQuestionData(({
        questionsGame: updatedQuestions,
        answers: updatedAnswers
      }))
    }

    setQuestionData(prev => ({
      questionsGame: [...prev.questionsGame, newQuestions],
      answers: [...prev.answers, newAnswers]
    }))

    // Reset values
    setInputsValue(INITIAL_STATE_INPUTS)
    setCheckboxAnswers(INITIAL_STATE_CHECKBOX)
    setTimeForQuestion(0)
    setImage(null)
  }

  const onBeforeQuestion = (questionNumber: number) => {
    const questionIndex = questionData.questionsGame.findIndex(question => question.questionNumber === questionNumber)
    const findQuestionGame = questionData.questionsGame[questionIndex]
    const findAnswerGame = questionData.answers[questionIndex]

    setInputsValue(({
      answer1: findAnswerGame.answer1,
      answer2: findAnswerGame.answer2,
      answer3: findAnswerGame.answer3,
      answer4: findAnswerGame.answer4,
      question: findQuestionGame.question
    }))
    setCheckboxAnswers({
      answer1: findAnswerGame.answer1 === findAnswerGame.correctAnswer,
      answer2: findAnswerGame.answer2 === findAnswerGame.correctAnswer,
      answer3: findAnswerGame.answer3 === findAnswerGame.correctAnswer,
      answer4: findAnswerGame.answer4 === findAnswerGame.correctAnswer
    })
    setTimeForQuestion(findQuestionGame.timeForQuestion)
    setImage(findQuestionGame.image ? findQuestionGame.image : null)
    changeNumberQuestion(findQuestionGame.questionNumber! - 2)
  }

  const onChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setInputsValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const newValue = Math.max(Number(value), 0)

    setTimeForQuestion(newValue <= 60 ? newValue : 60)
  }

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target
    let newCheckboxAnswers = INITIAL_STATE_CHECKBOX

    newCheckboxAnswers = {
      ...newCheckboxAnswers,
      [name]: checked
    }

    setCheckboxAnswers(newCheckboxAnswers)
  }

  const onSavedGame = () => {
    Swal.fire({
      title: '¿Estás seguro/a de finalizar, y guardar el juego?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Finalizar y guardar',
      denyButtonText: 'No guardar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const creatorId = localStorage.getItem('id')
        if (!creatorId) return
        questionData.creatorId = creatorId
        const dataQuiz = await createQuiz(questionData)

        const newCode = generateCode()
        const { newQuiz } = dataQuiz
        const newGame: IGame = {
          owner: creatorId,
          quizId: newQuiz._id,
          hostId: newCode,
          playerList: [],
          playerResultList: [],
          isLive: false
        }
        await createGame(newGame)
        navigate('/')
        Swal.fire('Guardado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Juego no guardado. Puedes continuar', '', 'info')
      }
    })
  }

  return {

    questionNumberState,
    inputsValue,
    checkboxAnswers,
    timeForQuestion,
    image,

    // Methods
    onNextQuestion,
    onChangeData,
    onChangeTime,
    onChangeCheckbox,
    onSavedGame,
    onFileSelected,
    fileInputRef,
    onRemoveImage,
    onBeforeQuestion
  }
}
