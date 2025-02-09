import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Nonroute from "./pages/nonroute";
 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
       
    ],
  },

  {
    path: "/auth",
    element: <Nonroute />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
]);
