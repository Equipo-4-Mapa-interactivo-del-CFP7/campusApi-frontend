// src/services/api.ts
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(`/api${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
    });

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
};