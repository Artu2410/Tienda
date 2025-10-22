import React from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: "🦴",
    title: "Kinesiología Traumatológica",
    description: "Rehabilitación funcional avanzada para lesiones deportivas, post-quirúrgicas y articulares. Enfocados en la recuperación total de la movilidad y la fuerza.",
  },
  {
    icon: "🫁",
    title: "Rehabilitación Respiratoria",
    description: "Programas personalizados para optimizar la función pulmonar, reducir la disnea y mejorar la calidad de vida en pacientes con condiciones respiratorias crónicas.",
  },
  {
    icon: "⚡",
    title: "Alquiler de Magnetoterapia y TENS",
    description: "Equipos de Magnetoterapia y Estimulación Nerviosa Transcutánea (TENS) de alta frecuencia para tratamientos efectivos de manejo del dolor e inflamación en tu hogar.",
  },
  {
    icon: "🦼",
    title: "Alquiler de Equipos Ortopédicos",
    description: "Disponibilidad inmediata de sillas de ruedas, andadores y muletas. Soluciones temporales para facilitar la movilidad y el cuidado del paciente. ",
  },
];

export default function Servicios() {
  return (
    <section className="container py-5 my-5"> 

      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-brand-secondary">
          🤝 Nuestro Centro de Rehabilitación
        </h2>
        <p className="lead text-gray-700 mt-3">
          Ofrecemos terapias especializadas, equipos de soporte en alquiler y venta de productos, garantizando una recuperación segura y completa.
        </p>
      </div>
      
      <div className="row g-4 justify-content-center">
        {services.map((service, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-6"> 
            <div 
              className="card h-100 p-4 border-2 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:border-brand-primary"
              style={{ borderColor: "var(--color-turquesa-suave)", backgroundColor: "#ffffff" }} 
            >
              <div className="card-body d-flex flex-column"> 
                <div className="d-flex align-items-center mb-3"> 
                  <span className="fs-1 me-4 text-brand-primary">{service.icon}</span> 
                  
                  <h3 className="card-title h5 fw-bolder text-brand-secondary m-0">
                    {service.title}
                  </h3>
                </div>
                
                <p className="card-text text-gray-700 flex-grow-1">
                  {service.description}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-5 pt-4">
        <p className="lead text-gray-900 mb-4">
          ¿Necesitas una consulta o presupuesto para alquiler? Contáctanos hoy para recibir orientación.
        </p>
        <button 
          className="btn bg-brand-primary btn-lg fw-bold hover:bg-brand-primary-hover shadow-md"
          onClick={() => console.log("Navegar a Contacto/Cita")} 
        >
          Solicitar Cita o Presupuesto
        </button>
      </div>
    </section>
  );
}