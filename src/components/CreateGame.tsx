import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame, useValues } from '../hooks'

import Swal from 'sweetalert2'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { Boton, BurgerButton } from './UI'
import { Answer } from './UI/Game'

import { SectionAnswers, SectionQuestions, SectionTime } from './Sections'
import { ImageToGame } from './Sections/Game'
import { ArrowLeft } from '../icons'
import { validationQuestionData } from '../utils'
import { toast } from 'sonner'

export const CreatePage = () => {
  const {
    handleTimeChange,
    handleNextQuestion,
    handleInputChange,
    handleCheckboxChange,
    inputsValue,
    selectedCheckboxAnswers,
    timeForQuestion,
    selectedImage,
    fileInputRef,
    handleFileSelection,
    handleImageRemoval,
    handlePreviousQuestion,
    handleSaveGame
  } = useValues()

  const { currentQuestionNumber, changeNumberQuestion } = useGame()
  const [toggleUI, setToggleUI] = useState(false)

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
    const isValidateInputs = validationQuestionData(
      inputsValue,
      selectedCheckboxAnswers,
      timeForQuestion
    )
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

  const handleToggleUI = () => {
    setToggleUI(!toggleUI)
  }

  return (
    <div className='relative w-screen h-full'>
      {currentQuestionNumber > 1 && (
        <Boton
          onClick={handleSaveGame}
          className="absolute top-0 right-0 w-64 font-bold tracking-tight scale bg-yellow-600 p-2 text-white rounded mt-4 mr-6 ease-in z-10
              duration-100 hover:scale-110"
          message="Guardar juego"
        />
      )}

      <section className={`z-10 h-full w-full flex-col justify-center items-center pt-5 absolute ${toggleUI ? 'flex' : 'hidden'} pb-7 left-0 bg-blur 
      xl:flex xl:flex-col xl:justify-center xl:items-center xl:w-[30%] xl:p-0`}>
        <div className='w-[80%] flex items-center justify-between'>
          <Tippy content="Volver al menú principal" placement="bottom">
            <button
              onClick={backToMain}
              className="w-auto h-4 flex justify-center items-center"
            >
              <ArrowLeft styles="text-[#EF8354]" />
            </button>
          </Tippy>
          <BurgerButton styles={`flex items-center p-2 w-10 h-10 ${toggleUI ? 'flex' : 'hidden'} justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
            focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-zinc-900 dark:focus:ring-gray-600`}
            onClick={handleToggleUI}
          />
        </div>
        <form
          className="flex flex-col justify-center items-center overflow-y-auto pt-10 w-full"
          noValidate
          autoComplete="off"
        >
          <SectionQuestions
            questionNumberState={currentQuestionNumber}
            onchangeData={handleInputChange}
            question={inputsValue.question}
            handleFileSelection={handleFileSelection}
            fileInputRef={fileInputRef}
            selectedImage={selectedImage}
            handleImageRemoval={handleImageRemoval}
          />

          <SectionAnswers
            onChangeData={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            selectedCheckboxAnswers={selectedCheckboxAnswers}
            inputsValue={inputsValue}
          />

          <SectionTime
            handleTimeChange={handleTimeChange}
            timeForQuestion={timeForQuestion}
          />

          <div className="flex flex-col gap-5 mt-7 xl:flex-row">
            {currentQuestionNumber !== 1 && (
              <Boton
                className="w-auto scale bg-[#f8f8f8] text-[#242634] px-4 py-2 font-bold rounded mt-0 ease-in duration-100 hover:scale-110 xl:mt-4"
                message="Anterior pregunta"
                onClick={() => {
                  handlePreviousQuestion(currentQuestionNumber - 1)
                }}
              />
            )}
            <Boton
              className="w-auto scale bg-[#EF8354] text-[#242634] px-4 py-2  font-bold rounded mt-0 ease-in duration-100 hover:scale-110 xl:mt-4"
              message="Completar pregunta"
              onClick={() => {
                onCompleteQuestion()
              }}
            />
          </div>
        </form>
      </section>

      <section className="absolute z-0 right-0 h-full w-full flex flex-col justify-center items-center gap-8 px-0 xl:w-[70%] xl:z-10">
        <BurgerButton styles={`absolute top-5 left-5 items-center ${toggleUI ? 'hidden' : 'flex'} p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2
            focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-zinc-900 dark:focus:ring-gray-600 xl:hidden`}
            onClick={handleToggleUI}
        />
        <h1 className="text-2xl text-white px-5 font-bold tracking-tight md:text-3xl lg:text-5xl lg:text-justify lg:px-0">
          {inputsValue.question ? inputsValue.question : 'Tu pregunta...'}
        </h1>
        {selectedImage && (
          <ImageToGame
            styles="w-[18rem] max-w-[20rem]"
            url={selectedImage.url}
          />
        )}
        <div className="relative w-14 border border-white h-14 rounded-full flex items-center justify-center lg:w-20 lg:h-20">
          <h1 className="text-white font-bold text-2xl lg:text-4xl">{timeForQuestion}</h1>
        </div>
        <div className="w-[95%] grid grid-cols-1 gap-10 xl:w-[80%] md:grid-cols-2">
          <div className="relative flex flex-col gap-7">
            <Answer
              className={`flex items-center w-full bg-red-600 font-bold
                px-2 py-5 justify-between rounded scale duration-100 ${
                  selectedCheckboxAnswers.answer1 &&
                  'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'
                } xl:px-10`}
              name="firstButton"
              icon="circle"
              Disabled={true}
              Text={inputsValue?.answer1 ? inputsValue?.answer1 : ''}
            />
            <Answer
              className={`flex items-center w-full bg-violet-600 font-bold
                px-2 py-5 justify-between rounded scale duration-100 ${
                  selectedCheckboxAnswers.answer2 &&
                  'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'
                } xl:px-10`}
              name="firstButton"
              icon="triangle"
              Disabled={true}
              Text={inputsValue?.answer2 ? inputsValue?.answer2 : ''}
            />
          </div>

          <div className="relative flex flex-col gap-7">
            <Answer
              className={`flex items-center w-full bg-yellow-600 font-bold
                px-2 py-5 justify-between rounded scale duration-100 ${
                  selectedCheckboxAnswers.answer3 &&
                  'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'
                } xl:px-10`}
              name="firstButton"
              icon="square"
              Disabled={true}
              Text={inputsValue?.answer3 ? inputsValue?.answer3 : ''}
            />
            <Answer
              className={`flex items-center w-full bg-blue-600 font-bold
                px-2 py-5 justify-between rounded scale duration-100 ${
                  selectedCheckboxAnswers.answer4 &&
                  'scale-105 border-4 border-green-600 shadow-lg shadow-green-600'
                } xl:px-10`}
              name="firstButton"
              icon="diamond"
              Disabled={true}
              Text={inputsValue?.answer4 ? inputsValue?.answer4 : ''}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
