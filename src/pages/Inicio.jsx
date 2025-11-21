import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const imagenes = [
  {
    id: 1,
    src: "/carrusel/rehab1.jpg", 
    alt: "Rehabilitacion 1"
  },
  {
    id: 2,
    src: "/carrusel/rehab2.jpg",  
    alt: "Rehabilitacion 2"
  },
  {
    id: 3,
    src: "/carrusel/rehab3.jpg", 
    alt: "Rehabilitacion 3"
  }
];

export default function Inicio() {
  const [index, setIndex] = useState(0);

  // Para crossfade entre imágenes
  const [prevIndex, setPrevIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Precargar imágenes y marcar cuando estén listas
  useEffect(() => {
    let cargadas = 0;
    imagenes.forEach((img) => {
      const i = new Image();
      i.src = img.src;
      i.onload = () => {
        cargadas += 1;
        if (cargadas === imagenes.length) setLoaded(true);
      };
      i.onerror = () => {
        cargadas += 1;
        if (cargadas === imagenes.length) setLoaded(true);
      };
    });
  }, []);

  return (
    <div className="container-fluid p-0">
      
      <section className="position-relative overflow-hidden" style={{ height: "70vh" }}>
        <div id="carouselInicio" className="carousel slide carousel-fade h-100" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {imagenes.map((img, i) => (
              <button
                key={img.id}
                type="button"
                data-bs-target="#carouselInicio"
                data-bs-slide-to={i}
                className={i === 0 ? 'active' : ''}
                aria-current={i === 0 ? 'true' : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner h-100">
            {imagenes.map((img, i) => (
              <div key={img.id} className={`carousel-item h-100 ${i === 0 ? 'active' : ''}`}>
                <img
                  src={img.src}
                  className="d-block w-100 carousel-image"
                  alt={img.alt}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/carrusel/placeholder.jpg'; }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1 className="display-4 fw-bold mb-3">Kareh: Tu Camino a la Recuperación</h1>
                  <p className="lead">Centro integral de rehabilitación y productos ortopédicos de alta calidad.</p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselInicio" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselInicio" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      <section className="py-5 bg-gray-200">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="display-6 fw-bold mb-4 text-brand-secondary">
                Recuperación Personalizada y Profesionalismo
              </h2>
              <p className="fs-5 text-gray-700">
                En Kareh, combinamos tecnología avanzada con terapias humanas para ofrecer un plan de rehabilitación único. Nuestro compromiso es devolverte la movilidad y la calidad de vida que mereces.
              </p>
              <div className="d-flex justify-content-center mt-4">
                  <div className="mx-4">
                      <p className="h1 text-brand-primary">🧡</p>
                      <p className="fw-bold">Atención Humana</p>
                  </div>
                   <div className="mx-4">
                      <p className="h1 text-brand-primary">💪</p>
                      <p className="fw-bold">Alta Experiencia</p>
                  </div>
                   <div className="mx-4">
                      <p className="h1 text-brand-primary">🛠️</p>
                      <p className="fw-bold">Equipamiento Moderno</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-brand-secondary text-white py-5 text-center">
        <div className="container">
            <h2 className="display-5 fw-bold mb-3">¿Necesitas ayuda inmediata?</h2>
            <p className="lead mb-4">Explora nuestro catálogo de productos ortopédicos y de apoyo para el hogar.</p>
        </div>
      </section>

    </div>
  );
}

