import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet'

import { useEffect } from 'react'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

// ICONO ROJO
const iconoRojo = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

// ICONO NORMAL
const iconoAzul = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

function CambiarVista({ posicion }) {

  const map = useMap()

  useEffect(() => {

    if (posicion) {
      map.setView(posicion, 19)
    }

  }, [posicion])

  return null
}

function Mapa({ sectorSeleccionado }) {

  const cfp7 = [-34.5556, -58.4386]

  const sectores = {

    talleres: [-34.5550, -58.4380],

    aulas: [-34.5560, -58.4390],

    informatica: [-34.5545, -58.4375],

    buffet: [-34.5565, -58.4378],

    cocina: [-34.5552, -58.4395],

    electronica: [-34.5548, -58.4389],

    sanitarios: [-34.5562, -58.4383]

  }

  return (

    <div>

      <div
        style={{
          background: '#1976d2',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          marginBottom: '15px',
          textAlign: 'center'
        }}
      >
        Sector seleccionado:
        {' '}
        {sectorSeleccionado || 'Ninguno'}
      </div>

      <MapContainer
        center={cfp7}
        zoom={18}
        style={{
          height: '500px',
          width: '100%',
          borderRadius: '20px'
        }}
      >

        <CambiarVista
          posicion={sectores[sectorSeleccionado]}
        />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(sectores).map(([nombre, posicion]) => (

          <Marker
            key={nombre}
            position={posicion}

            icon={
              sectorSeleccionado === nombre
                ? iconoRojo
                : iconoAzul
            }
          >

            <Popup>
              {nombre}
            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>

  )
}

export default Mapa