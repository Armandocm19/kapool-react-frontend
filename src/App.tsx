import kapool from './assets/kapool-removebg.png'
import './App.css'

function App () {
  return (
    <main className="grid h-screen place-items-center w-full">
      <section className='flex justify-center w-6/12 '>
        <div className="flex items-center flex-col">
          <img src={kapool} />
          <button className='w-72 font-mono scale bg-blue-700 p-2 text-white font-bold rounded mt-5 ease-in duration-100 hover:scale-110'
            >Crear partida
          </button>
          <button className='w-72 font-mono scale bg-blue-700 p-2 text-white font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
            >Ingresar a partida con código
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
