import { NavLink } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'

export const Navbar = () => {
  const [userName, setUserName] = useState(localStorage.getItem('name'))
  const [isToggle, setIsToggle] = useState(false)

  return (
    <nav className="w-3/4 absolute top-4 bg-black/40 shadow-sm rounded">
      <div className="w-full flex flex-wrap gap-5 items-center justify-between mx-auto p-4 md:flex-nowrap">
        {userName && (
          <div className="flex gap-1 items-center font-bold md:gap-2">
            <FaUserCircle className="text-slate-50" />
            <p className="text-sm text-slate-50 md:text-base">{userName}</p>
            <p className="text-xs">🟢</p>
          </div>
        )}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => {
            setIsToggle(!isToggle)
          }}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-zinc-900 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${!isToggle && 'hidden'} w-full md:w-[80%] md:block`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-black/40 md:bg-transparent md:flex-row md:justify-evenly md:space-x-8 md:mt-0 md:border-0">
            <li>
              {userName && (
                <div className="block pl-0 md:flex md-pl-10 md:gap-7">
                  <NavLink
                    to="/create"
                    className="scale block py-2 pl-3 pr-4 duration-100 text-slate-50 hover:scale-110 text-sm lg:text-base md:p-0"
                  >
                    Crear partida
                  </NavLink>
                  <NavLink
                    to="/list"
                    className="scale block py-2 pl-3 pr-4 duration-100 text-slate-50 hover:scale-110 text-sm lg:text-base md:p-0"
                  >
                    Lista de partidas creadas
                  </NavLink>
                </div>
              )}
            </li>
            <li>
              {userName
                ? (
                <p
                  onClick={() => {
                    localStorage.removeItem('name')
                    setUserName('')
                  }}
                  className="scale block py-2 pl-3 pr-4 duration-100 text-slate-50 hover:scale-110 hover:cursor-pointer text-sm lg:text-base md:p-0"
                >
                  Cerrar sesión
                </p>
                  )
                : (
                <NavLink
                  to="/login"
                  className="flex hover:cursor-pointer font-bold tracking-tight"
                >
                  <span className="scale block py-2 pl-3 pr-4 duration-100 hover:scale-110 underline text-sm lg:text-base md:p-0">
                    Iniciar sesión
                  </span>{' '}
                  &nbsp; para crear una partida
                </NavLink>
                  )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
