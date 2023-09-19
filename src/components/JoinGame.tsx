import { BackTo, Boton, Input } from './UI'
import { useJoinGame } from '../hooks'

export const JoinGame = () => {
  const {
    showWaitingScreen, dataFromServer, codeValue,
    error, handleSubmit, handleInputChange
  } = useJoinGame()

  return (
        <form className='flex justify-center w-full lg:w-6/12' onSubmit={handleSubmit}>
           <BackTo text='Volver al menú principal' to='/' />
        {
          !showWaitingScreen
            ? (
            <div className="flex items-center flex-col">
            <h1 className='text-white font-bold tracking-tight text-2xl md:text-3xl lg:text-5xl'>{!dataFromServer.code ? 'Ingresa el código' : 'Ingresa tu nombre'}</h1>
            <Input
                className='outline-0 w-64 font-bold tracking-tight shadow bg-zinc-800 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100'
                type='text'
                onChange={handleInputChange }
                value={!dataFromServer.code ? codeValue.code : codeValue.name}
                name={!dataFromServer.code ? 'code' : 'name'}
                placeholder={!dataFromServer.code ? 'A9J3B3...' : 'John...'}
            />
            <Boton
                className='w-72 scale bg-[#EF8354] p-2 text-[#242634] font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                message='Ingresar'
                type='submit'
            />

            {
                error.errorValue && (
                    <div className="bg-red-600 p-3 rounded mt-5">
                        <h2 className='text-center text-white text-xl font-bold tracking-tight'>¡Oh no! :(</h2>
                        <h3 className='text-center text-white font-bold tracking-tight'>{ error.message }</h3>
                    </div>
                )
            }
        </div>
              )
            : (
            <div className="flex items-center flex-col">
              <h1 className='text-white font-bold tracking-tight text-xl md:text-3xl lg:text-5xl'>Esperando a que el juego inicie...</h1>
            </div>
              )
        }
      </form>
  )
}
