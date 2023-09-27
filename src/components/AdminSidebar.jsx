import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminSidebar() {
  const { logout, user } = useAuth({
    middleware: "auth",
  });

  const navigate = useNavigate();

  const onRedirectTo = () => {
    if (user?.admin === 1) {
      navigate("/admin/productos");
    } else {
      navigate("/");
    }
  };

  return (
    <aside className="md:w-72">
      <div
        className="p-4 flex items-center justify-center"
        onClick={() => onRedirectTo()}
      >
        <img src="/img/logo.svg" alt="" className="w-40" />
      </div>
      <nav className="flex flex-col p-4 text-center gap-4">
        <Link
          to={"/admin"}
          className="font-bold text-3xl hover:bg-amber-400 p-2 transition-all rounded-sm"
        >
          Ordenes
        </Link>
        <Link
          to={"/admin/productos"}
          className="font-bold text-3xl hover:bg-amber-400 p-2 transition-all rounded-sm"
        >
          Productos
        </Link>
        <Link
          to={"/admin/nuevo-producto"}
          className="font-bold text-3xl hover:bg-amber-400 p-2 transition-all rounded-sm"
        >
          Crear Producto
        </Link>
      </nav>
      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
