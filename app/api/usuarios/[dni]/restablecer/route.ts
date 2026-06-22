// app/api/usuarios/[dni]/cambiar-rol/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Magia: Next.js nos pasa el [dni] directamente en el objeto 'params'
export async function PUT(req: NextRequest, { params }: { params: { dni: string } }) {
    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    try {
        // Usamos el params.dni para armar la URL hacia Java
        const res = await fetch(`${backendUrl}/api/usuarios/${params.dni}/restablecer`, {
            method: 'PUT',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        console.error(`Error cambiando rol para ${params.dni}:`, error);
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}