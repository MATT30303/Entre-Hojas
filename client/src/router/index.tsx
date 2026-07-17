import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import {Home, Category} from "../pages";
import { ProductList } from "../Components/categories";

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
      },
      {
        path: "/categories/Anturio",
        element: <ProductList family="Anturio"/>,
      },
      {
        path: "/categories/Calathea",
        element: <ProductList family="Calathea"/>,
      },
      {
        path: "/categories/Maranta",
        element: <ProductList family="Maranta"/>,
      },
      {
        path: "/categories/Monstera",
        element: <ProductList family="Monstera"/>,
      },
      {
        path: "/categories/Potus",
        element: <ProductList family="Potus"/>,
      },
      {
        path: "/categories/Singonio",
        element: <ProductList family="Singonio"/>,
      }
    ],
  },
]);


