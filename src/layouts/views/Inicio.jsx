import React from "react";
// import { productos as data } from "../../data/producto";
import Producto from "../../components/Producto";
import useQuiosco from "../../hooks/useQuiosco";
import useSWR from "swr";
import { clienteAxios } from "../../config/axios";

export const Inicio = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { categoriaActual } = useQuiosco();

  const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 1000,
  });

  console.log(data);

  if (isLoading) return <p>Cargando...</p>;

  const productos = data.data.filter((producto) => {
    return producto.categoria_id === categoriaActual.id;
  });
  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre} </h1>
      <p className="text-2xl my-10">Elige y personaliza tu producto</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => {
          return (
            <Producto
              key={producto.imagen}
              producto={producto}
              botonAgregar={true}
            />
          );
        })}
      </div>
    </>
  );
};
