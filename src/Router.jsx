import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Inicio } from "./layouts/views/Inicio";
import { Login } from "./layouts/views/Login";
import Register from "./layouts/views/Register";
import AdminLayout from "./layouts/AdminLayout";
import Ordenes from "./layouts/views/Ordenes";
import Productos from "./layouts/views/Productos";
import NuevoProducto from "./layouts/views/NuevoProducto";
import EditarProducto from "./layouts/views/EditarProducto";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/registro",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Ordenes />,
      },
      {
        path: "/admin/productos",
        element: <Productos />,
      },
      {
        path: "/admin/nuevo-producto",
        element: <NuevoProducto />,
      },
      {
        path: "/admin/editar-producto/:id",
        element: <EditarProducto />,
      },
    ],
  },
]);
