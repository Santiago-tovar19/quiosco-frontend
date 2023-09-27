import React from "react";
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "./ResumenProducto";
import { formatearDinero } from "../helpers";
import { useAuth } from "../hooks/useAuth";

export default function Resumen() {
  const { pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => {
    if (pedido.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    handleSubmitNuevaOrden(logout);
  };
  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi pedido</h1>
      <p className="text-lg my-5">
        Aqui podras ver el resumen y totales de tu pedido
      </p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay productos aún</p>
        ) : (
          pedido.map((producto) => {
            return <ResumenProducto key={producto.id} producto={producto} />;
          })
        )}
      </div>
      <p className="text-xl mt-10">total: {formatearDinero(total)} </p>
      <form action="" className="w-full" onSubmit={() => handleSubmit()}>
        <div className="mt-5">
          <input
            type="submit"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            } px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            value="Enviar pedido`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  );
}
