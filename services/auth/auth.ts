export const login = async (dni: string, password: string) => {
  const respuesta = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dni, password })
  });

  if (!respuesta.ok) throw new Error("Credenciales inválidas");
  
  const data = await respuesta.json();
  if (data.accessToken) {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('tokenType', data.tokenType);
  }
  return data;
};