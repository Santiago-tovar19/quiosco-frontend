import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { clienteAxios } from "../config/axios";
import { useNavigate } from "react-router-dom";
import useNavigation from "../hooks/useNavigation";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setcategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("AUTH_TOKEN");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  // const { goToAndState } = useNavigation();

  // const navigate = useNavigate();

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios(`/api/categorias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      setCategorias(data.data);
      setcategoriaActual(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id);
    setcategoriaActual(categoria[0]);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    // por que se coloca entre corchetes? porque se esta desestructurando el objeto
    //se toma lo que hay en el pedido y se agrega el producto nuevo, se hace asi porque el pedido es un array y se debe agregar un nuevo elemento sin perder los anteriores

    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((pedidoState) => {
        return pedidoState.id === producto.id ? producto : pedidoState;
      });
      setPedido(pedidoActualizado);
      toast.success("Producto actualizado correctamente");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter(
      (producto) => producto.id === id
    )[0];
    setProducto(productoActualizar);
    setModal(!modal);
  };

  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Producto eliminado del pedido");
  };

  const handleSubmitNuevaOrden = async (logout) => {
    console.log(token);
    try {
      const { data } = await clienteAxios.post(
        "/api/pedidos",

        {
          total,
          productos: pedido.map((producto) => {
            return {
              id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      setTimeout(() => {
        setPedido([]);
      }, 1000);

      setTimeout(() => {
        localStorage.removeItem("AUTH_TOKEN");
        logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCompletarPedido = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      await clienteAxios.put(`/api/pedidos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  const handleClickProductoAgotado = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      await clienteAxios.put(`/api/productos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  const handleClickCrearProducto = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const data = await clienteAxios.post(`api/productos`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("producto creado correctamente");

      setErrores([]);
      console.log(data);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const handleClickEliminarProducto = async (productoId, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const data = await clienteAxios.delete(`api/productos/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Producto eliminado correctamente");

      setErrores([]);
    } catch (error) {
      setErrores([Object.values(error.response.data.errors)]);
    }
  };

  const hanldleClickProductosFiltrados = async (nombre, categoria_id) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      setProductosFiltrados([]);
      const response = await clienteAxios.get("/api/productos-filtrados", {
        params: { nombre, categoria_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productosFiltradosData = response.data.data;

      setProductosFiltrados(productosFiltradosData);
      console.log(productosFiltrados);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const handleClickEditarProducto = async (productoId, datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const response = await clienteAxios.put(
        `/api/editar-producto/${productoId}`,
        datos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje de éxito

      toast.success("producto Editado correctamente");
      setErrores([]);
    } catch (error) {
      console.error("Error al editar el producto:", error);
      setErrores(Object.values(error.response.data.errors));
    }
  };
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        modal,
        handleClickCategoria,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarProductoPedido,
        total,
        handleSubmitNuevaOrden,
        handleClickCompletarPedido,
        handleClickProductoAgotado,
        handleClickCrearProducto,
        handleClickEliminarProducto,
        hanldleClickProductosFiltrados,
        productosFiltrados,
        setProductosFiltrados,
        handleClickEditarProducto,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
