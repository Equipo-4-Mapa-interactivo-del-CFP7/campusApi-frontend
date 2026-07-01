import { ArrowLeft, MapPin, ChevronRight, Navigation } from 'lucide-react';

interface Props {
  origenes: string[];
  destino: string;
  onSeleccionar: (lugar: string) => void;
  onVolver: () => void;
}

export default function VistaOrigen({ origenes, destino, onSeleccionar, onVolver }: Props) {
  return (
    <div className="flex flex-col h-full bg-gray-50 flex-1 w-full">
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 shadow-sm w-full relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center">
          <button 
            onClick={onVolver} 
            className="mr-4 p-2 -ml-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div>
            <h2 className="font-black text-xl text-gray-800 tracking-tight">Tu ubicación</h2>
            <div className="flex items-center mt-1 text-xs font-medium text-gray-500">
              <span className="mr-1">Ir hacia:</span>
              <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">
                <MapPin size={10} className="mr-1" />
                {destino}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LISTA DE ORÍGENES */}
      <div className="p-4 md:p-6 w-full max-w-5xl mx-auto flex-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
          Seleccioná un punto de partida
        </p>

        <div className="space-y-3">
          {origenes.map((lugar) => (
            <button 
              key={lugar} 
              onClick={() => onSeleccionar(lugar)}
              className="group w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50 transition-all active:scale-95 cursor-pointer"
            >
              <div className="flex items-center">
                {/* Cajita con el ícono */}
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mr-4 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:scale-110 transition-all">
                  <Navigation size={20} strokeWidth={2.5} />
                </div>
                
                {/* Texto del botón */}
                <span className="font-bold text-gray-700 text-base group-hover:text-blue-900 transition-colors">
                  {lugar}
                </span>
              </div>

              {/* Flechita indicadora a la derecha */}
              <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}