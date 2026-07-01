import { useState, useEffect } from 'react';
import {
    LogOut, ShieldAlert, MapPin, Users, TriangleAlert,
    Settings2, Plus, CheckCircle2, ArrowLeft, Search,
    XCircle,
    KeyRound,
    UserCircle2,
    Settings
} from 'lucide-react';
import { mockAvisoActivo, mockIncidencias, mockSanitariosAbiertos, Incidencia } from "@/data/mockData";
import { PerfilUsuario } from "@/app/page";
import { userService } from "@/services/user";
import ModalRegistrar from "./ModalRegistrar";
import ModalExito from "../ui/ModalExito";
import ModalPerfil from "../ui/ModalPerfil";
import ModalGestionarUsuario from "./ModalGestionarUsuarioAdmin";

interface Props {
    onLogout: () => void;
    onVolver: () => void;
    perfil: PerfilUsuario | null;
}

interface Usuario {
    id: string;
    dni: string;
    rol: string;
    nombre: string;
    apellido: string;
    activo: boolean;
}

export default function VistaAdmin({ onLogout, onVolver, perfil }: Props) {
    const [avisoActivo, setAvisoActivo] = useState(mockAvisoActivo);
    const [sanitariosAbiertos, setSanitariosAbiertos] = useState(mockSanitariosAbiertos);
    const [incidencias, setIncidencias] = useState<Incidencia[]>(mockIncidencias);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
    const mostrarSeccionesExtra = false;
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
    const [mostrarModalExito, setMostrarModalExito] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);
    const [usuarioAGestionar, setUsuarioAGestionar] = useState<Usuario | null>(null);

    const usuariosFiltrados = usuarios.filter((u) => {
        const termino = busqueda.toLowerCase();
        const nombreCompleto = `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase();
        const dni = u.dni?.toLowerCase() || ''; // Por si buscan por DNI

        return nombreCompleto.includes(termino) || dni.includes(termino);
    });

    const cargarUsuarios = async () => {
        setCargandoUsuarios(true);
        try {
            const data = await userService.listar({ size: 20 });
            // BLINDAJE: Verificamos que 'content' exista y sea un array
            if (data && Array.isArray(data.content)) {
                setUsuarios(data.content);
            } else {
                setUsuarios([]);
            }
        } catch (err: any) {
            console.error("Falló la carga", err);
            // Deslogueamos al usuario si tiene un AuthError (Ej: Token expirado)
            if (err.name === "AuthError" || err.message === "Sesión expirada") {
                // 1. Avisamos al usuario
                alert("Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente.");

                // 2. Ejecutamos prop onLogout (que debe limpiar el token y llevar a inicio)
                onLogout();

                // 3. Importante: Cortamos la función con 'return'
                return;
            }
            setUsuarios([]); // Fallback a array vacío para evitar crash
        } finally {
            setCargandoUsuarios(false);
        }
    };


    useEffect(() => {
        cargarUsuarios();
    }, []);

    const manejarCambioEstado = async (id: string) => {
        try {
            await userService.cambiarEstado(id);

            // En lugar de recargar todos los usuarios del servidor,
            // solo invertimos el estado 'activo' del usuario en memoria local.
            setUsuarios(usuariosPrevios =>
                usuariosPrevios.map(u =>
                    u.id === id ? { ...u, activo: !u.activo } : u
                )
            );

        } catch (error: any) {
            alert("Error al cambiar el estado: " + error.message);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 flex-1 overflow-y-auto overflow-x-hidden pb-8">

            {/* HEADER ADMIN - Edge to Edge de fondo */}
            <header className="bg-gray-900 border-b border-gray-800 shadow-md relative z-20 shrink-0 w-full">
                <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                        {/* Botón Volver */}
                        <button onClick={onVolver} className="p-2 bg-gray-800 text-gray-300 rounded-full hover:text-white hover:bg-gray-700 transition">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight flex items-center">
                                <Settings2 className="mr-2 text-blue-400" size={24} />
                                Panel de Control
                            </h1>
                            {/* Renderizado de Perfil */}
                            <p className="text-xs text-gray-400 font-medium mt-1">
                                {/* Usamos la prop directamente */}
                                {perfil ? (
                                    <span> Sesión iniciada como <strong className="text-blue-300">{perfil.nombre} {perfil.apellido}</strong> ({perfil.rol})</span>
                                ) : (
                                    <span className="animate-pulse">Cargando datos...</span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Botón de Perfil y LogOut */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMostrarModalPerfil(true)}
                            className="p-3 bg-gray-800 text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 border border-gray-700 rounded-2xl transition-all active:scale-95 cursor-pointer group"
                            title="Mi Perfil"
                        >
                            <UserCircle2 size={20} className="group-hover:text-blue-400 transition-colors" />
                        </button>
                        <button
                            onClick={onLogout}
                            className="p-3 bg-gray-800 text-gray-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-gray-700 rounded-2xl transition-all active:scale-95 cursor-pointer group"
                            title="Cerrar sesión"
                        >
                            <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENEDOR DE TARJETAS (DASHBOARD) */}
            <main className="max-w-5xl mx-auto w-full p-6 flex flex-col lg:grid lg:grid-cols-3 gap-6">

                {/* 1. GESTIÓN DEL AVISO DEL INICIO */}
                {mostrarSeccionesExtra && (
                    <>
                        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 lg:col-span-3">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-black text-gray-800 flex items-center">
                                    <ShieldAlert className="mr-2 text-amber-500" size={20} />
                                    Aviso Global en Inicio
                                </h2>
                                {/* Toggle Switch Mock */}
                                <button
                                    onClick={() => setAvisoActivo(!avisoActivo)}
                                    className={`w-12 h-6 rounded-full transition-colors relative shadow-inner cursor-pointer ${avisoActivo ? 'bg-green-500' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${avisoActivo ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                </button>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    defaultValue="Aviso de Accesibilidad"
                                    disabled={!avisoActivo}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                                />
                                <textarea
                                    rows={2}
                                    defaultValue="Los sanitarios están en mantenimiento. Por favor, evitá usarlos o pedí asistencia."
                                    disabled={!avisoActivo}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 resize-none"
                                />
                                <button className="w-full lg:w-auto lg:px-8 lg:float-right py-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl font-bold text-sm hover:bg-amber-100 transition-colors cursor-pointer">
                                    Guardar Aviso
                                </button>
                                <div className="clear-both"></div>
                            </div>
                        </section>
                    </>
                )}

                {/* 3. INCIDENCIAS ACTIVAS */}
                {mostrarSeccionesExtra && (
                    <>
                        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-black text-gray-800 flex items-center">
                                    <TriangleAlert className="mr-2 text-red-500" size={20} />
                                    Incidencias Activas
                                </h2>
                                <span className="bg-red-100 text-red-600 text-xs font-black px-2.5 py-1 rounded-full">
                                    {incidencias.length}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {incidencias.length > 0 ? (
                                    incidencias.map((incidencia) => (
                                        <div key={incidencia.id} className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between group">
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-sm">{incidencia.problema}</h3>
                                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                                                    📍 {incidencia.lugar} • ⏱️ {incidencia.tiempo}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setIncidencias(incidencias.filter(i => i.id !== incidencia.id))}
                                                className="w-10 h-10 rounded-xl bg-white text-green-500 border border-green-200 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all cursor-pointer shadow-sm"
                                                title="Marcar como resuelto"
                                            >
                                                <CheckCircle2 size={20} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-200 rounded-2xl">
                                        No hay incidencias reportadas.
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/* COLUMNA LATERAL DERECHA */}
                <div className="flex flex-col gap-6 lg:col-span-1">

                    {/* 2. ESTADO DE SECTORES */}
                    {mostrarSeccionesExtra && (
                        <>
                            <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-sm font-black text-gray-800 flex items-center mb-4">
                                    <MapPin className="mr-2 text-blue-500" size={20} />
                                    Estado de Sectores
                                </h2>

                                <div className="space-y-3">
                                    {/* Sector 1: Sanitarios (Interactivo) - a modo de ejemplo */}
                                    <div className={`p-4 rounded-2xl border transition-colors ${sanitariosAbiertos ? 'bg-white border-gray-100' : 'bg-red-50 border-red-100'}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-gray-800">Cocina</span>
                                            <button
                                                onClick={() => setSanitariosAbiertos(!sanitariosAbiertos)}
                                                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${sanitariosAbiertos ? 'bg-green-100 text-green-700' : 'bg-red-500 text-white shadow-md'}`}
                                            >
                                                {sanitariosAbiertos ? 'ABIERTO' : 'CERRADO'}
                                            </button>
                                        </div>
                                        {!sanitariosAbiertos && (
                                            <input
                                                type="text"
                                                defaultValue="En reparación por pérdida de agua."
                                                placeholder="Motivo del cierre..."
                                                className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg text-xs text-red-700 focus:outline-none focus:border-red-400"
                                            />
                                        )}
                                    </div>

                                    {/* Sector 2: Fijo de ejemplo */}
                                    <div className="p-4 rounded-2xl bg-white border border-gray-100 flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Biblioteca</span>
                                        <button className="px-3 py-1 text-xs font-bold rounded-lg bg-green-100 text-green-700">ABIERTO</button>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}

                    {/* GESTIÓN DE USUARIOS */}
                    <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-black text-gray-800 flex items-center mb-4">
                                <Users className="mr-2 text-purple-500" size={20} />
                                Administradores y Personal
                            </h2>

                            {/*  badge para mostrar la cantidad encontrada */}
                            {!cargandoUsuarios && (
                                <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                                    {usuariosFiltrados.length}
                                </span>
                            )}
                        </div>

                        {/* BARRA DE BÚSQUEDA */}
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, apellido o DNI..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                // Si la lista está cargando, deshabilitamos el input
                                disabled={cargandoUsuarios}
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all disabled:opacity-50"
                            />
                            {/* Botón rápido para limpiar la búsqueda si hay texto */}
                            {busqueda && (
                                <button
                                    onClick={() => setBusqueda("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <XCircle size={16} />
                                </button>
                            )}
                        </div>

                        <div className="space-y-2 mb-4">
                            {cargandoUsuarios ? (
                                <p className="text-xs text-gray-400 animate-pulse text-center py-4">Cargando lista...</p>
                            ) : usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map((u) => (
                                    <div key={u.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs uppercase">
                                                {u.nombre?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">
                                                    {u.nombre || 'Sin nombre'} {u.apellido || ''}
                                                </span>
                                                <span className="text-[10px] text-gray-400">{u.rol || 'N/A'} • DNI: {u.dni}</span>
                                            </div>
                                        </div>
                                        {/* EL NUEVO BOTÓN ELEGANTE */}
                                        <button
                                            onClick={() => setUsuarioAGestionar(u)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg text-xs font-bold transition-all shadow-sm"
                                        >
                                            <Settings size={14} />
                                            Gestionar
                                        </button>
                                    </div>
                                ))
                            ) : (
                                // Feedback 
                                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl">
                                    <p className="text-xs text-gray-400 font-medium">
                                        {usuarios.length === 0
                                            ? "No hay usuarios registrados aún."
                                            : "No se encontró a nadie con esa búsqueda."}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setMostrarModalRegistro(true)}
                            className="w-full flex items-center justify-center py-3 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                            <Plus size={18} className="mr-1" />
                            Añadir personal
                        </button>

                        {/* Renderizado condicional del modal */}
                        {mostrarModalRegistro && (
                            <ModalRegistrar
                                onCerrar={() => setMostrarModalRegistro(false)}
                                onSuccess={() => {
                                    setMostrarModalRegistro(false);
                                    cargarUsuarios();
                                    setMostrarModalExito(true);
                                }}
                                token={typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''}
                                rolUsuarioLogueado={perfil?.rol || 'PERSONAL'}
                            />
                        )}
                        {mostrarModalExito && (
                            <ModalExito
                                onCerrar={() => setMostrarModalExito(false)}
                                titulo="Personal registrado"
                                mensaje="El usuario fue creado correctamente. Ya puede iniciar sesión con sus credenciales."
                            />
                        )}

                        {usuarioAGestionar && (
                            <ModalGestionarUsuario
                                usuario={usuarioAGestionar}
                                onCerrar={() => setUsuarioAGestionar(null)}
                                // Actualización Inmediata (Local)
                                onUpdate={(usuarioActualizado) => {
                                    setUsuarios(prev => prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
                                    setUsuarioAGestionar(usuarioActualizado); // Para que el modal refleje el cambio
                                }}
                                // Eliminación Inmediata (Local)
                                onDelete={(idEliminado) => {
                                    setUsuarios(prev => prev.filter(u => u.id !== idEliminado));
                                }}
                            />
                        )}

                        
                        {/* MODAL MI PERFIL */}
                        {mostrarModalPerfil && perfil && (
                            <ModalPerfil
                                perfil={perfil}
                                onCerrar={() => setMostrarModalPerfil(false)}
                            />
                        )}
                    </section>
                </div>
            </main >
        </div >
    );
}