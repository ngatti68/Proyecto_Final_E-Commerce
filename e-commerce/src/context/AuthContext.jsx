import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
const USER_TOKEN = process.env.REACT_APP_USER_TOKEN;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const authGuardado = JSON.parse(localStorage.getItem("auth")) || { isAuthenticated: false, role: null, token: null };
    return authGuardado;
  });

  const handleLogin = (user, password, navigate) => {
    if (user === "admin" && password === "1234") {
      const authData = { isAuthenticated: true, role: "admin", token: ADMIN_TOKEN };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
      toast.success("¡Bienvenido, admin!", { position: "top-right" });
      navigate("/admin");
    } else if (user === "user" && password === "1234") {
      const authData = { isAuthenticated: true, role: "user", token: USER_TOKEN };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
      toast.success("¡Bienvenido, usuario!", { position: "top-right" });
      navigate("/productos");
    } else {
      toast.error("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  const handleLogout = (navigate) => {
    setAuth({ isAuthenticated: false, role: null, token: null });
    localStorage.removeItem("auth");
    toast.info("Has cerrado sesión.");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);