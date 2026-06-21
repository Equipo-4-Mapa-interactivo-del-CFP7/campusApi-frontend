import { useState } from 'react';
import { MapPin, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useAccesibilidad } from '@/context/AccesibilidadContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props { onVolver: () => void; }

// Coordenadas fijas de la puerta del edificio
const DESTINO_CFP: [number, number] = [-34.5522, -58.4402];

export default function VistaComollegar({ onVolver }: Props) {
  const { config } = useAccesibilidad();
  const [accesoActivo, setAccesoActivo] = useState("general");

  const accesos = [
    { id: "general", nombre: "Vista general", coords: null },
    { id: "ramsay", nombre: "Entrada Ramsay", coords: [-34.5515, -58.4410] },
    { id: "dragones", nombre: "Entrada Dragones", coords: [-34.5530, -58.4425] },
    { id: "juramento", nombre: "Acceso Juramento", coords: [-34.5540, -58.4400] },
    { id: "echeverria", nombre: "Acceso Echeverría", coords: [-34.5500, -58.4380] },
    { id: "olazabal", nombre: "Acceso Olazábal", coords: [-34.5490, -58.4395] },
    { id: "cfp7", nombre: "Acceso CFP N°7", coords: [-34.5525, -58.4405] },
  ];

  const accesoSeleccionado = accesos.find(a => a.id === accesoActivo);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-4 md:p-6 relative z-10">
      <header className="flex items-center mb-6">
        <button onClick={onVolver} className="p-2 mr-4 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors cursor-pointer">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-black text-blue-900 tracking-tight">Cómo llegar</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Accesos</h2>
          {accesos.map((acceso) => (
            <button
              key={acceso.id}
              onClick={() => setAccesoActivo(acceso.id)}
              className={`flex items-center p-4 rounded-2xl border transition-all text-left cursor-pointer active:scale-95 ${
                accesoActivo === acceso.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <MapPin size={20} className={`mr-3 ${accesoActivo === acceso.id ? 'text-white' : 'text-blue-500'}`} />
              <span className="font-bold text-sm">{acceso.nombre}</span>
            </button>
          ))}
        </aside>

        <main className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6">
          <div className="w-full h-64 md:h-100 bg-gray-200 rounded-3xl border border-gray-300 flex flex-col items-center justify-center relative shadow-inner overflow-hidden z-0">
            {/* Implementación de Leaflet */}
            <MapContainer center={DESTINO_CFP} zoom={16} style={{ height: '100%', width: '100%', zIndex: 0 }}>
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={DESTINO_CFP}>
                <Popup>Destino: CFP N°7</Popup>
              </Marker>
              
              {accesoSeleccionado?.coords && (
                <Marker position={accesoSeleccionado.coords as [number, number]}>
                  <Popup>Origen: {accesoSeleccionado.nombre}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="w-full h-48 md:h-64 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center justify-center p-4">
            <ImageIcon size={32} className="text-gray-300 mb-2" />
            <p className="text-gray-600 font-bold text-sm">Foto de Referencia</p>
            <p className="text-gray-400 text-xs mt-1 text-center">
              Aquí se mostrará la imagen de <span className="font-bold">{accesoSeleccionado?.nombre}</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}