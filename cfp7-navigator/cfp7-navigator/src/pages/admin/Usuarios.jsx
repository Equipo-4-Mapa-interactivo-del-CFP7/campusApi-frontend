import React, { useState, useEffect } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulación de los datos que van a venir de la base de datos de TechLab
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // En el futuro, cuando el Backend esté integrado, acá harás:
        // const response = await fetch('http://localhost:8080/api/usuarios');
        // const data = await response.json();
        
        // Por ahora usamos los datos de prueba idénticos a tu script SQL:
        const datosEjemplo = [
          { id: 1, dni: "11111111", nombre: "Usuario", apellido: "Del Sistema", rol: "ADMIN" },
          { id: 2, dni: "22222222", nombre: "Usuario", apellido: "Institucional", rol: "PERSONAL" },
          { id: 3, dni: "33333333", nombre: "Daniela", apellido: "Robert", rol: "ADMIN" }
        ];
        
        setUsuarios(datosEjemplo);
      } catch (error) {
        console.error("Error al cargar los usuarios administrativos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p style={{ padding: '20px' }}>Cargando personal del CFP...</p>;

  return (
    <div className="usuarios-admin-page" style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>👥 Gestión de Personal</h1>
          <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
            Lista de usuarios autorizados para gestionar las incidencias y mapas del CFP N.7.
          </p>
        </div>
        
        {/* Botón para simular agregar un nuevo preceptor o administrativo */}
        <button 
          onClick={() => alert("Acá abriremos un formulario para registrar un nuevo usuario con su DNI y Rol")}
          style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ➕ Registrar Personal
        </button>
      </div>

      {/* TABLA DE USUARIOS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#eaeded', color: '#34495e', borderBottom: '2px solid #bdc3c7' }}>
              <th style={{ padding: '12px 15px' }}>DNI</th>
              <th style={{ padding: '12px 15px' }}>Nombre Completo</th>
              <th style={{ padding: '12px 15px' }}>Rol / Permisos</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} style={{ borderBottom: '1px solid #ebdada' }}>
                <td style={{ padding: '12px 15px', fontWeight: '500' }}>{usuario.dni}</td>
                <td style={{ padding: '12px 15px' }}>{usuario.apellido}, {usuario.nombre}</td>
                <td style={{ padding: '12px 15px' }}>
                  <span style={{ 
                    background: usuario.rol === 'ADMIN' ? '#d5f5e3' : '#d6eaf8', 
                    color: usuario.rol === 'ADMIN' ? '#1e8449' : '#2471a3', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold' 
                  }}>
                    {usuario.rol}
                  </span>
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button 
                    onClick={() => alert(`Editar usuario con DNI: ${usuario.dni}`)}
                    style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', marginRight: '10px', fontWeight: '500' }}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => alert(`Dar de baja a: ${usuario.nombre}`)}
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: '500' }}
                  >
                    🗑️ Dar de Baja
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;