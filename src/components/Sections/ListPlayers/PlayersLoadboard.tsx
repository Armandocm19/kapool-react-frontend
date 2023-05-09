import { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../../context/Socket'
import { UserIcon } from '../../../icons'
import { Ring } from '@uiball/loaders'

interface IPlayer {
  id: string
  socketId: string
}

interface Props {
  username: string
  score: number
}

export function PlayersLoadboard ({ username, score }: Props) {
  return (
    <>
        <div>
            <div className="flex flex-col justify-center items-center">
                <UserIcon />
                <p className='text-xl font-mono text-white'>{username}</p>
                <p className='text-xl font-mono text-white'>{score}</p>
            </div>
          </div>
    </>
  )
}
