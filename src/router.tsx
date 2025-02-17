import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import User from "./pages/user/user";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/dashboard";
import Nonroute from "./layouts/nonroute";
import Root from "./layouts/Root";
import Resturants from "./pages/resturants/resturants";

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
          {
            path: "/resturants",
            element: <Resturants />,
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
