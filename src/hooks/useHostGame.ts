import { useParams } from 'react-router-dom'
import { type ILeaderboard } from '../interfaces/ILeaderboard'
import { getQuiz } from '../api'
import { SocketContext } from '../context/Socket'

import { useContext, useState, useEffect } from 'react'
import { type answerItem, type QuizStateInDB, type questionItem } from '../interfaces'

export const useHostGame = () => {
  const { socket } = useContext(SocketContext)
  const { gameId = '' } = useParams()
  const [quiz, setQuiz] = useState<QuizStateInDB>()
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<answerItem>()
  const [currentQuestion, setCurrentQuestion] = useState<questionItem>()
  const [timer, setTimer] = useState(0)
  const [isPreviewScreen, setIsPreviewScreen] = useState(false)
  const [isLeaderboardScreen, setIsLeaderboardScreen] = useState(false)
  const [isQuestionScreen, setIsQuestionScreen] = useState(false)
  const [winnerScreen, setWinnerScreen] = useState(false)

  useEffect(() => {
    getQuizData()
  }, [gameId])

  useEffect(() => {
    socket.on('get-answer-from-player', (score: number, player: string, socketId: number) => {
      if (leaderboard.some((item) => item.player === player)) {
        const index = leaderboard.findIndex((item) => item.player === player)
        const newLeaderboard = [...leaderboard]
        newLeaderboard[index].score = score
        setLeaderboard(newLeaderboard)
        return
      }
      setLeaderboard([...leaderboard, { score, player, socketId }])
    })
  }, [leaderboard, socket])

  const startGame = () => {
    if (!isGameStarted) setIsGameStarted(prev => !prev)

    const currentIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(currentIndex)
    socket.emit('start-game', quiz)
    socket.emit('question-preview', () => {
      setCurrentQuestion(quiz?.questionsGame[currentIndex])
      setCurrentAnswer(quiz?.answers[currentIndex])
      startPreviewCountdown(5, currentIndex)
    })
    setIsPreviewScreen((prevstate) => !prevstate)
  }

  const startPreviewCountdown = (seconds: number, index: number) => {
    setIsLeaderboardScreen(false)
    setIsPreviewScreen(true)
    setIsQuestionScreen(false)
    let time = seconds
    const interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        setIsPreviewScreen(false)
        setIsQuestionScreen(true)
        const quizParameters = {
          question: quiz?.questionsGame[index],
          answer: quiz?.answers[index]
        }
        startQuestionCountdown(quiz?.questionsGame[index].timeForQuestion ?? 0, index + 1)
        socket.emit('start-question-timer', quiz?.questionsGame[index].timeForQuestion ?? 0, quizParameters)
      }
      time--
    }, 1000)
  }

  const startQuestionCountdown = (seconds: number, index: number) => {
    let time = seconds
    const interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        console.log(index)
        const questionNumber = (quiz?.questionsGame[index - 1].questionNumber ?? 0) + 1
        const questionArrayLength = quiz?.questionsGame.length

        if ((questionNumber - 1) === questionArrayLength) {
          setIsQuestionScreen(false)
          setWinnerScreen(true)
          return
        }
        const currentQuestion = quiz?.questionsGame[index]
        setCurrentQuestion(currentQuestion)
        setCurrentAnswer(quiz?.answers[index])
        updatedLeaderboard(index)
      }
      time--
    }, 1000)
  }

  const getQuizData = async () => {
    const quizData = await getQuiz(gameId)
    setQuiz(quizData?.quiz)
  }

  const updatedLeaderboard = (index: number) => {
    setIsPreviewScreen(false)
    setIsQuestionScreen(false)
    setIsLeaderboardScreen(true)
    setTimeout(() => {
      startPreviewCountdown(5, index)
    }, 5000)
  }

  return {
    // Variables
    currentAnswer,
    currentQuestion,
    timer,
    isPreviewScreen,
    isLeaderboardScreen,
    isQuestionScreen,
    isGameStarted,
    leaderboard,
    winnerScreen,

    // Methods
    startGame
  }
}
