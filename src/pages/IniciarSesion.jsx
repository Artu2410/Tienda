import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });
  const [error, setError] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError("");

    if (!formulario.nombre || !formulario.email) {
      setError("Completa nombre y correo electrónico");
      return;
    }

    // Credenciales admin
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin");
      navigate("/dashboard");
      return;
    }

    // Usuario normal
    localStorage.setItem("authEmail", formulario.email);
    iniciarSesion(formulario.nombre);

    if (ubicacion.state?.carrito) {
      navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
    } else {
      navigate("/productos");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-sm" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-3">Iniciar sesión</h3>
          <p className="text-muted" style={{ fontSize: 14 }}>Ingresa tu nombre y correo para continuar.</p>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <form onSubmit={manejarEnvio}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre completo"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="nombre@ejemplo.com"
                value={formulario.email}
                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/productos')}>Cancelar</button>
            </div>
          </form>

          <div className="mt-3 text-muted" style={{ fontSize: 13 }}>
            <strong>Credenciales de prueba:</strong> admin / 1234@admin
          </div>
        </div>
      </div>
    </div>
  );
}