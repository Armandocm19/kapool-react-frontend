import { useState, useEffect } from 'react'
import { type ILeaderboard } from '../../../interfaces/ILeaderboard'
import { fireworks } from '../../../utils'

interface IProps {
  leaderboard: ILeaderboard[]
}

export const WinnerScreen = ({ leaderboard }: IProps) => {
  const [previewScreenWinner, setPreviewScreenWinner] = useState(true)
  const [showRestOfWinners, setshowRestOfWinners] = useState(false)
  const [topWinners] = useState(leaderboard.sort((a, b) => b.score - a.score).slice(0, 3))

  useEffect(() => {
    setTimeout(() => {
      fireworks()
      setPreviewScreenWinner(false)
      startCoutdownForRestOfWinners()
    }, 5000)
  }, [])

  const startCoutdownForRestOfWinners = () => {
    setTimeout(() => {
      setshowRestOfWinners(true)
    }, 5000)
  }

  return (
        <section className="w-full flex items-center flex-col pt-20 pb-20">
            {previewScreenWinner && (
                <h1 className="text-7xl text-white animate-bounce">Y EL GANADOR ES...</h1>
            )}
            {!previewScreenWinner && (
                <h2 className="text-7xl text-yellow-300 animate-pulse">{ `1° - ${topWinners[0].player}` }</h2>
            )}
            {showRestOfWinners && (
                <div className='flex h-full flex-row items-center gap-7 mt-8'>
                    <h2 className="text-4xl text-gray-400">{ topWinners.length > 1 ? `2° - ${topWinners[1].player}` : '' }</h2>
                    <h2 className="text-3xl text-yellow-700 pt-2">{ topWinners.length > 2 ? `3° - ${topWinners[2].player}` : '' }</h2>
                </div>
            )}
        </section>
  )
}
