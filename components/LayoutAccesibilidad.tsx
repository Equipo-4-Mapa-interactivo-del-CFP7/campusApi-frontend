"use client";

import { ReactNode } from 'react';
import { useAccesibilidad } from '@/context/AccesibilidadContext';

interface Props {
  children: ReactNode;
}

export default function LayoutAccesibilidad({ children }: Props) {
  const { config } = useAccesibilidad();

  // Acá se centralizan TODAS las reglas CSS globales de accesibilidad
  const clasesAccesibilidad = [
    'w-full flex-1 flex flex-col relative overflow-x-hidden transition-all duration-300', // Clases base
    config.altoContraste ? 'contrast-150 saturate-150' : '',
    config.lecturaFacil ? 'tracking-wider leading-loose' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* ACCESIBILIDAD: Al cambiar la raíz, todos los 'text-xs', 'text-sm', etc., crecen proporcionalmente en toda la app */}
      <style>{`
        html {
          font-size: ${config.textoGrande ? '115%' : '100%'}; 
        }
      `}</style>
    <div className={clasesAccesibilidad}>
      {children}
    </div>
    </>
  );
}