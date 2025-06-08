import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";

import "../styles/admin.css";

const Admin = () => {
  const { products, addProduct, editProduct, deleteProduct } =
    useContext(AdminContext);
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="admin-container">
      <h2>Administración de Productos</h2>

      {/* Formulario para agregar productos */}
      <FormularioProducto onAgregar={addProduct} />

      {/* Formulario de edición si hay un producto seleccionado */}
      {selectedProductId && (
        <FormularioEdicion
          id={selectedProductId}
          onEditar={editProduct}
          onCancelar={() => setSelectedProductId(null)} // ✅ Cerrar formulario tras guardar
        />
      )}

      {/* Lista de productos con botones de acción */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.nombre}</strong> - ${product.precio} - Stock:{" "}
            {product.stock}
            <img src={product.imagen} alt={product.nombre} width="50" />
            {/* Botón para activar edición */}
            <button onClick={() => setSelectedProductId(product.id)}>
              Editar
            </button>
            {/* Botón para eliminar */}
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
