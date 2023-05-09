import { CreatePage, JoinGame, Home, AuthLogin, AuthRegister, ListGames, HostScreen, PlayerScreen } from '../components'

type JSXComponent = () => JSX.Element

interface Route {
  path: string
  Component: JSXComponent
}

export const routes: Route[] = [
  {
    path: '/',
    Component: Home
  },
  {
    path: '/create',
    Component: CreatePage
  },
  {
    path: '/join',
    Component: JoinGame
  },
  {
    path: '/login',
    Component: AuthLogin
  },
  {
    path: '/register',
    Component: AuthRegister
  },
  {
    path: '/list',
    Component: ListGames
  },
  {
    path: '/HostScreen/:gameId',
    Component: HostScreen
  },
  {
    path: '/playerScreen',
    Component: PlayerScreen
  }
  // {
  //   path: '/Loadboard', // Aqui hay que mandar un id
  //   Component: Loadboard
  // }
]
