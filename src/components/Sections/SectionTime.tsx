import { Input } from '../UI'

interface Props {
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  timeForQuestion: number
}

export const SectionTime = ({ handleTimeChange, timeForQuestion }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3 mt-5 xl:flex-row">
      <label className='text-white font-bold tracking-tight'>Tiempo para responder:</label>
      <Input
        type="number"
        name='answer4'
        onChange={handleTimeChange }
        value={ timeForQuestion }
        className='outline-0 font-bold tracking-tight shadow w-20 bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100 pr-1'
        placeholder='En segundos...'
      />
      <label className='text-white font-bold tracking-tight'>60s (max)</label>
    </div>
  )
}
