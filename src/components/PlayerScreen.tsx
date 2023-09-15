import { Ring } from '@uiball/loaders'
import { Answer } from './UI/Game'
import { usePlayerGame } from '../hooks'

export const PlayerScreen = () => {
  const {
    timer, isQuestionScreen, isPreviewScreen, totalScore,
    isResultScreen, correctAnswer, isQuestionAnswered,
    finishScreen, sendAnswer
  } = usePlayerGame()

  return (
        <>
          <div className="flex flex-col items-center w-11/12">
              {!finishScreen && isPreviewScreen && (
                <div className="flex flex-col items-center w-full">
                  <h1 className='text-white font-bold text-8xl'>{timer === 0 ? 5 : timer}</h1>
                </div>
              )}
              {!finishScreen && isQuestionScreen && (
                  <>
                    <div className="w-full grid grid-cols-2 gap-10 mt-7 md:gap-5">
                      <Answer
                          className='flex items-center w-full px-3 bg-red-600 justify-between rounded cursor-pointer scale duration-100 hover:scale-105
                          h-20 md:h-25 md:px-8 lg:px-10 lg:h-32'
                          name='firstButton'
                          onClick={() => { sendAnswer(0) }}
                          icon='circle'
                      />
                      <Answer
                          className='flex items-center w-full bg-green-600 px-3 justify-between rounded cursor-pointer scale duration-100 hover:scale-105
                          h-20 md:h-25 md:px-8 lg:px-10 lg:h-32'
                          name='secondButton'
                          onClick={() => { sendAnswer(1) }}
                          icon='triangle'
                      />
                      <Answer
                          className='flex items-center w-full bg-yellow-600 px-3 justify-between rounded cursor-pointer scale duration-100 hover:scale-105
                          h-20 md:h-25 md:px-8 lg:px-10 lg:h-32'
                          name='thirdButton'
                          onClick={() => { sendAnswer(2) }}
                          icon='square'
                      />
                      <Answer
                          className='flex items-center w-full bg-blue-600 px-3 justify-between rounded cursor-pointer scale duration-100 hover:scale-105
                          h-20 md:h-25 md:px-8 lg:px-10 lg:h-32'
                          name='fourthButton'
                          onClick={() => { sendAnswer(3) }}
                          icon='diamond'
                      />
                    </div>
                  </>
              )}
              {isQuestionAnswered && (
                <>
                  <h1 className="text-5xl font-bold tracking-tight text-white pb-5">Esperando resultados...</h1>
                  <Ring
                    size={40}
                    lineWeight={5}
                    speed={2}
                    color="white"
                  />
              </>
              )}
              {isResultScreen && (
                <div className='w-full flex items-center flex-col justify-center'>
                  <h1 className={`${correctAnswer ? 'text-green-500' : 'text-red-500'} font-bold tracking-tight text-7xl`}>
                    { correctAnswer ? '¡Respuesta correcta!' : '¡Respuesta incorrecta!' }
                  </h1>
                  <h2 className='text-white font-bold tracking-tight text-4xl mt-10'>Puntaje ganado: {totalScore} {totalScore === 1 ? 'punto' : 'puntos'}.</h2>
                </div>
              )}
              {!isResultScreen && finishScreen && (
                <div className='w-full flex items-center flex-col justify-center'>
                  <h1 className='font-bold tracking-tight text-7xl text-yellow-300'>¡Juego finalizado!</h1>
                  <h2 className='text-white font-bold tracking-tight text-4xl mt-10'>Puntaje total: {totalScore} {totalScore === 1 ? 'punto' : 'puntos'}.</h2>
                  <a href="/" className='outline-none bg-[#EF8354] text-[#242634] p-6 font-bold tracking-tight rounded mt-6 ease-in duration-100 hover:scale-110'>Volver al menú principal</a>
                </div>
              )}
          </div>
        </>
  )
}
