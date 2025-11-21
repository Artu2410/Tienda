import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Valida el Producto
  const validarProducto = (producto) => {
    const errores = {};

    // nombre
    if (!producto.nombre?.trim()) {
      errores.nombre = 'El nombre es obligatorio.';
    }

    // precio
    if (!producto.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
     
      if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }

    // descripción
    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 200) {
      errores.descripcion = 'Máximo 200 caracteres.';
    }

    return errores;
  };

  // Valida el Formulario
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        // Usar la URL de MockAPI indicada por el usuario
        const API_BASE = 'https://68f82c74deff18f212b557ba.mockapi.io/api/productos';
        console.debug('[ProductsContext] cargando productos desde', API_BASE);
        const respuesta = await fetch(API_BASE);
        if (!respuesta.ok) throw new Error('Error al cargar productos');
        const datos = await respuesta.json();
        console.debug('[ProductsContext] productos recibidos:', Array.isArray(datos) ? datos.length : typeof datos);

        // Normalizar campo avatar: usar placeholder cuando no exista
        const candidatos = (Array.isArray(datos) ? datos : []).map(p => ({
          ...p,
          avatar: p.avatar || p.image || p.avatarUrl || '/carrusel/placeholder.svg'
        }));

        // Función auxiliar: verifica si una URL de imagen carga correctamente
        const validarImagen = (url) => new Promise((resolve) => {
          if (!url) return resolve(false);
          try {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
          } catch (err) {
            resolve(false);
          }
        });

        // Validar cada avatar y reemplazar por placeholder si falla
        const productosNormalizados = await Promise.all(candidatos.map(async (p) => {
          // Si es ruta relativa o data URI, damos por válido
          if (!p.avatar || p.avatar.startsWith('/') || p.avatar.startsWith('data:')) return p;
          const ok = await validarImagen(p.avatar);
          return ok ? p : { ...p, avatar: '/carrusel/placeholder.svg' };
        }));

        setProductos(productosNormalizados);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const API_BASE = 'https://68f82c74deff18f212b557ba.mockapi.io/api/productos';
      console.debug('[ProductsContext] agregando producto a', API_BASE, nuevoProducto);
      const respuesta = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      const data = await respuesta.json();
      const normalizado = { ...data, avatar: data.avatar || data.image || data.avatarUrl || '/carrusel/placeholder.svg' };
      setProductos(prev => [...prev, normalizado]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      const API_BASE = 'https://68f82c74deff18f212b557ba.mockapi.io/api/productos';
      console.debug('[ProductsContext] editando producto en', `${API_BASE}/${productoActualizado.id}`);
      const respuesta = await fetch(`${API_BASE}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      const normalizado = { ...data, avatar: data.avatar || data.image || data.avatarUrl || '/carrusel/placeholder.svg' };
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? normalizado : producto
        )
      );
      return normalizado;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};

