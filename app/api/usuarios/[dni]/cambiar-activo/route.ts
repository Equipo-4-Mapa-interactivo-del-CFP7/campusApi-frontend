import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ dni: string }> }) {
    // Extraemos el DNI usando await
    const resolvedParams = await params;
    const dni = resolvedParams.dni;

    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        // 3. Usamos la variable 'dni' limpia
        const res = await fetch(`${backendUrl}/api/usuarios/${dni}/cambiar-activo`, {
            method: 'PUT',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        console.error(`Error cambiando rol para ${dni}:`, error);
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}