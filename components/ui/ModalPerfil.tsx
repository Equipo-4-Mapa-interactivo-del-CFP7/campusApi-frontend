import { useState } from 'react';
import { X, UserCircle2, KeyRound, CheckCircle2, AlertCircle, EyeOff, Eye } from 'lucide-react';
import { PerfilUsuario } from "@/app/page";
import { userService } from "@/services/user";

interface ModalPerfilProps {
    perfil: PerfilUsuario;
    onCerrar: () => void;
}

export default function ModalPerfil({ perfil, onCerrar }: ModalPerfilProps) {
    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");

    // Estados
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [exito, setExito] = useState(false);
    const [showActual, setShowActual] = useState(false);
    const [showNueva, setShowNueva] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setExito(false);

        // Validación Front-end (Evita peticiones innecesarias)
        if (nueva.length < 8) {
            setError("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setCargando(true);
        try {
            await userService.cambiarMiPassword({ actual, nueva });
            setExito(true);
            setActual("");
            setNueva("");
        } catch (err: any) {
            setError(err.message || "No se pudo actualizar la contraseña");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

                {/* HEADER DEL MODAL */}
                <div className="bg-gray-50 p-6 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-800 flex items-center">
                        <UserCircle2 className="mr-2 text-blue-500" size={24} />
                        Mi Perfil
                    </h2>
                    <button onClick={onCerrar} className="p-2 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    {/* INFO DEL USUARIO */}
                    <div className="flex items-center gap-4 mb-8 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                        <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-2xl uppercase shadow-md">
                            {perfil.nombre.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{perfil.nombre} {perfil.apellido}</h3>
                            <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mt-0.5">Rol: {perfil.rol}</p>
                        </div>
                    </div>

                    {/* SECCIÓN CAMBIAR CONTRASEÑA */}
                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold text-gray-700 flex items-center mb-4">
                            <KeyRound className="mr-2 text-gray-400" size={16} />
                            Cambiar Contraseña
                        </h4>

                        {exito ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-start gap-3">
                                <CheckCircle2 className="shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-bold">¡Contraseña actualizada!</p>
                                    <p className="text-xs mt-1 opacity-90">Tu nueva contraseña ya está activa.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium flex items-center gap-2 border border-red-100">
                                        <AlertCircle size={16} /> {error}
                                    </div>
                                )}

                                {/* CONTRASEÑA ACTUAL */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Contraseña Actual</label>

                                    {/* div 'relative' envuelve SOLO al input y al botón */}
                                    <div className="relative">
                                        <input
                                            type={showActual ? "text" : "password"}
                                            required
                                            value={actual}
                                            onChange={(e) => setActual(e.target.value)}
                                            // pr-11 (Padding Right) para que el texto no choque con el ojo
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-11 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Ingresá tu contraseña actual"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowActual(!showActual)}
                                            // Centrado vertical perfecto con inset-y-0 y flex items-center
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showActual ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* NUEVA CONTRASEÑA */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Nueva Contraseña</label>

                                    <div className="relative">
                                        <input
                                            type={showNueva ? "text" : "password"}
                                            required
                                            value={nueva}
                                            onChange={(e) => setNueva(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-11 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNueva(!showNueva)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showNueva ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={cargando || !actual || !nueva}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-2"
                                >
                                    {cargando ? 'Actualizando...' : 'Guardar nueva contraseña'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}