import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (authContext) {
    return { ...authContext }
  } else {
    throw Error("Auth Context is not defined!")
  }
}

export default useAuthContext
