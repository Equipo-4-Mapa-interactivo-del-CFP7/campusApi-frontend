import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    // Verificación de seguridad
    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        // 1. Se extrae el body que mandó ModalPerfil
        const body = await req.json();

        // 2. Se lo enviamos al endpoint exacto de backend
        const res = await fetch(`${backendUrl}/api/usuarios/me/password`, {
            method: 'PUT',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        // 3. Se procesa la respuesta
        const data = await res.json().catch(() => ({}));
        
        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        console.error("Error en proxy /me/password:", error);
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}