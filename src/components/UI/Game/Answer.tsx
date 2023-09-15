import { Circle, Diamond, Square, Triangle } from '../../../icons'
import { type MouseEvent } from 'react'

type IconType = 'circle' | 'square' | 'triangle' | 'diamond'

interface Props {
  name: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  Text?: string
  Disabled?: boolean
  className: string
  icon: IconType
}

export const Answer = ({ onClick, Text, name, Disabled, className, icon }: Props) => {
  const iconComponent = {
    circle: <Circle className='w-10 md:w-12 lg:w-14 xl:w-16' />,
    square: <Square className='w-10 md:w-12 lg:w-14 xl:w-16' />,
    triangle: <Triangle className='w-10 md:w-12 lg:w-14 xl:w-16' />,
    diamond: <Diamond className='w-10 md:w-12 lg:w-14 xl:w-16' />
  }

  return (
        <button
            className={className}
            name={name}
            onClick={onClick}
            disabled={Disabled}
        >
            {iconComponent[icon]}
            {
              Text && (
                <p className='text-white text-2xl font-bold tracking-tight'>{Text}</p>
              )
            }
        </button>
  )
}
