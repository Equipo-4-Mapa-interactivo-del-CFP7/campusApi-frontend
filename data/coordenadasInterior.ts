// Definimos la estructura para que TypeScript nos ayude a no cometer errores
export interface PuntoInterior {
    coords: [number, number]; // [Alto (Y), Ancho (X)]
    descripcion: string;
    tipo: 'aula' | 'baño' | 'salida' | 'oficina' | 'laboratorio' | 'taller'; // Útil si después querés ponerle distintos colores
}

export const coordenadasInterior: Record<string, PuntoInterior> = {
    /*"Aula 1": {
        coords: [346, 489], 
        descripcion: "Taller de Informática",
        tipo: 'aula'
    },

    "Baños PB": {
        coords: [209, 401], 
        descripcion: "Baño Femenino",
        tipo: 'baño'
    },
    "Preceptoría": {
        coords: [260, 425], 
        descripcion: "Atención a alumnos",
        tipo: 'oficina'
    }, */
    "Informes": {
        coords: [203, 339],
        descripcion: "Información general",
        tipo: "oficina"
    },

    "Sala de personal": {
        coords: [82, 491],
        descripcion: "Sala de personal",
        tipo: "oficina"
    },

};