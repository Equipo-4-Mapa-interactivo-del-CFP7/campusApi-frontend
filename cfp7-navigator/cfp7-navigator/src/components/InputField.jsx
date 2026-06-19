// src/components/InputField.jsx
import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label style={{ fontSize: '14px', marginBottom: '6px', color: '#64748b', fontWeight: '500' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '16px',
          outline: 'none',
          backgroundColor: '#f8fafc'
        }}
      />
    </div>
  );
};

export default InputField;