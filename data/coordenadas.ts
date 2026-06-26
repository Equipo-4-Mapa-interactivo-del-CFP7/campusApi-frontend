// data/coordenadas.ts
export const coordenadasCFP = {
    // El centro del edificio para la vista general
    centroGeneral: [-34.55138, -58.44128] as [number, number],
    
    // Coordenadas de las aulas (Destinos)
    sectores: {
        "CFP7": [-34.55119, -58.44175] as [number, number],
        //"Herrería": [-34.6035, -58.3814] as [number, number],
        //"Comedor": [-34.6038, -58.3818] as [number, number],
        //"Taller": [-34.6036, -58.3812] as [number, number],
        "Entrada Ramsay": [-34.55043, -58.44138] as [number, number],
    } as Record<string, [number, number]>,

    // Coordenadas de las entradas (Orígenes)
    origenes: {
        "Entrada Ramsay": [-34.55043, -58.44138] as [number, number],
        "Entrada Dragones": [-34.55176, -58.44187] as [number, number],
        "Entrada Juramento": [-34.55271, -58.44106] as [number, number],
        "Entrada Echeverria": [-34.55347, -58.43997] as [number, number],
        "Entrada Olazábal": [-34.55087, -58.44264] as [number, number],
        "CFP7": [-34.55119, -58.44175] as [number, number],
    } as Record<string, [number, number]>
};

// Diccionario de rutas exactas
export const rutasCFP: Record<string, [number, number][]> = {
    // Ejemplo: De Entrada Dragones a Herrería
    "Entrada Ramsay-CFP7": [
        [-34.55043, -58.44138], // 1. Arranca en Entrada Ramsay
        [-34.55051, -58.44165], // 2. Camina derecho por el pasillo principal
        [-34.55090, -58.44230], // 3. Dobla a la izquierda en la esquina
        [-34.55096, -58.44230],  // 4. Llega a CFP7
        [-34.55112, -58.44175], // CFP
    ],
    // Ejemplo: De Patio Central a Comedor
    "Entrada Dragones-CFP7": [
        [-34.55176, -58.44187], // 1. Arranca en el patio
        [-34.55158, -58.44156], // 2. Baja las escaleras
        [-34.55142, -58.44149],  // 3. Entra al comedor
        [-34.55125, -58.44147],
        [-34.55117, -58.44160],
        [-34.55113, -58.44179], // CFP
    ]
    // Tendrás que ir agregando las combinaciones principales de tu edificio
};