import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import fetchAPI from "../../utils/fetch"
import useAuthContext from "../../hooks/useAuthContext"
import { useGlobalContext } from "../../context/GlobalContext"

const Navbar: React.FC = () => {
  const { token, setToken, user } = useAuthContext()
  const [menuOpened, setMenuOpened] = useState(false)
  const { setLoader, toast } = useGlobalContext()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev)
  }

  const handleLogout = () => {
    setLoader(true)
    fetchAPI("api/logout/", { method: "POST" }, token)
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          toast(response.message, "danger")
        } else {
          setToken("")
          toast(response.message)
          navigate("/login")
        }
        setLoader(false)
      })
      .catch((error) => {
        setLoader(false)
        console.log(error)
      })
  }

  return (
    <nav className='bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <img
                className='h-8 w-8'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt='Your Company'
              />
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-black border-b-2 border-indigo-600"
                        : "text-gray-500 hover:border-b-2 hover:border-indigo-600 hover:text-black"
                    } px-3 py-2 text-sm font-medium`
                  }
                  aria-current='page'
                >
                  Home
                </NavLink>
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='flex max-w-xs items-center rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-100'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={toggleMenu}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </button>
                </div>
                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    menuOpened ? "" : "hidden"
                  }`}
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex={-1}
                >
                  <NavLink
                    to='/setting'
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-1'
                  >
                    Settings
                  </NavLink>
                  <button
                    className='block px-4 py-2 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-900 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={toggleMenu}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
              <svg
                className='hidden h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${menuOpened ? "" : "hidden"}`}
        id='mobile-menu'
      >
        <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
          <NavLink
            to='/'
            className='text-black block px-3 py-2 text-base font-medium border-b-2 border-indigo-600'
            aria-current='page'
          >
            Home
          </NavLink>
        </div>
        <div className='border-t border-gray-700 pb-3 pt-4'>
          <div className='flex items-center px-5'>
            <div className='flex-shrink-0'>
              <img
                className='h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium leading-none text-gray-600'>
                {user?.firstName} {user?.lastName}
              </div>
              <div className='text-sm font-medium leading-none text-gray-600'>
                {user?.email}
              </div>
            </div>
          </div>
          <div className='mt-3 space-y-1 px-2'>
            <NavLink
              to='/setting'
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
            >
              Settings
            </NavLink>
            <button
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <hr className='hidden md:block border-gray-200 sm:mx-auto dark:border-gray-700' />
    </nav>
  )
}

export default Navbar
