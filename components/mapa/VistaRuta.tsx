import { ArrowLeft, MapPin, CircleDot } from 'lucide-react';
import { useState } from 'react';
import ModalFinalizar from "../ui/ModalFinalizar";

interface Props {
  origen: string;
  destino: string;
  onFinalizar: () => void;
}

export default function VistaRuta({ origen, destino, onFinalizar }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 flex-1 w-full">
      <div className="bg-white border-b border-gray-100 shadow-sm w-full relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center">
          <button onClick={onFinalizar} className="mr-4 p-2 -ml-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div>
            <h2 className="font-black text-xl text-gray-800 tracking-tight">Ruta Activa</h2>
            <p className="text-xs font-medium text-gray-500 mt-0.5">Siguiendo indicaciones</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-4 md:p-6 flex flex-col items-center flex-1">
        
        {/* Resumen */}
        <div className="w-full max-w-2xl bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-stretch">
            <div className="flex flex-col items-center mr-4 mt-1">
              <CircleDot size={18} className="text-blue-500" strokeWidth={3} />
              <div className="w-0.5 flex-1 bg-gray-200 my-1.5 rounded-full"></div>
              <MapPin size={20} className="text-green-500" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-between py-0.5">
              <div><p className="text-[10px] font-bold text-gray-400 uppercase">Partida</p><p className="font-bold text-gray-800 text-sm">{origen}</p></div>
              <div><p className="text-[10px] font-bold text-gray-400 uppercase">Destino</p><p className="font-bold text-gray-800 text-sm">{destino}</p></div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalVisible(true)}
          className="mt-8 w-full max-w-md py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-md cursor-pointer"
        >
          Finalizar Recorrido
        </button>
      </div>

      {modalVisible && <ModalFinalizar destino={destino} onCerrar={() => setModalVisible(false)} />}
    </div>
  );
}