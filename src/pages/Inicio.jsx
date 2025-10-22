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

  // Lógica para cambiar la imagen del carrusel cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid p-0">
      
      <section className="position-relative overflow-hidden" style={{ height: "70vh" }}>
        <img
          src={imagenes[index].src}
          alt={imagenes[index].alt}
          className="d-block w-100 h-100 object-cover transition-opacity duration-1000"
          style={{ opacity: 1, transition: 'opacity 1s ease-in-out' }}
          loading="lazy"
          onError={(e) => {
            console.warn('Imagen no encontrada:', imagenes[index].src);
            
            e.currentTarget.src = '/carrusel/placeholder.jpg';
          }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50"></div>
        
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center p-3">
          <h1 className="display-4 fw-bold mb-3">
            <span className="text-brand-primary">Kareh:</span> Tu Camino a la Recuperación
          </h1>
          <p className="lead mb-4">
            Centro integral de rehabilitación y productos ortopédicos de alta calidad.
          </p>
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

