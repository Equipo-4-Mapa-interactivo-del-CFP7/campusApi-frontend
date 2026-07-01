import { useState, useEffect } from 'react';
import { Map, MapPinned, TriangleAlert, Settings, UserCircle2, LogOut, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ModalLogin from "../auth/ModalLogin";
import { PerfilUsuario } from "@/app/page";

interface Props {
    onIrASectores: () => void;
    sectores: string[];
    onSeleccionarDestino: (sector: string) => void;
    estaLogueado: boolean;
    onIrPanel: () => void;
    onLogout: () => void;
    onLoginSuccess: () => void;
    onIrAccesibilidad: () => void;
    onIrComoLlegar: () => void;
    perfil: PerfilUsuario | null;
    onIniciarNavegacion: (origen?: string, destino?: string) => void;
    onIrMapaInterior: () => void;
};

export default function VistaInicio({
    estaLogueado,
    onIrPanel,
    onLogout,
    onLoginSuccess,
    onIrAccesibilidad,
    onIrComoLlegar,
    perfil,
    onIniciarNavegacion,
    onIrMapaInterior
}: Props) {

    const [saludo, setSaludo] = useState("¡Hola!");
    const [fueraDeHorario, setFueraDeHorario] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [mostrarAviso, setMostrarAviso] = useState(false);
    // Estado para controlar qué acceso se está previsualizando
    const [previaAcceso, setPreviaAcceso] = useState<string | null>(null);

    // Lista dinámica de accesos (evita repetir código)
    const listaAccesos = [
        { nombre: "Entrada Ramsay", color: "text-blue-500", bg: "bg-blue-50", hover: "group-hover:bg-blue-500" },
        { nombre: "Entrada Dragones", color: "text-purple-500", bg: "bg-purple-50", hover: "group-hover:bg-purple-500" },
        { nombre: "Entrada Juramento", color: "text-emerald-500", bg: "bg-emerald-50", hover: "group-hover:bg-emerald-500" },
        { nombre: "Entrada Echeverria", color: "text-amber-500", bg: "bg-amber-50", hover: "group-hover:bg-amber-500" },
        { nombre: "Entrada Olazábal", color: "text-rose-500", bg: "bg-rose-50", hover: "group-hover:bg-rose-500" },
    ];

    useEffect(() => {
        const horaActual = new Date().getHours();
        // Lógica de saludo
        if (horaActual >= 6 && horaActual < 12) {
            setSaludo("Buenos días");
        } else if (horaActual >= 12 && horaActual < 20) {
            setSaludo("Buenas tardes");
        } else {
            setSaludo("Buenas noches");
        }

        // Lógica de horario
        if (horaActual < 8 || horaActual >= 18) {
            setFueraDeHorario(true);
        } else {
            setFueraDeHorario(false);
        }
    }, []);


    return (
        <div className="flex flex-col flex-1 w-full bg-gray-50 min-h-screen">

            {/* HEADER IMAGEN (CFP) DE FONDO */}
            {/* Se agrega md:min-h-[380px] para darle un poco más de aire en PC */}
            <header className="relative px-6 pt-12 pb-8 min-h-80 md:min-h-95 flex flex-col justify-end border-b border-gray-100 rounded-b-3xl shadow-sm">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-b-3xl bg-linear-to-b from-[#41b0cb] to-gray-100 transform-gpu will-change-transform">

                    {/* Contenedor de logos */}
                    {/* pt-6 y px-6 aseguran que los logos estén alineados con el padding general del Header */}
                    <div className="w-full pt-6 px-6 flex justify-between items-start">

                        {/* LOGO IZQUIERDA (BA) */}
                        <div className="relative w-32 h-12 md:w-40 md:h-16">
                            <Image
                                src="/ba_vamosba_blanco.webp"
                                alt="Gobierno de la Ciudad de Buenos Aires"
                                fill
                                className="object-contain object-left"
                                priority
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>

                        {/* LOGO DERECHA (CFP7)*/}
                        <div className="relative w-32 h-12 md:w-40 md:h-16 pr-16 md:pr-40">
                            <Image
                                src="/logoCFP7.png"
                                alt="Logo Institución"
                                fill
                                className="object-contain object-right"
                                priority
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>

                    </div>
                </div>

                {/* Contenedor centralizado */}
                <div className="w-full max-w-5xl mx-auto relative z-30 flex flex-col h-full justify-end">

                    {/* Barra superior con Login / Usuario */}
                    <div className="absolute top-8 md:top-6 right-2 z-50">
                        {!estaLogueado ? (
                            <button
                                onClick={() => setMostrarLogin(true)}
                                // En móvil: p-3 y rounded-full (botón circular pequeño). 
                                // En PC (md): px-5 py-3 y rounded-2xl (botón ancho).
                                className="flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 md:px-5 md:py-3 rounded-full md:rounded-2xl border border-white/60 shadow-lg hover:shadow-xl hover:bg-white transition-all active:scale-95 group"
                                title="Iniciar sesión"
                            >
                                <UserCircle2 size={24} className="text-gray-600 group-hover:text-blue-600 transition-colors" />

                                {/* El texto desaparece en móvil (hidden) y aparece en md (md:block) */}
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-800">Iniciar sesión</p>
                                    <p className="text-xs text-gray-500 -mt-0.5">Equipo CFP 7</p>
                                </div>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 md:gap-3">
                                {/* El saludo "Hola, Admin" se oculta en móvil para no saturar */}
                                <div className="hidden md:flex items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-medium text-gray-700 shadow">
                                    <UserCircle2 size={18} className="mr-2 text-blue-600" />
                                    Hola, {perfil?.nombre || 'Admin'}
                                </div>

                                {/* El botón de Panel se vuelve un ícono circular en móvil */}
                                <button
                                    onClick={onIrPanel}
                                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 md:px-5 md:py-2.5 rounded-full md:rounded-2xl font-semibold transition-all active:scale-95 shadow"
                                    title="Ir al panel"
                                >
                                    <Settings size={20} className="md:w-4.5 md:h-4.5" />
                                    <span className="hidden md:inline ml-2 text-sm">Panel</span>
                                </button>

                                {/* Botón de Logout circular */}
                                <button
                                    onClick={onLogout}
                                    className="p-3 bg-white/90 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white rounded-full md:rounded-2xl transition-all active:scale-95 shadow-sm"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>


                    <div className="relative z-10 px-6 pt-24 pb-10 max-w-5xl mx-auto w-full">
                        <div className="text-white">
                            <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2 drop-shadow-sm">
                                {saludo}
                            </p>
                            <p className="text-xl md:text-2xl font-light text-white/90">
                                ¿Dónde empezamos hoy?
                            </p>
                            {fueraDeHorario && (
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/40 border border-amber-400/40 rounded-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
                                    <TriangleAlert size={18} className="text-amber-200" />
                                    <p className="text-sm font-medium text-amber-80">
                                        Fuera del horario de atención. Algunos espacios podrían estar cerrados.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Sección Principal de Acciones */}
            <section className="w-full max-w-5xl mx-auto px-6 flex flex-col relative z-20 pt-2">

                {/* Banner de Aviso Dinámico */}
                {mostrarAviso && (
                    <div className="w-full mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                        <TriangleAlert className="text-amber-500 mr-3 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h3 className="text-sm font-bold text-amber-900">Aviso de Accesibilidad</h3>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                                Los sanitarios de planta baja están en mantenimiento. Por favor, utilizá los del primer piso.
                            </p>
                        </div>
                    </div>
                )}

                {/* BOTÓN PARA MAPA INTERIOR */}
                <button
                    onClick={onIrMapaInterior}
                    className="w-full mb-8 relative overflow-hidden group bg-white border border-gray-100 rounded-3xl p-0 shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
                >
                    {/* Fondo decorativo */}
                    <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative p-5 flex items-center justify-between z-10">
                        <div className="flex items-center gap-4">
                            {/* Ícono principal con sombra de color */}
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-110 transition-transform">
                                <Map size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-black text-gray-800">Mapa Interior (botón provisorio)</h3>
                                <p className="text-sm text-gray-500 font-medium mt-0.5">Explorar aulas, talleres y pasillos</p>
                            </div>
                        </div>
                        {/* Flechita indicadora de acción */}
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                            <ChevronRight size={24} />
                        </div>
                    </div>
                </button>

                {/* LUGARES/ENTRADAS FRECUENTES */}
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2 mt-2">
                    Seleccioná tu punto de partida
                </h2>

                {/* GRID DE ETIQUETAS (CHIPS/PILLS) ESTILO PREMIUM */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {listaAccesos.map((acceso) => (
                        <button
                            key={acceso.nombre}
                            onClick={() => setPreviaAcceso(acceso.nombre)}
                            className="flex items-center pl-2 pr-4 py-2 bg-white border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md rounded-full transition-all active:scale-95 group"
                        >
                            {/* El circulito de color con el ícono */}
                            <div className={`w-8 h-8 rounded-full ${acceso.bg} ${acceso.color} flex items-center justify-center mr-2 group-hover:scale-110 transition-transform`}>
                                <MapPinned size={16} />
                            </div>
                            {/* El texto del acceso */}
                            <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                                {acceso.nombre}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* SECCIÓN EXTERIOR Y AJUSTES */}
            <footer className="w-full max-w-5xl mx-auto px-6 pb-8 flex-1 flex flex-col justify-end">
                <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 flex items-center justify-between">

                    {/* Cómo llegar al edificio desde su casa u otra ubicación (usa maps)*/}
                    <button
                        onClick={onIrComoLlegar}
                        className="flex-1 flex items-center p-3 hover:bg-gray-50 rounded-2xl transition-colors group text-left"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center mr-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                            <MapPinned size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700">¿Cómo llegar al CFP?</p>
                            <p className="text-[10px] text-gray-400">Ver rutas de colectivo y mapa exterior</p>
                        </div>
                    </button>

                    {/* Separador */}
                    <div className="w-px h-12 bg-gray-100 mx-2"></div>

                    {/* Ajustes de Accesibilidad*/}
                    <button
                        onClick={onIrAccesibilidad}
                        className="p-4 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-colors"
                        aria-label="Ajustes de accesibilidad"
                    >
                        <Settings size={24} />
                    </button>
                </div>
            </footer>

            {/* Renderizado de modal */}
            {
                mostrarLogin && (
                    <ModalLogin
                        onCerrar={() => setMostrarLogin(false)}
                        onLoginExitoso={() => {
                            setMostrarLogin(false);
                            onLoginSuccess();
                        }}
                    />
                )
            }


            {/* BOTTOM SHEET DE PREVISUALIZACIÓN */}
            {previaAcceso && (
                <div className="fixed inset-0 z-9999 flex items-end justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">

                    {/* Fondo invisible para cerrar al hacer clic afuera */}
                    <div className="absolute inset-0" onClick={() => setPreviaAcceso(null)}></div>

                    {/* Tarjeta interactiva */}
                    <div className="relative w-full max-w-md bg-white rounded-t-4xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">

                        {/* Botón Cerrar */}
                        <button
                            onClick={() => setPreviaAcceso(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-black text-gray-800 mb-4 pr-8">
                            {previaAcceso}
                        </h3>

                        {/* Contenedor de la Foto */}
                        <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 overflow-hidden relative shadow-inner border border-gray-100">
                            <Image
                                src={`/images/${previaAcceso.toLowerCase().replace(/\s+/g, '_')}.png`}
                                alt={`Foto de ${previaAcceso}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                            {/* Etiqueta superpuesta */}
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                                Vista del acceso exterior
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-6 text-center px-2">
                            Asegurate de estar ubicado frente a este acceso antes de iniciar la navegación.
                        </p>

                        <button
                            onClick={() => {
                                onIniciarNavegacion(previaAcceso, "CFP7");
                                setPreviaAcceso(null); // Cerramos el modal
                            }}
                            className="w-full flex items-center justify-center py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all active:scale-95 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                        >
                            <MapPinned className="mr-2" size={20} />
                            Iniciar recorrido
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
}