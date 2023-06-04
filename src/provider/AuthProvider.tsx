import { ReactNode, useState } from "react"
import AuthContext from "../context/AuthContext"
import { UserType } from "../utils/types"

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getToken = (): string => {
    const tokenString = sessionStorage.getItem("token")
    const userToken = tokenString ? JSON.parse(tokenString) : ""
    return userToken
  }

  const getUser = (): UserType | undefined => {
    const userString = sessionStorage.getItem("user")
    const userData = userString ? JSON.parse(userString) : undefined
    return userData
  }

  const [token, setToken] = useState<string>(getToken())

  const [user, setUser] = useState<UserType | undefined>(getUser())

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", JSON.stringify(userToken))
    setToken(userToken)
  }

  const saveUser = (userData: UserType) => {
    sessionStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken: saveToken, user, setUser: saveUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
