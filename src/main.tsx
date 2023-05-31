import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/index.css"
import { ToastContainer } from "react-toastify"
import Router from "./routes/index.tsx"
import { BrowserRouter } from "react-router-dom"
import GlobalProvider from "./context/GlobalContext.tsx"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
)
