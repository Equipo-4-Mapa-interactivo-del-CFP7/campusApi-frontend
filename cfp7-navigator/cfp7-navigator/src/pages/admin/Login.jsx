// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // Estados para capturar los inputs
  const [nombreInput, setNombreInput] = useState('');
  const [dniInput, setDniInput] = useState('');

  // --- ESTADO PARA LA NOTIFICACIÓN LINDA ---
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '' });

  // Efecto para ocultar el cartel automáticamente después de 3 segundos
  useEffect(() => {
    if (notificacion.visible) {
      const timer = setTimeout(() => {
        setNotificacion({ visible: false, mensaje: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificacion.visible]);

  const handleIngresar = (e) => {
    e.preventDefault();

    // Reemplazamos el alert feo por nuestra notificación estilizada
    if (nombreInput.trim() === '' || dniInput.trim() === '') {
      setNotificacion({ 
        visible: true, 
        mensaje: '⚠️ Por favor, ingresá tu nombre completo y tu DNI.' 
      });
      return;
    }

    // Si todo está correcto, avanza al Home
    navigate('/home'); 
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* --- CARTEL DE NOTIFICACIÓN FLOTANTE (ESTILO TOAST DE ACCESIBILIDAD) --- */}
      {notificacion.visible && (
        <div style={{
          position: 'fixed',
          top: '30px', // Aparece flotando elegantemente arriba en el login
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '30px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {notificacion.mensaje}
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '340px' }}>
        
        {/* Encabezado del Centro de Formación */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
            CFP N° 7
          </h1>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#3b82f6', margin: 0 }}>
            ¡Hola!
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleIngresar} style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          
          {/* Input: Nombre Completo */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Ingresar usuario 
            </label>
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          {/* Input: DNI */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="DNI"
              value={dniInput}
              onChange={(e) => setDniInput(e.target.value)}
              style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          {/* Botón de Entrada */}
          <button type="submit" style={{
            width: '100%', padding: '12px', backgroundColor: '#1e293b', color: '#ffffff',
            border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>
            Ingresar a la App
          </button>
        </form>

        {/* Firma Grupo 4 */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '30px' }}>
          Creado Equipo 4 - 2026
        </p>
      </div>
    </div>
  );
};

export default Login;