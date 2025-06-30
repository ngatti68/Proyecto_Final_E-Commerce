import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaLocationDot,
  FaEnvelope,
  FaPhoneVolume,
} from "react-icons/fa6";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="logo-container mb-3">
              <img
                src="/DulceBombon.png"
                alt="Logo Dulce Bombón"
                className="navbar-logo"
              />
            </div>
            <div className="footer-links d-flex justify-content-center justify-content-md-start gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/norberto.o.gatti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/norberto-gatti-1a42aa58/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="col-12 col-md-4 d-md-flex flex-column align-items-md-start">
            <h4 className="info-h4 text-center text-md-end">Información</h4>
            <ul className="footer-ul list-unstyled text-center text-md-end">
              <li>
                <FaLocationDot className="me-2" /> Mendoza, Argentina
              </li>
              <li>
                <FaEnvelope className="me-2" /> dulcebombonpasteleria@gmail.com
              </li>
              <li>
                <FaPhoneVolume className="me-2" /> 54 9 261 333-1122
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
