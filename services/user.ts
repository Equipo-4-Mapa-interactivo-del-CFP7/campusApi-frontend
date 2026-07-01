export interface FiltrosUsuario {
    page?: number;
    size?: number;
    dni?: string;
    nombre?: string;
    apellido?: string;
    activo?: boolean;
}

const getAuthHeaders = (): Record<string, string> => {
    if (typeof window === 'undefined')
        return { 'Content-Type': 'application/json' };

    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';

    return {
        'Authorization': `${tokenType} ${token}`,
        'Content-Type': 'application/json',
    };
};

export const userService = {
    /**
     * Registra un nuevo usuario en el sistema.
     * Requiere que el usuario actual tenga rol ADMIN o OWNER.
     */
    registrar: async (userData: { dni: string; nombre: string; apellido: string }) => {
        const res = await fetch('/api/usuarios/registrar', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        return data; // Retornamos el JSON de respuesta exitosa
    },

    // GET /api/usuarios (con filtros)
    listar: async (filtros: FiltrosUsuario = {}) => {
        // Se convierte el objeto de filtros en una query string (?page=0&size=10)
        // Se ignora automáticamente los filtros que estén vacíos o undefined
        const params = new URLSearchParams();

        Object.entries(filtros).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, String(value));
            }
        });

        const respuesta = await fetch(`/api/usuarios?${params.toString()}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        // El error 401 se intercepta acá (Ej: token expirado)
        if (respuesta.status === 401) {
            const error = new Error("Sesión expirada");
            error.name = "AuthError"; // Etiqueta personalizada para reconocerlo
            throw error;
        }

        const data = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok) {
            throw new Error(data.message || 'Error al obtener la lista de usuarios');
        }

        return data; // Esto devolverá la estructura de Paginación de Spring (content, totalPages, etc.)
    },

    /**
     * Restablece la contraseña de un usuario a su propio DNI.
     */
    restablecerPassword: async (id: string) => {
        const respuesta = await fetch(`/api/usuarios/${id}/restablecer`, {
            method: 'PUT',
            headers: getAuthHeaders(),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al restablecer contraseña');
        return data;
    },

    /**
     * Cambia el estado (activo/inactivo) de una cuenta.
     */
    cambiarEstado: async (id: string) => {
        const respuesta = await fetch(`/api/usuarios/${id}/cambiar-activo`, {
            method: 'PUT',
            headers: getAuthHeaders(),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al cambiar estado de cuenta');
        return data;
    },

    /**
     * Alterna el rol del usuario (ADMIN / PERSONAL).
     */
    cambiarRol: async (dni: string) => {
        const respuesta = await fetch(`/api/usuarios/${dni}/cambiar-rol`, {
            method: 'PUT',
            headers: getAuthHeaders(),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al cambiar el rol');
        return data;
    },

    /**
     * Cambia la contraseña del usuario logueado.
     */
    cambiarMiPassword: async (passwords: { actual: string; nueva: string }) => {
        const respuesta = await fetch('/api/usuarios/me/password', {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                oldPassword: passwords.actual,
                newPassword: passwords.nueva
            }),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al actualizar contraseña');
        return data;
    },

    /**
     * Obtiene los datos del perfil de un usuario específico (Solo Admin).
     */
    obtenerPerfilAdmin: async (dni: string) => {
        const respuesta = await fetch(`/api/usuarios/${dni}`, {
            method: 'GET', // Importante: este es GET
            headers: getAuthHeaders(),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al obtener el perfil');
        return data;
    },

    /**
     * Obtiene el perfil del usuario actualmente logueado.
     */
    obtenerMiPerfil: async () => {
        const respuesta = await fetch('/api/usuarios/me', {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'No se pudo obtener el perfil de usuario');
        return data;
    },

    registrarPersonal: async (datos: {dni: string; nombre: string; apellido: string; rol: string;}, token: string) => {
        const response = await fetch('/api/usuarios/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Token que viene del Admin
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar usuario');
        }
        return await response.json();
    },

    /**
     * Cambiar el DNI de un usuario.
     */
    actualizarDni: async (id: string, nuevoDni: string) => {
        const respuesta = await fetch(`/api/usuarios/${id}/dni`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ dni: nuevoDni }),
        });
        const data = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) throw new Error(data.message || 'Error al actualizar DNI');
        return data;
    },

    /**
     * Eliminar Usuario.
     */
    eliminarUsuario: async (id: string) => {
        const respuesta = await fetch(`/api/usuarios/${id}/eliminar-usuario`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });

        if (respuesta.status === 204) return true;
        
        if (!respuesta.ok) {
            const data = await respuesta.json().catch(() => ({}));
            throw new Error(data.message || 'Error al eliminar usuario');
        }
        return true;
    },

    /**
     * Cambiar Nombre y Apellido.
     */
    CambiarNombreApellido: async (id: string) => {
        const respuesta = await fetch(`/api/usuarios/${id}/cambiar-nombre-apellido`, {
            method: 'PUT',
            headers: getAuthHeaders(),
        });
        if (!respuesta.ok) {
            const data = await respuesta.json().catch(() => ({}));
            throw new Error(data.message || 'Error al eliminar usuario');
        }
        return true;
    },
};

