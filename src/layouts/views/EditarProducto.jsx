import React, { useEffect, useRef, useState } from "react";
import { clienteAxios } from "../../config/axios";
import { useParams } from "react-router-dom";
import useQuiosco from "../../hooks/useQuiosco";
import Alerta from "../../components/Alerta";
import useNavigation from "../../hooks/useNavigation";

export default function EditarProducto() {
  const { categorias, handleClickEditarProducto } = useQuiosco();
  const { goTo } = useNavigation();

  const { id } = useParams();
  const [errores, setErrores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState({});
  const [categoria_id, setCategoria_id] = useState("");
  const [url, setUrl] = useState("");
  const [precio, setPrecio] = useState("");

  console.log(id);

  useEffect(() => {
    handleClickObtenerProducto(id);
  }, []);

  const handleClickObtenerProducto = async (productoId) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const response = await clienteAxios.get(`/api/productos/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productoEdit = await response.data.producto;

      setProducto(productoEdit);
      setNombre(productoEdit.nombre);
      setPrecio(productoEdit.precio);
      setCategoria_id(productoEdit.categoria_id);
      setUrl(productoEdit.url);

      // Luego puedes utilizar productoEdit en tu aplicación React como necesites
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  console.log(producto);

  const ocultarCampoUrl = () => {
    if (producto.url === null) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    event.preventDefault();

    const datos = {
      nombre,
      precio,
      categoria_id,
      url,
    };

    console.log(datos);

    handleClickEditarProducto(producto.id, datos, setErrores);

    //ahora limpiamos el formulario
    setNombre("");
    setPrecio("");
    setCategoria_id("");
    setUrl("");

    setTimeout(() => {
      goTo("/admin/productos");
    }, 3000);
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-10">
        Editar Producto ID: {producto.id}
      </h1>
      <p className="text-center mt-2">
        Edita el formulario a tu preferencia...
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
              value={nombre}
              placeholder="Nombre del producto"
              onChange={(e) => setNombre(e.target.value)}
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
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
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
              disabled={ocultarCampoUrl()}
              value={categoria_id}
              onChange={(e) => setCategoria_id(e.target.value)}
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
          {ocultarCampoUrl() ? (
            <div className="flex justify-center items-center gap-4">
              <p className="w-[240px] ">
                No puedes editar la imagen y categoria porque estan definidas
                por un administrador en la base de datos
              </p>
              <img
                src={`/img/${producto.imagen}.jpg`}
                alt=""
                className="w-24"
              />
            </div>
          ) : (
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <div className="w-full justify-center  flex flex-col">
                <label className="text-slate-800" htmlFor="url">
                  Imagen Actual:
                </label>
                <img src={`${producto.url}`} alt="" className="w-24 mt-4" />
              </div>
            </div>
          )}

          <input
            type="submit"
            value="Editar Producto"
            className="bg-amber-400 hover:bg-amber-500 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5"></nav>
    </>
  );
}
