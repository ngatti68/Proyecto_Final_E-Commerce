export const handleChangeGenerico = (setProducto) => (e) => {
  const { name, value } = e.target;
  setProducto((prev) => ({
    ...prev,
    [name]: name === "precio" && value ? value.replace(",", ".") : value,
  }));
};

export const handleBlurGenerico = (setProducto) => (e) => {
  const { name, value } = e.target;
  if (name === "precio" && value) {
    setProducto((prev) => ({ ...prev, [name]: parseFloat(value).toFixed(2) }));
  }
};