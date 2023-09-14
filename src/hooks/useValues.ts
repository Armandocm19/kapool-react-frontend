import { type ChangeEvent, useState, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from './useGame'

import { INITIAL_STATE_CHECKBOX, INITIAL_STATE_INPUTS } from '../services/INITIAL_STATES'
import { type ICheckboxProps, type IInputsProps, type IGame, type ImageResponse, type answerItem, type questionItem } from '../interfaces'

import Swal from 'sweetalert2'
import { toast } from 'sonner'

import { createGame, createQuiz, removeImage, uploadImage } from '../api'
import { generateCode } from '../utils'

export const useValues = () => {
  const navigate = useNavigate()
  const {
    currentQuestionNumber, questionData, timeForQuestion,
    changeNumberQuestion, setQuestionData, setTimeForQuestion
  } = useGame()
  const [selectedImage, setSelectedImage] = useState<ImageResponse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedCheckboxAnswers, setSelectedCheckboxAnswers] = useState<ICheckboxProps>(INITIAL_STATE_CHECKBOX)
  const [inputsValue, setInputsValue] = useState<IInputsProps>(INITIAL_STATE_INPUTS)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  const handleFileSelection = async () => {
    if (!fileInputRef.current) return
    const selectedFile = fileInputRef.current.files ? fileInputRef.current.files[0] : null
    const responseImage = await uploadImage(selectedFile)
    if (!responseImage) return
    if (!responseImage?.ok) {
      toast.error('Ocurrió un problema al cargar la imagen')
      return
    }
    toast.success('Imagen cargada correctamente')
    setSelectedImage(responseImage.data)
  }

  const handleImageRemoval = async (event: FormEvent) => {
    event.preventDefault()
    const res = await removeImage(selectedImage!.key)
    if (!res?.ok) {
      toast.error('Ocurrió un problema al remover la imagen')
      return
    }
    toast.success('Imagen removida correctamente')
    setSelectedImage(null)
  }

  const setInputsValuesFromTheUser = (questionsGame: questionItem[], questionNumber: number, isPreviousQuestion: boolean) => {
    let questionIndex = questionsGame.findIndex(question => question.questionNumber === questionNumber)
    questionIndex = isPreviousQuestion ? questionIndex : questionIndex + 1
    const findQuestionGame = questionData.questionsGame[questionIndex]
    const findAnswerGame = questionData.answers[questionIndex]
    setInputsValue(({
      answer1: findAnswerGame.answer1,
      answer2: findAnswerGame.answer2,
      answer3: findAnswerGame.answer3,
      answer4: findAnswerGame.answer4,
      question: findQuestionGame.question
    }))
    setSelectedCheckboxAnswers({
      answer1: findAnswerGame.answer1 === findAnswerGame.correctAnswer,
      answer2: findAnswerGame.answer2 === findAnswerGame.correctAnswer,
      answer3: findAnswerGame.answer3 === findAnswerGame.correctAnswer,
      answer4: findAnswerGame.answer4 === findAnswerGame.correctAnswer
    })
    setTimeForQuestion(findQuestionGame.timeForQuestion)
    setSelectedImage(findQuestionGame.selectedImage ? findQuestionGame.selectedImage : null)
    setIsUpdated(true)
  }

  const handleResetValues = () => {
    // Reset values
    setInputsValue(INITIAL_STATE_INPUTS)
    setSelectedCheckboxAnswers(INITIAL_STATE_CHECKBOX)
    setTimeForQuestion(0)
    setSelectedImage(null)
  }

  const handleNextQuestion = (questionNumber: number) => {
    changeNumberQuestion(+1) // Check if the parameter comes, since if it comes it means that a new question will not be added

    const newQuestions: questionItem = {
      questionNumber: currentQuestionNumber,
      question: inputsValue.question,
      timeForQuestion,
      selectedImage
    }

    const newAnswers: answerItem = {
      answer1: inputsValue.answer1,
      answer2: inputsValue.answer2,
      answer3: inputsValue.answer3,
      answer4: inputsValue.answer4,
      correctAnswer: ''
    }

    const correctAnswer = Object.entries(selectedCheckboxAnswers).find(([key, value]) => value === true)
    if (correctAnswer) newAnswers.correctAnswer = newAnswers[correctAnswer[0] as keyof answerItem]

    const questionIndex = questionData.questionsGame.findIndex(question => question.questionNumber === questionNumber)
    const nextQuestionIndex = questionData.questionsGame.findIndex(question => question.questionNumber === questionNumber + 1)
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

    if (nextQuestionIndex === -1) {
      if (isUpdated) {
        handleResetValues()
        return
      }
      setQuestionData(prev => ({
        questionsGame: [...prev.questionsGame, newQuestions],
        answers: [...prev.answers, newAnswers]
      }))
      setIsUpdated(false)
      handleResetValues()
    } else {
      setInputsValuesFromTheUser(questionData.questionsGame, questionNumber, false)
      setQuestionData({
        questionsGame: updatedQuestions,
        answers: updatedAnswers
      })
    }
  }

  const handlePreviousQuestion = (questionNumber: number) => {
    setInputsValuesFromTheUser(questionData.questionsGame, questionNumber, true)
    changeNumberQuestion(-1)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setInputsValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    const newValue = Math.max(Number(value), 0)

    setTimeForQuestion(newValue <= 60 ? newValue : 60)
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target
    let newCheckboxAnswers = INITIAL_STATE_CHECKBOX

    newCheckboxAnswers = {
      ...newCheckboxAnswers,
      [name]: checked
    }

    setSelectedCheckboxAnswers(newCheckboxAnswers)
  }

  const handleSaveGame = () => {
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
        const newGame: IGame = {
          owner: creatorId,
          quizId: dataQuiz!.newQuiz._id,
          hostId: newCode,
          playerList: [],
          playerResultList: [],
          isLive: false
        }
        await createGame(newGame)
        navigate('/')
        Swal.fire('Guardado!', '', 'success')
        changeNumberQuestion(-(currentQuestionNumber - 1))
      } else if (result.isDenied) {
        Swal.fire('Juego no guardado. Puedes continuar', '', 'info')
      }
    })
  }

  return {

    currentQuestionNumber,
    inputsValue,
    selectedCheckboxAnswers,
    timeForQuestion,
    selectedImage,

    // Methods
    handleNextQuestion,
    handleInputChange,
    handleTimeChange,
    handleCheckboxChange,
    handleFileSelection,
    fileInputRef,
    handleImageRemoval,
    handlePreviousQuestion,
    handleSaveGame
  }
}
