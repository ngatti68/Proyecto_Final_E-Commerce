import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [validated, setValidated] = useState(false);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setValidated(true);
      return;
    }

    toast.success(`✅ Mensaje enviado por: ${formData.nombre}`, { position: "top-right", autoClose: 3000 });
    setFormData({ nombre: "", email: "", mensaje: "" });
    setValidated(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Contacto</h2>
          <Form noValidate validated={validated} onSubmit={manejarEnvio}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                isInvalid={validated && !formData.nombre.trim()}
              />
              <Form.Control.Feedback type="invalid">El nombre es obligatorio.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingrese su correo"
                value={formData.email}
                onChange={manejarCambio}
                isInvalid={validated && !formData.email.trim()}
              />
              <Form.Control.Feedback type="invalid">El correo es obligatorio.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                name="mensaje"
                placeholder="Escribe tu mensaje"
                value={formData.mensaje}
                onChange={manejarCambio}
                rows={4}
                isInvalid={validated && !formData.mensaje.trim()}
              />
              <Form.Control.Feedback type="invalid">El mensaje es obligatorio.</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" className="w-100" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contactos;