import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { QuioscoProvider } from "./context/QuioscoProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider router={Router} />
    </QuioscoProvider>
  </React.StrictMode>
);
