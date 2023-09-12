import { type IInputsProps, type ICheckboxProps } from '../../interfaces'
import { Input } from '../UI'

interface Props {
  onChangeData: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputsValue: IInputsProps
  selectedCheckboxAnswers: ICheckboxProps
}

export const SectionAnswers = ({ onChangeData, handleCheckboxChange, inputsValue, selectedCheckboxAnswers }: Props) => {
  return (
        <>
          <h2 className='text-white text-2xl mt-8 font-bold tracking-tight'
          >Coloca tus 4 posibles respuestas
          </h2>
          <p className='text-zinc-500 font-bold tracking-tight'>La respuesta correcta debe ser marcada en la casilla</p>

          <div className="w-[80%] flex flex-col gap-7 mt-7">

            <div className="flex items-center gap-2">
              <Input
                type="text"
                name='answer1'
                onChange={onChangeData}
                value={
                  inputsValue.answer1
                }
                className='outline-0 font-bold tracking-tight shadow w-full bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100'
                placeholder='Escribe la posible respuesta...'
              />
              <Input
                type="checkbox"
                name='answer1'
                onChange={handleCheckboxChange }
                checked={selectedCheckboxAnswers.answer1}
                value={
                  inputsValue.answer1
                }
                className="w-4 h-4 font-bold cursor-pointer tracking-tight text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                />
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                name='answer3'
                onChange={onChangeData}
                value={
                  inputsValue.answer3
                }
                className='outline-0 font-bold tracking-tight shadow w-full bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100'
                placeholder='Escribe la posible respuesta...'
              />
              <Input
                type="checkbox"
                name='answer3'
                onChange={handleCheckboxChange }
                checked={selectedCheckboxAnswers.answer3}
                value={
                  inputsValue.answer3
                }
                className="w-4 h-4 font-bold cursor-pointer tracking-tight text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                />
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                name='answer2'
                onChange={onChangeData}
                value={
                  inputsValue.answer2
                }
                className='outline-0 font-bold tracking-tight shadow w-full bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100'
                placeholder='Escribe la posible respuesta...'
              />

              <Input
                type="checkbox"
                name='answer2'
                onChange={handleCheckboxChange }
                checked={selectedCheckboxAnswers.answer2}
                value={
                  inputsValue.answer2
                }
                className="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                />
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                name='answer4'
                onChange={onChangeData}
                value={
                  inputsValue.answer4
                }
                className='outline-0 font-bold tracking-tight shadow w-full bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100'
                placeholder='Escribe la posible respuesta...'
              />
              <Input
                type="checkbox"
                name='answer4'
                onChange={handleCheckboxChange }
                checked={selectedCheckboxAnswers.answer4}
                value={
                  inputsValue.answer4
                }
                className="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                />
            </div>
          </div>
        </>
  )
}
