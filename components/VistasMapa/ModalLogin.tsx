import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff } from 'lucide-react';
import { login } from "@/services/auth/auth";

interface Props {
    onCerrar: () => void;
    onLoginExitoso: () => void;
}

export default function ModalLogin({ onCerrar, onLoginExitoso }: Props) {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(false);
    const dniInvalido = /[^0-9]/.test(dni);
    const formularioValido = dni.trim() !== "" && password.trim() !== "" && !dniInvalido;

    const manejarSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue
        setCargando(true);
        setError(false);

        try {
            await login(dni, password);
            onLoginExitoso();
        } catch (error) {
            setError(true)
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-sm rounded-4xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200 relative">

                {/* Botón Cerrar */}
                <button
                    onClick={onCerrar}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6 mt-2">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-blue-600" size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Portal de gestión</h2>
                    <p className="text-sm text-gray-500 mt-1">Identificate para continuar</p>
                </div>

                <form onSubmit={manejarSubmit} className="space-y-4">
                    {/* Input Usuario */}
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={dni}
                            onChange={(e) => { setDni(e.target.value); setError(false); }}
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${error ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:ring-blue-500/20'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all font-medium text-gray-800`}
                        />
                    </div>
                    {dniInvalido && (
                        <p className="text-xs text-red-500 font-medium pl-1 -mt-2">
                            El usuario solo puede contener números.
                        </p>
                    )}

                    {/* Input Contraseña */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${error ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:ring-blue-500/20'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all font-medium text-gray-800`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <p className="text-xs font-bold text-red-500 text-center animate-pulse">
                            Usuario o contraseña incorrectos.
                        </p>
                    )}

                    {/* Botón Submit */}
                    <button
                        type="submit"
                        disabled={!formularioValido}
                        className={`w-full py-4 mt-2 rounded-2xl font-bold text-base transition-all ${formularioValido
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/30 cursor-pointer'
                                : 'bg-blue-300 text-white cursor-not-allowed'
                            }`}
                    >
                        Iniciar Sesión
                    </button>
                </form>

            </div>
        </div>
    );
}