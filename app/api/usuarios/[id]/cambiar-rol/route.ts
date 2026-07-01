import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ dni: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.dni;

    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        // Usamos el params.dni para armar la URL hacia Java
        const res = await fetch(`${backendUrl}/api/usuarios/${id}/cambiar-rol`, {
            method: 'PUT',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}