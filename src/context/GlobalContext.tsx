import { ReactNode, createContext, useContext, useState } from "react"
import Loader from "../components/Loader"
import Toastify, { ToastifyProps, ToastifyType } from "../components/Toastify"

type GlobalContextType = {
  loader: boolean
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
  toast: (message: string, type?: ToastifyType) => void
}

const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loader, setLoader] = useState(false)
  const [toastList, setToastList] = useState<ToastifyProps[]>([])

  const toast = (message: string, type: ToastifyType = "success") => {
    setToastList((prev) => [...prev, { message, type }])
  }

  return (
    <GlobalContext.Provider value={{ loader, setLoader, toast }}>
      <div className='absolute w-full max-w-xs top-5 right-5 flex flex-col items-center'>
        {toastList.map((toastData, i) => (
          <Toastify {...toastData} onDestroy={handleDestroy} />
        ))}
      </div>
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
