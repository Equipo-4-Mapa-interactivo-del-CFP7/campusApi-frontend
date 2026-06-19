// src/pages/SpaceDetail.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const SpaceDetail = () => {
  const navigate = useNavigate();
  const { aulaDestino } = useContext(AppContext);

  // Usamos el espacio guardado en el contexto o el por defecto
  const nombreEspacio = aulaDestino || "Aula 3";
  const pabellonSector = nombreEspacio.includes("Sanitarios") ? "Sector 4" : "Pabellón 1";

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
        marginBottom: '20px',
        position: 'relative',
        paddingTop: '8px'
      }}>
        <button 
          onClick={() => navigate('/espacios')} 
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
          {nombreEspacio} - {pabellonSector}
        </h1>
      </div>

      {/* Tarjeta de imagen/Carrusel */}
      <div style={{
        width: '100%',
        height: '240px',
        backgroundColor: '#1a1a1a',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
        position: 'relative'
      }}>
        {/* Icono de imagen blanco en el centro */}
        <span style={{ fontSize: '70px', color: '#ffffff' }}>🖼️</span>
      </div>

      {/* Indicador de páginas (Puntitos del carrusel) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#000000' }}></span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#b0b0b0' }}></span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#b0b0b0' }}></span>
      </div>

      {/* Detalles del espacio */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '12px 0', 
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          fontSize: '14px'
        }}>
          <span style={{ fontWeight: '700', color: '#000000' }}>Tipo de espacio</span>
          <span style={{ color: '#000000' }}>{nombreEspacio.includes("Aula") ? "Aula" : "Sector"}</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '12px 0', 
          borderBottom: '1px solid #e0e0e0',
          fontSize: '14px'
        }}>
          <span style={{ fontWeight: '700', color: '#000000' }}>Ubicación</span>
          <span style={{ color: '#000000' }}>{nombreEspacio.includes("Sector 4") ? "Sector 4" : "Sector 1"}</span>
        </div>
      </div>

      {/* Sección Accesibilidad */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#000000', margin: '0 0 16px 0' }}>
          Accesibilidad
        </h3>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Item 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', marginBottom: '4px' }}>♿</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#000000', lineHeight: '1.2' }}>
              Acceso sin escalones
            </span>
          </div>

          {/* Item 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', textAlign: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#737373',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px'
            }}>
              <span style={{ fontSize: '16px', color: '#ffffff' }}>🖼️</span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#000000', lineHeight: '1.2' }}>
              Señalética visual
            </span>
          </div>
        </div>
      </div>

      {/* 🛠️ MODIFICADO: Bloque de botones inferiores centrados y estilizados tipo cápsula */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '12px' 
      }}>
        
        {/* Botón: ¿Cómo llegar? (Gris oscuro cápsula) */}
        <button 
          onClick={() => navigate('/como-llegar')}
          style={{
            width: 'fit-content',
            minWidth: '180px',
            padding: '10px 24px',
            backgroundColor: '#737373',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',          // Forma de cápsula mobile
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          ¿Cómo llegar?
        </button>

        {/* Botón: Ver en el mapa (Blanco con contorno cápsula) */}
        <button 
          onClick={() => navigate('/mapa')}
          style={{
            width: 'fit-content',
            minWidth: '180px',
            padding: '10px 24px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #737373',
            borderRadius: '20px',          // Simétrico al de arriba
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          Ver en el mapa
        </button>
      </div>

    </div>
  );
};

export default SpaceDetail;