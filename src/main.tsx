import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { routes } from './routes/routes'
import { QuizProvider } from './context/quiz'
import { SocketProvider } from './context/Socket'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <QuizProvider>
        <main className="relative grid h-screen place-items-center w-full">
          <RouterProvider router={router} />
        </main>
      </QuizProvider>
    </SocketProvider>
  </React.StrictMode>
)
