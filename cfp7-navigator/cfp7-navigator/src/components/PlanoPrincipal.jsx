// src/components/PlanoPrincipal.jsx
import React from 'react';

const PlanoPrincipal = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%" style={{ backgroundColor: '#ffffff', fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* TÍTULO DEL CROQUIS ESQUEMÁTICO */}
      <text x="400" y="40" textAnchor="middle" fontSize="20" fontWeight="800" fill="#1e293b">PLANO ESQUEMÁTICO 2D - CFP N° 7</text>
      <text x="400" y="65" textAnchor="middle" fontSize="14" fontWeight="600" fill="#737373">PLANTA PRINCIPAL Y ÁREAS COMUNES</text>

      {/* SECTOR 3 (Bloque Triangular Izquierdo) */}
      <path d="M 50 280 L 400 100 L 400 620 Z" fill="#f1f5f9" stroke="#737373" strokeWidth="2" />
      <text x="240" y="350" fontSize="16" fontWeight="700" fill="#1e293b" textAnchor="middle">SECTOR 3</text>
      <text x="45" y="275" fontSize="10" fontWeight="700" fill="#dc2626">⚠️ SALIDA</text>
      <text x="65" y="220" fontSize="10" fontWeight="700" fill="#dc2626">⚠️ SALIDA</text>

      {/* BLOQUE CENTRAL: ADMINISTRACIÓN Y LABORATORIOS */}
      <rect x="400" y="250" width="80" height="70" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="440" y="285" fontSize="11" fontWeight="700" fill="#1e293b" text-anchor="middle">REGENCIA</text>
      <rect x="400" y="320" width="80" height="40" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="440" y="345" fontSize="11" fontWeight="700" fill="#1e293b" text-anchor="middle">INFORMES</text>

      <rect x="400" y="380" width="120" height="90" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="460" y="425" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">SECRETARIA</text>
      <text x="460" y="440" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">DIRECCION</text>

      <rect x="520" y="380" width="70" height="90" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="555" y="430" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">ORIENTACION</text>

      <rect x="590" y="380" width="90" height="90" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="635" y="425" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">OFICINA DE</text>
      <text x="635" y="440" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">ESTUDIANTES</text>

      <rect x="480" y="250" width="100" height="110" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="530" y="300" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">LABORATORIO</text>
      <text x="530" y="315" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">INFORMÁTICA A</text>

      <rect x="580" y="250" width="80" height="110" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="620" y="300" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">SALA DE</text>
      <text x="620" y="315" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">PERSONAL</text>

      <rect x="660" y="250" width="130" height="110" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="725" y="300" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">ÁREA TALLERES</text>
      <text x="725" y="315" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">DINÁMICOS</text>

      <rect x="680" y="380" width="110" height="90" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="735" y="420" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">LAB. INFO B</text>
      <text x="735" y="435" fontSize="9" fontWeight="600" fill="#737373" textAnchor="middle">MULTIDISCIPLINAR</text>

      {/* PATIO SUPERIOR Y TALLERES ASOCIADOS */}
      <rect x="400" y="100" width="390" height="150" fill="#fffbeb" stroke="#737373" strokeWidth="1.5" strokeDasharray="4" />
      <text x="595" y="180" fontSize="16" fontWeight="700" fill="#b45309" textAnchor="middle">PATIO (S1)</text>

      <rect x="520" y="100" width="180" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="610" y="130" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">CARPINTERIA</text>

      <rect x="700" y="150" width="90" height="100" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="745" y="195" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">TALLER DE</text>
      <text x="745" y="210" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">BICICLETAS</text>

      {/* PATIO CUBIERTO CENTRAL */}
      <rect x="400" y="470" width="390" height="70" fill="#f8fafc" stroke="#737373" strokeWidth="1.5" />
      <text x="595" y="510" fontSize="14" fontWeight="700" fill="#475569" textAnchor="middle">PATIO CUBIERTO</text>

      {/* SECTOR 4 (Ala Inferior de Aulas y Gastronomía) */}
      <rect x="520" y="540" width="100" height="45" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="570" y="567" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">BUFFET</text>

      <rect x="520" y="585" width="100" height="60" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="570" y="620" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">PRECEPTORIA</text>

      <rect x="520" y="645" width="100" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="570" y="675" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">BAÑO FEM 🚺</text>

      <rect x="520" y="695" width="100" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="570" y="725" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">BAÑO MASC 🚹</text>

      {/* Bloque de Aulas */}
      <rect x="620" y="540" width="170" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="570" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">AULA 1</text>

      <rect x="620" y="590" width="170" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="620" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">AULA 2</text>

      <rect x="620" y="640" width="170" height="70" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="680" fontSize="13" fontWeight="800" fill="#1e293b" textAnchor="middle">AULA 3 - SUM (S2)</text>

      <rect x="620" y="710" width="170" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="740" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">AULA 4</text>

      <rect x="620" y="760" width="170" height="50" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="790" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="middle">AULA 5</text>

      {/* Complejo Gastronomía */}
      <rect x="520" y="745" width="100" height="120" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="570" y="795" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">GASTRONOMÍA</text>
      <text x="570" y="815" fontSize="14" fontWeight="800" fill="#737373" textAnchor="middle">B / C</text>

      <rect x="620" y="810" width="170" height="55" fill="#ffffff" stroke="#737373" strokeWidth="1.5" />
      <text x="705" y="845" fontSize="11" fontWeight="700" fill="#1e293b" textAnchor="middle">GASTRONOMÍA A</text>

      <text x="520" y="895" fontSize="11" fontWeight="700" fill="#dc2626">⚠️ SALIDA DE EMERGENCIA</text>
      <text x="735" y="895" fontSize="11" fontWeight="700" fill="#dc2626">⚠️ SALIDA</text>
    </svg>
  );
};

export default PlanoPrincipal;