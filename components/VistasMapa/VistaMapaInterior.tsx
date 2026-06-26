"use client"; // Asegurate de poner esto si usás Next.js

import React from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { ArrowLeft, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { coordenadasInterior } from "@/data/coordenadasInterior";
import { useMapEvents } from "react-leaflet";

// íconos por defecto de Leaflet
const iconDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = iconDefault;

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
}



export default function VistaMapaInterior({ onVolver }: Props) {
    
    // 1. LOS LÍMITES DEL PLANO (Bounds)
    // Esto es un rectángulo virtual. Si la imagen mide 1000(842) de alto x 1500(595) de ancho.
    // Le decimos a Leaflet que encaje la imagen exactamente en esas medidas.
    const limitesDelPlano: L.LatLngBoundsExpression = [[0, 0], [500, 1000]];

    return (
        <div className="relative w-full h-screen bg-[#e5e7eb] flex flex-col overflow-hidden">
            
            {/* BARRA SUPERIOR (Para poder salir del mapa) */}
            <div className="absolute top-0 left-0 w-full z-1000 p-4 pt-6 bg-linear-to-b from-gray-900/60 to-transparent pointer-events-none">
                <div className="flex items-center gap-3 w-full max-w-lg mx-auto pointer-events-auto">
                    <button 
                        onClick={onVolver} 
                        className="p-3 bg-white rounded-full shadow-md text-gray-800 hover:text-blue-600 active:scale-95 transition-all shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-white font-black text-lg drop-shadow-md">Interior CFP N° 7</h2>
                </div>
            </div>

            {/* EL MAPA INTERACTIVO (Modo Plano) */}
            <div className="absolute inset-0 z-0">
                <MapContainer 
                    crs={L.CRS.Simple} // Esto apaga el GPS y usa un sistema X/Y simple
                    bounds={limitesDelPlano} 
                    minZoom={-1}       // Permite alejar la cámara 
                    maxZoom={3}        // Permite acercarla
                    zoomControl={false} // Se ocultan los botones de zoom (+/-)
                    className="w-full h-full" 
                >
                    {/* imagen SVG, PNG, WEBP del mapa */}
                    <ImageOverlay 
                        url="/plano-maqueta.png"
                        bounds={limitesDelPlano} 
                    />

                    {/* marcadores dinámicos */}
                    {Object.entries(coordenadasInterior).map(([nombreDelLugar, datos]) => (
                        <Marker key={nombreDelLugar} position={datos.coords}>
                            <Popup>
                                {/* Usamos Tailwind adentro del Popup para mejor calidad */}
                                <div className="text-center">
                                    <h3 className="font-black text-gray-800 text-sm">{nombreDelLugar}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{datos.descripcion}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
<CazadorDeCoordenadas />
                </MapContainer>
            </div>
        </div>
    );
}