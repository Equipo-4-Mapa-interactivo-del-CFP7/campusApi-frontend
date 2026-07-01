import { useState } from 'react';
import { X, KeyRound, Power, Trash2, IdCard, AlertTriangle, UserCircle2, Info } from 'lucide-react';
import { userService } from "@/services/user";

interface Usuario {
    id: string;
    dni: string;
    rol: string;
    nombre: string;
    apellido: string;
    activo: boolean;
}

interface Props {
    usuario: Usuario;
    onCerrar: () => void;
    onUpdate: (usuarioActualizado: Usuario) => void;
    onDelete: (id: string) => void;
}

// Expandimos el estado para cubrir todas las acciones
type TipoAccion = 'reset' | 'eliminar' | 'estado' | 'dni' | null;

export default function ModalGestionarUsuario({ usuario, onCerrar, onUpdate, onDelete }: Props) {
    const [cargando, setCargando] = useState(false);
    const [accionConfirmar, setAccionConfirmar] = useState<TipoAccion>(null);
    const [editandoDni, setEditandoDni] = useState(false);
    const [nuevoDni, setNuevoDni] = useState(usuario.dni);

    // 1. CAMBIAR ESTADO (Activo/Inactivo)
    const handleCambiarEstado = async () => {
        setCargando(true);
        try {
            await userService.cambiarEstado(usuario.id);
            onUpdate({ ...usuario, activo: !usuario.activo });
            setAccionConfirmar(null);
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setCargando(false);
        }
    };

    // 2. RESTABLECER CONTRASEÑA
    const handleResetPassword = async () => {
        setCargando(true);
        try {
            await userService.restablecerPassword(usuario.id);
            onUpdate({ ...usuario, rol: "CHANGE_PASSWORD" });
            setAccionConfirmar(null);
            alert("Contraseña restablecida exitosamente.");
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setCargando(false);
        }
    };

    // 3. ACTUALIZAR DNI
    const handleActualizarDni = async () => {
        setCargando(true);
        try {
            await userService.actualizarDni(usuario.id, nuevoDni);
            onUpdate({ ...usuario, dni: nuevoDni });
            setEditandoDni(false);
            setAccionConfirmar(null);
            alert("DNI actualizado correctamente.");
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setCargando(false);
        }
    };

    // 4. ELIMINAR USUARIO
    const handleEliminar = async () => {
        setCargando(true);
        try {
            await userService.eliminarUsuario(usuario.id);
            onDelete(usuario.id);
            onCerrar();
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setCargando(false);
        }
    };

    // Función auxiliar para cancelar ediciones limpiamente
    const cancelarAccion = () => {
        setAccionConfirmar(null);
        setEditandoDni(false);
        setNuevoDni(usuario.dni);
    };

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-50 rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/20">
                
                {/* HEADER PRO: Elegante, limpio y con jerarquía */}
                <div className="bg-white px-8 py-6 flex justify-between items-start shrink-0 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-black tracking-tighter shadow-sm">
                            {usuario.nombre.charAt(0)}{usuario.apellido?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {usuario.nombre} {usuario.apellido}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                    {usuario.rol}
                                </span>
                                <span className="text-slate-400 text-xs font-medium">
                                    ID: {usuario.id}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onCerrar} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENIDO SCROLLEABLE */}
                <div className="p-8 overflow-y-auto flex-1 space-y-6">

                    {/* SECCIÓN: ACCESO Y ESTADO */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Control de Acceso</h3>
                        
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl ${usuario.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        <Power size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Estado de la cuenta</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Actualmente <strong className={usuario.activo ? 'text-emerald-600' : 'text-rose-600'}>{usuario.activo ? 'Habilitada' : 'Suspendida'}</strong>.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setAccionConfirmar('estado')} 
                                    disabled={cargando}
                                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors border ${usuario.activo ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'}`}
                                >
                                    {usuario.activo ? 'Suspender' : 'Habilitar'}
                                </button>
                            </div>

                            {/* CONFIRMACIÓN: ESTADO */}
                            {accionConfirmar === 'estado' && (
                                <div className="mt-5 p-4 bg-slate-50 border-l-4 border-slate-400 rounded-r-xl animate-in slide-in-from-top-2">
                                    <p className="text-sm text-slate-700 font-medium mb-3">
                                        ¿Estás seguro de que deseas {usuario.activo ? 'suspender' : 'habilitar'} el acceso para este usuario?
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={cancelarAccion} className="px-4 py-2 bg-white text-slate-600 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-100">Cancelar</button>
                                        <button onClick={handleCambiarEstado} disabled={cargando} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">Confirmar cambio</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECCIÓN: IDENTIDAD (DNI) */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Identidad</h3>
                        
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><IdCard size={20} strokeWidth={2.5}/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Documento (DNI)</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">{usuario.dni}</p>
                                    </div>
                                </div>
                                {!editandoDni && (
                                    <button onClick={() => setEditandoDni(true)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-xs transition-colors">
                                        Modificar
                                    </button>
                                )}
                            </div>

                            {editandoDni && accionConfirmar !== 'dni' && (
                                <div className="mt-4 flex gap-2 animate-in fade-in">
                                    <input 
                                        type="text" 
                                        value={nuevoDni} 
                                        onChange={(e) => setNuevoDni(e.target.value)}
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                    <button onClick={cancelarAccion} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors">Cancelar</button>
                                    <button 
                                        onClick={() => setAccionConfirmar('dni')} 
                                        disabled={nuevoDni === usuario.dni || nuevoDni.length < 7} 
                                        className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}

                            {/* CONFIRMACIÓN: DNI */}
                            {accionConfirmar === 'dni' && (
                                <div className="mt-5 p-4 bg-blue-50/50 border-l-4 border-blue-500 rounded-r-xl animate-in slide-in-from-top-2">
                                    <div className="flex items-start gap-2 mb-3">
                                        <Info size={16} className="text-blue-600 mt-0.5 shrink-0"/>
                                        <p className="text-sm text-blue-900 font-medium">
                                            Vas a cambiar el DNI de <strong>{usuario.dni}</strong> a <strong>{nuevoDni}</strong>. El usuario deberá usar el nuevo documento para iniciar sesión.
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setAccionConfirmar(null)} className="px-4 py-2 bg-white text-slate-600 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-100">Revisar</button>
                                        <button onClick={handleActualizarDni} disabled={cargando} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Confirmar modificación</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECCIÓN: SEGURIDAD Y CREDENCIALES */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Seguridad</h3>
                        
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600"><KeyRound size={20} strokeWidth={2.5}/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Restablecer Credenciales</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Asignar clave temporal del sistema.</p>
                                    </div>
                                </div>
                                <button onClick={() => setAccionConfirmar('reset')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-xs transition-colors">
                                    Restablecer
                                </button>
                            </div>

                            {/* CONFIRMACIÓN: RESET */}
                            {accionConfirmar === 'reset' && (
                                <div className="mt-5 p-4 bg-amber-50/50 border-l-4 border-amber-500 rounded-r-xl animate-in slide-in-from-top-2">
                                    <div className="flex items-start gap-2 mb-3">
                                        <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0"/>
                                        <p className="text-sm text-amber-900 font-medium">
                                            La contraseña pasará a ser <strong className="font-mono bg-amber-100 px-1 rounded">cfp+{usuario.dni}</strong> y se forzará al usuario a cambiarla al ingresar. ¿Proceder?
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={cancelarAccion} className="px-4 py-2 bg-white text-slate-600 rounded-lg text-xs font-bold border border-amber-200 hover:bg-amber-50">Cancelar</button>
                                        <button onClick={handleResetPassword} disabled={cargando} className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700">Sí, restablecer</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección de acciones delicadas */}
                    <div className="space-y-3 pt-4">
                        <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-widest pl-1">Precaución</h3>
                        
                        <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600"><Trash2 size={20} strokeWidth={2.5}/></div>
                                    <div>
                                        <h4 className="font-bold text-rose-700 text-sm">Eliminar Cuenta</h4>
                                        <p className="text-xs text-rose-500 mt-0.5">Esta acción eliminará los datos del sistema.</p>
                                    </div>
                                </div>
                                <button onClick={() => setAccionConfirmar('eliminar')} className="px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-xl font-bold text-xs transition-colors shadow-sm">
                                    Eliminar
                                </button>
                            </div>

                            {/* CONFIRMACIÓN: ELIMINAR */}
                            {accionConfirmar === 'eliminar' && (
                                <div className="mt-5 p-4 bg-rose-100/50 border-l-4 border-rose-600 rounded-r-xl animate-in slide-in-from-top-2">
                                    <div className="flex items-start gap-2 mb-4">
                                        <AlertTriangle size={16} className="text-rose-600 mt-0.5 shrink-0"/>
                                        <div className="space-y-1">
                                            <p className="text-sm text-rose-900 font-bold">Pérdida permanente de datos</p>
                                            <p className="text-xs text-rose-700 font-medium">
                                                Estás a punto de borrar a <strong>{usuario.nombre} {usuario.apellido}</strong> definitivamente. No se puede deshacer.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={cancelarAccion} className="px-4 py-2 bg-white text-slate-600 rounded-lg text-xs font-bold border border-slate-200 hover:bg-slate-50">Mantener usuario</button>
                                        <button onClick={handleEliminar} disabled={cargando} className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 shadow-sm shadow-rose-600/20">Sí, eliminar permanentemente</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}