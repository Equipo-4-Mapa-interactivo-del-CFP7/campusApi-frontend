import { ArrowLeft, Map, Bus, Car } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Props { onVolver: () => void; }
const DESTINO_CFP: [number, number] = [-34.5522, -58.4402];

export default function VistaComollegar({ onVolver }: Props) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <header className="flex items-center mb-6">
        <button onClick={onVolver} className="p-2 mr-4 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-black text-blue-900">Cómo llegar al CFP N.º 7</h1>
      </header>

      <main className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
        <div className="w-full h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <MapContainer center={DESTINO_CFP} zoom={16} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={DESTINO_CFP}>
              <Popup>CFP N.º 7 - Destino</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${DESTINO_CFP[0]},${DESTINO_CFP[1]}`} target="_blank" className="flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-500 transition-all">
            <Car className="text-blue-600 mr-4" size={24} />
            <span className="font-bold">Abrir en Google Maps</span>
          </a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=-34.5522,-58.4402&travelmode=transit" target="_blank" className="flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-500 transition-all">
            <Bus className="text-green-600 mr-4" size={24} />
            <span className="font-bold">Cómo llegar en Colectivo</span>
          </a>
        </div>
      </main>
    </div>
  );
}