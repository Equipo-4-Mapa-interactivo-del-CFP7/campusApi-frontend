import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization');
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const backendUrl = process.env.BACKEND_URL;

  try {
    const response = await fetch(`${backendUrl}/api/usuarios?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
    });

    // Intentamos parsear la respuesta de forma segura
    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};
    
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: 'Error de conexión con el backend' }, { status: 500 });
  }
}