import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clienteAxios } from "../../config/axios";
import useQuiosco from "../../hooks/useQuiosco";
import Alerta from "../../components/Alerta";
import useNavigation from "../../hooks/useNavigation";

export default function NuevoProducto() {
  const { categorias, handleClickCrearProducto } = useQuiosco();
  const nombreRef = useRef();
  const precioRef = useRef();
  const categoriaRef = useRef();
  const urlRef = useRef();
  // const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const { goTo } = useNavigation();

  const handleSubmit = () => {
    event.preventDefault();

    const datos = {
      nombre: nombreRef.current.value,
      precio: precioRef.current.value,
      categoria_id: categoriaRef.current.value,
      url: urlRef.current.value,
    };
    console.log(datos);

    handleClickCrearProducto(datos, setErrores);

    //ahora limpiamos el formulario
    nombreRef.current.value = "";
    precioRef.current.value = "";
    categoriaRef.current.value = "";
    urlRef.current.value = "";

    setTimeout(() => {
      goTo("/admin/productos");
    }, 3000);
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-10">Crear nuevo Producto</h1>
      <p className="text-center mt-2">
        Llena el formulario correctamente para crear un nuevo producto
      </p>

      <div className="bg-white shadow-md rounded-md mt-16 px-5 py-10 w-2/3 mx-auto ">
        <form action="" onSubmit={() => handleSubmit()} noValidate>
          {errores
            ? errores.map((error, i) => {
                return <Alerta key={i}>{error}</Alerta>;
              })
            : null}
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="nombre">
              Nombre del producto:
            </label>
            <input
              type="text"
              id="nombre"
              className="mt-2 w-full p-3 bg-gray-50"
              name="nombre"
              placeholder="Nombre del producto"
              ref={nombreRef}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="precio">
              Precio del producto:
            </label>
            <input
              type="number"
              id="precio"
              className="mt-2 w-full p-3 bg-gray-50"
              name="precio"
              placeholder="Precio del producto"
              ref={precioRef}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="categoria_id">
              Categoria del producto:
            </label>
            <select
              name="categoria_id"
              id="categoria_id"
              className="w-full bg-gray-50 p-3 mt-2"
              ref={categoriaRef}
            >
              <option value="">-- Seleccionar categoria --</option>
              {categorias.map((categoria) => {
                return (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="url">
              Url de la imagen del producto:
            </label>
            <input
              type="text"
              id="url"
              className="mt-2 w-full p-3 bg-gray-50"
              name="url"
              placeholder="Url de la imagen del producto"
              ref={urlRef}
            />
          </div>

          <input
            type="submit"
            value="Crear Producto"
            className="bg-amber-400 hover:bg-amber-500 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5"></nav>
    </>
  );
}
