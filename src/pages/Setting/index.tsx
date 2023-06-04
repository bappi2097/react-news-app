import { useEffect, useState } from "react"
import fetchAPI from "../../utils/fetch"
import { ErrorType, UserType } from "../../utils/types"
import { useGlobalContext } from "../../context/GlobalContext"
import useAuthContext from "../../hooks/useAuthContext"
import Button from "../../components/Button"
import { initialUserSetting } from "../../utils/defaults"
import TextField from "../../components/TextField"
import Sources from "../../components/Sources"

const Setting: React.FC = () => {
  const { setLoader, toast } = useGlobalContext()
  const { token, user, setUser } = useAuthContext()
  const [formData, setFormData] = useState<UserType>(initialUserSetting)
  const [errors, setErrors] = useState<ErrorType<UserType>>({
    email: [],
    firstName: [],
    lastName: [],
  })

  const savePreferences = () => {
    setLoader(true)
    fetchAPI(
      "api/user/",
      {
        method: "PUT",
        body: { ...formData },
      },
      token
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          toast(response.message)
        }
        if (response.user) {
          setUser(response.user)
        }
        if (response.error) {
          toast(response.error, "danger")
        }
        if (response.errors) {
          setErrors(response.errors)
        }
      })
      .catch(console.log)
      .finally(() => setLoader(false))
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
    if (user) {
      setFormData(user)
    }
  }, [user])

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-2'>
      <div className='text-2xl my-2'>Update Profile</div>
      <div className='bg-gray-50 rounded-md p-4'>
        <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
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
        </div>
        <TextField
          name='email'
          label='Email Address'
          id='email'
          required
          value={formData.email}
          onChange={handleChange}
          errors={errors.email}
        />
      </div>
      <div className='text-2xl my-2'>Active News Source</div>
      <div className='bg-gray-50 rounded-md p-4'>
        <Sources
          preferences={formData.preferences}
          onChange={(param) => {
            setFormData((prev) => ({ ...prev, preferences: param }))
          }}
        />
      </div>

      <div className='mt-6'>
        <Button
          className='w-[140px] ml-auto'
          type='submit'
          onClick={savePreferences}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default Setting
