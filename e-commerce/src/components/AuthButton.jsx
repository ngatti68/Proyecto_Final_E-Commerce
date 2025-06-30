import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import "../styles/authButton.css";

const AuthButton = () => {
  const { auth, handleLogout } = useAuthContext();
  const { vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (auth.isAuthenticated) {
      vaciarCarrito();  
      handleLogout(navigate); 
    } else {
      navigate("/login");
    }
  };

  return (
    <button className="boton-auth" onClick={handleAuthAction}>
      {auth.isAuthenticated ? (
        <>
          <FaSignOutAlt /> Cerrar sesión ({auth.role})
        </>
      ) : (
        <>
          <FaSignInAlt /> Iniciar sesión
        </>
      )}
    </button>
  );
};

export default AuthButton;