import { Players } from './Sections/ListPlayers'
import { Boton } from './UI'
import { ListAnswers, WinnerScreen } from './UI/Game'
import { Loadboard } from './UI/Game/Loadboard'
import { useHostGame } from '../hooks'
import { ImageToGame, Timer } from './Sections/Game'

export const HostScreen = () => {
  const {
    currentAnswer, currentQuestion, timer, winnerScreen,
    isPreviewScreen, isLeaderboardScreen, isQuestionScreen,
    isGameStarted, leaderboard, startGame
  } = useHostGame()

  return (
      <section className={`w-screen flex justify-center flex-col items-center ${!winnerScreen && 'pt-20 pb-20'}`}>
        {!isGameStarted && (
            <>
              <Boton
                onClick={startGame}
                className='absolute top-0 right-0 w-64 scale bg-[#EF8354] p-2 text-[#242634] font-bold tracking-tigh rounded mt-6 mr-8 ease-in duration-100 hover:scale-110'
                message='Iniciar juego'
              />
              <Players />
            </>
        )}
        {isPreviewScreen && (
          <Timer time={timer} />
        )}
        {isQuestionScreen && (
          <>
            <h1 className='text-white font-bold tracking-tight text-4xl'>{ currentQuestion?.question }</h1>
            {
              currentQuestion?.image && (
                <ImageToGame styles='w-[18rem] max-w-[20rem]' url={currentQuestion.image.url} />
              )
            }
            <div className='w-20 border border-white h-20 mt-10 rounded-full flex items-center justify-center'>
              <h1 className='text-white font-bold text-4xl'>{timer}</h1>
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
