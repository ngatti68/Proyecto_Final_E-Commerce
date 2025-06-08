import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio";
import AcercaDe from "../pages/AcercaDe";
import Contactos from "../pages/Contactos";
import Login from "../pages/Login";
import Cart from "../components/Cart";
import GaleriaDeProductos from "../pages/GaleriaDeProductos";
import Product from "../components/Product";
import Admin from "../pages/Admin";
import { useAuthContext } from "../context/AuthContext";

const AppRoutes = () => {
  const { auth } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<GaleriaDeProductos />} />
      <Route path="/acerca-de" element={<AcercaDe />} />
      <Route path="/contactos" element={<Contactos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productos/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />

      {/* 🔐 Solo los ADMIN pueden acceder a /admin */}
      <Route
        path="/admin"
        element={
          auth.role === "admin" ? <Admin /> : <Navigate to="/productos" />
        }
      />

      {/* 🔐 Los usuarios autenticados van a productos, los no autenticados al login */}
      <Route
        path="*"
        element={
          <Navigate to={auth.isAuthenticated ? "/productos" : "/login"} />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
