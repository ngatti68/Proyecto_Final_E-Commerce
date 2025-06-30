import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { handleChangeGenerico, handleBlurGenerico } from "../utils/formUtils";
import { validarFormulario } from "../utils/validaciones";

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario(producto);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onAgregar(producto);
    setProducto({
      nombre: "",
      precio: "",
      stock: "",
      imagen: "",
      descripcion: "",
    });
    setErrores({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>

      <Form.Group>
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={producto.nombre}
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
          value={producto.precio}
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
          value={producto.stock}
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
          value={producto.imagen}
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
          value={producto.descripcion}
          onChange={handleChangeGenerico(setProducto)}
          required
        />
        {errores.descripcion && (
          <p style={{ color: "red" }}>{errores.descripcion}</p>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar Producto
      </Button>
    </Form>
  );
}

export default FormularioProducto;
