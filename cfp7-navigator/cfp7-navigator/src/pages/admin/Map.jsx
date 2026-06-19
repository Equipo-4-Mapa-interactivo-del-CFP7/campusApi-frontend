// src/pages/admin.jsx/Map.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Evitamos el error de disco lleno usando la carga global de internet
const html2pdf = window.html2pdf;

import PlanoPrincipal from '../../components/PlanoPrincipal';
import PlanoTalleres from '../../components/PlanoTalleres';
import ModalDescarga from '../../components/ModalDescarga';

const Map = () => {
  const navigate = useNavigate();
  const [planoActivo, setPlanoActivo] = useState('principal'); // 'principal' o 'talleres'
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapaRef = useRef(null);

  const handleDescargarPDF = () => {
    setIsModalOpen(false); 
    const elemento = mapaRef.current;
    
    const opciones = {
      margin:       10,
      filename:     `plano-cfp7-${planoActivo}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, logging: false, useCORS: true }, 
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };

    html2pdf().set(opciones).from(elemento).save();
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '100px', backgroundColor: '#ffffff', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Barra superior */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingTop: '8px' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#000000', padding: 0, display: 'flex', alignItems: 'center' }}>←</button>
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0 }}>Mapa del edificio</h1>
      </div>

      {/* Selector de Planta (Tabs) */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={() => setPlanoActivo('principal')}
          style={{
            flex: 1, padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            border: planoActivo === 'principal' ? 'none' : '1px solid #737373',
            backgroundColor: planoActivo === 'principal' ? '#737373' : '#ffffff',
            color: planoActivo === 'principal' ? '#ffffff' : '#000000'
          }}
        >
          Planta Principal
        </button>
        <button 
          onClick={() => setPlanoActivo('talleres')}
          style={{
            flex: 1, padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            border: planoActivo === 'talleres' ? 'none' : '1px solid #737373',
            backgroundColor: planoActivo === 'talleres' ? '#737373' : '#ffffff',
            color: planoActivo === 'talleres' ? '#ffffff' : '#000000'
          }}
        >
          Sector Talleres
        </button>
      </div>

      {/* Visor interactivo */}
      <div style={{ 
        width: '100%', height: '380px', backgroundColor: '#ffffff', borderRadius: '6px', 
        position: 'relative', marginBottom: '24px', border: '1px solid #cccccc', 
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        <div 
          ref={mapaRef} 
          style={{ 
            transform: `scale(${zoom})`, 
            transition: 'transform 0.2s ease-out', 
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          {planoActivo === 'principal' ? <PlanoPrincipal /> : <PlanoTalleres />}
        </div>

        <button style={{ position: 'absolute', bottom: '12px', left: '12px', width: '32px', height: '32px', backgroundColor: '#ffffff', border: '1px solid #b0b0b0', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setZoom(1)}>🎯</button>

        <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #b0b0b0', overflow: 'hidden' }}>
          <button style={{ width: '32px', height: '32px', backgroundColor: '#ffffff', border: 'none', borderBottom: '1px solid #e2e8f0', fontSize: '18px', cursor: 'pointer', fontWeight: '600' }} onClick={() => setZoom(prev => Math.min(prev + 0.2, 2.4))}>+</button>
          <button style={{ width: '32px', height: '32px', backgroundColor: '#ffffff', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: '600' }} onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.6))}>-</button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 🛠️ BOTONES CON EL DISEÑO OVALADO DE TU CAPTURA */}
      {/* ========================================== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <button 
          onClick={() => setIsModalOpen(true)} 
          style={{ 
            width: '280px', 
            padding: '12px 24px', 
            backgroundColor: '#737373', // Gris a tono con la app
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '25px', // Bordes completamente ovalados (estilo píldora)
            fontSize: '15px', 
            fontWeight: '700', 
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          Descargar mapa
        </button>
        
        <button 
          onClick={() => navigate('/reportes')} 
          style={{ 
            width: '280px', 
            padding: '12px 24px', 
            backgroundColor: '#737373', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '25px', // Idéntico radio de curvatura
            fontSize: '15px', 
            fontWeight: '700', 
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          Reportar incidencia
        </button>
      </div>
      {/* ========================================== */}

      {/* Inyección del Modal de confirmación */}
      <ModalDescarga 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDescargarPDF}
        planoActivo={planoActivo}
      />

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '40px' }}>
        Creado Equipo 4 - 2026
      </p>
    </div>
  );
};

export default Map;