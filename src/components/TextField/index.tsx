import React from "react"
import { Link } from "../../utils/types"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClassName?: string
  errors?: string[]
  link?: Link
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  className,
  labelClassName,
  errors = [],
  link,
  ...props
}) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <label
          htmlFor={props.id}
          className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName}`}
        >
          {label}
        </label>
        {link && (
          <div className='text-sm'>
            <a
              href={link.url}
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              {link.label}
            </a>
          </div>
        )}
      </div>
      <div className='mt-2'>
        <input
          className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ${
            errors.length > 0 ? "ring-red-300" : "ring-gray-300"
          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:${
            errors.length > 0 ? "ring-red-600" : "ring-indigo-600"
          } sm:text-sm sm:leading-6 ${className}`}
          {...props}
        />
      </div>
      {errors.map((error, i) => (
        <span
          key={i}
          className='mt-1 px-1 block text-xs font-medium text-red-500'
        >
          {error}
        </span>
      ))}
    </div>
  )
}

export default TextField
