import React from "react";
import useQuiosco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
  const { nombre, icono, id } = categoria;
  const { handleClickCategoria, categoriaActual } = useQuiosco();
  return (
    <div
      className={`${
        categoriaActual.id === id ? "bg-amber-400" : "bg-white"
      } flex items-center gap-4 border w-full p-3 hover:bg-amber-600 cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img
        alt="Imagen icono"
        src={`/img/icono_${icono}.svg`}
        className="w-12"
      />
      <button
        className="text-lg font-bold cursor-pointer truncate"
        type="button"
      >
        {nombre}{" "}
      </button>
    </div>
  );
}
