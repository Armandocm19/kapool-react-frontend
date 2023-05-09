import { Players } from './Sections/ListPlayers'
import { Boton } from './UI'
import { ListAnswers, WinnerScreen } from './UI/Game'
import { Loadboard } from './UI/Game/Loadboard'
import { useHostGame } from '../hooks'

export const HostScreen = () => {
  const {
    currentAnswer, currentQuestion, timer, winnerScreen,
    isPreviewScreen, isLeaderboardScreen, isQuestionScreen,
    isGameStarted, leaderboard, startGame
  } = useHostGame()

  return (
      <section className="w-screen flex justify-center flex-col items-center pt-20 pb-20">
        {!isGameStarted && (
            <>
              <Boton
                onClick={startGame}
                className='absolute top-0 right-0 w-64 font-mono scale bg-yellow-600 p-2 text-white font-bold rounded mt-4 mr-6 ease-in duration-100 hover:scale-110'
                message='Iniciar juego'
              />
              <Players />
            </>
        )}
        {isPreviewScreen && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-white font-mono text-8xl'>{timer === 0 ? 5 : timer}</h1>
          </div>
        )}
        {isQuestionScreen && (
          <>
            <h1 className='text-white font-mono text-4xl'>{ currentQuestion?.question }</h1>
            <div className='w-20 border border-white h-20 mt-10 rounded-full flex items-center justify-center'>
              <h1 className='text-white font-mono text-4xl'>{timer}</h1>
            </div>
            <div className="w-9/12 grid grid-cols-2 gap-10 mt-7">
              <ListAnswers host currentAnswerProps={currentAnswer} />
            </div>
          </>
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
