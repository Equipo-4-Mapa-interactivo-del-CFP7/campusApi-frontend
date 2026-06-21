import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

interface Props {
    onCerrar: () => void;
    onLoginExitoso: () => void;
}

export default function ModalLogin({ onCerrar, onLoginExitoso }: Props) {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue
        setCargando(true);
        setError(false);

        try {
            // 1. Se hace la llamada al endpoint de login de back ADAPTAMOS EL FETCH TEMPORALMENTE PARA TRABAJAR CON NGROK como lo configuramos en next.config.ts
            const respuesta = await fetch('/api-backend/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // 2. Se envían los datos ingresados en el modal
                body: JSON.stringify({
                    dni: dni,
                    password: password
                })
            });

            // 3. Verificamos si back nos da el 200 OK
            if (respuesta.ok) {
                const data = await respuesta.json();

                // El back nos proporciona un Token JWT
                // Lo guardamos en el navegador
                if (data.accessToken) {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('tokenType', data.tokenType);
                }
                onLoginExitoso(); // cerramos el modal y vamos al panel
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error conectando al backend:", error);
            setError(true)
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
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Acceso Admin</h2>
                    <p className="text-sm text-gray-500 mt-1">Ingresá tus credenciales para continuar</p>
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

                    {/* Input Contraseña */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${error ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:ring-blue-500/20'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all font-medium text-gray-800`}
                        />
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
                        className="w-full py-4 mt-2 bg-blue-600 text-white rounded-2xl font-bold text-base hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-500/30 cursor-pointer"
                    >
                        Iniciar Sesión
                    </button>
                </form>

            </div>
        </div>
    );
}