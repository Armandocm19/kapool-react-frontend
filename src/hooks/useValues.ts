import { type ChangeEvent, useContext, useState } from 'react'
import { INITIAL_STATE, INITIAL_STATE_CHECKBOX, INITIAL_STATE_INPUTS } from '../services/INITIAL_STATES'
import { type QuizStateInDB, type ICheckboxProps, type IInputsProps, type IGame } from '../interfaces'
import { QuizContext } from '../context/quiz'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { createGame, createQuiz } from '../api'
import { generateCode } from '../utils'

export const useValues = () => {
  const { questionNumberState, changeNumberQuestion } = useContext(QuizContext)
  const navigate = useNavigate()

  const [questionData, setQuestionData] = useState<QuizStateInDB>(INITIAL_STATE)
  const [checkboxAnswers, setCheckboxAnswers] = useState<ICheckboxProps>(INITIAL_STATE_CHECKBOX)
  const [timeForQuestion, setTimeForQuestion] = useState(0)
  const [inputsValue, setInputsValue] = useState<IInputsProps>(INITIAL_STATE_INPUTS)

  const onNextQuestion = async () => {
    Swal.fire({
      title: '¿Estás seguro de continuar?',
      text: 'Si continuas, no podrás volver atras!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guárdalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        changeNumberQuestion(+1)
        const newQuestions = {
          questionNumber: questionNumberState,
          question: inputsValue.question,
          timeForQuestion
        }

        const newAnswers: any = {
          answer1: inputsValue.answer1,
          answer2: inputsValue.answer2,
          answer3: inputsValue.answer3,
          answer4: inputsValue.answer4
        }

        const correctAnswer = Object.entries(checkboxAnswers).find(([key, value]) => value === true)
        if (correctAnswer) newAnswers.correctAnswer = newAnswers[correctAnswer[0]]

        setQuestionData(prev => ({
          questionsGame: [...prev.questionsGame, newQuestions],
          answers: [...prev.answers, newAnswers]
        }))

        // Reset values
        setInputsValue(INITIAL_STATE_INPUTS)
        setCheckboxAnswers(INITIAL_STATE_CHECKBOX)
        setTimeForQuestion(0)
      }
    })
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

    // Methods
    onNextQuestion,
    onChangeData,
    onChangeTime,
    onChangeCheckbox,
    onSavedGame
  }
}
