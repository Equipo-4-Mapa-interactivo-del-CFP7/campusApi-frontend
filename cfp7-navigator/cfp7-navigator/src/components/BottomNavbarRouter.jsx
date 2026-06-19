// src/components/BottomNavbarRouter.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavbarRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ocultamos la barra por completo si el usuario está en el Login
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  // Estructura de botones exacta a tu Figma
  const botonesNav = [
    { id: 'home', texto: 'Home', icono: '🏠', ruta: '/home' },
    { id: 'mapa', texto: 'Mapa', icono: '🗺️', ruta: '/mapa' },
    { id: 'buscador', texto: 'Buscador', icono: '🔍', ruta: '/espacios' },
    { id: 'incidentes', texto: 'Incidentes', icono: '⚠️', ruta: '/reportes' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: '65px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)',
      boxSizing: 'border-box',
      paddingBottom: '4px'
    }}>
      {botonesNav.map((boton) => {
        // Detecta si el botón coincide con la pantalla actual para pintarlo de azul
        const estaActivo = location.pathname === boton.ruta;

        return (
          <div
            key={boton.id}
            onClick={() => navigate(boton.ruta)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexGrow: 1,
              height: '100%',
              gap: '3px',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Ícono de la opción */}
            <span style={{ 
              fontSize: '20px',
              transform: estaActivo ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}>
              {boton.icono}
            </span>
            
            {/* Texto de la opción */}
            <span style={{
              fontSize: '11px',
              fontWeight: estaActivo ? '700' : '500',
              color: estaActivo ? '#3b82f6' : '#64748b',
              fontFamily: 'sans-serif'
            }}>
              {boton.texto}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNavbarRouter;