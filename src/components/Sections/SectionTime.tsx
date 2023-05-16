import { Input } from '../UI'

interface Props {
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void
  timeForQuestion: number
}

export const SectionTime = ({ onChangeTime, timeForQuestion }: Props) => {
  return (
    <div className="flex items-center gap-3 mt-5">
      <label className='text-white font-bold tracking-tight'>Tiempo para responder:</label>
      <Input
        type="number"
        name='answer4'
        onChange={onChangeTime}
        value={ timeForQuestion }
        className='outline-0 font-bold tracking-tight shadow w-20 bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 focus:shadow-zinc-500 ease-in duration-100 pr-1'
        placeholder='En segundos...'
      />
      <label className='text-white font-bold tracking-tight'>60s (max)</label>
    </div>
  )
}
