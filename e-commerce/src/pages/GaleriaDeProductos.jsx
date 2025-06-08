import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Pagination,
} from "react-bootstrap";
import "../styles/galeriaDeProductos.css";

const GaleriaDeProductos = () => {
  const { productos, error, loading } = useProductContext();
  const { carrito, agregarAlCarrito } = useCartContext();
  const { isAuthenticated } = useAuthContext();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();

  // Estado de paginación dinámico
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina, setProductosPorPagina] = useState(3);

  // Detectar el número de columnas por fila dinámicamente
  useEffect(() => {
    const actualizarProductosPorPagina = () => {
      const width = window.innerWidth;
      setProductosPorPagina(width < 576 ? 1 : width < 992 ? 2 : 3);
    };

    actualizarProductosPorPagina();
    window.addEventListener("resize", actualizarProductosPorPagina);
    return () =>
      window.removeEventListener("resize", actualizarProductosPorPagina);
  }, []);

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

  // Filtrar y paginar productos
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosMostrados = productosFiltrados.slice(
    inicio,
    inicio + productosPorPagina
  );

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
    <Container className="mt-4">
      <h2 className="text-center">Galería de Productos</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <CircleLoader color="#007bff" size={50} />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <>
          <Row className="justify-content-center">
            {" "}
            {/* Centra las tarjetas en la fila */}
            {productosMostrados.map((producto) => (
              <Col key={producto.id} xs="auto">
                {" "}
                {/* xs="auto" evita que las tarjetas se achiquen */}
                <Card className="shadow-sm mb-4 card-producto">
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top custom-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>Precio: ${producto.precio}</Card.Text>
                    <Card.Text>Stock: {producto.stock}</Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleAgregarAlCarrito(producto)}
                      >
                        Agregar al carrito
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleVerMas(producto)}
                      >
                        Ver más...
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Paginación con React-Bootstrap */}
          <div className="d-flex justify-content-center my-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => setPaginaActual(paginaActual - 1)}
                disabled={paginaActual === 1}
              />
              {[...Array(totalPaginas)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={paginaActual === index + 1}
                  onClick={() => setPaginaActual(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              />
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
};

export default GaleriaDeProductos;
