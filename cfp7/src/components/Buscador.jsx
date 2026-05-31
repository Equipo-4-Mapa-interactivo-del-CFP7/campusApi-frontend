import { useState } from 'react'

function Buscador({ setSectorSeleccionado }) {

  const [busqueda, setBusqueda] = useState('')

  const buscarSector = () => {

    const texto = busqueda.toLowerCase().trim()

    if (texto === 'talleres') {
      setSectorSeleccionado('talleres')
    }

    else if (texto === 'informatica') {
      setSectorSeleccionado('informatica')
    }

    else if (texto === 'buffet') {
      setSectorSeleccionado('buffet')
    }

    else if (texto === 'cocina') {
      setSectorSeleccionado('cocina')
    }

    else if (texto === 'electronica') {
      setSectorSeleccionado('electronica')
    }

    else if (texto === 'sanitarios') {
      setSectorSeleccionado('sanitarios')
    }

    else if (texto === 'aulas') {
      setSectorSeleccionado('aulas')
    }

    else {
      alert('Sector no encontrado')
    }

  }

  return (

    <div style={styles.container}>

      <h2>
        Buscar sector
      </h2>

      <input
        type="text"
        placeholder="Ej: talleres"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={buscarSector}
        style={styles.boton}
      >
        Buscar
      </button>

    </div>

  )
}

const styles = {

  container: {
    marginBottom: '20px'
  },

  input: {
    width: '65%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginRight: '10px'
  },

  boton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

}

export default Buscador