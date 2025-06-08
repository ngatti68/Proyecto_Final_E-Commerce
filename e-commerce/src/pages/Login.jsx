import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [userValid, setUserValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuthContext();

  // ✅ Validar usuario (mínimo 3 caracteres)
  const validarUser = (valor) => {
    setUser(valor);
    setUserValid(valor.trim().length >= 3);
  };

  // ✅ Validar contraseña (mínimo 6 caracteres)
  const validarPassword = (valor) => {
    setPassword(valor);
    setPasswordValid(valor.trim().length >= 4);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userValid || !passwordValid) {
      setValidated(true); // ✅ Activa validación si los datos no son correctos
      return;
    }

    handleLogin(user, password, navigate);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Iniciar Sesión</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Usuario */}
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={user}
                onChange={(e) => validarUser(e.target.value)}
                className={userValid ? "is-valid" : validated && !userValid ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="valid">¡Usuario válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">El usuario debe tener al menos 3 caracteres.</Form.Control.Feedback>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => validarPassword(e.target.value)}
                  className={passwordValid ? "is-valid" : validated && !passwordValid ? "is-invalid" : ""}
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
                <Form.Control.Feedback type="valid">¡Contraseña segura!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">La contraseña debe tener al menos 6 caracteres.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Botón de enviar */}
            <Button variant="primary" className="w-100" type="submit" disabled={!userValid || !passwordValid}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;