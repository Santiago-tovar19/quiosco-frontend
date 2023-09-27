import React from "react";

import Categoria from "./Categoria";
import useQuiosco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { categorias } = useQuiosco();
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

  console.log(user);
  return (
    <aside className="w-72">
      <div className="p-4 flex items-center justify-center">
        <img
          src="img/logo.svg"
          className="w-40"
          alt=""
          onClick={() => onRedirectTo()}
        />
      </div>
      <p className="my-4 text-xl text-center">Hola: {user?.name} </p>
      <div className="mt-10">
        {categorias.map((categoria) => {
          return <Categoria key={categoria.id} categoria={categoria} />;
        })}
      </div>
      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}
