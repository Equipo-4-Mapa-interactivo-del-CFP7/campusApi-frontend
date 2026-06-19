// src/components/ModalDescarga.jsx
import React from 'react';

const ModalDescarga = ({ isOpen, onClose, onConfirm, planoActivo }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)', // Desenfoca el mapa de fondo para que resalte el modal
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zindex: 9999,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Tarjeta del Modal */}
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '340px',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: "'Nunito Sans', sans-serif",
        animation: 'fadeIn 0.2s ease-out'
      }}>
        
        {/* Ícono Ilustrativo */}
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: '#eff6ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '24px'
        }}>
          📄
        </div>

        {/* Título */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          Confirmar Descarga
        </h3>

        {/* Descripción */}
        <p style={{
          fontSize: '14px',
          fontWeight: '400',
          color: '#64748b',
          lineHeight: '1.5',
          margin: '0 0 24px 0'
        }}>
          Se va a descargar el PDF oficial correspondiente al <span style={{ fontWeight: '700', color: '#1E59C5' }}>{planoActivo === 'principal' ? 'Plano Principal' : 'Sector Talleres'}</span> en tu dispositivo.
        </p>

        {/* Contenedor de Botones (Estilo Figma) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={onConfirm}
            style={{
              width: '100%',
              backgroundColor: '#1E59C5', // Tu color primario oficial
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Descargar PDF
          </button>
          
          <button
            onClick={onClose}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDescarga;