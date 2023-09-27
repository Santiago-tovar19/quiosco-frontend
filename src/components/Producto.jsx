import React, { useState } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useNavigation from "../hooks/useNavigation";

export default function Producto({
  producto,
  botonAgregar = false,
  botonDisponible = false,
}) {
  const { nombre, imagen, precio, categoria, categoria_id, url } = producto;

  const { goTo, goToAndState } = useNavigation();

  const comprobarImagen = () => {
    if (url === null) {
      return true;
    } else {
      return false;
    }
  };

  const {
    handleClickModal,
    handleSetProducto,
    handleClickProductoAgotado,
    handleClickEliminarProducto,
    handleClickEditarProducto,
  } = useQuiosco();

  const eliminarProducto = (productoId) => {
    console.log(productoId);
    Swal.fire({
      title: "Estas seguro?",
      text: "Este producto se eliminara completamentamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Deseo eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        handleClickEliminarProducto(productoId);
      }
    });
  };

  const handleClickEditarProductoId = (productoId) => {
    goTo(`/admin/editar-producto/${productoId}`);
  };
  return (
    <>
      <div className="border p-3 shadow bg-white">
        <img
          src={comprobarImagen() ? `/img/${imagen}.jpg` : url}
          className="w-[500px] h-[530px] "
        />
        <div className="p-5">
          <h3 className="text-2xl font-bold">{nombre}</h3>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatearDinero(precio)}
          </p>
          {botonAgregar && (
            <button
              className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
              onClick={() => {
                handleSetProducto(producto);
                handleClickModal();
              }}
            >
              Agregar
            </button>
          )}

          {botonDisponible && (
            <>
              <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={() => handleClickProductoAgotado(producto.id)}
              >
                No disponible
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-3 uppercase font-bold "
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar Producto
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={() => handleClickEditarProductoId(producto.id)}
              >
                Editar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
