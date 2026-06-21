import { useAccesibilidad } from "@/context/AccesibilidadContext";
import { ArrowLeft, Eye, Type, BookOpen, Layers, Accessibility } from 'lucide-react';

interface Props {
    onVolver: () => void;
};

export default function VistaAccesibilidad({ onVolver }: Props) {
    const { config, setConfig } = useAccesibilidad();
    const toggleSetting = (key: keyof typeof config) => {
        setConfig({ ...config, [key]: !config[key] });
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 flex-1 w-full">
            <div className="bg-white border-b border-gray-100 shadow-sm w-full">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center">
                    <button onClick={onVolver} className="mr-4 p-2 -ml-2 text-gray-400 hover:text-blue-600 rounded-full transition-all cursor-pointer">
                        <ArrowLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h2 className="font-black text-xl text-gray-800">Accesibilidad</h2>
                </div>
            </div>

            <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
                {/* Lista de ajustes */}
                {[
                    { id: 'altoContraste', label: 'Alto contraste', icon: Eye, desc: 'Mejora la visibilidad del mapa' },
                    { id: 'textoGrande', label: 'Texto grande', icon: Type, desc: 'Aumenta el tamaño de la letra' },
                    { id: 'lecturaFacil', label: 'Lectura fácil', icon: BookOpen, desc: 'Tipografía y espaciado optimizados' },
                    { id: 'modoSimplificado', label: 'Modo simplificado', icon: Layers, desc: 'Navegación e iconografía básica' },
                ].map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{item.label}</p>
                                <p className="text-[10px] text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleSetting(item.id as keyof typeof config)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${config[item.id as keyof typeof config] ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${config[item.id as keyof typeof config] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                    </div>
                ))}

                {/* Item informativo (Lector de pantalla) */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center opacity-70">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mr-4">
                        <Accessibility size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Lector de pantalla</p>
                        <p className="text-[10px] text-gray-400">Próximamente disponible</p>
                    </div>
                </div>
            </div>
        </div>
    );
}