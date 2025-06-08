import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch(
          "https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos"
        );

        if (!respuesta.ok) throw new Error("Error al cargar los productos");

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchProductos();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productos,
        productoSeleccionado,
        setProductoSeleccionado,
        error,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
