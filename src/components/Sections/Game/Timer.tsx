interface Props {
  time: number
}

export function Timer ({ time }: Props) {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <h1 className="text-white font-bold text-8xl">{time === 0 ? 5 : time}</h1>
    </div>
  )
}
