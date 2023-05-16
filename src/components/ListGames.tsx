import { useContext, useEffect, useState } from 'react'
import { getGamesByOwner, updateStateGame } from '../api'
import { type IGame } from '../interfaces'
import { Ring } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/Socket'

export const ListGames = () => {
  const { initializeSocket, socket } = useContext(SocketContext)
  const [isLoading, setIsLoading] = useState(false)
  const [gamesByOwner, setGamesByOwner] = useState<IGame[]>([])
  const navigate = useNavigate()

  const getListGames = async () => {
    const idOwner = localStorage.getItem('id')
    if (!idOwner) return
    setIsLoading(true)
    const listGames = await getGamesByOwner(idOwner)
    setGamesByOwner(listGames.games)
    setIsLoading(false)
  }

  const activeGame = async (game: IGame) => {
    initializeSocket(game.hostId)
    await updateStateGame(game.hostId, game, true)
    navigate(`/HostScreen/${game.quizId}`)
  }

  useEffect(() => {
    getListGames()
  }, [])

  return (
        <div className="w-screen flex justify-center flex-col items-center pt-20 pb-20">
           {
            gamesByOwner.length !== 0
              ? (
                    <>
                      <h1 className="text-5xl font-bold text-white">Tus partidas creadas</h1>
                      <table className="w-8/12 text-center text-sm font-light mt-10 rounded-lg overflow-hidden">
                          <thead className="border-b font-medium bg-[#4F5D75]/30">
                            <tr className="border-b font-medium border-[#20232F]">
                                <th scope="col" className="px-6 py-4 text-white font-bold">Número</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Código</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Cantidad de jugadores</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Estado</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Acciones</th>
                            </tr>
                          </thead>
                        <tbody className="overflow-y-scroll">
                        {
                          gamesByOwner.map((game, index) => (
                              <tr key={game.hostId} className="border-b border-[#20232F] text-neutral-50 bg-[#4F5D75]/30">
                                  <td className="whitespace-nowrap px-6 py-2 font-medium">{ index + 1 }</td>
                                  <td className="whitespace-nowrap px-6 py-2">{ game.hostId }</td>
                                  <td className="whitespace-nowrap px-6 py-2">{ `${game.playerList?.length}/10` }</td>
                                  <td className="whitespace-nowrap px-6 py-2">{ game.isLive ? 'Activado' : 'Desactivado' }</td>
                                  <td className="whitespace-nowrap px-6 py-2 flex justify-center">
                                  {/* {
                                      game.isLive
                                        ? (
                                            'En curso...'
                                          )
                                        : (
                                         <button className="w-full bg-blue-700 text-white font-bold rounded p-2" onClick={async () => { await activeGame(game) }}>Activar</button>
                                          )
                                  } */}
                                  <button className="w-full bg-[#EF8354] text-[#242634] font-bold rounded p-2 ease-in duration-100 hover:scale-105" onClick={async () => { await activeGame(game) }}>Activar</button>
                                  </td>
                              </tr>
                          ))
                        }
                        </tbody>
                      </table>
                    </>
                )
              : (
                  isLoading
                    ? (
                        <Ring
                          size={40}
                          lineWeight={5}
                          speed={2}
                          color="white"
                        />
                      )
                    : (
                      <h1 className="text-5xl font-mono text-white">No tienes partidas creadas</h1>
                      )
                )
           }
        </div>
  )
}
