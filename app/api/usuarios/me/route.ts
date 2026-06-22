import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8081";

  try {
    const res = await fetch(`${backendUrl}/api/usuarios/me`, {
      method: 'GET',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error en proxy /me:", error);
    return NextResponse.json({ error: 'Fallo al obtener perfil' }, { status: 500 });
  }
}