// src/components/CustomButton.jsx
import React from 'react';

const CustomButton = ({ text, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px',
        backgroundColor: '#1e293b', // Gris oscuro/negro del Figma
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;