import { NavLink } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'

export const Navbar = () => {
  const [userName, setUserName] = useState(localStorage.getItem('name'))

  return (
        <nav className='absolute top-4 w-3/4 flex justify-between items-center h-12 bg-zinc-800 text-white shadow-sm font-mono rounded pl-6 pr-6' role='navigation'>
            {
                userName && (
                  <div className='flex gap-2 items-center'>
                    <FaUserCircle />
                    <p>{userName}</p>
                    <p className='text-xs'>🟢</p>
                  </div>
                )
            }
            <div className='flex gap-6 justify-center'>
                <NavLink to='/create' className='scale duration-100 hover:scale-110'>Crear partida</NavLink>
                <NavLink to='/list' className='scale duration-100 hover:scale-110'>Lista de partidas creadas</NavLink>
            </div>
            {
              userName
                ? (
                  <p
                    onClick={ () => {
                      localStorage.removeItem('name')
                      setUserName('')
                    }}
                    className='scale duration-100 hover:scale-110 hover:cursor-pointer'
                  >
                    Cerrar sesión
                  </p>
                  )

                : (
                <NavLink
                  to='/login'
                  className='scale duration-100 hover:scale-110 hover:cursor-pointer'
                >
                  Iniciar sección
                </NavLink>
                  )
            }
        </nav>
  )
}
