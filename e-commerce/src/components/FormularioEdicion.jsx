import { useState, useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { validarFormulario } from "../utils/validaciones";

const FormularioEdicion = ({ id, onEditar, onCancelar }) => {
  const { getProductById } = useContext(AdminContext);
  const [producto, setProducto] = useState(null);
  const [errores, setErrores] = useState({});

  // Obtener producto por ID al cargar el formulario
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      if (data) {
        setProducto(data);
      } else {
        console.error("Producto no encontrado, inicializando valores vacíos.");
        setProducto({ nombre: "", precio: "", stock: "", imagen: "" });
      }
    };

    fetchProduct();
  }, [id]);

  // Manejar cambios en los campos del formulario
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

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!producto || !producto.nombre) {
      console.error("Error: producto es undefined o vacío");
      return;
    }

    const nuevosErrores = validarFormulario(producto);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onEditar(id, producto);
    setProducto(null); // ✅ Limpiar el estado
    setErrores({});
    onCancelar(); // ✅ Cerrar el formulario de edición
  };

  // Botón para cancelar edición
  const handleCancel = () => {
    setProducto(null); // ✅ Limpiar formulario
    setErrores({});
    onCancelar(); // ✅ Llama la función que cancela la selección en Admin.jsx
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}
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
        {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}
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
        <label>Imagen:</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={handleCancel}>
        Cancelar
      </button>{" "}
      {/* ✅ Botón cancelar */}
    </form>
  );
};

export default FormularioEdicion;
