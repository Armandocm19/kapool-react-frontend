import { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../../context/Socket'
import { UserIcon } from '../../../icons'
import { Ring } from '@uiball/loaders'

interface IPlayer {
  id: string
  socketId: string
}

export function Players () {
  const { socket } = useContext(SocketContext)

  const [playersList, setPlayersList] = useState<IPlayer[]>([])

  useEffect(() => {
    socket.on('player-joined', (player: any) => {
      setPlayersList([...playersList, player])
    })
  }, [playersList, socket])

  return (
    <>
      {
        playersList.length !== 0
          ? (
        <div className='w-screen flex flex-col items-center justify-center'>
          <h1 className="text-5xl font-bold tracking-tigh text-white">Lista de jugadores</h1>
          <div className={`max-w-[700px] ${playersList.length === 3 ? 'grid grid-rows-2 grid-cols-3 place-content-center' : 'flex justify-center items-center'} gap-10 mt-10`}>
          {
            playersList.map(player => (
              <div key={player.socketId} >
                    <div className="flex flex-col justify-center items-center">
                        <UserIcon className='text-yellow-300' />
                        <p className='text-xl font-bold tracking-tigh text-white text-center'>{player.id}</p>
                    </div>
                  </div>
            )
            )
          }
          </div>
        </div>
            )
          : (
            <>
              <h1 className='text-5xl font-bold tracking-tigh text-white'>Esperando jugadores...</h1>
              <div className="mt-10">
                <Ring
                  size={40}
                  lineWeight={5}
                  speed={2}
                  color="white"
                />
              </div>
            </>
            )
      }
    </>
  )
}
