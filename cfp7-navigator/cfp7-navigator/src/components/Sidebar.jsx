// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro traslúcido para tapar el resto de la app al abrirse */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          zIndex: 1999,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Contenedor del panel lateral izquierdo */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: '280px',
        backgroundColor: '#ffffff',
        zIndex: 2000,
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        animation: 'slideIn 0.3s ease-out'
      }}>
        
        {/* Encabezado del Perfil (Estilo Figma) */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '24px 16px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'
            }}>
              D
            </div>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>Daniela Robert</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Estudiante - CFP N° 7</div>
        </div>

        {/* Opciones del Menú */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
          <div 
            onClick={() => { navigate('/'); onClose(); }}
            style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#334155' }}
          >
            🏠 Inicio / Tablero
          </div>
          <div 
            onClick={() => { navigate('/espacios'); onClose(); }}
            style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#334155' }}
          >
            🔍 Buscador de Aulas
          </div>
          <div 
            onClick={() => { navigate('/reportes'); onClose(); }}
            style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#334155' }}
          >
            ⚠️ Reportar Incidencias
          </div>
          
          <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
          
          {/* Opciones extras de accesibilidad basadas en tu proyecto */}
          <div style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
            Preferencias de Voz
          </div>
          <div style={{ padding: '12px 16px', fontSize: '14px', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
            <span>Lectura por voz</span>
            <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ padding: '12px 16px', fontSize: '14px', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
            <span>Rutas 100% sin escalones</span>
            <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Pie de página del menú */}
        <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
          Creado Equipo 4 - 2026
        </div>
      </div>
    </>
  );
};

export default Sidebar;