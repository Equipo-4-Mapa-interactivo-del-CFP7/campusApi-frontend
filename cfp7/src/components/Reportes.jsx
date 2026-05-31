function Reportes() {

  return (

    <div>

      <h2>
         Reportar incidencia
      </h2>

      <p>
        Informá problemas dentro de la institución.
      </p>

      <select
        style={styles.input}
      >

        <option>
          Seleccionar problema
        </option>

        <option>
          Accesibilidad
        </option>

        <option>
          Aula cerrada
        </option>

        <option>
          Baño fuera de servicio
        </option>

        <option>
          Problema eléctrico
        </option>

        <option>
          Señalización
        </option>

      </select>

      <textarea
        placeholder="Describa el problema..."
        style={styles.textarea}
      ></textarea>

      <button style={styles.boton}>
        Enviar reporte
      </button>

    </div>

  )
}

const styles = {

  input: {
    width: '95%',
    padding: '12px',
    marginTop: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },

  textarea: {
    width: '95%',
    height: '90px',
    marginTop: '15px',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    resize: 'none',
    boxSizing: 'border-box'
  },

  boton: {
    marginTop: '15px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

}

export default Reportes