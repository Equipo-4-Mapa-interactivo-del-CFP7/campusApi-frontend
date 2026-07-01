import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        const res = await fetch(`${backendUrl}/api/usuarios/${id}/eliminar`, {
            method: 'POST',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });

        if (res.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Error al ejecutar eliminación ofuscada:", error);
        return NextResponse.json({ error: 'Error en la operación de eliminación' }, { status: 500 });
    }
}