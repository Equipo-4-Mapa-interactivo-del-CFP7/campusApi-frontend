import { CheckCircle2 } from 'lucide-react';
import { mensajesDestino } from '@/utils/mensajesDestino';

interface Props {
  destino: string;
  onCerrar: () => void; // El padre (VistaRuta) le pasa la función para cerrarlo
}

export default function ModalFinalizar({ destino, onCerrar }: Props) {
  // Se busca la lista de mensajes en base al destino (o usamos el default)
  const listaDeMensajes = mensajesDestino[destino] || mensajesDestino["default"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 pb-6 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        
        {/* ícono */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
            <CheckCircle2 className="text-green-500" size={32} strokeWidth={2.5} />
          </div>
        </div>

        {/* Título de llegada */}
        <h2 className="text-center text-gray-900 font-black text-xl mb-4 tracking-tight">
          ¡Llegaste a {destino}!
        </h2>

        {/* Lógica de la ficha */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
          <ul className="space-y-3">
            {listaDeMensajes.map((mensaje, index) => (
              <li key={index} className="flex items-start text-left">
                {/* Viñeta */}
                <span className="text-green-500 mr-2 mt-0.5 font-bold">•</span>
                <span className="text-gray-600 text-sm leading-relaxed font-medium">
                  {mensaje}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* botón */}
        <button
          onClick={onCerrar}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-base hover:bg-gray-800 transition-all active:scale-95 cursor-pointer shadow-md"
        >
          Entendido
        </button>

      </div>
    </div>
  );
}