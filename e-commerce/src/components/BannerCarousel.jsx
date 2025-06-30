import { Carousel } from "react-bootstrap";
import "../styles/inicio.css";

const BannerCarousel = () => (
  <Carousel fade controls={false} indicators={false} interval={3000}>
    <Carousel.Item>
      <img
        className="d-block w-100 banner-img"
        src="https://github.com/JenaManinoMartin/DulceBombon/blob/main/static/img/bannerCake.jpg?raw=true"
        alt="Bienvenida"
      />
      <Carousel.Caption>
        <h3>¡Bienvenido a la tienda!</h3>
        <p>Explorá nuestras novedades</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 banner-img"
        src="https://github.com/JenaManinoMartin/DulceBombon/blob/main/static/img/macaroon-1.jpeg?raw=true"
        alt="Ofertas"
      />
      <Carousel.Caption>
        <h3>¡No te resistas a la tentación!</h3>
        <p>Hasta 30% OFF en productos seleccionados</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default BannerCarousel;
