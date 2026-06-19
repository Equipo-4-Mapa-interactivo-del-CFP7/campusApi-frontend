// src/pages/Sectors.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Sectors = () => {
  const { setAulaDestino } = useContext(AppContext);
  const navigate = useNavigate();

  // Estructura de pabellones basada en la distribución del CFP N° 7
  const sectoresEdificio = [
    {
      id: 'p1',
      pabellon: 'Pabellón 1 - Planta Baja',
      detalles: 'Accesos principales, Bedelía, Aulas teóricas de informática.',
      aulas: ['Aula 3 - Reparación de PC', 'Baños Planta Baja (Accesibles)']
    },
    {
      id: 'p2',
      pabellon: 'Pabellón 1 - Planta Alta',
      detalles: 'Rampa de acceso y aulas multimedia.',
      aulas: ['Aula 1 - Computación', 'Aula 2 - Diseño Gráfico', 'Buffet / Buffet Estudiantil']
    },
    {
      id: 'p3',
      pabellon: 'Pabellón 2 - Planta Baja e Infraestructura',
      detalles: 'Talleres mecánicos y espacios de mantenimiento de fondo.',
      aulas: ['Taller de Soldadura', 'Taller de Electricidad']
    }
  ];

  const handleSeleccionarAula = (aula) => {
    setAulaDestino(aula);
    navigate('/mapa'); // Redirige directamente al croquis con la ruta trazada
  };

  return (
    <div style={{
      padding: '20px',
      paddingBottom: '80px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      {/* Encabezado con retorno al Home */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span onClick={() => navigate('/')} style={{ fontSize: '20px', marginRight: '12px', cursor: 'pointer' }}>←</span>
        <h2 style={{ fontSize: '20px', margin: 0, fontWeight: '700', color: '#0f172a' }}>
          Estructura de Sectores
        </h2>
      </div>

      <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
        Explorá los pabellones y dependencias disponibles para iniciar tu guiado accesible.
      </p>

      {/* Lista Desplegada de Pabellones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sectoresEdificio.map((sec) => (
          <div key={sec.id} style={{
            backgroundColor: '#ffffff',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
              🏢 {sec.pabellon}
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px 0', lineHeight: '1.4' }}>
              {sec.detalles}
            </p>

            {/* Listado de aulas accesibles del pabellón */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sec.aulas.map((aula, index) => (
                <div
                  key={index}
                  onClick={() => handleSeleccionarAula(aula)}
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#334155',
                    fontWeight: '500',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>🚪 {aula}</span>
                  <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600' }}>Guiar →</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectors;