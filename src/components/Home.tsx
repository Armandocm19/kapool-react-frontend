import kapool from '../assets/kapool-removebg.png'
import { NavLink } from 'react-router-dom'
import { Boton, Navbar } from './UI'

export const Home = () => {
  return (
        <>
          <Navbar />
          <section className='flex justify-center w-6/12 '>
          <div className="flex items-center flex-col">
            <img src={kapool} />
            {/* <NavLink to='/create'>
              <Boton type='button' message='Crear partida'/>
            </NavLink>
            <NavLink to='/join'>
              <Boton type='button' message='Ingresar a partida con codigo'/>
            </NavLink> */}
            <NavLink to='/join'>
              <button className='w-72 font-mono scale bg-blue-700 p-2 text-white font-bold rounded mt-8 ease-in duration-100 hover:scale-110'
               >Ingresar a partida con código
              </button>
            </NavLink>
          </div>
          </section>
        </>
  )
}
