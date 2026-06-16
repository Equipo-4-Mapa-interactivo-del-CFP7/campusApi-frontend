import { ArrowLeft, MapPin, CircleDot, Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import ModalFinalizar from "./ModalFinalizar";

interface Props {
  origen: string;
  destino: string;
  onFinalizar: () => void;
}

const ruta = [
  { x: 270, y: 270 }, // Nodo origen
  { x: 320, y: 270 }, // Giro 1
  { x: 320, y: 430 }, // Giro 2
  { x: 820, y: 430 }, // Giro 3
  { x: 820, y: 580 },  // Nodo destino
];

export default function VistaRuta({ origen, destino, onFinalizar }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const manejarCerrarModal = () => {
    onFinalizar();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 flex-1">

      {/* HEADER */}
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center shadow-sm relative z-10">
        <button
          onClick={onFinalizar}
          className="mr-4 p-2 -ml-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <div>
          <h2 className="font-black text-xl text-gray-800 tracking-tight">Ruta Activa</h2>
          <p className="text-xs font-medium text-gray-500 mt-0.5">Siguiendo indicaciones</p>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col">

        {/* TARJETA DE RESUMEN DE RUTA */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 w-full mb-6 relative overflow-hidden">
          <div className="flex items-stretch relative z-10">
            {/* Columna de íconos y línea conectora */}
            <div className="flex flex-col items-center mr-4 mt-1">
              <CircleDot size={18} className="text-blue-500" strokeWidth={3} />
              <div className="w-0.5 flex-1 bg-gray-200 my-1.5 rounded-full"></div>
              <MapPin size={20} className="text-green-500" strokeWidth={2.5} />
            </div>

            {/* Columna de textos */}
            <div className="flex flex-col justify-between py-0.5">
              <div className="mb-5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Punto de partida</p>
                <p className="font-bold text-gray-800 text-base">{origen}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Destino final</p>
                <p className="font-bold text-gray-800 text-base">{destino}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ESPACIO DEL MAPA ANIMADO */}
        <div className="w-full flex-1 min-h-60 rounded-3xl overflow-hidden relative">

          {/* MAPA */}
          <img
            src="/MapaMaqueta.png"
            alt="Mapa"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* CAPA SVG */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >

            {/* Ruta calculada */}
            <polyline
              points={ruta.map(p => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#2563eb"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Nodo origen */}
            <circle
              cx={ruta[0].x}
              cy={ruta[0].y}
              r="12"
              fill="red"
            />

            {/* Nodo destino */}
            <circle
              cx={ruta[ruta.length - 1].x}
              cy={ruta[ruta.length - 1].y}
              r="12"
              fill="green"
            />

            {/* Opcional: mostrar todos los nodos durante desarrollo */}
            {ruta.map((p, index) => (
              <circle
                key={index}
                cx={p.x}
                cy={p.y}
                r="6"
                fill="orange"
              />
            ))}

          </svg>

        </div>

        {/* BOTÓN DE ACCIÓN FINAL */}
        <button
          onClick={() => setModalVisible(true)}
          className="mt-6 w-full flex items-center justify-center py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <CheckCircle2 className="mr-2" size={20} />
          Finalizar Recorrido
        </button>

        {/*Modal de Finalización */}
        {modalVisible && (
          <ModalFinalizar
          destino={destino}
          onCerrar={manejarCerrarModal}
          />
        )}

      </div>
    </div>
  );
}
