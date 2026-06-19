// src/pages/Spaces.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Spaces = () => {
  const navigate = useNavigate();
  const { setAulaDestino } = useContext(AppContext);

  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [tipoRecorrido, setTipoRecorrido] = useState('');
  const [necesitaAyuda, setNecesitaAyuda] = useState('');

  const listaEspacios = [
    "Aula 1", "Aula 2", "Aula 3", "Aula 4", "Aula 5",
    "Buffet", "Carpintería", "Climatización", 
    "Gastronomía A", "Gastronomía B", "Gastronomía C", 
    "Herrería", "Informática A", "Informática B", 
    "Oficina de estudiantes", "Patio cubierto", 
    "Sanitarios (Sector 1)", "Sanitarios (Sector 4)", 
    "Secretaría", "Serigrafía", "Taller de bicicletas", "Taller de cocina"
  ];

  const handleBuscar = (e) => {
    e.preventDefault();
    if (destino.trim() !== '') setAulaDestino(destino);
    else if (origen.trim() !== '') setAulaDestino(origen);
    navigate('/detalle-espacio');
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '100px', backgroundColor: '#ffffff', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Barra superior alineada a la izquierda */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '32px', 
        paddingTop: '8px' 
      }}>
        <button 
          onClick={() => navigate('/home')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '20px', 
            cursor: 'pointer', 
            color: '#000000',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          ←
        </button>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#000000', 
          margin: 0 
        }}>
          Buscar espacio
        </h1>
      </div>

      <form onSubmit={handleBuscar}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '8px' }}>¿Dónde iniciás el recorrido?</label>
          <select value={origen} onChange={(e) => setOrigen(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #b0b0b0', fontSize: '14px', backgroundColor: '#ffffff' }}>
            <option value="">Buscar aula, oficina o sector</option>
            {listaEspacios.map((espacio, idx) => <option key={idx} value={espacio}>{espacio}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label style={{ fontSize: '15px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '8px' }}>¿A dónde quieres ir?</label>
          <select value={destino} onChange={(e) => setDestino(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #b0b0b0', fontSize: '14px', backgroundColor: '#ffffff' }}>
            <option value="">Buscar aula, oficina o sector</option>
            {listaEspacios.map((espacio, idx) => <option key={idx} value={espacio}>{espacio}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#000000', display: 'block', marginBottom: '12px' }}>Filtros</span>
          <div style={{ marginBottom: '12px' }}>
            <select value={tipoRecorrido} onChange={(e) => setTipoRecorrido(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #b0b0b0', backgroundColor: '#ffffff', fontSize: '14px' }}>
              <option value="">Tipo de recorrido</option>
              <option value="rapido">Recorrido más rápido</option>
              <option value="accesible">Recorrido accesible (Sin escaleras)</option>
            </select>
          </div>
          <div>
            <select value={necesitaAyuda} onChange={(e) => setNecesitaAyuda(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #b0b0b0', backgroundColor: '#ffffff', fontSize: '14px' }}>
              <option value="">¿Necesitás que alguien te ayude?</option>
              <option value="si">Sí, solicitar asistencia</option>
              <option value="no">No, guiado por la App</option>
            </select>
          </div>
        </div>

        {/* 🛠️ MODIFICADO: Contenedor para centrar el botón y estilos inline para achicarlo */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button 
            type="submit" 
            className="btn-primary-figma"
            style={{
              width: 'fit-content',
              minWidth: '180px',
              padding: '10px 24px'
            }}
          >
            Buscar
          </button>
        </div>
      </form>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '40px' }}>
        Creado Equipo 4 - 2026
      </p>
    </div>
  );
};

export default Spaces;