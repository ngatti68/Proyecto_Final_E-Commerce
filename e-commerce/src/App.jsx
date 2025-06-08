import Header from "./components/Header"
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;