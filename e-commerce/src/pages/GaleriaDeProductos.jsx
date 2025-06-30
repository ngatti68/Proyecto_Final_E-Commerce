import { useState } from "react";
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

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

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

  return (
    <Container className="mt-4">
      <h2 className="text-center">Nuestros Productos</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <CircleLoader color="#007bff" size={50} />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : productosFiltrados.length === 0 ? (
        <Alert variant="warning" className="mt-4 text-center">
          No se encontraron productos con el término "
          <strong>{searchQuery}</strong>".
        </Alert>
      ) : (
        <>
          <Row className="justify-content-center">
            {productosMostrados.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="card-producto shadow-sm mb-4">
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="custom-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>Precio: ${producto.precio}</Card.Text>
                    <Card.Text>Stock: {producto.stock}</Card.Text>
                    <div className="d-grid gap-0">
                      <Button
                        className="btn-agregar"
                        onClick={() => handleAgregarAlCarrito(producto)}
                      >
                        Agregar al carrito
                      </Button>
                      <Button
                        className="btn-ver-mas"
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
