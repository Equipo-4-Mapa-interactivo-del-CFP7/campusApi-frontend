// src/pages/Home.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Constantes de diseño oficiales del proyecto
const DESIGN = {
  colors: {
    primaryText: '#000000',
    background: '#FFFFFF',
    azulOscuro: '#1E3A8A',
    azulActivo: '#3B82F6',
    celeste: '#60A5FA',
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

const Home = () => {
  const navigate = useNavigate();
  const { setAulaDestino } = useContext(AppContext);
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== '') {
      setAulaDestino(busqueda);
      navigate('/mapa');
    }
  };

  return (
    <div style={{
      padding: '16px',
      paddingBottom: '100px',
      backgroundColor: DESIGN.colors.background,
      minHeight: '100vh',
      fontFamily: DESIGN.fonts.main,
      boxSizing: 'border-box'
    }}>
      
      {/* 1. Encabezado Centrado (ExtraBold 800) */}
      <div style={{ marginTop: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: DESIGN.fonts.weights.extrabold, 
          color: DESIGN.colors.primaryText, 
          margin: '0 0 12px 0',
          letterSpacing: '0.5px'
        }}>
          CFP N.7
        </h1>
        <h2 style={{ 
          fontSize: '22px', 
          fontWeight: DESIGN.fonts.weights.extrabold, 
          color: DESIGN.colors.primaryText, 
          margin: '0 0 4px 0' 
        }}>
          ¡Hola!
        </h2>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: DESIGN.fonts.weights.bold, 
          color: DESIGN.colors.primaryText, 
          margin: 0 
        }}>
          ¿A dónde quieres ir?
        </h2>
      </div>

      {/* Frase descriptiva */}
      <p style={{
        fontSize: '14px',
        color: DESIGN.colors.grisSoporte,
        textAlign: 'center',
        lineHeight: '1.4',
        margin: '0 auto 16px auto',
        maxWidth: '260px',
        fontWeight: DESIGN.fonts.weights.semibold
      }}>
        Encontrá aulas, oficinas y rutas accesibles fácilmente.
      </p>

      {/* 2. Barra de Buscador con Lupa a la derecha */}
      <form onSubmit={handleBuscar} style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar aula, oficina o sector"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              paddingRight: '40px',
              borderRadius: '8px',
              border: `1px solid ${DESIGN.colors.grisBorde}`,
              backgroundColor: DESIGN.colors.background,
              fontSize: '15px',
              color: DESIGN.colors.primaryText,
              fontFamily: DESIGN.fonts.main,
              boxSizing: 'border-box'
            }}
          />
          <span style={{ position: 'absolute', right: '14px', color: DESIGN.colors.grisSoporte, fontSize: '16px' }}>🔍</span>
        </div>
      </form>

      {/* Subtítulo de accesos */}
      <span style={{ 
        fontSize: '14px', 
        fontWeight: DESIGN.fonts.weights.bold, 
        color: DESIGN.colors.primaryText, 
        display: 'block', 
        marginBottom: '12px' 
      }}>
        Accesos rápidos
      </span>

      {/* 3. Cuadrícula de las 4 Tarjetas con Gris Claro Oficial */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px'
      }}>
        
        {/* Tarjeta 1: Rutas guardadas */}
        <div 
          onClick={() => navigate('/espacios')}
          style={{
            backgroundColor: DESIGN.colors.grisFondoCard,
            padding: '16px 8px',
            borderRadius: '8px',
            border: `1px solid ${DESIGN.colors.grisBorde}`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '6px'
          }}
        >
          <span style={{ fontSize: '32px' }}>🗺️</span>
          <span style={{ fontSize: '12px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.2' }}>
            Rutas guardadas
          </span>
        </div>

        {/* Tarjeta 2: Ruta accesible */}
        <div 
          onClick={() => navigate('/sectores')}
          style={{
            backgroundColor: DESIGN.colors.grisFondoCard,
            padding: '16px 8px',
            borderRadius: '8px',
            border: `1px solid ${DESIGN.colors.grisBorde}`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '6px'
          }}
        >
          <span style={{ fontSize: '32px' }}>♿</span>
          <span style={{ fontSize: '12px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.2' }}>
            Ruta accesible
          </span>
        </div>

        {/* Tarjeta 3: Reportar incidencia */}
        <div 
          onClick={() => navigate('/reportes')}
          style={{
            backgroundColor: DESIGN.colors.grisFondoCard,
            padding: '16px 8px',
            borderRadius: '8px',
            border: `1px solid ${DESIGN.colors.grisBorde}`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '6px'
          }}
        >
          <span style={{ fontSize: '32px' }}>⚠️</span>
          <span style={{ fontSize: '12px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.2' }}>
            Reportar incidencia
          </span>
        </div>

        {/* Tarjeta 4: Ajustes (Con azul activo oficial) */}
        <div 
          onClick={() => navigate('/ajustes')} // 👈 Cambiado para que navegue a tu pantalla de Ajustes
          style={{
            backgroundColor: DESIGN.colors.grisFondoCard,
            padding: '16px 8px',
            borderRadius: '8px',
            border: `2px solid ${DESIGN.colors.azulActivo}`, 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '6px'
          }}
        >
          <span style={{ fontSize: '32px' }}>⚙️</span>
          <span style={{ fontSize: '12px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.2' }}>
            Ajustes
          </span>
        </div>

      </div>

      {/* 4. Bloque Inferior: ¿Cómo funciona? */}
      <div style={{
        backgroundColor: DESIGN.colors.grisFondoCard,
        borderRadius: '8px',
        border: `1px solid ${DESIGN.colors.grisBorde}`,
        padding: '14px 12px',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, margin: '0 0 14px 0' }}>
          ¿Cómo funciona?
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Paso 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', textAlign: 'center' }}>
            <span style={{ backgroundColor: DESIGN.colors.grisSoporte, color: '#ffffff', width: '20px', height: '20px', borderRadius: '50%', fontSize: '11px', fontWeight: DESIGN.fonts.weights.bold, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>1</span>
            <span style={{ fontSize: '10px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.1' }}>Buscar espacio</span>
          </div>

          {/* Paso 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', textAlign: 'center' }}>
            <span style={{ backgroundColor: DESIGN.colors.grisSoporte, color: '#ffffff', width: '20px', height: '20px', borderRadius: '50%', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>2</span>
            <span style={{ fontSize: '10px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.1' }}>Seguir recorrido</span>
          </div>

          {/* Paso 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', textAlign: 'center' }}>
            <span style={{ backgroundColor: DESIGN.colors.grisSoporte, color: '#ffffff', width: '20px', height: '20px', borderRadius: '50%', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>3</span>
            <span style={{ fontSize: '10px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.1' }}>Llegar al sector</span>
          </div>

          {/* Paso 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22%', textAlign: 'center' }}>
            <span style={{ backgroundColor: DESIGN.colors.grisSoporte, color: '#ffffff', width: '20px', height: '20px', borderRadius: '50%', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>4</span>
            <span style={{ fontSize: '10px', fontWeight: DESIGN.fonts.weights.bold, color: DESIGN.colors.primaryText, lineHeight: '1.1' }}>Guardar mapa</span>
          </div>
        </div>
      </div>

      {/* Bloque Informativo Final con Borde Violeta */}
      <div style={{ marginTop: '28px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 4px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '4px',
            border: '2px solid #7c3aed', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: DESIGN.colors.grisFondoCard,
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <span style={{ fontSize: '42px' }}>👩‍🦱</span>
          </div>
          <p style={{ 
            fontSize: '13px', 
            fontWeight: DESIGN.fonts.weights.semibold, 
            color: DESIGN.colors.primaryText, 
            margin: 0,
            lineHeight: '1.35',
            textAlign: 'left',
            maxWidth: '220px'
          }}>
            Al llegar vas a encontrar señalización y referencias visuales para ayudarte a orientarte
          </p>
        </div>

        {/* Enlace para el equipo con tipografía de soporte */}
        <div onClick={() => navigate('/gestion')} style={{ textAlign: 'center', cursor: 'pointer', padding: '4px' }}>
          <p style={{ 
            fontSize: '13px', 
            fontStyle: 'italic', 
            fontWeight: DESIGN.fonts.weights.semibold, 
            color: DESIGN.colors.grisSoporte, 
            margin: '0 0 2px 0' 
          }}>
            ¿Sos parte del equipo del CFP 7?
          </p>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: DESIGN.fonts.weights.bold, 
            color: DESIGN.colors.primaryText,
            textDecoration: 'underline' 
          }}>
            Accedé al área de gestión.
          </span>
        </div>
      </div>

      {/* Firma de entrega */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: DESIGN.colors.grisBorde, margin: '0' }}>
        Creado Equipo 4 - 2026
      </p>
    </div>
  );
};

export default Home;