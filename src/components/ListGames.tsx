import { Ring } from '@uiball/loaders'

import { BackTo } from './UI'
import { useGame } from '../hooks'
import { RemoveIcon } from '../icons'
import { toast } from 'sonner'

export const ListGames = () => {
  const { isLoading, gamesByOwner, error, activeGame, restartGame, removeGameToBD } = useGame()

  const handleToRemoveGameInDB = async (quizId: string, gameId: string) => {
    const { ok, msg } = await removeGameToBD(quizId, gameId)
    if (!ok) {
      toast.error(msg)
      return
    }
    toast.success(msg)
  }

  return (
    <div className="w-screen flex justify-center flex-col items-center pt-20 pb-20">
      <BackTo text="Volver al menú principal" to="/" />
      {isLoading
        ? (
        <Ring size={40} lineWeight={5} speed={2} color="white" />
          )
        : gamesByOwner.length !== 0
          ? (
        <>
          <h1 className="text-5xl font-bold text-white">
            Tus partidas creadas
          </h1>
          <table className="w-8/12 text-center text-sm font-light mt-10 rounded-lg overflow-hidden">
            <thead className="border-b font-medium bg-[#4F5D75]/30">
              <tr className="border-b font-medium border-[#20232F]">
                <th scope="col" className="px-6 py-4 text-white font-bold">
                  Número
                </th>
                <th scope="col" className="px-6 py-4 text-white font-bold">
                  Código
                </th>
                <th scope="col" className="px-6 py-4 text-white font-bold">
                  Cantidad de jugadores
                </th>
                <th scope="col" className="px-6 py-4 text-white font-bold">
                  Estado
                </th>
                <th scope="col" className="px-6 py-4 text-white font-bold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {gamesByOwner.map((game, index) => (
                <tr
                  key={game.hostId}
                  className="border-b border-[#20232F] text-neutral-50 bg-[#4F5D75]/30"
                >
                  <td className="whitespace-nowrap px-6 py-2 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-2">{game.hostId}</td>
                  <td className="whitespace-nowrap px-6 py-2">{`${game.playerList?.length}/10`}</td>
                  <td className="whitespace-nowrap px-6 py-2">
                    {game.isLive ? 'Activado' : 'Desactivado'}
                  </td>
                  <td className="whitespace-nowrap  py-2 flex justify-center items-center">
                    {game.isLive
                      ? (
                      <div className='w-full flex justify-center items-center gap-2'>
                        <button
                          className="w-auto bg-[#EF8354] text-[#242634] font-bold rounded p-2 ease-in duration-100 hover:scale-105"
                          onClick={async () => {
                            await restartGame(game)
                          }}
                        >
                          Reiniciar
                        </button>
                        <button onClick={() => handleToRemoveGameInDB(game.quizId, game._id!)}>
                          <RemoveIcon width='25' height='25' className='text-red-600' />
                        </button>
                      </div>
                        )
                      : (
                      <div className='w-full flex justify-center items-center gap-2'>
                        <button
                          className="w-auto bg-[#EF8354] text-[#242634] font-bold rounded px-3 py-2 ease-in duration-100 hover:scale-105"
                          onClick={async () => {
                            await activeGame(game)
                          }}
                        >
                          Activar
                        </button>
                        <button onClick={() => handleToRemoveGameInDB(game.quizId, game._id!)}>
                          <RemoveIcon width='25' height='25' className='text-red-600 cursor-pointer' />
                        </button>
                      </div>
                        )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
            )
          : (
        <h1 className="text-5xl font-bold tracking-tight text-white">
          {error.isError ? error.message : 'No tienes partidas creadas'}
        </h1>
            )}
    </div>
  )
}
