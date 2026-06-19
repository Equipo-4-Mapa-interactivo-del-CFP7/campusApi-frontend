// src/components/BottomNavbar.jsx
import React from 'react';

const BottomNavbar = ({ currentTab, setCurrentTab }) => {
  // Pestañas basadas en los iconos inferiores de tu Figma
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'mapa', icon: '🗺️', label: 'Mapa' },
    { id: 'buscar', icon: '🔍', label: 'Buscar' },
    { id: 'alertas', icon: '⚠️', label: 'Reportes' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '65px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-around', // <-- ¡CORREGIDO ACÁ! (Sin el guión)
      alignItems: 'center',
      paddingBottom: '5px',
      zIndex: 1000
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            color: currentTab === tab.id ? '#1e293b' : '#94a3b8',
            fontSize: '12px',
            fontWeight: currentTab === tab.id ? '700' : '500'
          }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;