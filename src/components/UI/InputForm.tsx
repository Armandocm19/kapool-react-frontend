import { ErrorMessage, useField } from 'formik'

interface Props {
  className: string
  type?: 'text' | 'email' | 'password'
  placeholder: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const InputForm = ({ onChange, ...props }: Props) => {
  const [field] = useField(props)
  // const { type, name, value, placeholder } = props

  return (
        <>

            {/* <Input { ...field } { ...props } onChange={onChange} /> */}
            <input { ...field } { ...props } />
            <ErrorMessage name={ props.name } component='span' className='text-red-600' />

        </>
  )
}
