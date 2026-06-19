import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>📊 Dashboard Principal</h1>
      <p style={{ color: '#7f8c8d' }}>Bienvenido al panel de control. Acá se van a mostrar el estado de las incidencias del edificio y los reportes activos.</p>
    </div>
  );
};

export default Dashboard;