import { useContext, useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGame } from '../api'
import { SocketContext } from '../context/Socket'

export const useJoinGame = () => {
  const { socket } = useContext(SocketContext)
  const [showWaitingScreen, setShowWaitingScreen] = useState(false)
  const [gameId, setGameId] = useState()
  const navigate = useNavigate()

  const [codeValue, setCodeValue] = useState({
    code: '',
    name: ''
  })

  const [dataFromServer, setDataFromServer] = useState({
    code: '',
    name: ''
  })

  const [error, setError] = useState({
    errorValue: false,
    message: ''
  })

  useEffect(() => {
    socket?.on('move-to-game-page', (gameId: any) => {
      navigate('/playerScreen')
    })
  }, [socket])

  const onChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setCodeValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetInputValue = () => {
    setCodeValue({ code: '', name: '' })
    setDataFromServer({ code: '', name: '' })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!codeValue.name) {
      const game = await getGame(codeValue.code)
      if (!game?.ok) {
        setError({
          errorValue: true,
          message: 'No se ha encontrado una partida que coincida con el código ingresado'
        })
      }

      if (game && game.gameBD.hostId !== codeValue.code) {
        setError({
          errorValue: true,
          message: 'No se ha encontrado una partida que coincida con el código ingresado'
        })
        resetInputValue()
        return
      } else if (game && !game.gameBD.isLive) {
        setError({
          errorValue: true,
          message: 'Lo siento, el juego no se ha iniciado. Habla con el creador de la partida.'
        })
        resetInputValue()
        return
      } else {
        setError({ errorValue: false, message: '' })
      }
      setCodeValue({ code: '', name: '' })
    }

    if (dataFromServer.code !== '' && codeValue.name !== '') {
      socket.emit(
        'add-player',
        codeValue.name,
        socket.id,
        dataFromServer.code
      )
      setShowWaitingScreen(true)
      socket.on('get-game', (gameId: any) => {
        setGameId(gameId)
      })
    }

    setDataFromServer({ code: codeValue.code, name: codeValue.name })
  }

  return {
    // variables
    showWaitingScreen,
    dataFromServer,
    codeValue,
    error,

    // functions
    handleSubmit,
    onChangeData
  }
}
