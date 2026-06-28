import { useState } from 'react';
import { LogOut, MapPin, TriangleAlert, ArrowLeft, Eye, Plus, CheckCircle2, Clock } from 'lucide-react';
import { mockIncidencias, mockSanitariosAbiertos } from "@/data/mockData";
import { PerfilUsuario } from "@/app/page";

export default function VistaPersonal({ onLogout, onVolver, perfil }: Props) {
    const [incidencias, setIncidencias] = useState(mockIncidencias);

    const handleMarcarResuelto = (id: string) => {
        // En un caso real, aquí iría el fetch al backend
        setIncidencias(prev => prev.filter(i => i.id !== id));
        // Aquí podrías agregar un Toast de "Incidencia marcada como resuelta"
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 flex-1 overflow-y-auto pb-8">
            {/* HEADER */}
            <header className="bg-blue-600 shadow-md relative z-20 shrink-0 w-full">
                <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onVolver} className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"><ArrowLeft size={20} /></button>
                        <div>
                            <h1 className="text-xl font-black text-white flex items-center"><Eye className="mr-2" size={24} /> Mi Panel de Acción</h1>
                            <p className="text-blue-100 text-xs">Hola, <strong>{perfil?.nombre}</strong>, ¿qué gestionamos hoy?</p>
                        </div>
                    </div>
                    <button onClick={onLogout} className="p-3 bg-blue-700 text-white hover:bg-red-600 rounded-2xl transition-all"><LogOut size={20} /></button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto w-full p-6 space-y-6">
                
                {/* 1. SECCIÓN DE ACCIÓN RÁPIDA (UX Premium) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer">
                        <div className="text-left">
                            <h3 className="font-black text-gray-800">Nueva Incidencia</h3>
                            <p className="text-xs text-gray-500">Reportar problema en un sector</p>
                        </div>
                        <div className="bg-blue-600 text-white p-3 rounded-2xl group-hover:scale-110 transition-transform">
                            <Plus size={24} />
                        </div>
                    </button>
                    
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-gray-800">Sectores cerrados</h3>
                            <p className="text-xs text-gray-500">Estado de cocina y sanitarios</p>
                        </div>
                        <span className={`px-4 py-2 text-sm font-black rounded-xl ${mockSanitariosAbiertos ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {mockSanitariosAbiertos ? 'TODO ABIERTO' : 'HAY RESTRICCIONES'}
                        </span>
                    </div>
                </div>

                {/* 2. INCIDENCIAS (Gestión activa) */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-black text-gray-800 flex items-center">
                            <TriangleAlert className="mr-2 text-orange-500" size={20} />
                            Incidencias Pendientes ({incidencias.length})
                        </h2>
                    </div>
                    
                    <div className="space-y-3">
                        {incidencias.length > 0 ? incidencias.map((i) => (
                            <div key={i.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between hover:border-orange-200 transition-colors">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm">{i.problema}</h3>
                                    <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mt-1">
                                        <MapPin size={10} /> {i.lugar} • <Clock size={10} /> {i.tiempo}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleMarcarResuelto(i.id)}
                                    className="p-3 bg-white border border-gray-200 text-gray-400 rounded-xl hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all"
                                    title="Marcar como resuelto"
                                >
                                    <CheckCircle2 size={20} />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-gray-400 text-sm italic">
                                ¡Todo despejado! No hay incidencias activas.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}