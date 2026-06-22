import { useState, useEffect } from 'react';
import {
    LogOut, ShieldAlert, MapPin, Users, TriangleAlert,
    Settings2, Plus, CheckCircle2, XCircle, ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { mockAvisoActivo, mockIncidencias, mockSanitariosAbiertos, Incidencia } from "@/data/mockData";
import { PerfilUsuario } from "@/app/page";
import { userService } from "@/services/user";

interface Props {
    onLogout: () => void;
    onVolver: () => void;
    perfil: PerfilUsuario | null;
}

interface Usuario {
    id: number;
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

    useEffect(() => {
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
            } catch (err) {
                console.error("Falló la carga", err);
                setUsuarios([]); // Fallback a array vacío para evitar crash
            } finally {
                setCargandoUsuarios(false);
            }
        };
        cargarUsuarios();
    }, []);

    const manejarCambioEstado = async (dni: string) => {
        try {
            await userService.cambiarEstado(dni);
            
            // Magia UI: En vez de recargar todos los usuarios del servidor,
            // solo invertimos el estado 'activo' del usuario que tocamos en nuestra memoria local.
            // Esto hace que la pantalla reaccione INSTANTÁNEAMENTE.
            setUsuarios(usuariosPrevios => 
                usuariosPrevios.map(u => 
                    u.dni === dni ? { ...u, activo: !u.activo } : u
                )
            );
            
        } catch (error: any) {
            alert("Error al cambiar el estado: " + error.message);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 flex-1 overflow-y-auto overflow-x-hidden pb-8">

            {/* HEADER ADMIN - Edge to Edge de fondo, pero contenido centrado */}
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
                    <button
                        onClick={onLogout}
                        className="p-3 bg-gray-800 text-gray-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-gray-700 rounded-2xl transition-all active:scale-95 cursor-pointer group"
                        title="Cerrar sesión"
                    >
                        <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                    </button>
                </div>
            </header>

            {/* CONTENEDOR DE TARJETAS (DASHBOARD) */}
            <main className="max-w-5xl mx-auto w-full p-6 flex flex-col lg:grid lg:grid-cols-3 gap-6">

                {/* 1. GESTIÓN DEL AVISO DEL INICIO */}
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

                {/* 3. INCIDENCIAS ACTIVAS */}
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

                {/* COLUMNA LATERAL DERECHA */}
                <div className="flex flex-col gap-6 lg:col-span-1">

                    {/* 2. ESTADO DE SECTORES */}
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

                    {/* 4. GESTIÓN DE USUARIOS */}
                    <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-sm font-black text-gray-800 flex items-center mb-4">
                            <Users className="mr-2 text-purple-500" size={20} />
                            Administradores y Personal
                        </h2>

                        <div className="space-y-2 mb-4">
                            {cargandoUsuarios ? (
                                <p className="text-xs text-gray-400 animate-pulse">Cargando lista...</p>
                            ) : usuarios.length > 0 ? (
                                usuarios.map((u) => (
                                    <div key={u.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            {/* BLINDAJE: usamos charAt(0) y un fallback 'U' por si el nombre está vacío */}
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs uppercase">
                                                {u.nombre?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">
                                                    {u.nombre || 'Sin nombre'} {u.apellido || ''}
                                                </span>
                                                <span className="text-[10px] text-gray-400">{u.rol || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => manejarCambioEstado(u.dni)}
                                            title={u.activo ? "Click para desactivar" : "Click para activar"}
                                            className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase cursor-pointer hover:opacity-80 transition-opacity ${u.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                        >
                                            {u.activo ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">No se encontraron usuarios.</p>
                            )}
                        </div>

                        <button className="w-full flex items-center justify-center py-3 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer">
                            <Plus size={18} className="mr-1" />
                            Añadir administrador
                        </button>
                    </section>

                </div>

            </main>
        </div>
    );
}