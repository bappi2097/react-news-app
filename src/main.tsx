import ReactDOM from "react-dom/client"
import "./assets/index.css"
import { ToastContainer } from "react-toastify"
import Router from "./routes/index.tsx"
import { BrowserRouter } from "react-router-dom"
import GlobalProvider from "./context/GlobalContext.tsx"
import AuthProvider from "./provider/AuthProvider.tsx"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <AuthProvider>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  </GlobalProvider>
)
