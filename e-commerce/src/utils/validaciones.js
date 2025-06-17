export const validarFormulario = (producto) => {
  const nuevosErrores = {};

  if (!producto.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio.";
  }
  if (!producto.precio || isNaN(producto.precio) || parseFloat(producto.precio) <= 0) {
    nuevosErrores.precio = "El precio debe ser un número mayor que 0.";
  }
  if (!producto.stock || producto.stock < 0) {
    nuevosErrores.stock = "El stock no puede ser negativo.";
  }
  if (!producto.descripcion || producto.descripcion.trim().length < 10) {
    nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/;
  if (!producto.imagen.trim() || !urlPattern.test(producto.imagen)) {
    nuevosErrores.imagen = "Debe ingresar una URL válida de imagen (formato PNG, JPG, GIF, WEBP).";
  }

  return nuevosErrores;
};