import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

import "sweetalert2/dist/sweetalert2.min.css";
import "../styles/cart.css";

const Cart = () => {
  const {
    carrito,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    mostrarCarrito,
    setMostrarCarrito,
  } = useCartContext();

  const { auth = { isAuthenticated: false } } = useAuthContext();

  const manejarActualizarCantidad = (producto, nuevaCantidad) => {
    if (nuevaCantidad > producto.stock) {
      toast.error(
        `No puedes agregar más unidades de "${producto.nombre}", alcanzaste el límite de stock.`
      );
      return;
    }
    actualizarCantidad(producto.id, nuevaCantidad);
    toast.success(
      `Cantidad de ${producto.nombre} actualizada a ${nuevaCantidad}`
    );
  };

  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const manejarFinalizarCompra = () => {
    if (!auth.isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para finalizar tu compra.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Pedido enviado",
      text: "Tu pedido fue procesado con éxito.",
      confirmButtonColor: "#3085d6",
    });

    vaciarCarrito();
    setMostrarCarrito(false);
  };

  return (
    <>
      {/* Fondo oscuro opcional */}
      {mostrarCarrito && (
        <div
          className="carrito-backdrop"
          onClick={() => setMostrarCarrito(false)}
        />
      )}

      <div className={`carrito-panel ${mostrarCarrito ? "activo" : ""}`}>
        <button
          className="carrito-cerrar"
          onClick={() => setMostrarCarrito(false)}
        >
          ✕
        </button>

        <h2>Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div>
            {carrito.map((producto) => (
              <div key={producto.id} className="carrito-producto">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="carrito-miniatura"
                />

                <div className="carrito-detalles">
                  <p>
                    {producto.nombre} (${producto.precio})
                  </p>

                  <div className="carrito-controles">
                    <button
                      className="boton-estilizado"
                      onClick={() =>
                        manejarActualizarCantidad(
                          producto,
                          Math.max(1, producto.cantidad - 1)
                        )
                      }
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      max={producto.stock}
                      value={producto.cantidad}
                      onChange={(e) =>
                        manejarActualizarCantidad(
                          producto,
                          Math.min(Number(e.target.value), producto.stock)
                        )
                      }
                      className="carrito-input"
                    />

                    <button
                      className="boton-estilizado"
                      onClick={() =>
                        manejarActualizarCantidad(
                          producto,
                          producto.cantidad + 1
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="boton-estilizado boton-eliminar"
                      onClick={() => {
                        eliminarProducto(producto.id);
                        toast.error(`Producto ${producto.nombre} eliminado`);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h3>Total: ${totalCarrito.toFixed(2)}</h3>
            <button
              className="boton-estilizado boton-vaciar"
              onClick={vaciarCarrito}
            >
              Vaciar Carrito
            </button>
            <button
              className="boton-estilizado boton-finalizar"
              onClick={manejarFinalizarCompra}
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
