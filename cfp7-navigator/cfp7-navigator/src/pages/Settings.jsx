// src/pages/Settings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // Estados para simular la activación de cada switch de la captura ajuste.jpg
  const [options, setOptions] = useState({
    altoContraste: false,
    textoGrande: false,
    lecturaFacil: false,
    modoSimplificado: false,
    lectorPantalla: false,
  });

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Listado de configuraciones calcadas de ajuste.jpg
  const configuraciones = [
    {
      key: 'altoContraste',
      titulo: 'Alto contraste',
      subtitulo: 'Mejora visibilidad del mapa.',
      icono: '☀️'
    },
    {
      key: 'textoGrande',
      titulo: 'Texto grande',
      subtitulo: 'Aumenta tamaño de letra.',
      icono: 'Aa'
    },
    {
      key: 'lecturaFacil',
      titulo: 'Lectura fácil',
      subtitulo: 'Tipografía y espaciado optimizados.',
      icono: '📖'
    },
    {
      key: 'modoSimplificado',
      titulo: 'Modo simplificado',
      subtitulo: 'Navegación e iconografía básica.',
      icono: '😀'
    },
    {
      key: 'lectorPantalla',
      titulo: 'Lector de pantalla',
      subtitulo: 'Compatible VoiceOver/ TalkBack.',
      icono: '📢'
    }
  ];

  return (
    <div style={{
      padding: '16px',
      paddingBottom: '100px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* Barra superior */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '28px',
        position: 'relative',
        paddingTop: '8px'
      }}>
        <button 
          onClick={() => navigate('/home')} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#000000',
            position: 'absolute',
            left: '4px'
          }}
        >
          ←
        </button>
        <h1 style={{ 
          fontSize: '16px', 
          fontWeight: '800', 
          color: '#000000', 
          margin: '0 auto',
          textAlign: 'center',
          letterSpacing: '0.5px'
        }}>
          ACCESIBILIDAD
        </h1>
      </div>

      {/* Lista de Tarjetas de Configuración */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {configuraciones.map((config) => {
          const isActive = options[config.key];
          return (
            <div 
              key={config.key}
              style={{
                backgroundColor: '#e0e0e0', // Gris claro idéntico a las tarjetas del Figma
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                minHeight: '75px'
              }}
            >
              {/* Contenedor Izquierdo: Icono + Textos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, paddingRight: '12px' }}>
                {/* Icono de la opción */}
                <span style={{ 
                  fontSize: config.key === 'textoGrande' ? '18px' : '22px', 
                  fontWeight: config.key === 'textoGrande' ? '700' : 'normal',
                  color: '#333333',
                  width: '28px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}>
                  {config.icono}
                </span>

                {/* Textos Informativos */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#000000', marginBottom: '2px' }}>
                    {config.titulo}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#333333', lineHeight: '1.2' }}>
                    {config.subtitulo}
                  </span>
                </div>
              </div>

              {/* Contenedor Derecho: Interruptor (Switch) Estilizado */}
              <div 
                onClick={() => toggleOption(config.key)}
                style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: isActive ? '#3b82f6' : '#a3a3a3', // Se vuelve azul si se activa
                  borderRadius: '12px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  flexShrink: 0
                }}
              >
                {/* Círculo deslizable interno */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: isActive ? '23px' : '3px', // Se desliza según el estado activo
                  transition: 'left 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </div>

            </div>
          );
        })}
      </div>

      {/* Pie de página */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '40px' }}>
                  Creado Equipo 4 - 2026

      </p>
    </div>
  );
};

export default Settings;