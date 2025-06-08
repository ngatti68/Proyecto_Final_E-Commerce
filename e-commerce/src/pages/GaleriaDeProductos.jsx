import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext"; // ✅ Importación del contexto de búsqueda
import "../styles/galeriaDeProductos.css";

const GaleriaDeProductos = () => {
  const { productos, error, loading } = useProductContext();
  const { carrito, agregarAlCarrito } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const { searchQuery } = useSearch(); // ✅ Obtiene el estado de búsqueda desde el contexto
  console.log("searchQuery en GaleriaDeProductos:", searchQuery); // Verifica que serchQuery está llegando
  const navigate = useNavigate();

  const handleAgregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe && existe.cantidad >= producto.stock) {
      toast.error(
        `No puedes agregar más unidades de "${producto.nombre}", alcanzaste el límite de stock.`
      );
      return;
    }
    agregarAlCarrito(producto, isAuthenticated);
  };

  const handleVerMas = (producto) => {
    navigate(`/productos/${producto.id}`);
  };

  // ✅ Filtra los productos según el estado de búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Productos filtrados:", productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  console.log("Productos disponibles:", productos);
  console.log("Productos filtrados:", filteredProducts);

  return (
    <div className="productos-container">
      <h2>Galería de Productos</h2>

      {loading ? (
        <div className="spinner-container">
          <CircleLoader color="#007bff" size={50} />{" "}
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-mensaje">{error}</p>
        </div>
      ) : (
        <div className="productos-grid">
          {filteredProducts.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Stock disponible: {producto.stock}</p>
              <div className="botones-container">
                <button onClick={() => handleAgregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
                <button
                  className="botonEstilizado"
                  onClick={() => handleVerMas(producto)}
                >
                  Ver más...
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaDeProductos;
