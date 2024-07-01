
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./Pages/HomePage";
import DashBoard from "./Pages/DashBoard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import RedirectLinkPage from "./Pages/RedirectLinkPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import StatsofLinkView from "./Pages/StatsofLinkView";

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
        path: "/link/:id/:title/:qrcode",
        element: (
          <ProtectedRoutes>
            <StatsofLinkView />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/visit/:custom_url/:_id",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
