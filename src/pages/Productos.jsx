import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const manejarEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    // Navegar al formulario de edición
    navigate('/formulario-producto', { state: { producto } });
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  const formatPrice = (p) => {
    const n = Number(p) || 0;
    return new Intl.NumberFormat('es-AR').format(n);
  };

  // Componente interno para manejar carga y fallback de imagen
  const ProductCard = ({ producto }) => {
    const [loaded, setLoaded] = useState(false);
    const [src, setSrc] = useState(producto.avatar || '/carrusel/placeholder.svg');

    return (
      <article className="card h-100 shadow-sm">
        <div className="image-wrapper">
          <div className={`image-placeholder ${loaded ? 'hidden' : ''}`}></div>
          <img
            src={src}
            alt={producto.nombre}
            className={`product-image ${loaded ? 'loaded' : ''}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={(e) => { e.currentTarget.onerror = null; setSrc('/carrusel/placeholder.svg'); setLoaded(true); }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-muted">
            {producto.descripcion ? (producto.descripcion.length > 120 ? producto.descripcion.slice(0, 117) + '...' : producto.descripcion) : 'Sin descripción'}
          </p>
          <p className="card-text fw-bold">Precio: ${formatPrice(producto.precio)}</p>
          <div className="d-flex gap-2 mt-2 actions">
            <Link to={`/productos/${producto.id}`} state={{producto}} className="btn btn-sm btn-outline-secondary">Más detalles</Link>
            <button onClick={() => agregarAlCarrito(producto)} className="btn btn-sm btn-success">Comprar</button>
          </div>
          {esAdmin && (
            <div className="d-flex gap-2 mt-3 actions">
              <button onClick={() => manejarEditar(producto)} className="btn btn-sm btn-warning">Editar</button>
              <button onClick={() => manejarEliminar(producto)} className="btn btn-sm btn-danger">Eliminar</button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="container py-4">
      <div className="row gy-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>

      <CarritoCompras />
    </div>
  );
}

const ProductoItem = ({ producto, esAdmin, onEditar, onEliminar, onAgregarCarrito }) => (
  <li>
    <h2>{producto.nombre}</h2>
    <p>Descripción: {producto.descripcion}</p>
    <img src={producto.avatar || '/carrusel/placeholder.svg'} alt={producto.nombre} width="80%" />
    <p><strong>Precio: ${producto.precio}</strong></p>
   
    <Link to={`/productos/${producto.id}`} state={{producto}}>
      <button>Más detalles</button>
    </Link>
   
    <button onClick={onAgregarCarrito}>Comprar</button>

    {/* BOTONES ADMIN - Agregar contenedor */}
    {esAdmin && (
      <div className="btn-admin-container">
        <hr/>
        <button onClick={onEditar} className="btn-editar">
          Editar
        </button>
        <button onClick={onEliminar} className="btn-eliminar">
          Eliminar
        </button>
      </div>
    )}
  </li>
);