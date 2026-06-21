import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';

interface Props {
  sectores: string[];
  onSeleccionar: (sector: string) => void;
  onVolver: () => void;
}

export default function VistaSectores({ sectores, onSeleccionar, onVolver }: Props) {
  return (
    <div className="flex flex-col h-full bg-gray-50 flex-1 w-full">
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 shadow-sm w-full relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center">
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
      </div>

      {/* LISTA DE SECTORES */}
      <div className="p-4 md:p-6 w-full max-w-5xl mx-auto flex-1">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
          Sectores disponibles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectores.map((sector) => (
            <button 
              key={sector} 
              onClick={() => onSeleccionar(sector)}
              className="group w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 hover:bg-green-50/50 transition-all active:scale-95 cursor-pointer"
            >
              <div className="flex items-center truncate">
                {/* Caja visual */}
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mr-4 shrink-0 group-hover:bg-green-100 group-hover:text-green-600 group-hover:scale-110 transition-all">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                
                {/* Texto del sector */}
                <span className="font-bold text-gray-700 text-base group-hover:text-green-900 transition-colors truncate">
                  {sector}
                </span>
              </div>

              {/* Flechita indicadora */}
              <ChevronRight size={20} className="text-gray-300 group-hover:text-green-500 transition-colors shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}