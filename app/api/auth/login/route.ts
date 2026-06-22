import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const backendUrl = process.env.BACKEND_URL;

    // Validación: Si la variable no existe, el servidor debe fallar
    if (!backendUrl) {
        console.error("CRÍTICO: BACKEND_URL no está configurada en .env.local");
        return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    try {
        const body = await req.json();

        const res = await fetch(`${backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Error en proxy/API de login:", error);
        return NextResponse.json({ error: 'No se pudo conectar con el backend' }, { status: 500 });
    }
}