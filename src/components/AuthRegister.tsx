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
                    <Form noValidate className='flex flex-col justify-center w-6/12 items-center'>
                        <h1 className='text-5xl font-mono text-white'>Create una cuenta</h1>
                        <InputForm
                            type='text'
                            name='username'
                            className='outline-0 shadow w-6/12 bg-zinc-800 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-8 focus:shadow-zinc-500 ease-in duration-100'
                            placeholder='Nombre de usuario'
                        />
                        <InputForm
                            type='email'
                            name='email'
                            className='outline-0 shadow w-6/12 bg-zinc-800 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-5 focus:shadow-zinc-500 ease-in duration-100'
                            placeholder='Correo electrónico'
                        />
                        <InputForm
                            type='text'
                            name='password'
                            className='outline-0 shadow w-6/12 bg-zinc-800 h-10 rounded placeholder:text-zinc-500 pl-4 text-zinc-500 mt-5 focus:shadow-zinc-500 ease-in duration-100'
                            placeholder='Contraseña'
                        />

                        <Boton
                            type='submit'
                            message='Registrar cuenta'
                            className='w-72 font-mono scale bg-blue-700 p-2 text-white font-bold rounded mt-4 ease-in duration-100 hover:scale-110'
                        />
                    </Form>
                )
            }
            </Formik>
            <div className="flex justify-center items-center mt-5 flex-col">
                <p className="text-white">¿Ya tienes cuenta?</p>
                <NavLink to="/login" className="text-blue-700">Inicia sección</NavLink>
            </div>
        </div>
  )
}
