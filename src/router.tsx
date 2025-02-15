import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import User from './pages/user'
import LoginPage from "./pages/login";
import Dashboard from "./layouts/dashboard";
import Nonroute from "./layouts/nonroute";
import Root from "./layouts/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <User />,
          },
        ],
      },

      {
        path: "/auth",
        element: <Nonroute />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
    ],
  },
]);
