import { createContext } from 'react'

interface ContextProps {
  socket: any
  hostId: string
  initializeSocket: (gameId: string) => Promise<void>
}

export const SocketContext = createContext({} as ContextProps)
