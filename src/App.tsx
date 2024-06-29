import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./Pages/HomePage";
import DashBoard from "./Pages/DashBoard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import UrlPage from "./Pages/UrlPage";
import RedirectLinkPage from "./Pages/RedirectLinkPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/auth",
        element: <AuthenticationPage />,
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRoutes>
            <UrlPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/:custom_url",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
