import React from "react";
import videoFile from "/cake.mp4";

import "../styles/acerca-de.css"

function AcercaDe() {
  return (
    <div className="container">
      <div className="info">
        <h1>¡Sean bienvenidos a Dulce Bombón!</h1>
        <h2>Nuestra Marca Reconocida</h2>
        <p>
          Con más de 12 años en el mercado, nuestra pastelería Dulce Bombón se
          ha consolidado como una empresa líder en la industria de la
          pastelería. Nuestra trayectoria nos respalda y nos ha convertido en la
          elección preferida de muchos clientes.
        </p>

        <h2>Ventas Online y en Sucursales</h2>
        <p>
          En Dulce Bombón, ofrecemos nuestros exquisitos productos tanto en
          línea como en nuestras sucursales. Esto nos permite llegar a un
          público más amplio y satisfacer las necesidades de nuestros clientes
          dondequiera que estén.
        </p>

        <h2>Distribución a Otros Negocios y Eventos</h2>
        <p>
          Además de nuestras ventas directas, también ofrecemos nuestros
          productos a otros negocios para su venta o para eventos especiales.
          Nuestros productos artesaneles son altamente valorados por su calidad
          y sabor, lo que los convierte en una opción ideal para cualquier
          ocasión.
        </p>
      </div>
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={videoFile} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    </div>
  );
}

export default AcercaDe;
