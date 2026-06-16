const indicacionesHerrería = [
    "Ingresá al taller con cuidado.",
    "Prepará tus elementos de protección personal.",
    "Posicionate en tu lugar de trabajo.",
    "Espera las indicaciones del instructor/a"
];

const indicacionesGastronomia = [
    "Ingresa al sector con cuidado.",
    "Lavate las manos, colócate la cofia y el delantal.",
    "Posicionate en tu lugar de trabajo",
    "Espera las indicaciones del instructor/a."
];

export const mensajesDestino: Record<string, string[]> = {

    "Herrería": indicacionesHerrería,
    "Climatización": indicacionesHerrería,
    "Carpintería": indicacionesHerrería,

    "Gastronomía A" : indicacionesGastronomia,
    "Gastronomía B" : indicacionesGastronomia,
    "Gastronomía C" : indicacionesGastronomia,


    "default": [
        "Llegaste a tu destino con éxito!",
        "Recordá tener precaución."
    ]

};