import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { SearchProvider } from "./context/SearchContext";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SearchProvider> {/* ✅ Envoltura con SearchProvider */}
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AdminProvider>
              <App />
              <ToastContainer position="top-right" autoClose={1500} />
            </AdminProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </SearchProvider>
  // </StrictMode>
);
