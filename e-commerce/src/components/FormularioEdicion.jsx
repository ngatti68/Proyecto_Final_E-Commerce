import { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Form, Button, Spinner } from "react-bootstrap";
import { handleChangeGenerico, handleBlurGenerico } from "../utils/formUtils";
import { validarFormulario } from "../utils/validaciones";

const FormularioEdicion = ({ id, onEditar, onCancelar }) => {
  const { getProductById } = useContext(AdminContext);
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      if (data) {
        setProducto(data);
      } else {
        console.error("Producto no encontrado.");
        setProducto({
          nombre: "",
          precio: "",
          stock: "",
          imagen: "",
          descripcion: "",
        });
      }
      setCargando(false);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario(producto);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onEditar(id, producto);

    setProducto({
      nombre: "",
      precio: "",
      stock: "",
      imagen: "",
      descripcion: "",
    });
    setErrores({});
    onCancelar();
  };

  if (cargando) return <Spinner animation="border" />;

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>

      <Form.Group>
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={producto?.nombre || ""}
          onChange={handleChangeGenerico(setProducto)}
          required
        />
        {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Precio:</Form.Label>
        <Form.Control
          type="text"
          name="precio"
          value={producto?.precio || ""}
          onChange={handleChangeGenerico(setProducto)}
          onBlur={handleBlurGenerico(setProducto)}
          required
        />
        {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Stock:</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={producto?.stock || 0}
          onChange={handleChangeGenerico(setProducto)}
          required
          min="0"
        />
        {errores.stock && <p style={{ color: "red" }}>{errores.stock}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Imagen:</Form.Label>
        <Form.Control
          type="text"
          name="imagen"
          value={producto?.imagen || ""}
          onChange={handleChangeGenerico(setProducto)}
          required
        />
        {errores.imagen && <p style={{ color: "red" }}>{errores.imagen}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Descripción:</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          value={producto?.descripcion || ""}
          onChange={handleChangeGenerico(setProducto)}
          required
        />
        {errores.descripcion && (
          <p style={{ color: "red" }}>{errores.descripcion}</p>
        )}
      </Form.Group>

      <Button variant="success" type="submit">
        Guardar Cambios
      </Button>
      <Button variant="secondary" type="button" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  );
};

export default FormularioEdicion;
