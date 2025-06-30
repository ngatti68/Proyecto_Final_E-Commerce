import BannerCarousel from "../components/BannerCarousel";
import { Helmet } from "react-helmet";

import "../styles/inicio.css";

function Inicio() {
  const productosDestacados = [
    {
      image:
        "https://github.com/JenaManinoMartin/DulceBombon/blob/main/static/img/chocolate-piece-cake-1.png?raw=true",
      name: "Torta de Chocolate",
      cost: "$5000,00",
    },
    {
      image:
        "https://raw.githubusercontent.com/JenaManinoMartin/DulceBombon/refs/heads/main/static/img/slice-coffee-cake.webp",
      name: "Tarta Amaretto",
      cost: "$5000,00",
    },
    {
      image:
        "https://github.com/JenaManinoMartin/DulceBombon/blob/main/static/img/redVelvet-piece-cake-1.png?raw=true",
      name: "Torta Red Velvet",
      cost: "$5000,00",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Dulce Bombón</title>
        <meta
          name="description"
          content="Explorá nuestros productos de pastelería artesanal: tortas, bombones y más. Calidad premium, hecho en Mendoza."
        />
        <meta
          name="keywords"
          content="pastelería, tortas, dulces, bombones, Mendoza, repostería"
        />
        <meta name="author" content="Dulce Bombón" />
      </Helmet>

      <BannerCarousel />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Productos destacados</h2>
        <div className="slider__item">
          {productosDestacados.map((item, index) => (
            <article className="card-item" key={index}>
              <a className="card-item__link" href="#">
                <picture className="card-item__cover">
                  <img src={item.image} alt={`imagen de ${item.name}`} />
                </picture>
                <div className="card-item__content">
                  <h4 className="card-item__name">{item.name.toUpperCase()}</h4>
                  <p className="card-item__price">{item.cost}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
