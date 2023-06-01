import { Navigate, RouteProps, Outlet } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"

const PrivateRoute: React.FC<RouteProps> = () => {
  const { token } = useAuthContext()

  if (!token) return <Navigate to='/login' />
  return <Outlet />
}

export default PrivateRoute
