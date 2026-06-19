// src/pages/SocialStory.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SocialStory = () => {
  const navigate = useNavigate();

  // Pasos y textos idénticos a herreria.jpg
  const pasosHistoria = [
    { nro: 1, texto: "Ingreso al taller con cuidado." },
    { nro: 2, texto: "Preparo los elementos de protección personal." },
    { nro: 3, texto: "Me posisiono en mi lugar de trabajo." }, // Mantiene ortografía de la captura
    { nro: 4, texto: "Espero las instrucciones del instrucctor/a." } // Mantiene ortografía de la captura
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
      
      {/* Botón de retorno superior */}
      <div style={{ marginBottom: '16px', paddingTop: '8px' }}>
        <button 
          onClick={() => navigate('/como-llegar')} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#000000'
          }}
        >
          ←
        </button>
      </div>

      {/* Encabezado del espacio/taller */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        padding: '12px 16px',
        gap: '16px',
        marginBottom: '28px'
      }}>
        {/* Icono representativo (Yunque/Martillo simulado) */}
        <div style={{ fontSize: '36px', color: '#333333' }}>🔨</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#000000', margin: 0, letterSpacing: '0.5px' }}>
            HERRERIA
          </h1>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#333333', marginTop: '2px' }}>
            Sector: Talleres
          </span>
        </div>
      </div>

      {/* Mensaje de Bienvenida */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#000000', margin: '0 0 4px 0' }}>
          ¡Bienvenido!
        </h2>
        <p style={{ fontSize: '13px', fontWeight: '700', color: '#000000', margin: 0, lineHeight: '1.4' }}>
          Vamos a repasar los pasos a seguir antes de<br />ingresar al taller:
        </p>
      </div>

      {/* Contenedor de la línea de tiempo */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        
        {/* Línea vertical guía de fondo */}
        <div style={{
          position: 'absolute',
          left: '14px',
          top: '20px',
          bottom: '20px',
          width: '2px',
          borderLeft: '2px dashed #e0e0e0',
          zIndex: 0
        }} />

        {/* Mapeo de los pasos secuenciales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pasosHistoria.map((paso) => (
            <div key={paso.nro} style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 1 }}>
              
              {/* Círculo numerado */}
              <div style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#666666',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {paso.nro}
              </div>

              {/* Tarjeta contenedora gris */}
              <div 
                onClick={() => alert(`Ampliando detalles del paso ${paso.nro}`)}
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  cursor: 'pointer',
                  minHeight: '64px',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Icono miniatura de imagen interna */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: '#737373',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '18px', color: '#ffffff' }}>🖼️</span>
                  </div>
                  
                  {/* Texto del paso */}
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000', lineHeight: '1.3', textAlign: 'left' }}>
                    {paso.texto}
                  </span>
                </div>

                {/* Flecha indicadora derecha */}
                <span style={{ fontSize: '14px', color: '#333333', fontWeight: '700', paddingLeft: '4px' }}>
                  &gt;
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Banner de refuerzo inferior (Estrella) */}
      <div style={{
        backgroundColor: '#dbdbdb',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{ fontSize: '26px', color: '#333333' }}>⭐</span>
        <p style={{ fontSize: '13px', fontWeight: '700', color: '#000000', margin: 0, lineHeight: '1.4' }}>
          Seguir estos pasos me ayuda a<br />sentirme seguro<br />y preparado para trabajar.
        </p>
      </div>

    </div>
  );
};

export default SocialStory;
