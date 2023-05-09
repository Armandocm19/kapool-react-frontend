import { useState } from 'react'
import { Ring } from '@uiball/loaders'
import { type ILeaderboard } from '../../../interfaces/ILeaderboard'

interface Props {
  resultPlayers: ILeaderboard[]
}

export const Loadboard = ({ resultPlayers }: Props) => {
  const [players] = useState(resultPlayers.sort((a, b) => b.score - a.score))

  return (
        <>
          <section className="w-screen flex justify-center flex-col items-center pt-20 pb-20">
            {
              players.length !== 0
                ? (
                    <>
                     <h1 className="text-5xl font-mono text-white">Puntuación actual</h1>
                    <table className="w-8/12 text-center text-sm font-light mt-10">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr className="border-b font-medium dark:border-neutral-500">
                              <th scope="col" className="px-6 py-4 text-white">Posición</th>
                              <th scope="col" className="px-6 py-4 text-white">Jugador</th>
                              <th scope="col" className="px-6 py-4 text-white">Puntuación</th>
                          </tr>
                        </thead>
                      <tbody className="overflow-y-scroll">
                      {
                        players.map((game, index) => (
                            <tr key={game.socketId} className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                                <td className="whitespace-nowrap px-6 py-2 font-medium">{ index + 1 }</td>
                                <td className="whitespace-nowrap px-6 py-2">{ game.player }</td>
                                <td className="whitespace-nowrap px-6 py-2">{ `${game.score} PTS` }</td>
                            </tr>
                        ))
                      }
                      </tbody>
                    </table>
                    </>
                  )
                : (
                    <>
                      <h1 className='text-5xl font-mono text-white'>Esperando resultados...</h1>
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
          </section>
        </>
  )
}
