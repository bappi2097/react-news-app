import { Outlet, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Error from "../pages/Error"
import Loader from "../components/Loader"
import AuthProvider from "../provider/AuthProvider"

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <React.Suspense fallback={<Loader />}>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </React.Suspense>
        }
      >
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default Router
