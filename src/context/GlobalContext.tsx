import { ReactNode, createContext, useContext, useState } from "react"
import Loader from "../components/Loader"

type GlobalContextType = {
  loader: boolean
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loader, setLoader] = useState(false)

  return (
    <GlobalContext.Provider value={{ loader, setLoader }}>
      <div className='relative '>{loader && <Loader />}</div>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext)
  if (globalContext) {
    return { ...globalContext }
  } else {
    throw Error("Global Context is not defined yet!")
  }
}

export default GlobalProvider
