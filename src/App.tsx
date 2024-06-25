import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import AppLayout from './layout/AppLayout';
import HomePage from './Pages/HomePage';
import DashBoard from './Pages/DashBoard';
import AuthenticationPage from './Pages/AuthenticationPage';
import UrlPage from './Pages/UrlPage';
import RedirectLinkPage from './Pages/RedirectLinkPage';

import { RouterProvider,createBrowserRouter} from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:<HomePage />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/auth",
        element: <AuthenticationPage />,
      },
      {
        path: "/link/:id",
        element: <UrlPage />,
      },
      {
        path: "/:id",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);


function App() {
  return(
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;