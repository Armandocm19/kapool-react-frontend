import { useContext, useState, useEffect } from 'react'

import { Players } from './Sections/ListPlayers'
import { ImageToGame, Timer } from './Sections/Game'

import { Boton } from './UI'
import { ListAnswers, WinnerScreen } from './UI/Game'
import { Loadboard } from './UI/Game/Loadboard'

import { useHostGame } from '../hooks'
import { SocketContext } from '../context/Socket'

import { type IPlayer } from '../interfaces'

export const HostScreen = () => {
  const {
    currentAnswer, currentQuestion, timer, winnerScreen,
    isPreviewScreen, isLeaderboardScreen, isQuestionScreen,
    isGameStarted, leaderboard, startGame
  } = useHostGame()

  const { socket } = useContext(SocketContext)

  const [playersList, setPlayersList] = useState<IPlayer[]>([])

  useEffect(() => {
    socket.on('player-joined', (player: any) => {
      setPlayersList([...playersList, player])
    })
  }, [playersList, socket])

  return (
      <section className={`w-screen flex justify-center flex-col items-center ${!winnerScreen && 'pt-5 pb-20 lg:pt-20'}`}>
        {!isGameStarted && (
            <>
              {
                playersList.length !== 0 && (
                  <Boton
                    onClick={startGame}
                    className='absolute top-0 right-0 w-64 scale bg-[#EF8354] p-2 text-[#242634] font-bold tracking-tigh rounded mt-6 mr-8 ease-in duration-100 hover:scale-110'
                    message='Iniciar juego'
                  />
                )
              }
              <Players playersList={playersList} />
            </>
        )}
        {isPreviewScreen && (
          <Timer time={timer} />
        )}
        {isQuestionScreen && (
          <div className='w-full flex flex-col justify-center items-center content-center'>
            <h1 className='text-white font-bold text-justify tracking-tight text-xl px-3 md:text-2xl lg:text-4xl'>{ currentQuestion?.question }</h1>
            {
              currentQuestion?.selectedImage && (
                <ImageToGame styles='max-w-[20rem] mt-5 w-[10rem] sm:w-[12rem] md:w-[15rem] lg:w-[18rem]' url={currentQuestion.selectedImage.url} />
              )
            }
            <div className='w-10 border border-white h-10 mt-10 rounded-full flex items-center justify-center
            md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-20 xl:h-20'>
              <h1 className='text-white font-bold text-xl md:text-2xl lg:text-4xl'>{timer}</h1>
            </div>
            <div className="w-[95%] grid grid-cols-2 gap-10 mt-7 lg:w-8/12 xl:w-9/12">
              <ListAnswers host currentAnswerProps={currentAnswer} />
            </div>
          </div>
        )}
        {isLeaderboardScreen && (
          <>
            <Loadboard resultPlayers={leaderboard} />
          </>
        )}
        {winnerScreen && (
        <>
          <WinnerScreen leaderboard={leaderboard} />
        </>
        )}
      </section>
  )
}
