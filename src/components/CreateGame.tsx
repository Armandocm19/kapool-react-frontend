import { Boton } from './UI'
import { useValues } from '../hooks'
import { SectionAnswers, SectionQuestions, SectionTime } from './Sections'

export const CreatePage = () => {
  const {
    onChangeTime, onNextQuestion,
    onSavedGame, onChangeData,
    onChangeCheckbox, inputsValue,
    checkboxAnswers, questionNumberState,
    timeForQuestion
  } = useValues()

  return (
      <>
        {
          questionNumberState > 1 && (
            <Boton
              onClick={onSavedGame}
              className='absolute top-0 right-0 w-64 font-mono scale bg-yellow-600 p-2 text-white font-bold rounded mt-4 mr-6 ease-in duration-100 hover:scale-110'
              message='Guardar juego'
            />
          )
        }
        <form className='flex flex-col items-center w-11/12' noValidate autoComplete='off'>
          <SectionQuestions
            questionNumberState={questionNumberState}
            onchangeData={onChangeData}
            question={inputsValue.question}
          />

          <SectionAnswers
            onChangeData={onChangeData}
            onChangeCheckbox={onChangeCheckbox}
            checkboxAnswers={checkboxAnswers}
            inputsValue={inputsValue}
          />

          <SectionTime
            onChangeTime={onChangeTime}
            timeForQuestion={timeForQuestion}
          />

          <div className='flex gap-5 mt-7'>
            <div onClick={onNextQuestion}>
              <Boton
                className='w-72 scale bg-[#EF8354] text-[#242634] p-2  font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                message='Siguiente pregunta'
                value={+1}
                />
            </div>
          </div>

        </form>
      </>
  )
}
