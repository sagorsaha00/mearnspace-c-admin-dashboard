 import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Catagores from "./pages/catagores";

 export const router = createBrowserRouter([
    {
      path: "/",
      element:  <HomePage/>
    },
    {
      path: "/catagores",
      element: <Catagores/>,
    },
  ]);