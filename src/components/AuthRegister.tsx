import { Formik, Form } from 'formik'
import { InitialValuesRegister, yupObjectRegister } from '../services'
import { Boton, InputForm } from './UI'
import { NavLink, useNavigate } from 'react-router-dom'
import { saveUser } from '../api'

export const AuthRegister = () => {
  const navigate = useNavigate()

  return (
        <div className="w-screen flex justify-center flex-col items-center">
            <Formik
                initialValues={ InitialValuesRegister }
                onSubmit={ async (values) => {
                  const response = await saveUser(values)
                  if (response.ok) {
                    navigate('/')
                  }
                } }
                validationSchema={ yupObjectRegister }
            >
            {
                ({ handleReset, values, errors, setErrors }) => (
                    <Form noValidate className='flex flex-col justify-center w-full items-center md:w-6/12'>
                        <h1 className='text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-5xl'>Create una cuenta</h1>
                        <InputForm
                            type='text'
                            name='username'
                            className='outline-0 font-bold tracking-tight shadow w-[80%] bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4
                            text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100 lg:w-6/12'
                            placeholder='Nombre de usuario'
                        />
                        <InputForm
                            type='email'
                            name='email'
                            className='outline-0 font-bold tracking-tight shadow w-[80%] bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4
                            text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100 lg:w-6/12'
                            placeholder='Correo electrónico'
                        />
                        <InputForm
                            type='password'
                            name='password'
                            className='outline-0 font-bold tracking-tight shadow w-[80%] bg-[#4F5D75]/30 h-10 rounded placeholder:text-zinc-500 pl-4
                            text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100 lg:w-6/12'
                            placeholder='Contraseña'
                        />

                        <Boton
                            type='submit'
                            message='Registrar cuenta'
                            className='w-60 font-bold tracking-tight scale bg-[#EF8354] p-2 text-[#242634] rounded mt-4 ease-in duration-100 hover:scale-110 lg:w-72'
                        />
                    </Form>
                )
            }
            </Formik>
            <div className="flex justify-center items-center mt-5 flex-col">
                <p className="text-white font-bold tracking-tight">¿Ya tienes cuenta?</p>
                <NavLink to="/login" className="text-blue-700 font-bold tracking-tight underline">Inicia sección</NavLink>
            </div>
        </div>
  )
}
