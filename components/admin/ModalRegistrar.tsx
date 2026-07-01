"use client";
import { useState } from 'react';
import { X, UserPlus, Loader2, ShieldCheck, ChevronDown } from 'lucide-react';
import { userService } from "@/services/user";

interface Props {
    onCerrar: () => void;
    onSuccess: () => void;
    token: string;
    rolUsuarioLogueado: string;
}

export default function ModalRegistrar({ onCerrar, onSuccess, token, rolUsuarioLogueado }: Props) {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ dni: '', nombre: '', apellido: '', rol: 'PERSONAL' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setCargando(true);
        
        try {
            await userService.registrarPersonal(formData, token);
            onSuccess();
            onCerrar();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ocurrió un error inesperado');
        } finally {
            setCargando(false);
        }
    };

    // Estilos reutilizables para inputs
    const inputStyle = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header decorativo */}
                <div className="px-6 pt-6 pb-2 flex justify-between items-start">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                            <UserPlus size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Añadir personal</h2>
                        <p className="text-sm text-gray-500 font-medium">Completá los datos para el nuevo usuario</p>
                    </div>
                    <button type="button" onClick={onCerrar} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 pt-2">
                    <div className="space-y-4">
                        <input type="text" placeholder="DNI (Ej: 30123456)" className={inputStyle} required onChange={e => setFormData({...formData, dni: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nombre" className={inputStyle} required onChange={e => setFormData({...formData, nombre: e.target.value})} />
                            <input type="text" placeholder="Apellido" className={inputStyle} required onChange={e => setFormData({...formData, apellido: e.target.value})} />
                        </div>
                        
                        <div className="relative">
                            <select className={`${inputStyle} appearance-none cursor-pointer`} onChange={e => setFormData({...formData, rol: e.target.value})}>
                                <option value="PERSONAL">Rol: Personal</option>
                                {rolUsuarioLogueado === 'OWNER' && <option value="ADMIN">Rol: Administrador</option>}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
                            <ShieldCheck size={16} /> {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={cargando} 
                        className="w-full mt-6 bg-gray-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
                    >
                        {cargando ? <Loader2 className="animate-spin mx-auto" /> : 'Confirmar registro'}
                    </button>
                </form>
            </div>
        </div>
    );
}