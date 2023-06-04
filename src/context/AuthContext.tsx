import { createContext } from "react"
import { UserType } from "../utils/types"

type AuthContextType = {
  token: string
  setToken: (param: string) => void
  user: UserType | undefined
  setUser: (param: UserType) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext
