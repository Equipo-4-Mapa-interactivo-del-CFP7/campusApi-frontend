// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onOpenMenu }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, height: '60px',
      backgroundColor: '#1e293b',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      
      {/* Bloque Izquierdo: Menú + Título de costado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={onOpenMenu} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#ffffff', 
            fontSize: '24px', 
            cursor: 'pointer', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          ☰
        </button>
        <span 
          onClick={() => navigate('/')} 
          style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            letterSpacing: '0.5px', 
            cursor: 'pointer' 
          }}
        >
          CFP N° 7
        </span>
      </div>

      {/* Bloque Derecho: Vacío para mantener el layout limpio */}
      <div></div>
      
    </div>
  );
};

export default Header;