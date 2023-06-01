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
        <main>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
