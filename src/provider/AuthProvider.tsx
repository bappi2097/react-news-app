import { ReactNode, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import useToken from "../hooks/useToken"
import { Navigate } from "react-router-dom"

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState("")
  const { token: sessionToken } = useToken()

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    setToken(token)
  }, [sessionToken])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
