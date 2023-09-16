import { useNavigate } from 'react-router-dom'
import { useGame, useValues } from '../hooks'

import Swal from 'sweetalert2'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { Boton } from './UI'
import { Answer } from './UI/Game'

import { SectionAnswers, SectionQuestions, SectionTime } from './Sections'
import { ImageToGame } from './Sections/Game'
import { ArrowLeft } from '../icons'
import { validationQuestionData } from '../utils'
import { toast } from 'sonner'

export const CreatePage = () => {
  const {
    handleTimeChange, handleNextQuestion,
    handleInputChange, handleCheckboxChange, inputsValue,
    selectedCheckboxAnswers, timeForQuestion, selectedImage,
    fileInputRef, handleFileSelection, handleImageRemoval,
    handlePreviousQuestion, handleSaveGame
  } = useValues()

  const { currentQuestionNumber, changeNumberQuestion } = useGame()

  const navigate = useNavigate()

  const backToMain = () => {
    Swal.fire({
      title: '¿Estás seguro de volver al menu principal?',
      text: 'Si continuas, perderás todo lo hecho hasta el momento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, volver!'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
        changeNumberQuestion(-(currentQuestionNumber - 1))
      }
    })
  }

  const onCompleteQuestion = () => {
    const isValidateInputs = validationQuestionData(inputsValue, selectedCheckboxAnswers, timeForQuestion)
    if (isValidateInputs.isAllEmpty) {
      toast.error('Debes llenar los campos')
      return
    }
    if (!isValidateInputs.isValid) {
      toast.error(isValidateInputs.message)
      return
    }

    handleNextQuestion(currentQuestionNumber)
  }

  return (
      <>
        {
          currentQuestionNumber > 1 && (
            <Boton
              onClick={handleSaveGame }
              className='absolute top-0 right-0 w-64 font-bold tracking-tight scale bg-yellow-600 p-2 text-white rounded mt-4 mr-6 ease-in z-10
              duration-100 hover:scale-110'
              message='Guardar juego'
            />
          )
        }

        <section className='h-full w-[30%] absolute flex justify-center left-0 bg-blur'>
          <Tippy content="Volver al menú principal" placement="bottom">
            <button onClick={backToMain} className='absolute w-auto h-4 flex justify-center items-center left-5 top-5'>
              <ArrowLeft styles='text-[#EF8354]' />
            </button>
          </Tippy>
          <form className='flex flex-col justify-center items-center w-11/12' noValidate autoComplete='off'>
            <SectionQuestions
              questionNumberState={currentQuestionNumber }
              onchangeData={handleInputChange }
              question={inputsValue.question}
              handleFileSelection ={handleFileSelection }
              fileInputRef={fileInputRef}
              selectedImage={selectedImage}
              handleImageRemoval ={handleImageRemoval}
            />

            <SectionAnswers
              onChangeData={handleInputChange }
              handleCheckboxChange ={handleCheckboxChange }
              selectedCheckboxAnswers={selectedCheckboxAnswers}
              inputsValue={inputsValue}
            />

            <SectionTime
              handleTimeChange ={handleTimeChange }
              timeForQuestion={timeForQuestion}
            />

            <div className='flex gap-5 mt-7'>
              {
                currentQuestionNumber !== 1 && (
                    <Boton
                      className='w-auto scale bg-[#f8f8f8] text-[#242634] px-4 py-2 font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                      message='Anterior pregunta'
                      onClick={() => { handlePreviousQuestion(currentQuestionNumber - 1) }}
                    />
                )
              }
                <Boton
                  className='w-auto scale bg-[#EF8354] text-[#242634] px-4 py-2  font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                  message='Completar pregunta'
                  onClick={() => { onCompleteQuestion() }}
                  />
            </div>

          </form>
        </section>

        <section className='absolute right-0 h-full w-[70%] flex flex-col justify-center items-center z-0 gap-8 px-10'>
          <h1 className='text-5xl text-white font-bold tracking-tight text-justify'>{inputsValue.question ? inputsValue.question : 'Tu pregunta...'}</h1>
          {
            selectedImage && (
              <ImageToGame styles='w-[18rem] max-w-[20rem]' url={selectedImage.url} />
            )
          }
          <div className='relative w-20 border border-white h-20 rounded-full flex items-center justify-center'>
            <h1 className='text-white font-bold text-4xl'>{timeForQuestion}</h1>
          </div>
          <div className="w-[80%] grid grid-cols-2 gap-10">
            <div className='relative flex flex-col gap-7'>
              <Answer
                className={
                `flex items-center w-full bg-red-600 font-bold
                px-10 py-5 justify-between rounded scale duration-100 ${selectedCheckboxAnswers.answer1 && 'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'}`
                }
                name='firstButton'
                icon='circle'
                Disabled={true}
                Text={inputsValue?.answer1 ? inputsValue?.answer1 : ''}
              />
              <Answer
                className={
                `flex items-center w-full bg-violet-600 font-bold
                px-10 py-5 justify-between rounded scale duration-100 ${selectedCheckboxAnswers.answer2 && 'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'}`
                }
                name='firstButton'
                icon='triangle'
                Disabled={true}
                Text={inputsValue?.answer2 ? inputsValue?.answer2 : ''}
              />
            </div>

            <div className='relative flex flex-col gap-7'>
              <Answer
                className={
                `flex items-center w-full bg-yellow-600 font-bold
                px-10 py-5 justify-between rounded scale duration-100 ${selectedCheckboxAnswers.answer3 && 'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'}`
                }
                name='firstButton'
                icon='square'
                Disabled={true}
                Text={inputsValue?.answer3 ? inputsValue?.answer3 : ''}
              />
              <Answer
                className={
                `flex items-center w-full bg-blue-600 font-bold
                px-10 py-5 justify-between rounded scale duration-100 ${selectedCheckboxAnswers.answer4 && 'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'}`
                }
                name='firstButton'
                icon='diamond'
                Disabled={true}
                Text={inputsValue?.answer4 ? inputsValue?.answer4 : ''}
              />
            </div>
          </div>
        </section>
      </>
  )
}
