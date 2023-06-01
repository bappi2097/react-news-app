import { ReactNode, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import useToken from "../hooks/useToken"

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token: sessionToken } = useToken()
  const [token, setToken] = useState(sessionToken)
  console.log(token)

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
