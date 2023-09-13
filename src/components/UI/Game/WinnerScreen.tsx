import { useState, useEffect } from 'react'
import { type ILeaderboard } from '../../../interfaces/ILeaderboard'
import { fireworks } from '../../../utils'
import '../../../styles/loades.css'
import { BackTo } from '../BackTo'

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
        <>
        {previewScreenWinner && (
          <section className="w-full min-h-screen bg-gradient-to-b flex flex-col items-center justify-center gap-20">
            <h2 className="text-[#E3E6E8] font-bold tracking-tight text-6xl">Cargando Podium</h2>
            <div className="line-wobble"></div>
          </section>
        )}
      {!previewScreenWinner && (
        <section className="w-full h-screen flex items-center justify-between bg-gradient-to-b flex-col text-[#E3E6E8] relative">
          <BackTo text="Volver al menú principal" to="/" />
          <h1 className="text-7xl font-bold tracking-tight pt-32">Podium</h1>
          <div className="flex items-end h-[65vh]">
          {topWinners.length > 1 && (
              <div className="flex flex-col justify-end items-center gap-8 w-[300px] h-5/6">
                <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                  {topWinners[1].player}
                </h2>
                <div className="flex justify-center bg-[#DFDFDF] rounded-tl-2xl pt-14 flex-1 w-full">
                  <div className="bg-[#F0F0F0] h-fit rounded-full py-5 px-10 text-8xl font-bold text-[#ABABAB]">
                    2
                  </div>
                </div>
              </div>
          )}
            <div className="flex flex-col justify-end items-center gap-8 w-[350px] h-full">
              <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                {topWinners[0].player}
              </h2>
              <div className="flex justify-center bg-[#FFC727] rounded-t-2xl pt-14 flex-1 h-5/6 h-400px w-full shadow-2xl">
                <div className="bg-[#FFD457] h-fit rounded-full py-5 px-10 text-8xl font-bold">
                  1
                </div>
              </div>
            </div>
            {topWinners.length > 2 && (
              <div className="flex flex-col justify-end items-center gap-8 w-[300px] h-4/6">
                <h2 className="bg-[#FFFFFF26] rounded-full py-3 px-5 text-center text-3xl font-semibold min-w-[200px]">
                  {topWinners[2].player}
                </h2>
                <div className="flex justify-center bg-[#FFA750] rounded-tr-2xl pt-14 h-full w-full shadow-inner">
                  <div className="bg-[#FFC892] h-fit rounded-full py-5 px-10 text-8xl font-bold text-[#C66300]">
                    3
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-2 right-5">
            <small className='text-[#8d8d8d]'>
              Design by{' '}
              <a
                href="https://github.com/JeremyDevCode"
                target="_blank"
                className="text-[#8d8d8d] font-medium" rel="noreferrer"
              >
                JeremyDev
              </a>
            </small>
          </div>
        </section>
      )}
        </>
  )
}
