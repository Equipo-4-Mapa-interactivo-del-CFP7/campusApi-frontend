// data/adminMocks.ts

// 1. El Molde (Interface) de cómo debe lucir una incidencia
export interface Incidencia {
  id: number;
  lugar: string;
  problema: string;
  tiempo: string;
}

// 2. Exportamos los valores por defecto (Mock Data)
export const mockAvisoActivo = true;

export const mockSanitariosAbiertos = false;

export const mockIncidencias: Incidencia[] = [
  { 
    id: 1, 
    lugar: "Pasillo D", 
    problema: "Obstáculo en rampa", 
    tiempo: "Hace 20 min" 
  },
  { 
    id: 2, 
    lugar: "Taller 3", 
    problema: "Puerta trabada", 
    tiempo: "Hace 1 hora" 
  }
];

// --- MOCKS DE USUARIOS ---
export const mockUsuariosAdmin = [
  { id: 1, nombre: "Admin (Vos)", rol: "SuperAdmin", inicial: "J", color: "purple" },
  { id: 2, nombre: "Director CFP", rol: "Admin", inicial: "D", color: "blue" }
];

//export const mockEstudiantes = [ ... ];