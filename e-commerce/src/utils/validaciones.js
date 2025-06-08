export const validarFormulario = (producto) => {
  const nuevosErrores = {};

  if (!producto.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio.";
  }
  if (!producto.precio || isNaN(producto.precio) || producto.precio <= 0) {
    nuevosErrores.precio = "El precio debe ser un número mayor que 0.";
  }
  if (!producto.stock || producto.stock < 0) {
    nuevosErrores.stock = "El stock no puede ser negativo.";
  }
  if (!producto.imagen.trim()) {
    nuevosErrores.imagen = "Debe ingresar una URL válida de imagen.";
  }

  return nuevosErrores; 
};