// src/pages/HowToGet.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const HowToGet = () => {
  const navigate = useNavigate();
  const { aulaDestino } = useContext(AppContext);

  const nombreAula = aulaDestino || "Aula 3";

  // Indicaciones textuales extraídas de llegar.jpg
  const pasos = [
    { nro: 1, texto: "Avanzá 20 mts. hasta el pasillo principal." },
    { nro: 2, texto: "Girá a la derecha y seguí al frente por 40 mts. más." },
    { nro: 3, texto: "Al frente vas a ver un patio cruzalo sin miedo que el camino es accesible." },
    { nro: 4, texto: `Girá a la derecha nuevamente y 40 mts. vas a ver el cartel del ${nombreAula}` }
  ];

  return (
    <div style={{
      padding: '16px',
      paddingBottom: '100px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* Barra superior con flecha de volver y título con subtítulo */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '28px',
        position: 'relative',
        paddingTop: '8px'
      }}>
        <button 
          onClick={() => navigate('/detalle-espacio')} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000',
            position: 'absolute',
            left: '4px',
            top: '12px'
          }}
        >
          ←
        </button>
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: '0 0 2px 0' }}>
            Cómo llegar a {nombreAula}
          </h1>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#000000', margin: 0 }}>
            desde tu ubicación actual
          </p>
        </div>
      </div>

      {/* Lista de indicaciones paso a paso */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '28px' }}>
        {pasos.map((paso) => (
          <div key={paso.nro} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            {/* Círculo numerado */}
            <div style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#666666',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              flexShrink: 0
            }}>
              {paso.nro}
            </div>

            {/* Texto de la instrucción */}
            <p style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#000000', 
              margin: 0, 
              flexGrow: 1,
              lineHeight: '1.3',
              textAlign: 'left'
            }}>
              {paso.texto}
            </p>

            {/* Botón miniatura de foto de referencia */}
            <div 
              onClick={() => alert(`Visualizando foto de referencia del Paso ${paso.nro}`)}
              style={{
                width: '42px',
                height: '42px',
                backgroundColor: '#737373',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <span style={{ fontSize: '18px', color: '#ffffff' }}>🖼️</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cartel informativo: Recorrido accesible */}
      <div style={{
        backgroundColor: '#dbdbdb',
        borderRadius: '6px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '28px'
      }}>
        <span style={{ fontSize: '32px' }}>♿</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#000000', marginBottom: '2px' }}>
            Recorrido accesible
          </span>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#000000', lineHeight: '1.2' }}>
            Este camino no tiene escalones ni desniveles.
          </span>
        </div>
      </div>

      {/* Botones de acción inferiores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={() => navigate('/mapa')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#737373',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Iniciar recorrido
        </button>

        <button 
          onClick={() => alert('Abriendo protocolo o actividades del aula seleccionada')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #737373',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ¿Qué hacemos al llegar?
        </button>
      </div>

      {/* Pie de página del equipo */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '30px' }}>
                  Creado Equipo 4 - 2026

      </p>
    </div>
  );
};

export default HowToGet;