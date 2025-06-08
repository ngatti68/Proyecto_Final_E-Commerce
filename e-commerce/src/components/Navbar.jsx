import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import AuthButton from "../components/AuthButton";
import "../styles/navbar.css";

const Navbar = () => {
  const { carrito, mostrarCarrito, toggleCarrito } = useCartContext();

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Inicio
      </NavLink>
      <NavLink
        to="/productos"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Productos
      </NavLink>
      <NavLink
        to="/acerca-de"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Acerca de
      </NavLink>
      <NavLink
        to="/contactos"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Contacto
      </NavLink>

      <AuthButton />

      <button onClick={toggleCarrito} className="boton-carrito">
        <i className="fas fa-shopping-cart"></i> ({carrito.length})
        <i
          className={mostrarCarrito ? "fas fa-times" : "fas fa-chevron-down"}
        ></i>
      </button>

      {mostrarCarrito && (
        <div className="carrito-dropdown">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id}>
                  {producto.nombre} - ${producto.precio} ({producto.cantidad})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
