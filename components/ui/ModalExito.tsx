"use client";
import { CheckCircle, X } from 'lucide-react';

interface Props {
    onCerrar: () => void;
    titulo?: string;
    mensaje: string;
}

export default function ModalExito({ onCerrar, titulo = "¡Éxito!", mensaje }: Props) {
    return (
        <div className="fixed inset-0 z-101 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 p-8 text-center">
                
                {/* Botón cerrar */}
                <button onClick={onCerrar} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                </button>

                {/* Ícono de éxito */}
                <div className="mx-auto w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-2">{titulo}</h2>
                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">{mensaje}</p>

                <button 
                    onClick={onCerrar}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98]"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}