import { NavLink, useNavigate } from 'react-router-dom'
import { Boton, Input } from './UI'
import { type ChangeEvent, useState, type FormEvent, useContext, useEffect } from 'react'
import { getGame } from '../api'
import { SocketContext } from '../context/Socket'

export const JoinGame = () => {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!codeValue.name) {
      const game = await getGame(codeValue.code)
      if (!game?.ok) {
        setError({
          errorValue: true,
          message: 'No se ha encontrado una partida que coincida con el código ingresado'
        })
        setCodeValue({ code: '', name: '' })
        return
      }

      if (game.gameBD.hostId !== codeValue.code) {
        setError({
          errorValue: true,
          message: 'No se ha encontrado una partida que coincida con el código ingresado'
        })
      } else if (!game.gameBD.isLive) {
        setError({
          errorValue: true,
          message: 'Lo siento, el juego no se ha iniciado. Habla con el creador de la partida.'
        })
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

  return (
        <form className='flex justify-center w-6/12' onSubmit={handleSubmit}>
        {
          !showWaitingScreen
            ? (
            <div className="flex items-center flex-col">
            <h1 className='text-white text-5xl'>{!dataFromServer.code ? 'Ingresa el código' : 'Ingresa tu nombre'}</h1>
            <Input
                className='outline-0 w-64 shadow bg-zinc-800 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100'
                type='text'
                onChange={onChangeData}
                value={!dataFromServer.code ? codeValue.code : codeValue.name}
                name={!dataFromServer.code ? 'code' : 'name'}
                placeholder={!codeValue.code ? 'A9J3B3...' : 'John...'}
            />
            <Boton
                className='w-72 font-mono scale bg-blue-700 p-2 text-white font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                message='Ingresar'
                type='submit'
            />

            {
                error.errorValue && (
                    <div className="bg-red-600 p-3 rounded mt-5">
                        <h2 className='text-center text-white text-xl font-bold'>¡Oh no! :(</h2>
                        <h3 className='text-center text-white'>{ error.message }</h3>
                    </div>
                )
            }
        </div>
              )
            : (
            <div className="flex items-center flex-col">
              <h1 className='text-white text-5xl'>Esperando a que el juego inicie...</h1>
            </div>
              )
        }
      </form>
  )
}
