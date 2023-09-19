import { Navbar, WelcomeTitle } from './UI'

export const Home = () => {
  return (
        <>
          <Navbar />
          <section className='flex justify-center w-full'>
          <div className="flex items-center flex-col">
            <WelcomeTitle />
          </div>
          </section>
        </>
  )
}
