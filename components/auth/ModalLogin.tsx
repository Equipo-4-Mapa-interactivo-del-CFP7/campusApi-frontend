import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ShieldAlert, KeyRound } from 'lucide-react';
import { login } from "@/services/auth/auth";
import { userService } from "@/services/user";

interface Props {
    onCerrar: () => void;
    onLoginExitoso: () => void;
}

type ModalMode = 'login' | 'forzar_cambio';

export default function ModalLogin({ onCerrar, onLoginExitoso }: Props) {
    // Estados Generales
    const [modo, setModo] = useState<ModalMode>('login');
    const [cargando, setCargando] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Estados Modo Login
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dniInvalido = /[^0-9]/.test(dni);
    const formLoginValido = dni.trim() !== "" && password.trim() !== "" && !dniInvalido;

    // Estados de Modo Cambio Forzado (CHANGE_PASSWORD)
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [showNuevaPassword, setShowNuevaPassword] = useState(false);
    const formCambioValido = nuevaPassword.length >= 8 && nuevaPassword === confirmarPassword;

    // Vía 1: Login Inicial
    const manejarLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue
        setCargando(true);
        setErrorMsg(null);

        try {
            // 1. Intento de login
            await login(dni, password);

            // 2. Se intercepta par aver quién es
            const perfil = await userService.obtenerMiPerfil();

            // 3. Se evalúa su rol
            if (perfil.rol === 'CHANGE_PASSWORD') {
                setModo('forzar_cambio');
            } else {
                onLoginExitoso();
            }
        } catch (error: any) {
            // Verificamos si el backend nos da explícitamente un 403 de cambio de clave
            if (error.message && error.message.includes("Debes cambiar tu contraseña para acceder a tu perfil")) {
                // Cambiamos a la vista de forzar cambio
                setModo('forzar_cambio');
            } else {
                // Si es un 401 real (mala contraseña), mostramos el genérico
                setErrorMsg("Usuario o contraseña incorrectos.");
            }
        } finally {
            setCargando(false);
        }
    };

    // Vía 2: Cambio Forzado
    const manejarCambioForzado = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setErrorMsg(null);

        try {
            // 1. Se debe cambiar la contraseña (enviamos la temporal que ya estaba en el state y la nueva)
            await userService.cambiarMiPassword({ actual: password, nueva: nuevaPassword });
            
            // 2. RE-LOGIN SILENCIOSO: Se refresca el token para que venga con el rol real (ya no CHANGE_PASSWORD)
            await login(dni, nuevaPassword);
            
            // 3. En caso de éxito, ahora sí, al panel.
            onLoginExitoso();
        } catch (error: any) {
            setErrorMsg(error.message || "Error al actualizar la contraseña.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300 relative border border-slate-100">

                {/* Botón Cerrar (Deshabilitado si estamos forzando el cambio para evitar que evadan el proceso) */}
                {modo === 'login' && (
                    <button
                        onClick={onCerrar}
                        className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={18} strokeWidth={2.5} />
                    </button>
                )}

                {/* =========================================
                    MODO 1: PANTALLA DE LOGIN NORMAL
                ============================================= */}
                {modo === 'login' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="text-center mb-8 mt-2">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-0 transition-transform hover:rotate-6">
                                <Lock className="text-blue-600" size={28} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portal de Gestión</h2>
                            <p className="text-sm text-slate-500 mt-1 font-medium">Ingresá tus credenciales</p>
                        </div>

                        <form onSubmit={manejarLogin} className="space-y-4">
                            {/* Input DNI */}
                            <div>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                    <input
                                        type="text" placeholder="Número de DNI" value={dni}
                                        onChange={(e) => { setDni(e.target.value); setErrorMsg(null); }}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errorMsg ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all font-semibold text-slate-800`}
                                    />
                                </div>
                                {dniInvalido && <p className="text-xs text-red-500 font-bold pl-1 mt-1.5">Solo se permiten números.</p>}
                            </div>

                            {/* Input Password */}
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErrorMsg(null); }}
                                    className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border ${errorMsg ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all font-semibold text-slate-800`}
                                />
                                <button
                                    type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {errorMsg && (
                                <p className="text-xs font-bold text-red-500 text-center bg-red-50 py-2 rounded-xl border border-red-100 animate-in fade-in">
                                    {errorMsg}
                                </p>
                            )}

                            <button
                                type="submit" disabled={!formLoginValido || cargando}
                                className={`w-full py-4 mt-2 rounded-2xl font-bold text-sm transition-all ${formLoginValido
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-lg shadow-slate-900/20'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {cargando ? 'Verificando...' : 'Iniciar Sesión'}
                            </button>
                        </form>
                    </div>
                )}


                {/* =========================================
                    MODO 2: PANTALLA DE CAMBIO FORZADO
                ============================================= */}
                {modo === 'forzar_cambio' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-6 mt-2">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
                                <ShieldAlert className="text-amber-500" size={28} strokeWidth={2} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Acción Requerida</h2>
                            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed px-2">
                                Por políticas de seguridad, debes cambiar la contraseña temporal por una nueva antes de ingresar al sistema.
                            </p>
                        </div>

                        <form onSubmit={manejarCambioForzado} className="space-y-4 border-t border-slate-100 pt-6">
                            <div className="space-y-3">
                                <div className="relative">
                                    <KeyRound className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type={showNuevaPassword ? "text" : "password"} placeholder="Nueva contraseña (Mín. 8 carac.)" 
                                        value={nuevaPassword} onChange={(e) => { setNuevaPassword(e.target.value); setErrorMsg(null); }}
                                        className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-semibold text-slate-800"
                                    />
                                    <button type="button" onClick={() => setShowNuevaPassword(!showNuevaPassword)} className="absolute right-4 top-3.5 text-slate-400">
                                        {showNuevaPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <KeyRound className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type={showNuevaPassword ? "text" : "password"} placeholder="Repetir nueva contraseña" 
                                        value={confirmarPassword} onChange={(e) => { setConfirmarPassword(e.target.value); setErrorMsg(null); }}
                                        className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${confirmarPassword && nuevaPassword !== confirmarPassword ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 font-semibold text-slate-800`}
                                    />
                                </div>
                            </div>

                            {/* Alertas de validación en tiempo real */}
                            {confirmarPassword.length > 0 && nuevaPassword !== confirmarPassword && (
                                <p className="text-xs font-bold text-red-500 text-center animate-in fade-in">Las contraseñas no coinciden.</p>
                            )}

                            {errorMsg && (
                                <p className="text-xs font-bold text-red-500 text-center bg-red-50 py-2 rounded-xl border border-red-100">
                                    {errorMsg}
                                </p>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit" disabled={!formCambioValido || cargando}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${formCambioValido
                                            ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98] shadow-lg shadow-amber-500/20'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {cargando ? 'Actualizando y conectando...' : 'Guardar y Continuar'}
                                </button>
                                
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        // Si se arrepiente, limpiamos todo y lo mandamos al inicio (lo deslogueamos virtualmente)
                                        localStorage.removeItem('token');
                                        setModo('login');
                                        setPassword('');
                                    }}
                                    className="w-full mt-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors"
                                >
                                    Cancelar e ir al inicio
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}