import { ReactNode } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='min-h-full'>
        <Navbar />
        <main className='mx-auto max-w-full py-6 sm:px-2 lg:px-6'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
