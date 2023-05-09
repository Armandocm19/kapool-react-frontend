import { type FieldInputProps } from 'formik'

interface Props {
  className?: string
  name: string
  field?: FieldInputProps<any>
  type?: 'text' | 'number' | 'checkbox' | 'email' | 'password'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  placeholder?: string
  checked?: boolean | undefined
}

export const Input = ({ checked, className, type, name, onChange, value, placeholder }: Props) => {
  return (
    type !== 'checkbox'
      ? (
            <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            className={className}
            placeholder={placeholder}
          />
        )
      : (
            <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            checked={checked}
            className={className}
            placeholder={placeholder}
          />
        )
  )
}
