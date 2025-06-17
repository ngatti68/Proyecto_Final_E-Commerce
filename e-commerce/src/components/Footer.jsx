import { Container, Row, Col } from "react-bootstrap";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer py-3">
      <Container>
        <Row className="d-flex align-items-center text-center">
          <Col xs={12} md={6} className="text-md-start">
            <p className="fw-bold mb-0">
              &copy; {new Date().getFullYear()} Tienda Online - Todos los
              derechos reservados.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <p className="fw-bold mb-0">
              Desarrollado por <strong>Norberto Gatti</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
