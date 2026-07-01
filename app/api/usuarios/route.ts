// app/api/usuarios/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization');
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        return NextResponse.json({ error: 'Configuración faltante' }, { status: 500 });
    }

    // Extraemos todos los parámetros de la URL (?nombre=Juan&page=0)
    const { searchParams } = new URL(req.url);

    try {
        const res = await fetch(`${backendUrl}/api/usuarios?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json().catch(() => ({}));

        // Si la respuesta fue exitosa, aplicamos el filtrado de seguridad
        if (res.status === 200 && data && Array.isArray(data.content)) {
            // REGLA, ADMIN NO VE OWNER, entonces excluimos a los usuarios con rol OWNER 
            data.content = data.content.filter((usuario: any) => usuario.rol !== 'OWNER');
            
            // Opcional: Si el backend devuelve un contador total de elementos (totalElements), 
            // al filtrar en el front se podría desajustar levemente la paginación visual si hubiera un OWNER en la página actual.
            // Sin embargo, para listas administrativas estándar, este filtrado previene acciones accidentales de manera excelente.
            if (data.totalElements !== undefined) {
                data.totalElements = data.content.length;
            }
        }

        return NextResponse.json(data, { status: res.status });
        
    } catch (error) {
        console.error("Error en proxy de listar usuarios:", error);
        return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
    }
}