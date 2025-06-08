import Navbar from "./Navbar";
import Cart from "./Cart";
import { useCartContext } from "../context/CartContext"; 

const Header = () => {
  const { mostrarCarrito, toggleCarrito, carrito } = useCartContext(); 

  return (
    <header className="header">
      <Navbar />
      {mostrarCarrito && <Cart />}
    </header>
  );
};

export default Header;