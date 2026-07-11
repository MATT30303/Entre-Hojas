import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import {Home, Category} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Category />,
      }
    ],
  },
]);