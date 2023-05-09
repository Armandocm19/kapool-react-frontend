import { SocketContext } from '../context/Socket'
import { type IQuizQuestionsParameters } from '../interfaces'

import { useState, useEffect, useContext } from 'react'

export const usePlayerGame = () => {
  const { socket } = useContext(SocketContext)
  const [isQuestionScreen, setIsQuestionScreen] = useState(false)
  const [isPreviewScreen, setIsPreviewScreen] = useState(true)
  const [isResultScreen, setIsResultScreen] = useState(false)
  const [questionData, setQuestionData] = useState<IQuizQuestionsParameters>()
  const [timer, setTimer] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(false)
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)

  const sendAnswer = (answerIndex: number) => {
    setIsQuestionScreen(false)
    setIsResultScreen(true)

    let currentAnswer
    if (questionData?.answer) currentAnswer = Object.values(questionData?.answer)[answerIndex]

    if (questionData?.answer.correctAnswer === currentAnswer) {
      setCorrectAnswer(true)
      setTotalScore((prevstate) => (prevstate + 10) + timer)
      return
    }
    setTotalScore((prevstate) => prevstate + 1)
  }

  useEffect(() => {
    socket.emit('send-answer-to-host', totalScore)
  }, [totalScore])

  useEffect(() => {
    socket.on('host-start-preview', () => {
      setCorrectAnswer(false)
      setIsPreviewScreen(true)
      setIsResultScreen(false)
      startPreviewCountdown(5)
    })
    socket.on('host-start-question-timer', (time: number, question: any) => {
      setCorrectAnswer(false)
      setQuestionData(question)
      startQuestionCountdown(time)
    })
  }, [socket])

  const startPreviewCountdown = (seconds: number) => {
    setIsResultScreen(false)
    setIsPreviewScreen(true)
    setIsQuestionScreen(false)
    let time = seconds
    const interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        setIsPreviewScreen(false)
        setIsQuestionScreen(true)
      }
      time--
    }, 1000)
  }

  const startQuestionCountdown = (seconds: number) => {
    let time = seconds
    let answerSeconds = 0
    const interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        setIsQuestionScreen(false)
        setIsQuestionAnswered(false)
        setIsResultScreen(true)
        nextPage()
      }
      time--
      answerSeconds++
    }, 1000)
  }

  const nextPage = () => {
    setTimeout(() => {
      startPreviewCountdown(5)
    }, 5000)
  }

  return {
    // variables
    isQuestionScreen,
    isPreviewScreen,
    isResultScreen,
    correctAnswer,
    isQuestionAnswered,
    totalScore,
    timer,

    // methods
    sendAnswer
  }
}
