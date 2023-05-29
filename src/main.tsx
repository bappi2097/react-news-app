import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/index.css"
import { RouterProvider } from "react-router-dom"
import router from "./routes/index.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)