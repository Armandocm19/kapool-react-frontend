import { Formik, Form } from 'formik'
import { InitialValuesLogin, yupObjectLogin } from '../services'
import { Boton, InputForm } from './UI'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser } from '../api'

export const AuthLogin = () => {
  const navigate = useNavigate()

  return (
        <div className="w-screen flex justify-center flex-col items-center">
            <Formik
                initialValues={ InitialValuesLogin }
                onSubmit={ async (values) => {
                  const response = await loginUser(values)
                  if (response.ok) {
                    navigate('/')
                  }
                } }
                validationSchema={ yupObjectLogin }
            >
            {
                (formik) => (
                    <Form noValidate className='flex flex-col justify-center w-6/12 items-center'>
                        <h1 className='text-5xl font-bold tracking-tight text-white'>Inicia sesión</h1>
                        <InputForm
                            type='text'
                            name='username'
                            className='outline-0 font-bold tracking-tight shadow w-6/12 bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4
                            text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100'
                            placeholder='Nombre de usuario'
                        />
                        <InputForm
                            type='password'
                            name='password'
                            className='outline-0 font-bold tracking-tight shadow w-6/12 bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4
                            text-zinc-500 mt-5 focus:shadow-zinc-500 ease-in duration-100'
                            placeholder='Contraseña'
                        />

                        <Boton
                            type='submit'
                            message='Ingresar'
                            className='w-72 font-bold tracking-tight scale bg-[#EF8354] p-2 text-[#242634] rounded mt-4 ease-in duration-100 hover:scale-110'
                        />
                    </Form>
                )
            }
            </Formik>
            <div className="flex justify-center items-center mt-5 flex-col">
                <p className="text-white font-bold tracking-tight">¿No tienes cuenta?</p>
                <NavLink to="/register" className="text-blue-700 font-bold tracking-tight underline">Create una</NavLink>
            </div>
        </div>
  )
}
