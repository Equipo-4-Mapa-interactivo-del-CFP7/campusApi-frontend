// src/pages/Ajustes.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DESIGN = {
  colors: {
    primaryText: '#000000',
    background: '#FFFFFF',
    azulActivo: '#3B82F6',
    grisSoporte: '#4B5563',
    grisFondoCard: '#E5E7EB',
    grisBorde: '#9CA3AF'
  },
  fonts: {
    main: "'Nunito Sans', 'Inter', sans-serif",
    weights: {
      regular: '400',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  }
};

const Ajustes = () => {
  const navigate = useNavigate();

  // Estados para los interruptores de accesibilidad
  const [altocontraste, setAltoContraste] = useState(false);
  const [textoGrande, setTextoGrande] = useState(false);
  const [daltonismo, setDaltonismo] = useState(false);

  return (
    <div style={{
      padding: '16px',
      backgroundColor: DESIGN.colors.background,
      minHeight: '100vh',
      fontFamily: DESIGN.fonts.main,
      boxSizing: 'border-box'
    }}>
      
      {/* Encabezado de la Pantalla */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', marginTop: '8px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 8px 0 0',
            color: DESIGN.colors.primaryText
          }}
        >
          ⬅
        </button>
        <h1 style={{ 
          fontSize: '22px', 
          fontWeight: DESIGN.fonts.weights.extrabold, 
          color: DESIGN.colors.primaryText,
          margin: 0
        }}>
          Ajustes
        </h1>
      </div>

      <p style={{
        fontSize: '14px',
        color: DESIGN.colors.grisSoporte,
        fontWeight: DESIGN.fonts.weights.regular,
        marginBottom: '24px',
        lineHeight: '1.4'
      }}>
        Personalizá tu experiencia visual para navegar el CFP N.7 de forma cómoda y accesible.
      </p>

      {/* Contenedor de Opciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Opción 1: Alto Contraste */}
        <div style={{
          backgroundColor: DESIGN.colors.grisFondoCard,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${DESIGN.colors.grisBorde}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '75%' }}>
            <span style={{ fontSize: '15px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, display: 'block', marginBottom: '4px' }}>
              Alto contraste
            </span>
            <span style={{ fontSize: '12px', color: DESIGN.colors.grisSoporte, fontWeight: DESIGN.fonts.weights.regular }}>
              Cambia los colores de la interfaz para resaltar los elementos de la ruta.
            </span>
          </div>
          {/* Switch Interactivo */}
          <div 
            onClick={() => setAltoContraste(!altocontraste)}
            style={{
              width: '50px',
              height: '26px',
              borderRadius: '99px',
              backgroundColor: altocontraste ? DESIGN.colors.azulActivo : DESIGN.colors.grisBorde,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              position: 'absolute',
              top: '3px',
              left: altocontraste ? '27px' : '3px',
              transition: 'left 0.2s'
            }} />
          </div>
        </div>

        {/* Opción 2: Texto Grande */}
        <div style={{
          backgroundColor: DESIGN.colors.grisFondoCard,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${DESIGN.colors.grisBorde}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '75%' }}>
            <span style={{ fontSize: '15px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, display: 'block', marginBottom: '4px' }}>
              Texto grande
            </span>
            <span style={{ fontSize: '12px', color: DESIGN.colors.grisSoporte, fontWeight: DESIGN.fonts.weights.regular }}>
              Aumenta el tamaño de la tipografía oficial para una lectura más cómoda.
            </span>
          </div>
          <div 
            onClick={() => setTextoGrande(!textoGrande)}
            style={{
              width: '50px',
              height: '26px',
              borderRadius: '99px',
              backgroundColor: textoGrande ? DESIGN.colors.azulActivo : DESIGN.colors.grisBorde,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              position: 'absolute',
              top: '3px',
              left: textoGrande ? '27px' : '3px',
              transition: 'left 0.2s'
            }} />
          </div>
        </div>

        {/* Opción 3: Modo Daltonismo */}
        <div style={{
          backgroundColor: DESIGN.colors.grisFondoCard,
          padding: '16px',
          borderRadius: '8px',
          border: `1px solid ${DESIGN.colors.grisBorde}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ maxWidth: '75%' }}>
            <span style={{ fontSize: '15px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, display: 'block', marginBottom: '4px' }}>
              Modo daltonismo
            </span>
            <span style={{ fontSize: '12px', color: DESIGN.colors.grisSoporte, fontWeight: DESIGN.fonts.weights.regular }}>
              Optimiza las referencias visuales de los mapas con texturas legibles.
            </span>
          </div>
          <div 
            onClick={() => setDaltonismo(!daltonismo)}
            style={{
              width: '50px',
              height: '26px',
              borderRadius: '99px',
              backgroundColor: daltonismo ? DESIGN.colors.azulActivo : DESIGN.colors.grisBorde,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              position: 'absolute',
              top: '3px',
              left: daltonismo ? '27px' : '3px',
              transition: 'left 0.2s'
            }} />
          </div>
        </div>

      </div>

      {/* Botón Volver al Home con Estilo Oficial */}
      <button 
        onClick={() => navigate('/')}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '8px',
          backgroundColor: DESIGN.colors.azulActivo,
          color: '#ffffff',
          border: 'none',
          fontSize: '15px',
          fontWeight: DESIGN.fonts.weights.bold,
          fontFamily: DESIGN.fonts.main,
          cursor: 'pointer',
          marginTop: '12px'
        }}
      >
        Guardar configuración
      </button>

    </div>
  );
};

export default Ajustes;