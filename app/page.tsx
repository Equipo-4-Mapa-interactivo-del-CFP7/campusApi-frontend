"use client";

import React, { useState } from 'react';
// Importamos las vistas
import VistaInicio from '@/components/VistasMapa/VistaInicio';
import VistaSectores from '@/components/VistasMapa/VistaSectores';
import VistaFicha from '@/components/VistasMapa/VistaFicha';
import VistaOrigen from '@/components/VistasMapa/VistaOrigen';
import VistaRuta from '@/components/VistasMapa/VistaRuta';


export default function Home() {
  // 1. Memoria de la App
  const [vistaActual, setVistaActual] = useState("inicio");
  const [vistaAnterior, setVistaAnterior] = useState("inicio");
  const [destino, setDestino] = useState("");
  const [origen, setOrigen] = useState("");

  const mockSectores = ["Herrería", "Climatización", "Carpintería", "Gastronomía A", "Gastronomía B", "Gastronomía C", "Electricidad", "Serigrafía",
    "Taller de bicicletería", "Área de talleres dinámicos", "Laboratorio de Informática A", "Laboratorio de Informática B", "Aula 1", "Aula 2", "Aula 3 - SUM", "Aula 4",
    "Aula 5", "Informes", "Oficina de estudiantes", "Preceptoría"
  ];
  const mockOrigenes = ["Entrada Principal", "Patio Central", "Entrada 2"];

  // 2. FUNCIONES
  const irASectores = () => setVistaActual("sectores");

  const seleccionarDestino = (sectorSeleccionado: string) => {
    setDestino(sectorSeleccionado);
    setVistaAnterior(vistaActual);
    setVistaActual("ficha");
  };

  const volverDeFicha = () => {
    setVistaActual(vistaAnterior);
  };

  const irAOrigen = () => {
    setVistaActual("origen");
  };

  const seleccionarOrigen = (lugarSeleccionado: string) => {
    setOrigen(lugarSeleccionado);
    setVistaActual("ruta");
  };

  const volverAlInicio = () => {
    setVistaActual("inicio");
    setDestino("");
    setOrigen("");
  };

  const volverASectores = () => setVistaActual("sectores");

  // 3. RENDERIZADO
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center sm:p-4 md:p-8">
      <div className="w-full sm:max-w-md bg-white sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-[85vh] relative sm:border border-gray-200">

        {vistaActual === "inicio" && (
          <VistaInicio onIrASectores={irASectores}
            sectores={mockSectores}
            onSeleccionarDestino={seleccionarDestino}
          />
        )}

        {vistaActual === "sectores" && (
          <VistaSectores
            sectores={mockSectores}
            onSeleccionar={seleccionarDestino}
            onVolver={volverAlInicio}
          />
        )}

        {vistaActual === "ficha" && (
          <VistaFicha 
            destino={destino} 
            onVerRecorrido={irAOrigen} 
            onVolver={volverDeFicha} 
          />
        )}

        {vistaActual === "origen" && (
          <VistaOrigen
            origenes={mockOrigenes}
            destino={destino}
            onSeleccionar={seleccionarOrigen}
            onVolver={() => setVistaActual("sectores")}
          />
        )}

        {vistaActual === "ruta" && (
          <VistaRuta
            origen={origen}
            destino={destino}
            onFinalizar={volverAlInicio}
          />
        )}

      </div>
    </main>
  );
}