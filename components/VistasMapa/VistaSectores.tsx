import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';


interface Props {
  sectores: string[];
  onSeleccionar: (sector: string) => void;
  onVolver: () => void;
}
// Se pasa la lista de sectores, y dos funciones para volver o avanzar
export default function VistaSectores({ sectores, onSeleccionar, onVolver }: Props) {
  return (
    <div className="flex flex-col h-full bg-gray-50 flex-1">
      
      {/* HEADER */}
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center shadow-sm relative z-10">
        <button 
          onClick={onVolver} 
          className="mr-4 p-2 -ml-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all cursor-pointer"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <div>
          <h2 className="font-black text-xl text-gray-800 tracking-tight">Destinos</h2>
          <p className="text-xs font-medium text-gray-500 mt-0.5">¿A qué sector querés ir?</p>
        </div>
      </div>

      {/* LISTA DE SECTORES */}
      <div className="p-4 md:p-6 space-y-3 overflow-y-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
          Sectores disponibles
        </p>

        {sectores.map((sector) => (
          <button 
            key={sector} 
            onClick={() => onSeleccionar(sector)}
            className="group w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 hover:bg-green-50/50 transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center">
              {/* Caja visual */}
              <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mr-4 group-hover:bg-green-100 group-hover:text-green-600 group-hover:scale-110 transition-all">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              
              {/* Texto del sector */}
              <span className="font-bold text-gray-700 text-base group-hover:text-green-900 transition-colors">
                {sector}
              </span>
            </div>

            {/* Flechita indicadora a la derecha */}
            <ChevronRight size={20} className="text-gray-300 group-hover:text-green-500 transition-colors" />
          </button>
        ))}
      </div>
      
    </div>
  );
}