import { ReactNode, createContext, useContext, useState } from "react"
import Loader from "../components/Loader"
import Toastify, { ToastifyObjType, ToastifyType } from "../components/Toastify"

type GlobalContextType = {
  loader: boolean
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
  toast: (message: string, type?: ToastifyType) => void
}

const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loader, setLoader] = useState(false)
  const [toastList, setToastList] = useState<ToastifyObjType[]>([])

  const toast = (message: string, type: ToastifyType = "success") => {
    setToastList((prev) => [...prev, { message, type }])
  }

  const handleDestroy = (toastIndex: number) => {
    setToastList((prev) => [...prev.filter((_, i) => i !== toastIndex)])
  }

  return (
    <GlobalContext.Provider value={{ loader, setLoader, toast }}>
      <div className='absolute w-full max-w-xs top-5 right-5 flex flex-col items-center'>
        {toastList.map((toastData, i) => (
          <Toastify {...toastData} onDestroy={() => handleDestroy(i)} key={i} />
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
