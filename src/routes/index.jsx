import { createBrowserRouter } from "react-router-dom";
import { Error, Home } from "../pages";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

export default router;