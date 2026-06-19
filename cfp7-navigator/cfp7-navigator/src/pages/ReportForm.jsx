// src/pages/ReportForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const navigate = useNavigate();

  // Estados para capturar las opciones del formulario
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [dondeOcurrio, setDondeOcurrio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirige directamente a la pantalla de éxito
    navigate('/reporte-exitoso');
  };

  // Listado exacto de las tarjetas de la captura de pantalla
  const tiposIncidencia = [
    { id: 'rampa', texto: 'No hay rampa', icono: '♿' },
    { id: 'senaletica', texto: 'Señalética dañada', icono: '🖼️' },
    { id: 'obstaculo', texto: 'Hay un obstacle', icono: '⚠️' },
    { id: 'otro', texto: 'Otro', icono: '•••' }
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
      
      {/* Título superior */}
      <h1 style={{ 
        fontSize: '18px', 
        fontWeight: '700', 
        color: '#000000', 
        textAlign: 'center',
        marginTop: '8px',
        marginBottom: '24px'
      }}>
        Reporte de incidencia
      </h1>

      <form onSubmit={handleSubmit}>
        
        {/* SECCIÓN: Tipo de incidencia (Grilla 2x2) */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '12px' }}>
            Tipo de incidencia
          </span>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {tiposIncidencia.map((tipo) => {
              const esActivo = tipoSeleccionado === tipo.id;
              return (
                <div
                  key={tipo.id}
                  onClick={() => setTipoSeleccionado(tipo.id)}
                  style={{
                    backgroundColor: '#e0e0e0',
                    padding: '16px 8px',
                    borderRadius: '8px',
                    border: esActivo ? '2px solid #3b82f6' : '1px solid #cccccc',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '6px',
                    height: '85px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span style={{ fontSize: tipo.id === 'otro' ? '14px' : '24px', color: '#555555' }}>
                    {tipo.icono}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#000000', lineHeight: '1.2' }}>
                    {tipo.texto}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECCIÓN: Dónde ocurrió */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '8px' }}>
            Dónde ocurrió
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Seleccionar en el mapa"
              value={dondeOcurrio}
              onChange={(e) => setDondeOcurrio(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                paddingRight: '40px',
                borderRadius: '8px',
                border: '1px solid #b0b0b0',
                fontSize: '14px',
                boxSizing: 'border-box',
                color: '#333333'
              }}
            />
            <span 
              style={{ position: 'absolute', right: '14px', color: '#888888', fontSize: '18px', cursor: 'pointer' }}
              onClick={() => navigate('/mapa')}
            >
              📍
            </span>
          </div>
        </div>

        {/* SECCIÓN: Descripción */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '8px' }}>
            Descripción
          </label>
          <textarea
            placeholder="El camino presenta obstáculos..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #b0b0b0',
              fontSize: '14px',
              fontFamily: 'sans-serif',
              boxSizing: 'border-box',
              color: '#333333',
              resize: 'none'
            }}
          />
        </div>

        {/* SECCIÓN: Agregar foto */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '8px' }}>
            Agregar foto (opcional)
          </label>
          
          <div 
            onClick={() => alert('Abrir cámara o galería del dispositivo')}
            style={{
              width: '55px',
              height: '55px',
              backgroundColor: '#737373',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '24px', color: '#ffffff' }}>🖼️</span>
          </div>
        </div>

        {/* 🛠️ MODIFICACIÓN: Botón enviar estilizado, centrado y más chico */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{
            width: 'fit-content',          // Hace que solo ocupe lo que mide su texto
            minWidth: '180px',             // Le da una base simétrica linda
            padding: '10px 24px',          // Relleno más sutil (menos tosco)
            backgroundColor: '#737373',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',          // Bordes redondeados estilo cápsula mobile
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Pequeña sombra para realzarlo
          }}>
            Enviar reporte
          </button>
        </div>

      </form>

      {/* Pie de página */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '30px' }}>
        Creado Equipo 4 - 2026
      </p>
    </div>
  );
};

export default ReportForm;