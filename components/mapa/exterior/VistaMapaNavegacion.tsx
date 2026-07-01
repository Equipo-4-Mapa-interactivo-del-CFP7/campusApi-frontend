import { useState, useEffect } from 'react';
import { Search, MapPin, Navigation2, ArrowLeft, CheckCircle2, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { coordenadasCFP, rutasCFP } from '@/data/coordenadas';
import Image from "next/image";
import { useMapEvents } from "react-leaflet";

import L from 'leaflet';

// Se crea un ícono personalizado apuntando a los servidores oficiales de Leaflet
const iconDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Forzamos a que todos los marcadores usen este ícono por defecto
L.Marker.prototype.options.icon = iconDefault;

// --- EL COMPONENTE "CÁMARA" ---
// Este componente solo manipula el mapa internamente
function ControladorCamara({ centro, zoom }: { centro: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(centro, zoom, {
            animate: true,
            duration: 1.5
        }); // Animación suave de 1.5 segundos
    }, [centro, zoom, map]);
    return null;
}

// Herramienta temporal (solo para programar, apagar después)
function CazadorDeCoordenadas() {
    useMapEvents({
        click(e) {
            console.log(`[${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}],`);
        },
    });
    return null;
}

interface Props {
    onVolver: () => void;
    sectores: string[];
    origenInicial?: string;
    destinoInicial?: string;
}

type Fase = 'buscando_destino' | 'buscando_origen' | 'confirmacion' | 'navegando';

export default function VistaMapaNavegacion({ onVolver, sectores, origenInicial, destinoInicial }: Props) {
    // Si vienen datos, la navegación comienza de forma directa
    const [fase, setFase] = useState<Fase>(
        (origenInicial && destinoInicial) ? 'navegando' : 'buscando_destino'
    );
    const [busqueda, setBusqueda] = useState('');
    // Cargamos los datos iniciales si existen
    const [destino, setDestino] = useState(destinoInicial || '');
    const [origen, setOrigen] = useState(origenInicial || '');


    // Estado para controlar la "cámara" del mapa
    // Calculamos la cámara. Si hay ruta directa, centramos la cámara en el medio de ambos puntos
    const [centroMapa, setCentroMapa] = useState<[number, number]>(() => {
        if (origenInicial && destinoInicial) {
            const coordOrig = coordenadasCFP.origenes[origenInicial];
            const coordDest = coordenadasCFP.sectores[destinoInicial];
            if (coordOrig && coordDest) {
                return [
                    (coordOrig[0] + coordDest[0]) / 2,
                    (coordOrig[1] + coordDest[1]) / 2
                ];
            }
        }
        return coordenadasCFP.centroGeneral;
    });

    const [zoomMapa, setZoomMapa] = useState(18);
    const [tipoMapa, setTipoMapa] = useState<'claro' | 'oscuro' | 'satelite'>('claro');
    const [mostrarCapas, setMostrarCapas] = useState(false);

    const mapasUrls = {
        claro: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        oscuro: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        satelite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    };

    const origenes = Object.keys(coordenadasCFP.origenes);

    const sectoresFiltrados = busqueda.length > 0
        ? sectores.filter((s) => s.toLowerCase().includes(busqueda.toLowerCase()))
        : Object.keys(coordenadasCFP.sectores); // Mostramos los que tienen coordenadas en la DB de prueba

    const manejarSeleccionDestino = (sector: string) => {
        setDestino(sector);
        setBusqueda('');
        setFase('buscando_origen');

        // Mover la cámara al destino elegido
        if (coordenadasCFP.sectores[sector]) {
            setCentroMapa(coordenadasCFP.sectores[sector]);
            setZoomMapa(18); // Hacemos un zoom
        }
    };

    const manejarSeleccionOrigen = (lugar: string) => {
        setOrigen(lugar);
        setFase('confirmacion');

        // Mover la cámara al origen elegido
        if (coordenadasCFP.origenes[lugar]) {
            setCentroMapa(coordenadasCFP.origenes[lugar]);
            setZoomMapa(18);
        }
    };

    const iniciarRuta = () => {
        setFase('navegando');
        // Alejar un poco la cámara y centrarla en el medio de ambos puntos
        const coordOrig = coordenadasCFP.origenes[origen];
        const coordDest = coordenadasCFP.sectores[destino];
        if (coordOrig && coordDest) {
            const puntoMedio: [number, number] = [
                (coordOrig[0] + coordDest[0]) / 2,
                (coordOrig[1] + coordDest[1]) / 2
            ];
            setCentroMapa(puntoMedio);
            setZoomMapa(18);
        }
    };

    return (
        <div className="relative w-full h-screen bg-gray-100 flex flex-col overflow-hidden">

            {/* 1. BARRA SUPERIOR */}
            <div className="absolute top-0 left-0 w-full z-1000 p-4 pt-6 bg-linear-to-b from-[#41b0cb] to-25%  pointer-events-none">
                <div className="flex flex-col w-full max-w-lg mx-auto pointer-events-auto">
                    <div className="flex items-center gap-3 w-full">
                        <button onClick={onVolver} className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-600 active:scale-95 transition-all">
                            <ArrowLeft size={20} />
                        </button>

                        {fase === 'buscando_destino' && (
                            <div className="relative flex-1">
                                <input autoFocus type="text" placeholder="¿A dónde vamos?" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-5 pr-10 py-3 bg-white border-none rounded-2xl text-sm shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-800 font-bold" />
                                <Search className="absolute right-4 top-3 text-blue-500" size={18} />
                            </div>
                        )}

                        {fase !== 'buscando_destino' && (
                            <div className="flex-1 px-4 py-3 bg-white rounded-2xl shadow-md border-l-4 border-blue-500">
                                <p className="text-xs text-gray-500 font-bold">Destino fijado:</p>
                                <p className="text-sm text-blue-900 font-black truncate">{destino}</p>
                            </div>
                        )}
                    </div>

                    {/* Barra horizontal de Sugerencias */}
                    {fase === 'buscando_destino' && (
                        <div className="w-full mt-3 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                            {sectoresFiltrados.map(sector => (
                                <button
                                    key={sector}
                                    onClick={() => manejarSeleccionDestino(sector)}
                                    className="shrink-0 flex items-center px-4 py-2.5 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-full shadow-sm transition-all active:scale-95 group"
                                >
                                    <MapPin size={16} className="text-gray-400 group-hover:text-blue-500 mr-2" />
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900 whitespace-nowrap">{sector}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. EL MAPA INTERACTIVO (Leaflet) */}
            <div className="absolute inset-0 z-0">
                {/* Se oculta los controles de zoom con zoomControl={false} */}
                <MapContainer center={centroMapa} zoom={zoomMapa} className="w-full h-full" zoomControl={false}>

                    {/* El mapa cambia dinámicamente según lo que elija el usuario */}
                    <TileLayer
                        url={mapasUrls[tipoMapa]}
                        attribution={tipoMapa === 'satelite' ? '&copy; Esri' : '&copy; CARTO'}
                        maxZoom={19}
                    />

                    {/* El controlador que mueve el mapa */}
                    <ControladorCamara centro={centroMapa} zoom={zoomMapa} />

                    {/* MARCADOR DEL DESTINO (Solo si hay destino fijado) */}
                    {destino && coordenadasCFP.sectores[destino] && (
                        <Marker position={coordenadasCFP.sectores[destino]}>

                            <Tooltip permanent direction="top" offset={[0, -40]} className="tooltip-premium">
                                <div className="bg-gray-800 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow-lg border-2 border-white/20 backdrop-blur-md">
                                    Tu destino: <span className="text-blue-300">{destino}</span>
                                </div>
                            </Tooltip>
                        </Marker>
                    )}

                    {/* MARCADOR DEL ORIGEN (Solo si hay origen fijado) */}
                    {origen && coordenadasCFP.origenes[origen] && (
                        <Marker position={coordenadasCFP.origenes[origen]}>

                            <Tooltip permanent direction="top" offset={[0, -40]} className="tooltip-premium">
                                <div className="flex items-center bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow-lg border-2 border-white">
                                    {/* puntito extra que parpadea */}
                                    <span className="w-2 h-2 rounded-full bg-blue-200 mr-2 animate-pulse"></span>
                                    Estás aquí
                                </div>
                            </Tooltip>
                        </Marker>
                    )}

                    {/* LÍNEA DE LA RUTA (Solo en fase navegando) */}
                    {fase === 'navegando' && origen && destino && (
                        (() => {
                            // 1. Armamos el "ID" de la ruta que estamos buscando
                            const idRuta = `${origen}-${destino}`;

                            // 2. Buscamos si existe el camino dibujado. Si no, hacemos línea recta.
                            const posicionesDeRuta = rutasCFP[idRuta] || [
                                coordenadasCFP.origenes[origen],
                                coordenadasCFP.sectores[destino]
                            ];

                            return (
                                <>
                                    {/* 1. LA LÍNEA BASE */}
                                    <Polyline 
                                        positions={posicionesDeRuta} 
                                        color="#93c5fd" // Un azul más claro (blue-300)
                                        weight={6} 
                                        lineCap="round" 
                                        lineJoin="round"
                                        opacity={0.6} // Semi-transparente
                                    />

                                    {/* 2. LA LÍNEA ANIMADA */}
                                    <Polyline 
                                        positions={posicionesDeRuta} 
                                        color="#2563eb" // Un azul fuerte (blue-600)
                                        weight={6} 
                                        lineCap="round" 
                                        lineJoin="round"
                                        pathOptions={{ className: 'luz-guia' }} // Se usa la nueva clase
                                    />
                                </>
                            );
                        })()
                    )}
                    <CazadorDeCoordenadas />
                </MapContainer>
                {/* Botón flotante para cambiar el mapa (Capa superior) */}
                <div className="absolute bottom-28 right-4 z-1000 flex flex-col items-end">
                    {/* Menú desplegable, aparece si se hace clic en el botón */}
                    {mostrarCapas && (
                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-gray-200 mb-3 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4">
                            <button onClick={() => { setTipoMapa('claro'); setMostrarCapas(false); }} className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${tipoMapa === 'claro' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                                 Modo Claro
                            </button>
                            <button onClick={() => { setTipoMapa('oscuro'); setMostrarCapas(false); }} className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${tipoMapa === 'oscuro' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                 Alto Contraste
                            </button>
                            <button onClick={() => { setTipoMapa('satelite'); setMostrarCapas(false); }} className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${tipoMapa === 'satelite' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                                 Satélite
                            </button>
                        </div>
                    )}

                    {/* El botón principal de las Capas */}
                    <button 
                        onClick={() => setMostrarCapas(!mostrarCapas)}
                        className={`p-3 rounded-full shadow-lg transition-all active:scale-95 border ${mostrarCapas ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:text-blue-600'}`}
                    >
                        <Layers size={24} />
                    </button>
                </div>
            </div>

            {/* 3. BOTTOM SHEET (Tarjeta inferior) */}
            {/* z-[1000] para que esté por encima de Leaflet */}
            <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-4xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-1000 flex flex-col max-h-[60vh]">
                {fase === 'buscando_origen' && (
                    <div className="p-6 animate-in slide-in-from-bottom-8 duration-300">
                        <h2 className="text-xl font-black text-gray-800 mb-1">¡Genial!, ¿Desde dónde vamos?</h2>
                        <p className="text-sm text-gray-500 mb-6">El mapa ya está enfocando tu destino. Ahora, debes indicar el acceso en el que te encuentras</p>
                        <div className="space-y-3">
                            {origenes.map(org => (
                                <button key={org} onClick={() => manejarSeleccionOrigen(org)} className="w-full flex items-center p-4 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl transition-all text-left">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600"><Navigation2 size={16} /></div>
                                    <span className="font-bold text-gray-700">{org}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {fase === 'confirmacion' && (
                    <div className="p-6 animate-in slide-in-from-bottom-8 duration-300">
                        <div className="w-full h-32 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center border border-gray-300 overflow-hidden relative">
                            <Image
                                src={`/images/${origen.toLowerCase().replace(/\s+/g, '_')}.png`}
                                alt={`Foto de referencia de ${origen}`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            <span className="text-gray-500 text-sm font-bold absolute z-10 bg-white/80 px-3 py-1 rounded-full">Foto de {origen}</span>
                        </div>
                        <h2 className="text-lg font-black text-gray-800 mb-4 text-center">Confirmá tu punto de partida</h2>
                        <button onClick={iniciarRuta} className="w-full flex items-center justify-center py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all active:scale-95 shadow-md shadow-blue-500/30">
                            <CheckCircle2 size={20} className="mr-2" />
                            Ver Ruta Completa
                        </button>
                    </div>
                )}

                {fase === 'navegando' && (
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Siguiendo ruta hacia</p>
                            <p className="text-xl font-black text-gray-800">{destino}</p>
                        </div>
                        <button onClick={onVolver} className="px-5 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors">
                            Finalizar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}