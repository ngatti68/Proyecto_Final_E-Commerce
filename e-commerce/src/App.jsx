import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import Cart from "./components/Cart"; // ✅ Importar el panel lateral
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
      <Cart /> {/* ✅ Panel lateral siempre disponible */}
    </div>
  );
};

export default App;