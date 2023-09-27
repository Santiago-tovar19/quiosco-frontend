import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { clienteAxios } from "../../config/axios";
import Producto from "../../components/Producto";
import useQuiosco from "../../hooks/useQuiosco";

export default function Productos() {
  const { categorias, hanldleClickProductosFiltrados, productosFiltrados } =
    useQuiosco();
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    hanldleClickProductosFiltrados(null, null);
  }, []);

  const fetcher = () =>
    clienteAxios("/api/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 10000,
  });

  const nombreRef = useRef();
  const categoria_idRef = useRef();

  if (isLoading) return <p>Cargando...</p>;

  const handleSubmit = () => {
    event.preventDefault();

    const nombre = nombreRef.current.value;
    const categoria_id = categoria_idRef.current.value;

    console.log({ nombre, categoria_id });

    hanldleClickProductosFiltrados(nombre, categoria_id);

    console.log(productosFiltrados);
  };

  return (
    <>
      <div className="bg-gray-100 pt-10">
        <h2 className="text-2xl md:text-4xl  text-center font-extrabold my-5">
          Buscar y Filtrar productos
        </h2>

        <div className="max-w-2xl mx-auto mt-10 -mb-5">
          <form onSubmit={() => handleSubmit()}>
            <div className="md:grid md:grid-cols-2 gap-5">
              <div className="mb-5">
                <label
                  className="block mb-1 text-sm text-gray-700 uppercase font-bold "
                  htmlFor="nombre"
                >
                  Término de Búsqueda
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Buscar por Término: ej. Pizza Hawaiana"
                  className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full p-2"
                  name="nombre"
                  ref={nombreRef}
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-1 text-sm text-gray-700 uppercase font-bold"
                  htmlFor="nombre"
                >
                  Categoría
                </label>
                <select
                  className="border-gray-300 p-2 w-full"
                  name="categoria"
                  ref={categoria_idRef}
                >
                  <option value={""}>Seleccione una opción</option>
                  {categorias.map((categoria) => {
                    return (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <input
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 transition-colors text-white text-sm font-bold px-10 py-2 rounded cursor-pointer uppercase w-full md:w-auto"
                value="Buscar"
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-black">Productos</h1>
        <p className="text-2xl my-10">Maneja los productos desde aqui </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {productosFiltrados?.map((producto) => {
            return (
              <Producto
                key={producto.imagen}
                producto={producto}
                botonDisponible={true}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
