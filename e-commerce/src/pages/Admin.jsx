import { useState, useEffect } from "react";
import { Button, Modal, Table, Spinner, Alert } from "react-bootstrap";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import ModalConfirmacion from "../components/ModalConfirmacion";

import "../styles/admin.css";

const API_URL = process.env.REACT_APP_API_URL;

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
    useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          API_URL
        );
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        toast.error("Error al cargar productos");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        }
      );
      const nuevoProducto = await response.json();
      setProductos([...productos, nuevoProducto]);
      setMostrarFormulario(false);
    } catch (error) {
      toast.error("Error al agregar producto");
    }
  };

  const editarProducto = async (id, productoActualizado) => {
    try {
      await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoActualizado),
        }
      );

      setProductos(
        productos.map((p) =>
          p.id === id ? { ...p, ...productoActualizado } : p
        )
      );
      setMostrarEdicion(false);
      setProductoSeleccionado(null);
    } catch (error) {
      toast.error("Error al editar producto");
    }
  };

  const confirmarEliminacion = (id) => {
    setProductoAEliminar(id);
    setMostrarModalConfirmacion(true);
  };

  const eliminarProducto = async () => {
    try {
      await fetch(
        `${API_URL}/${productoAEliminar}`,
        {
          method: "DELETE",
        }
      );
      setProductos(productos.filter((p) => p.id !== productoAEliminar));
      setMostrarModalConfirmacion(false);
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="admin-container">
        <h2>Bienvenido a la página de Administración</h2>
        <p>
          Desde aquí usted podrá tener la administración completa del catálogo
          de productos mediante operaciones de creación, lectura, actualización
          y eliminación.
        </p>
      </div>

      <Button variant="primary" onClick={() => setMostrarFormulario(true)}>
        Agregar Producto
      </Button>

      {cargando ? (
        <Spinner animation="border" />
      ) : productosFiltrados.length === 0 ? (
        <Alert variant="warning" className="mt-4 text-center">
          No se encontraron productos con el término "
          <strong>{searchQuery}</strong>".
        </Alert>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} width="50" />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setProductoSeleccionado(producto);
                      setMostrarEdicion(true);
                    }}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => confirmarEliminacion(producto.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modales */}
      <Modal
        show={mostrarFormulario}
        onHide={() => setMostrarFormulario(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioProducto onAgregar={agregarProducto} />
        </Modal.Body>
      </Modal>

      <Modal show={mostrarEdicion} onHide={() => setMostrarEdicion(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <FormularioEdicion
              id={productoSeleccionado.id}
              onEditar={editarProducto}
              onCancelar={() => setMostrarEdicion(false)}
            />
          )}
        </Modal.Body>
      </Modal>

      <ModalConfirmacion
        show={mostrarModalConfirmacion}
        onHide={() => setMostrarModalConfirmacion(false)}
        onConfirm={eliminarProducto}
      />
    </div>
  );
};

export default Admin;
