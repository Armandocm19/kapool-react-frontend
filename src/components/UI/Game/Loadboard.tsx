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
                     <h1 className="text-5xl font-bold tracking-tight text-white">Puntuación actual</h1>
                    <table className="w-8/12 text-center text-sm font-light mt-10 rounded-lg overflow-hidden">
                        <thead className="border-b font-medium bg-[#4F5D75]/30">
                          <tr className="border-b font-medium border-[#20232F]">
                              <th scope="col" className="px-6 py-4 text-white font-bold tracking-tight">Posición</th>
                              <th scope="col" className="px-6 py-4 text-white font-bold tracking-tight">Jugador</th>
                              <th scope="col" className="px-6 py-4 text-white font-bold tracking-tight">Puntuación</th>
                          </tr>
                        </thead>
                      <tbody className="overflow-y-scroll">
                      {
                        players.map((game, index) => (
                            <tr key={game.socketId} className="border-b border-[#20232F] text-neutral-50 bg-[#4F5D75]/30">
                                <td className="whitespace-nowrap px-6 py-2 font-medium">{ index + 1 }</td>
                                <td className="whitespace-nowrap px-6 py-2">{ game.player }</td>
                                <td className="whitespace-nowrap px-6 py-2">{ `${game.score ?? 0} PTS` }</td>
                            </tr>
                        ))
                      }
                      </tbody>
                    </table>
                    </>
                  )
                : (
                    <>
                      <h1 className='text-5xl font-bold tracking-tight text-white'>Esperando resultados...</h1>
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
