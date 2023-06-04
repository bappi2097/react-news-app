import React, { useEffect } from "react"
import fetchAPI from "../../utils/fetch"
import Button from "../../components/Button"
import { ErrorType } from "../../utils/types"
import { useNavigate } from "react-router-dom"
import TextField from "../../components/TextField"
import useAuthContext from "../../hooks/useAuthContext"
import { useGlobalContext } from "../../context/GlobalContext"

type LoginType = {
  email: string
  password: string
}

const Login = () => {
  const [formData, setFormData] = React.useState<LoginType>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = React.useState<ErrorType<LoginType>>({
    email: [],
    password: [],
  })
  const { setLoader, toast } = useGlobalContext()
  const { token, setToken, setUser } = useAuthContext()
  const navigate = useNavigate()

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
        if (response.errors) {
          toast(response.message, "danger")
          setErrors(response.errors)
        } else if (response.type === "error") {
          toast(response.message, "danger")
        } else {
          setUser(response.user)
          setToken(response.token)
          navigate("/")
          toast(response.message)
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

  useEffect(() => {
    if (token) {
      navigate("/home")
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
