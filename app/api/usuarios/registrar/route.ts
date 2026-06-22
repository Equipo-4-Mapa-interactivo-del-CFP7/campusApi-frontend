import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization');
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json({ error: 'Configuración del backend faltante' }, { status: 500 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${backendUrl}/api/usuarios/registrar`, {
      method: 'POST',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error en proxy de registro:", error);
    return NextResponse.json({ error: 'Fallo al conectar con el backend' }, { status: 500 });
  }
}