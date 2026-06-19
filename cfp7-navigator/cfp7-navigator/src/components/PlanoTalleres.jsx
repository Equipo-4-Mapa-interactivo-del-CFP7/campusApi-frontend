// src/components/PlanoTalleres.jsx
import React from 'react';

const PlanoTalleres = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" style={{ backgroundColor: '#ffffff', fontFamily: "'Nunito Sans', sans-serif" }}>
      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="800" fill="#1e293b">PLANO 2D - SECTOR TALLERES PESADOS</text>
      <text x="400" y="65" textAnchor="middle" fontSize="13" fontWeight="600" fill="#737373">MANTENIMIENTO, CONSTRUCCIÓN Y ARTES GRÁFICAS</text>

      <rect x="40" y="100" width="720" height="360" fill="#f8fafc" stroke="#737373" strokeWidth="2.5" />

      {/* CLIMATIZACIÓN */}
      <rect x="180" y="100" width="280" height="210" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="320" y="210" fontSize="14" fontWeight="800" fill="#1e293b" textAnchor="middle">CLIMATIZACION</text>

      {/* SERIGRAFÍA */}
      <rect x="460" y="100" width="300" height="210" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="610" y="210" fontSize="14" fontWeight="800" fill="#1e293b" textAnchor="middle">SERIGRAFIA</text>

      {/* HERRERÍA */}
      <rect x="140" y="310" width="220" height="150" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="250" y="390" fontSize="14" fontWeight="800" fill="#1e293b" textAnchor="middle">HERRERIA</text>

      {/* ELECTRICIDAD */}
      <rect x="360" y="310" width="400" height="150" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="560" y="380" fontSize="14" fontWeight="800" fill="#1e293b" textAnchor="middle">ELECTRICIDAD</text>
      <text x="730" y="430" fontSize="16" fontWeight="800" fill="#94a3b8" textAnchor="middle">S3</text>

      {/* Pasillos y accesos */}
      <line x1="140" y1="100" x2="140" y2="460" stroke="#737373" strokeWidth="1.5" />
      <text x="90" y="200" fontSize="11" fontWeight="700" fill="#475569" textAnchor="middle">ACCESO</text>
      <text x="90" y="280" fontSize="11" fontWeight="700" fill="#475569" textAnchor="middle">BAÑOS T.</text>

      {/* Salidas */}
      <text x="690" y="130" fontSize="11" fontWeight="700" fill="#dc2626">🚪 SALIDA</text>
      <text x="690" y="340" fontSize="11" fontWeight="700" fill="#dc2626">🚪 SALIDA</text>
    </svg>
  );
};

export default PlanoTalleres;