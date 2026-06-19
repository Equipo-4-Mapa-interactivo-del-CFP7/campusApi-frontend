// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [aulaDestino, setAulaDestino] = useState('');

  // DEFINIMOS LOS COLORES INSTITUCIONALES DEL CFP N° 7 ACÁ
  const coloresCFP7 = {
    primario: '#1e3a8a',    // Azul marino institucional fuerte para Headers y Botones principales
    secundario: '#3b82f6',  // Azul Francia para elementos activos o de selección
    fondo: '#f1f5f9',       // Gris muy claro y limpio para el fondo de la pantalla
    tarjeta: '#ffffff',     // Blanco puro para los contenedores y formularios
    textoPrincipal: '#0f172a', // Gris casi negro para máxima legibilidad
    textoMutado: '#64748b'     // Gris suave para descripciones y textos secundarios
  };

  return (
    <AppContext.Provider value={{ 
      aulaDestino, 
      setAulaDestino,
      coloresCFP7 // Los exportamos para que cualquier pantalla los pueda usar
    }}>
      {children}
    </AppContext.Provider>
  );
};