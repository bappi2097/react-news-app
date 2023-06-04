import React, { useEffect } from "react"
import fetchAPI from "../../utils/fetch"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { initialRegisterData } from "../../utils/defaults"
import { ErrorType, RegisterData } from "../../utils/types"
import useAuthContext from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext"

const Register = () => {
  const [formData, setFormData] =
    React.useState<RegisterData>(initialRegisterData)

  const [errors, setErrors] = React.useState<ErrorType<RegisterData>>({
    email: [],
    firstName: [],
    lastName: [],
    password: [],
  })
  const { token, setToken, setUser } = useAuthContext()
  const { toast } = useGlobalContext()
  const navigate = useNavigate()

  /**
   * handleSubmit
   * @param {React.FormEvent} e
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    fetchAPI("api/register/", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          setToken(response.token)
        }
        if (response.user) {
          setUser(response.user)
        }
        if (response.message) {
          toast(response.message)
        }
        if (response.errors) {
          setErrors(response.errors)
        }
      })
      .catch(console.log)
  }

  /**
   *
   * @param {React.FormEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({
      ...prev,
      [name]: [],
    }))
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Create your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
          <TextField
            name='firstName'
            label='First Name'
            id='firstName'
            required
            value={formData.firstName}
            onChange={handleChange}
            errors={errors.firstName}
          />
          <TextField
            name='lastName'
            label='Last Name'
            id='lastName'
            required
            value={formData.lastName}
            onChange={handleChange}
            errors={errors.lastName}
          />
          <TextField
            name='email'
            label='Email Address'
            id='email'
            required
            value={formData.email}
            onChange={handleChange}
            errors={errors.email}
          />

          <TextField
            name='password'
            label='Password'
            id='password'
            type='password'
            onChange={handleChange}
            required
            errors={errors.password}
          />
          <TextField
            name='password_confirmation'
            label='Password Confirmation'
            id='password_confirmation'
            type='password'
            required
            value={formData.password_confirmation}
            onChange={handleChange}
            errors={errors.password_confirmation}
          />

          <div>
            <Button type='submit'>Sign up</Button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Already Registered?
          <a
            href='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
