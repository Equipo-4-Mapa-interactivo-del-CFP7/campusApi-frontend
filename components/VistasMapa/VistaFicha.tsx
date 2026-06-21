import { Info, Accessibility, Navigation, ArrowLeft, ImageIcon, AlertTriangleIcon, AlertTriangle } from 'lucide-react';

interface Props {
  destino: string;
  onVerRecorrido: () => void;
  onVolver: () => void;
  onReportarIncidencia: () => void;
}

export default function VistaFicha({ destino, onVerRecorrido, onVolver, onReportarIncidencia }: Props) {
  // MOCK DATA: Información específica de cada sector
  // Si se usa, esto puede venir de la db
  const infoSectores: Record<string, { desc: string; accesibilidad: string[] }> = {
    "Aula 1": {
      desc: "Aula principal de teoría equipada con proyector y pizarra digital.",
      accesibilidad: ["Ubicada en Planta Baja", "Puerta de doble hoja (ancha)", "Escritorios adaptables"],
    },
    "Taller": {
      desc: "Espacio de prácticas profesionales con maquinaria pesada.",
      accesibilidad: ["Rampa de acceso con inclinación del 6%", "Mesas de trabajo a 80cm"],
    },
    "Comedor": {
      desc: "Área de descanso y buffet para estudiantes y docentes.",
      accesibilidad: ["Planta Baja", "Espacio de giro amplio para sillas de ruedas"],
    },
    "Preceptoría": {
      desc: "Atención general a alumnos y resolución de trámites administrativos.",
      accesibilidad: ["Mostrador de atención baja", "Cartelería en Braille"],
    }
  };

  // Se busca la info del sector elegido. Si no existe (por si escriben otra cosa), mostramos algo genérico.
  const info = infoSectores[destino] || {
    desc: "Sector administrativo o aula estándar.",
    accesibilidad: ["Consultar detalles de accesibilidad en recepción."]
  };

  return (
    // Aseguramos que ocupe todo el ancho disponible
    <div className="flex flex-col h-full bg-gray-50 flex-1 w-full">

      {/* Encabezado con botón de volver (Edge to Edge de fondo, contenido centrado) */}
      <div className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="max-w-5xl mx-auto p-4 flex items-center">
          <button onClick={onVolver} className="mr-4 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-black text-xl text-gray-800">{destino}</h2>
        </div>
      </div>

      {/* Contenedor principal limitado y centrado para PC */}
      <div className="max-w-5xl mx-auto w-full p-6 flex-1 flex flex-col">

        {/* Layout tipo Grid para Desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 mb-auto">

          {/* Tarjeta de Foto del Lugar (Ocupa 1 columna en PC) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1 h-48 lg:h-auto">
            <div className="bg-gray-100 h-full min-h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 m-3 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={24} />
              </div>
              <p className="text-sm font-medium text-gray-400">Foto del lugar</p>
            </div>
          </div>

          {/* Tarjetas de Información (Ocupan 2 columnas en PC) */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:col-span-2">

            {/* Tarjeta de Información General */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <Info className="text-blue-500 mr-2" size={20} />
                <h3 className="font-bold text-gray-800 text-lg">Información</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {info.desc}
              </p>
            </div>

            {/* Tarjeta de Accesibilidad */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-500 h-full">
              <div className="flex items-center mb-3">
                <Accessibility className="text-green-500 mr-2" size={20} />
                <h3 className="font-bold text-gray-800 text-lg">Puntos de Accesibilidad</h3>
              </div>
              <ul className="space-y-2">
                {info.accesibilidad.map((punto, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-500 mr-2 font-bold">•</span>
                    {punto}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Botónes flotantes */}
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
          <button
            onClick={onVerRecorrido}
            className="w-full md:w-auto md:px-12 flex items-center justify-center py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <Navigation className="mr-2" size={20} />
            Ver recorrido hasta aquí
          </button>

          <button
            onClick={onReportarIncidencia}
            className="w-full md:w-auto md:px-12 flex items-center justify-center py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <AlertTriangle className="mr-2" size={20} />
            Reportar Incidencia
          </button>
        </div>

      </div>
    </div>
  );
}