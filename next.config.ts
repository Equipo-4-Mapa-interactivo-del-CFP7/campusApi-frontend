import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options (esto es opcional) para ver de afuera  */
  allowedDevOrigins: ['thoughtlessly-haptic-christiana.ngrok-free.dev'],

  // Agregamos el Proxy / Puente
  async rewrites() {
    return [
      {
        // Cuando el front llame a esta ruta...
        source: '/api-backend/:path*',
        // ...Next.js lo redirige internamente al backend de Java
        destination: 'http://localhost:8081/:path*',
      },
    ]
  },
};

export default nextConfig;
