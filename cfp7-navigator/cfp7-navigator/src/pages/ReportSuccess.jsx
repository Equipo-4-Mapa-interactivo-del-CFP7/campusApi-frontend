// src/pages/ReportSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '16px',
      paddingBottom: '100px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Barra superior con flecha de volver y título */}
      <div style={{ 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '40px',
        position: 'relative',
        paddingTop: '8px'
      }}>
        <button 
          onClick={() => navigate('/reportes')} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000',
            position: 'absolute',
            left: '4px'
          }}
        >
          ←
        </button>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#000000', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          Reporte de incidencia
        </h1>
      </div>

      {/* Círculo de check de éxito estilo Figma */}
      <div style={{
        width: '140px',
        height: '140px',
        backgroundColor: '#a3a3a3', // Gris del círculo interior
        borderRadius: '50%',
        border: '4px solid #3b82f6', // Borde azul grueso
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <span style={{ fontSize: '65px', color: '#ffffff', fontWeight: '300' }}>✓</span>
      </div>

      {/* Textos principales */}
      <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#000000', margin: '0 0 10px 0' }}>
        ¡Gracias!
      </h2>
      <p style={{ fontSize: '14px', fontWeight: '600', color: '#000000', margin: '0 0 40px 0', textAlign: 'center' }}>
        Tu reporte fue enviado<br />correctamente
      </p>

      {/* Cartel gris de colaboración institucional */}
      <div style={{
        backgroundColor: '#dbdbdb', // Gris del recuadro
        padding: '14px 20px',
        borderRadius: '6px',
        width: '100%',
        maxWidth: '320px',
        boxSizing: 'border-box',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <p style={{ fontSize: '13px', fontWeight: '700', color: '#000000', margin: 0, lineHeight: '1.4' }}>
          Tu colaboración mejora la accesibilidad para todas las personas del CFP N.7
        </p>
      </div>

      {/* Botón Volver al inicio */}
      <button 
        onClick={() => navigate('/home')}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#737373', // Gris oscuro reglamentario de tus botones
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          maxWidth: '340px'
        }}
      >
        Volver al inicio
      </button>

    </div>
  );
};

export default ReportSuccess;