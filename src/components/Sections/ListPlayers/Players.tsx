import { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../../context/Socket'
import { UserIcon } from '../../../icons'
import { Ring } from '@uiball/loaders'

interface IPlayer {
  id: string
  socketId: string
}

export function Players () {
  const { socket, hostId } = useContext(SocketContext)

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
              <div>
                <h1 className="text-5xl font-mono text-white">Lista de jugadores</h1>
                <div className="grid grid-rows-2 grid-cols-5 place-content-center gap-10 mt-10">
                {
                  playersList.map(player => (
                    <div key={player.socketId} >
                          <div className="flex flex-col justify-center items-center">
                              <UserIcon />
                              <p className='text-xl font-mono text-white'>{player.id}</p>
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
              <h1 className='text-5xl font-mono text-white'>Esperando jugadores...</h1>
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
