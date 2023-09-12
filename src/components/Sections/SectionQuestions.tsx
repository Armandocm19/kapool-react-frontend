import { Input } from '../UI'
import { RemoveIcon, UploadFileIcon } from '../../icons'

import { type ImageResponse } from '../../interfaces'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

interface Props {
  questionNumberState: number
  onchangeData: (e: React.ChangeEvent<HTMLInputElement>) => void
  question: string
  handleFileSelection: () => Promise<void>
  fileInputRef: React.RefObject<HTMLInputElement>
  selectedImage: ImageResponse | null
  handleImageRemoval: (event: React.FormEvent<Element>) => Promise<void>
}

export const SectionQuestions = ({ questionNumberState, onchangeData, question, handleFileSelection, fileInputRef, selectedImage, handleImageRemoval }: Props) => {
  return (
    <>
      <h1 className="text-white text-4xl font-bold tracking-tight">
        {`PREGUNTA NUMERO ${questionNumberState}`}
      </h1>
      {selectedImage
        ? (
        <div className="relative flex w-36 max-w-[10rem] mt-5">
          <picture>
            <img src={selectedImage.url} alt="imagen para la pregunta" />
          </picture>
          <Tippy content="Remover imagen" placement="top-start">
            <button className='absolute bottom-1 left-1' onClick={handleImageRemoval }>
              <RemoveIcon width='22' height='22' className='text-red-600 cursor-pointer' />
            </button>
          </Tippy>
        </div>
          )
        : (
        <label className="custum-file-upload bg-blur" htmlFor="file">
          <div className="icon">
            <UploadFileIcon />
          </div>
          <div className="text">
            <span>{'Inserta una imagen (opcional)'}</span>
          </div>
          <input
            id="file"
            ref={fileInputRef}
            type="file"
            accept="image/png, image/gif, image/jpg"
            onChange={handleFileSelection }
          />
        </label>
          )}

      <Input
        type="text"
        name="question"
        onChange={onchangeData}
        value={question}
        className="outline-0 font-bold tracking-tight shadow w-[80%] bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-5 focus:shadow-zinc-500 ease-in duration-100"
        placeholder="Escribe tu pregunta..."
      />
    </>
  )
}
