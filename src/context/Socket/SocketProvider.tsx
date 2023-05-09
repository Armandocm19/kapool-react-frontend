import { type FC, useState } from 'react'
import { SocketContext } from './'
import { io } from 'socket.io-client'
import { getGame } from '../../api'

// export interface IGameData {
//   quizId: string
//   isLive: boolean
//   hostId: string
// }

interface Props {
  children: JSX.Element | JSX.Element[]
}

const socket = io('http://localhost:9000')

export const SocketProvider: FC<Props> = ({ children }) => {
  const [hostId, setHostId] = useState('')

  const initializeSocket = async (hostId: string) => {
    const game = await getGame(hostId)
    const gameBD = game?.gameBD

    const gameData = {
      _id: gameBD._id,
      quizId: gameBD.quizId,
      isLive: gameBD.isLive,
      hostId: gameBD.hostId
    }
    const leaderboard = { gameId: gameBD._id, playerResultList: [] }
    setHostId(gameBD.hostId)
    socket.emit('init-game', gameData, leaderboard)
  }

  return (
       < SocketContext.Provider value={{
         socket,
         hostId,
         initializeSocket
       }}>
          { children }
        </ SocketContext.Provider>
  )
}
