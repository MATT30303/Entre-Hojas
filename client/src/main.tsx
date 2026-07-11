import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router";
import { HeaderProvider } from "./contexts/HeaderContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderProvider>
      <RouterProvider router={router} />
    </HeaderProvider>
  </React.StrictMode>
);