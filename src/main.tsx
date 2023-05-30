import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/index.css"
import { RouterProvider } from "react-router-dom"
import router from "./routes/index.tsx"
import { ToastContainer } from "react-toastify"
import AuthProvider from "./provider/AuthProvider.tsx"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
)
