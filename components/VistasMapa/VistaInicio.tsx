import { useState, useEffect } from 'react';
import { Map, MapPinned, TriangleAlert, Settings, Search, ChevronRight, Users, Coffee } from 'lucide-react';
import Image from 'next/image';

interface Props {
    onIrASectores: () => void;
    sectores: string[];
    onSeleccionarDestino: (sector: string) => void;
}

export default function VistaInicio({ onIrASectores, sectores, onSeleccionarDestino }: Props) {
    const [busqueda, setBusqueda] = useState("");
    const [saludo, setSaludo] = useState("¡Hola!");

    useEffect(() => {
        const horaActual = new Date().getHours();
        if (horaActual >= 6 && horaActual < 12) {
            setSaludo("Buenos días,");
        } else if (horaActual >= 12 && horaActual < 20) {
            setSaludo("Buenas tardes,");
        } else {
            setSaludo("Buenas noches,");
        }
    }, []);

    const sectoresFiltrados = busqueda.length > 0
        ? sectores.filter((sector) => sector.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()))
        : [];

    return (
        <>
            {/* HEADER CON IMAGEN (CFP) DE FONDO */}
            <header className="relative px-6 pt-12 pb-8 min-h-80 flex flex-col justify-end border-b border-gray-100 rounded-b-3xl shadow-sm">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-b-3xl">
                    <Image
                        src="/Image_CFPUP1reduFULL.png"
                        alt="Frente del CFP N.7"
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 80vw,
                                60vw"
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-100/80 to-gray-100"></div>
                </div>

                <div className="relative z-30 w-full mt-4 flex flex-col items-center">
                    <h1 className="text-2xl font-black leading-none tracking-tight text-gray-900 mb-6 text-center drop-shadow-sm">
                        CFP N.7
                    </h1>

                    <div className="text-center mb-6 space-y-2 w-full">
                        <p className="text-2xl font-black leading-none tracking-tight text-gray-800 drop-shadow-sm">{saludo}</p>
                        <p className="text-lg font-bold leading-none tracking-normal text-gray-700 drop-shadow-sm">¿A dónde querés ir?</p>
                    </div>

                    {/* BUSCADOR INTELIGENTE */}
                    <div className="relative z-30 w-full max-w-md mx-auto mt-2">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Buscar aula, oficina o sector..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-5 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-md text-gray-800 font-medium placeholder:text-gray-400"
                            />
                            <Search className="absolute right-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        </div>

                        {/* RESULTADOS DEL BUSCADOR */}
                        {busqueda.length > 0 && sectoresFiltrados.length > 0 && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl overflow-hidden divide-y divide-gray-50 z-70">
                                {sectoresFiltrados.map((sector) => (
                                    <button
                                        key={sector}
                                        onClick={() => onSeleccionarDestino(sector)}
                                        className="group w-full flex items-center justify-between px-5 py-4 hover:bg-blue-50 transition-colors cursor-pointer text-left"
                                    >
                                        <div className="flex items-center">
                                            <MapPinned size={18} className="text-gray-400 group-hover:text-blue-500 mr-3 transition-colors" />
                                            <span className="font-bold text-gray-700 group-hover:text-blue-900">{sector}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* SI NO HAY RESULTADOS */}
                        {busqueda.length > 0 && sectoresFiltrados.length === 0 && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 text-center z-70">
                                <Search size={24} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-sm font-bold text-gray-600">No encontramos "{busqueda}"</p>
                                <p className="text-xs text-gray-400 mt-1">Intentá con otro nombre o sector</p>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* SECCIÓN "DASHBOARD" */}
            <section className="w-full px-6 flex flex-col relative z-20 -mt-6">

                {/* Banner de Aviso Dinámico (Hardcodeado para ejemplo, si se escala, esto debe venir desde la DB) */}
                <div className="w-full mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <TriangleAlert className="text-amber-500 mr-3 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h3 className="text-sm font-bold text-amber-900">Aviso de Accesibilidad</h3>
                        <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                            Los sanitarios están en mantenimiento. Por favor, evitá usarlos o pedí asistencia.
                        </p>
                    </div>
                </div>

                {/* Acá los destinos frecuentes, idealmente esto debería venir del perfil de usario, a donde más se dirige */}
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
                    Destinos Frecuentes
                </h2>

                {/* Tarjetas de Aulas/Sectores Rápidos */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                        onClick={() => onSeleccionarDestino("Preceptoría")}
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50 transition-all text-left group cursor-pointer flex flex-col"
                    >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Users size={20} strokeWidth={2.5} />
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-blue-900 transition-colors">Preceptoría</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">Trámites generales</p>
                    </button>

                    <button
                        onClick={() => onSeleccionarDestino("Comedor")}
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 hover:bg-orange-50/50 transition-all text-left group cursor-pointer flex flex-col"
                    >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Coffee size={20} strokeWidth={2.5} />
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-orange-900 transition-colors">Buffet</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">Comedor y descanso</p>
                    </button>
                </div>
            </section>

            {/* ACCESOS RÁPIDOS */}
            <footer className="px-6 pb-8 bg-gray-50 flex-1 flex flex-col">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">Accesos Rápidos</h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4">

                    <button className="flex flex-col items-center p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-3xl text-center transition-all active:scale-95 group">
                        <Map
                            strokeWidth={2}
                            className="w-8 h-8 mb-3 text-blue-500 group-hover:text-blue-600 group-hover:-translate-y-1 transition-all"
                        />
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tight group-hover:text-blue-900 transition-colors">Rutas</span>
                        <span className="text-[10px] text-gray-400 mt-1">Tus guardadas</span>
                    </button>

                    <button
                        onClick={onIrASectores}
                        className="flex flex-col items-center p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-3xl text-center transition-all active:scale-95 group cursor-pointer"
                    >
                        <MapPinned
                            strokeWidth={2}
                            className="w-8 h-8 mb-3 text-green-500 group-hover:text-green-600 group-hover:-translate-y-1 transition-all"
                        />
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tight group-hover:text-green-900 transition-colors">Sectores</span>
                        <span className="text-[10px] text-gray-400 mt-1">Aulas y oficinas</span>
                    </button>

                    <button className="flex flex-col items-center p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-3xl text-center transition-all active:scale-95 group">
                        <TriangleAlert
                            strokeWidth={2}
                            className="w-8 h-8 mb-3 text-amber-500 group-hover:text-amber-600 group-hover:-translate-y-1 transition-all"
                        />
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tight group-hover:text-amber-900 transition-colors">Reportes</span>
                        <span className="text-[10px] text-gray-400 mt-1">Incidencias</span>
                    </button>

                    <button className="flex flex-col items-center p-5 bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-3xl text-center transition-all active:scale-95 group">
                        <Settings
                            strokeWidth={2}
                            className="w-8 h-8 mb-3 text-purple-500 group-hover:text-purple-600 group-hover:-translate-y-1 transition-all"
                        />
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tight group-hover:text-purple-900 transition-colors">Ajustes</span>
                        <span className="text-[10px] text-gray-400 mt-1">Accesibilidad</span>
                    </button>

                </div>
            </footer>
        </>
    );
}