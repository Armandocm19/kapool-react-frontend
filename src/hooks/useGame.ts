import { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../context/Socket'
import { type IGame } from '../interfaces'
import { getGamesByOwner, updateStateGame } from '../api'
import { useNavigate } from 'react-router-dom'

export const useGaMme = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { initializeSocket } = useContext(SocketContext)
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const [gamesByOwner, setGamesByOwner] = useState<IGame[]>([])
  const navigate = useNavigate()

  const getListGames = async () => {
    const idOwner = localStorage.getItem('id')
    if (!idOwner) return
    setIsLoading(true)
    const listGames = await getGamesByOwner(idOwner)
    if (!listGames) return
    if (!listGames.ok) {
      setError({
        isError: true,
        message: 'No se pudo obtener la lista de partidas'
      })
      setIsLoading(false)
      return
    }
    setGamesByOwner(listGames.games)
    setIsLoading(false)
  }

  const activeGame = async (game: IGame) => {
    initializeSocket(game.hostId)
    await updateStateGame(game.hostId, game, true)
    navigate(`/HostScreen/${game.quizId}`)
  }

  const restartGame = async (game: IGame) => {
    await updateStateGame(game.hostId, game, false)
    getListGames()
  }

  useEffect(() => {
    getListGames()
  }, [])

  return {
    // Variables
    isLoading,
    gamesByOwner,
    error,

    // Methods
    activeGame,
    restartGame
  }
}
