import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        // 1. Obtenemos el cuerpo de la petición que viene del Frontend
        const body = await req.json();

        // 2. Reenviamos la petición al Backend Java
        const res = await fetch(`${backendUrl}/api/usuarios/registrar`, {
            method: 'POST',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
            // Pasamos el cuerpo tal cual nos llegó del front
            body: JSON.stringify(body), 
        });

        // 3. Obtenemos la respuesta del backend
        const data = await res.json().catch(() => ({}));
        
        // 4. Devolvemos el estado y los datos al Frontend
        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        console.error('Error registrando usuario:', error);
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}