import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext"; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useAuthContext(); 
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState(null);

  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  const agregarAlCarrito = (producto) => {
    if (!auth.isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar productos.");
      return;
    }

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe && existe.cantidad >= producto.stock) {
        toast.error(`Stock agotado para "${producto.nombre}".`);
        return prevCarrito;
      }

      const nuevoCarrito = existe
        ? prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prevCarrito, { ...producto, cantidad: 1 }];

      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

      toast.success(`"${producto.nombre}" agregado al carrito!`); 

      return nuevoCarrito;
    });
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      );
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  const eliminarProducto = (productoId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.filter((item) => item.id !== productoId);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
    toast.error("Producto eliminado del carrito.");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    toast.success("El carrito está vacío.");
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        mostrarCarrito,
        toggleCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
