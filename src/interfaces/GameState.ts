
export interface IGame {
  _id?: string
  owner: string
  quizId: string
  hostId: string
  playerList?: player[]
  playerResultList?: string[]
  isLive: boolean
}

interface player {
  name: string
}

export interface IPlayer {
  id: string
  socketId: string
}
