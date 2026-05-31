import { useState } from 'react'

import Mapa from './components/Mapa'
import Buscador from './components/Buscador'
import TarjetaInfo from './components/TarjetaInfo'
import Reportes from './components/Reportes'

function App() {

  const [mostrarInfo, setMostrarInfo] = useState(false)
  const [mostrarUbicacion, setMostrarUbicacion] = useState(false)
  const [mostrarMapa, setMostrarMapa] = useState(false)

  const [sectorSeleccionado, setSectorSeleccionado] = useState('')

  return (

    <div style={styles.app}>

      <header style={styles.header}>

        <h1 style={styles.titulo}>
          CFP N.º 7 - Formación Profesional
        </h1>

        <p style={styles.subtitulo}>
          Mapa Interactivo Institucional
        </p>

      </header>

      <nav style={styles.navbar}>

        <button
          style={styles.boton}
          onClick={() => setMostrarMapa(true)}
        >
          Sectores
        </button>

        <button
          style={styles.boton}
          onClick={() => setMostrarInfo(true)}
        >
          Ubicación
        </button>

        <button
          style={styles.boton}
          onClick={() => setMostrarUbicacion(true)}
        >
          Cómo llegar
        </button>

      </nav>

      {/* MODAL MAPA */}

      {mostrarMapa && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              Sectores del CFP N.º 7
            </h2>

            <p>Talleres</p>

            <p>Aulas</p>

            <p>Informática</p>

            <p>Buffet</p>

            <p>Cocina</p>

            <p>Electrónica</p>

            <p>Sanitarios</p>

            <p style={{ marginTop: '20px', color: '#666' }}>
              Seleccioná un sector en el mapa interactivo inferior.
            </p>

            <button
              style={styles.cerrar}
              onClick={() => setMostrarMapa(false)}
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

      {/* MODAL UBICACIÓN */}

      {mostrarInfo && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              Información del CFP N.º 7
            </h2>

            <p>
              <strong>Dirección:</strong> Ramsay 2250 - CABA
            </p>

            <p>
              <strong>Horario:</strong> 08:00 a 22:00 hs
            </p>

            <p>
              <strong>Accesibilidad:</strong> Institución accesible
            </p>

            <p>
              <strong>Cursos:</strong> Formación Profesional
            </p>

            <button
              style={styles.cerrar}
              onClick={() => setMostrarInfo(false)}
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

      {/* MODAL CÓMO LLEGAR */}

      {mostrarUbicacion && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              Cómo llegar
            </h2>

            <p>
              Subte cercano: Línea D
            </p>

            <p>
              Colectivos: 15, 29, 42, 130
            </p>

            <p>
              Acceso accesible
            </p>

            <button
              style={styles.cerrar}
              onClick={() => setMostrarUbicacion(false)}
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

      <div style={styles.grid}>

        <div style={styles.cardGrande}>

          <Buscador
            setSectorSeleccionado={setSectorSeleccionado}
          />

          <Mapa
            sectorSeleccionado={sectorSeleccionado}
          />

        </div>

        <div style={styles.columna}>

          <div style={styles.card}>

            <TarjetaInfo
              sectorSeleccionado={sectorSeleccionado}
            />

          </div>

          <div style={styles.card}>
            <Reportes />
          </div>

        </div>

      </div>

    </div>

  )
}

const styles = {

  app: {
    minHeight: '100vh',
    background: '#eef3f8',
    padding: '20px',
    fontFamily: 'Arial'
  },

  header: {
    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
    padding: '30px',
    borderRadius: '20px',
    color: 'white',
    marginBottom: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  },

  titulo: {
    margin: 0,
    fontSize: '38px'
  },

  subtitulo: {
    marginTop: '10px',
    opacity: 0.9
  },

  navbar: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },

  boton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px'
  },

  cardGrande: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },

  columna: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  card: {
    background: 'white',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },

  modal: {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '350px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
    textAlign: 'center'
  },

  cerrar: {
    marginTop: '20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer'
  }

}

export default App