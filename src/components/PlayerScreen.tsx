import { Ring } from '@uiball/loaders'
import { Answer } from './UI/Game'
import { usePlayerGame } from '../hooks'

export const PlayerScreen = () => {
  const {
    timer, isQuestionScreen, isPreviewScreen, totalScore,
    isResultScreen, correctAnswer, isQuestionAnswered,
    sendAnswer
  } = usePlayerGame()

  return (
        <>
          <div className="flex flex-col items-center w-11/12">
              {isPreviewScreen && (
                <div className="flex flex-col items-center w-full">
                  <h1 className='text-white font-mono text-8xl'>{timer === 0 ? 5 : timer}</h1>
                </div>
              )}
              {isQuestionScreen && (
                  <>
                    <div className="w-full grid grid-cols-2 gap-10 mt-7">
                      <Answer
                          className={
                          'flex items-center w-full p-32 bg-red-600 justify-between rounded cursor-pointer scale duration-100 hover:scale-105'
                          }
                          name='firstButton'
                          onClick={() => { sendAnswer(0) }}
                          icon='circle'
                      />
                      <Answer
                          className={
                          'flex items-center w-full bg-green-600 p-32 justify-between rounded cursor-pointer scale duration-100 hover:scale-105'
                          }
                          name='secondButton'
                          onClick={() => { sendAnswer(1) }}
                          icon='triangle'
                      />
                      <Answer
                          className={
                          'flex items-center w-full bg-yellow-600 justify-between rounded cursor-pointer scale duration-100 hover:scale-105'
                          }
                          name='thirdButton'
                          onClick={() => { sendAnswer(2) }}
                          icon='square'
                      />
                      <Answer
                          className={
                          'flex items-center w-full bg-blue-600 p-32 justify-between rounded cursor-pointer scale duration-100 hover:scale-105'
                          }
                          name='fourthButton'
                          onClick={() => { sendAnswer(3) }}
                          icon='diamond'
                      />
                    </div>
                  </>
              )}
              {isQuestionAnswered && (
                <>
                  <h1 className="text-5xl font-mono text-white pb-5">Esperando resultados...</h1>
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
                  <h1 className={`${correctAnswer ? 'text-green-500' : 'text-red-500'} font-mono text-7xl`}>
                    { correctAnswer ? '¡Respuesta correcta!' : '¡Respuesta incorrecta!' }
                  </h1>
                  <h2 className='text-white font-mono text-4xl mt-10'>Puntaje ganado: {totalScore} {totalScore === 1 ? 'punto' : 'puntos'}.</h2>
                </div>
              )}
          </div>
        </>
  )
}
