function TarjetaInfo({ sectorSeleccionado }) {

  const infoSectores = {

    talleres: {
      titulo: 'Talleres',
      descripcion: 'Espacios destinados a prácticas técnicas y actividades profesionales.'
    },

    informatica: {
      titulo: 'Informática',
      descripcion: 'Sala equipada con computadoras para cursos tecnológicos.'
    },

    buffet: {
      titulo: 'Buffet',
      descripcion: 'Espacio de descanso y alimentación para estudiantes.'
    },

    sanitarios: {
      titulo: 'Sanitarios',
      descripcion: 'Baños accesibles para estudiantes y personal.'
    },

    cocina: {
      titulo: 'Cocina',
      descripcion: 'Sector destinado a prácticas gastronómicas.'
    },

    electronica: {
      titulo: 'Electrónica',
      descripcion: 'Área para formación técnica en electrónica.'
    }

  }

  const sector = infoSectores[sectorSeleccionado]

  return (

    <div>

      <h2>
        Información del sector
      </h2>

      {sector ? (

        <div>

          <h3>
            {sector.titulo}
          </h3>

          <p>
            {sector.descripcion}
          </p>

        </div>

      ) : (

        <p>
          Seleccioná un sector desde el buscador.
        </p>

      )}

    </div>

  )
}

export default TarjetaInfo