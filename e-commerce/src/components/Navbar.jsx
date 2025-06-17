import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { FaSearch } from "react-icons/fa";
import AuthButton from "../components/AuthButton";
import "../styles/navbar.css";

const Navbar = () => {
  const { carrito, mostrarCarrito, toggleCarrito } = useCartContext();
  const { searchQuery, setSearchQuery } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="menu-container">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      <div className={`navbar-content ${menuOpen ? "active" : ""}`}>
        {/* Sección de enlaces de navegación */}
        <div className="nav-links">
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
        </div>

        {/* Sección de acciones (búsqueda, sesión, carrito) */}
        <div className="actions-container">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <AuthButton />

          <button onClick={toggleCarrito} className="boton-carrito">
            <i className="fas fa-shopping-cart"></i> ({carrito.length})
            <i
              className={
                mostrarCarrito ? "fas fa-times" : "fas fa-chevron-down"
              }
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
                      {producto.nombre} - ${producto.precio} (
                      {producto.cantidad})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
