import { useState } from "react";

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
      // Permitir valores vacíos o cualquier número sin forzar formato
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setProducto({ ...producto, [name]: value });
      }
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  // ✅ Aplicar formato solo cuando el usuario sale del campo
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "precio" && value !== "") {
      setProducto({ ...producto, [name]: parseFloat(value).toFixed(2) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(producto);
    setProducto({ nombre: "", precio: "", stock: "", imagen: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="text" /* 👈 Cambia a text para evitar problemas con number */
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          onBlur={handleBlur} /* ✅ Aplica formato solo al salir del campo */
          required
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>URL de imagen:</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
