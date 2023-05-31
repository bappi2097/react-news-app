import React from "react"
import fetchAPI from "../../utils/fetch"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { useGlobalContext } from "../../context/GlobalContext"

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = React.useState({ email: [], password: [] })
  const { setLoader } = useGlobalContext()
  /**
   * handleSubmit
   * @param {React.FormEvent} e
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)
    fetchAPI("api/login/", { method: "POST", body: formData })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.errors) {
          setErrors(response.errors)
        }
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        console.log(error)
      })
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

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
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
            link={{
              label: "Forget password?",
              url: "/",
            }}
            errors={errors.password}
          />

          <div>
            <Button type='submit'>Sign in</Button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?
          <a
            href='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
