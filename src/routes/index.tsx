import { Navigate, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Error from "../pages/Error"
import Loader from "../components/Loader"
import PrivateRoute from "./PrivateRoute"
import useAuthContext from "../hooks/useAuthContext"
import MainLayout from "../layout/MainLayout"
import Setting from "../pages/Setting"

const Router = () => {
  const { token } = useAuthContext()
  return (
    <Routes>
      <Route path='/login' element={token ? <Navigate to='/' /> : <Login />} />
      <Route
        path='/register'
        element={token ? <Navigate to='/' /> : <Register />}
      />
      <Route
        path='/'
        element={
          <React.Suspense fallback={<Loader />}>
            <MainLayout>
              <PrivateRoute />
            </MainLayout>
          </React.Suspense>
        }
      >
        <Route index element={<Home />} />
        <Route path='setting' element={<Setting />} />
      </Route>

      <Route
        path='*'
        element={
          <MainLayout>
            <Error />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default Router
