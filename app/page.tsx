"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import VistaInicio from '@/components/VistasMapa/VistaInicio';
import VistaSectores from '@/components/VistasMapa/VistaSectores';
import VistaFicha from '@/components/VistasMapa/VistaFicha';
import VistaOrigen from '@/components/VistasMapa/VistaOrigen';
import VistaRuta from '@/components/VistasMapa/VistaRuta';
import VistaAdmin from "@/components/VistasMapa/VistaAdmin";
import VistaAccesibilidad from "@/components/VistasMapa/VistaAccesibilidad";
import { AccesibilidadProvider } from "@/context/AccesibilidadContext";
import LayoutAccesibilidad from "@/components/LayoutAccesibilidad";

export interface PerfilUsuario {
  id: number;
  dni: number;
  rol: string;
  nombre: string;
  apellido: string;
  activo: boolean;
}


const VistaComollegar = dynamic(
  () => import('@/components/VistasMapa/VistaComollegar'),
  { 
    ssr: false,
    loading: () => <p className="text-center p-4 text-gray-500">Cargando módulo de mapa...</p>
  }
);


export default function Home() {
  // 1. Memoria de la App
  const [vistaActual, setVistaActual] = useState("inicio");
  const [vistaAnterior, setVistaAnterior] = useState("inicio");
  const [destino, setDestino] = useState("");
  const [origen, setOrigen] = useState("");
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)

  const obtenerPerfil = async () => {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    if (!token) return;

    try {
      const respuesta = await fetch('/api/usuarios/me', {
        method: 'GET',
        headers: {
          'Authorization': `${tokenType} ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (respuesta.ok) {
        const data = await respuesta.json();
        setPerfil(data);
        setEstaLogueado(true);
      } else {
        manejarLogout();
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);
  
  const manejarLoginExitoso = () => {
    setEstaLogueado(true);
    obtenerPerfil();
  };

  // 1. Efecto para verificar si hay sesión al cargar (SIN cambiar la vista)
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    if (tokenGuardado) {
      setEstaLogueado(true);
    }
  }, []);

  const manejarLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    setEstaLogueado(false);
    setPerfil(null);
    setVistaActual("inicio"); // Lo mandamos al inicio por seguridad
  };

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
    <AccesibilidadProvider>
      <main className="min-h-screen bg-white flex flex-col w-full">
        <LayoutAccesibilidad>
          <div className="w-full flex-1 flex flex-col relative overflow-x-hidden">

            {vistaActual === "inicio" && (
              <VistaInicio
                onIrASectores={irASectores}
                sectores={mockSectores}
                onSeleccionarDestino={seleccionarDestino}            
                onIrAccesibilidad={() => setVistaActual("accesibilidad")}
                onIrComoLlegar={() => setVistaActual("comoLlegar")}
                estaLogueado={estaLogueado}
                perfil={perfil}
                onLogout={manejarLogout}
                onLoginSuccess={manejarLoginExitoso}
                onIrAdmin={() => setVistaActual("admin")}
                
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
                onReportarIncidencia={volverDeFicha}
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

            {vistaActual === "admin" && (
              <VistaAdmin
                perfil={perfil}
                onLogout={manejarLogout}
                onVolver={() => setVistaActual("inicio")}
              />
            )}

            {vistaActual === "accesibilidad" && (
              <VistaAccesibilidad
                onVolver={() => setVistaActual("inicio")}
              />
            )}

            {vistaActual === "comoLlegar" && (
              <VistaComollegar
              onVolver={() => setVistaActual("inicio")}
              />
            )}

          </div>
        </LayoutAccesibilidad>
      </main>
    </AccesibilidadProvider>
  );
}