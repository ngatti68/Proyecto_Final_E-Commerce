import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos"
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        toast.error("Error al obtener productos");
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(
        "https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      if (response.ok) {
        const product = await response.json();
        setProducts([...products, product]);
        toast.success("Producto agregado con éxito!");
      }
    } catch (error) {
      toast.error("Error al agregar producto");      
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(
        `https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const product = await response.json();
        setProducts(products.map((p) => (p.id === id ? product : p)));
      }
    } catch (error) {
      toast.error("Error al editar producto");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        toast.info("Producto eliminado correctamente");
      }
    } catch (error) {
      toast.error("Error al eliminar producto");      
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await fetch(
        `https://6817bb0c5a4b07b9d1cd2005.mockapi.io/productos-ecommerce/productos/${id}`
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      toast.error("Error al obtener el producto por ID");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
