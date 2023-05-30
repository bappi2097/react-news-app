import { createContext } from "react"

type AuthContextType = {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext
