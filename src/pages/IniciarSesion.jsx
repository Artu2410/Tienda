import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    // Simular delay de verificación
    setTimeout(() => {
      // Verificar credenciales (admin/1234@admin)
      if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
        localStorage.setItem("authEmail", formulario.email);
        iniciarSesion("admin", formulario.email);
        navigate("/dashboard");
      }
      // Lógica para usuarios normales - SOLO si NO es admin
      else if (
        formulario.nombre &&
        formulario.email &&
        formulario.nombre !== "admin"
      ) {
        localStorage.setItem("authEmail", formulario.email);
        iniciarSesion(formulario.nombre, formulario.email);

        // Si venía del carrito, redirige a pagar
        if (ubicacion.state?.carrito) {
          navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
        } else {
          navigate("/productos");
        }
      } else {
        setError("Credenciales incorrectas. Usa: admin / 1234@admin para administrador");
      }
      setCargando(false);
    }, 500);
  };

  return (
    <ContenedorPrincipal>
      <ContenedorFormulario>
        <Encabezado>
          <LogoIcono>🏥</LogoIcono>
          <Titulo>Centro Kareh</Titulo>
          <Subtitulo>Tu camino hacia la recuperación</Subtitulo>
        </Encabezado>

        <FormularioEstilizado onSubmit={manejarEnvio}>
          <GrupoFormulario>
            <EtiquetaIcono><FaUser /></EtiquetaIcono>
            <InputEstilizado
              type="text"
              placeholder="Nombre completo"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({ ...formulario, nombre: e.target.value })
              }
              required
            />
          </GrupoFormulario>

          <GrupoFormulario>
            <EtiquetaIcono><FaEnvelope /></EtiquetaIcono>
            <InputEstilizado
              type="email"
              placeholder="Correo electrónico"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
              required
            />
          </GrupoFormulario>

          {error && <MensajeError>{error}</MensajeError>}

          <BotonesCont>
            <BotonPrincipal type="submit" disabled={cargando}>
              {cargando ? "Verificando..." : "Iniciar Sesión"}
              {!cargando && <FaArrowRight style={{ marginLeft: "8px" }} />}
            </BotonPrincipal>
            <BotonSecundario type="button" onClick={() => navigate("/productos")}>
              Cancelar
            </BotonSecundario>
          </BotonesCont>
        </FormularioEstilizado>

        <CredencialesPrueba>
          <TituloCredenciales>📋 Credenciales de Prueba (Admin)</TituloCredenciales>
          <CredencialItem>
            <CredencialLabel>Nombre:</CredencialLabel>
            <CredencialValor>admin</CredencialValor>
          </CredencialItem>
          <CredencialItem>
            <CredencialLabel>Email:</CredencialLabel>
            <CredencialValor>1234@admin</CredencialValor>
          </CredencialItem>
        </CredencialesPrueba>

        <PieDeFormulario>
          <p>También puedes iniciar sesión con tu nombre y email personal</p>
        </PieDeFormulario>
      </ContenedorFormulario>

      <ContenedorFondo />
    </ContenedorPrincipal>
  );
}

// Styled Components
const ContenedorPrincipal = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #7EE8D8 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContenedorFondo = styled.div`
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const ContenedorFormulario = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(13, 148, 136, 0.3);
  max-width: 420px;
  width: 100%;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 15px;
  }
`;

const Encabezado = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoIcono = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  color: #0D9488;
  margin: 0.5rem 0;
  font-weight: 700;
`;

const Subtitulo = styled.p`
  color: #64748B;
  font-size: 0.95rem;
  margin: 0.5rem 0 0 0;
`;

const FormularioEstilizado = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const GrupoFormulario = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const EtiquetaIcono = styled.span`
  position: absolute;
  left: 1rem;
  color: #14B8A6;
  font-size: 1.1rem;
  z-index: 1;
`;

const InputEstilizado = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #14B8A6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    background-color: #F0FFFE;
  }

  &::placeholder {
    color: #94A3B8;
  }
`;

const MensajeError = styled.div`
  background-color: #FFE0E0;
  color: #DC2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border-left: 4px solid #DC2626;
`;

const BotonesCont = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const BotonPrincipal = styled.button`
  background: linear-gradient(90deg, #0D9488 0%, #14B8A6 100%);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(13, 148, 136, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BotonSecundario = styled.button`
  background-color: #E2E8F0;
  color: #475569;
  padding: 0.875rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #CBD5E1;
  }
`;

const CredencialesPrueba = styled.div`
  background: linear-gradient(135deg, #F0FFFE 0%, #E0F7F6 100%);
  border: 2px solid #A7F3D0;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
`;

const TituloCredenciales = styled.h3`
  color: #0D9488;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
`;

const CredencialItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.9rem;
`;

const CredencialLabel = styled.span`
  color: #475569;
  font-weight: 600;
`;

const CredencialValor = styled.code`
  background-color: white;
  color: #14B8A6;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-family: "Courier New", monospace;
  font-weight: 700;
  border: 1px solid #A7F3D0;
`;

const PieDeFormulario = styled.div`
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #E2E8F0;

  p {
    color: #64748B;
    font-size: 0.9rem;
    margin: 0;
  }
`;