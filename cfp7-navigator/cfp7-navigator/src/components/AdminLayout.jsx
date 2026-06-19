import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para cerrar sesión (borra el token simulado y te manda al login de la app)
  const handleLogout = () => {
    localStorage.removeItem('admin_token'); // O la lógica de sesión que definas
    navigate('/');
  };

  // Función auxiliar para pintar de un color diferente el botón de la página donde estás parada
  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9' }}>
      
      {/* 1. BARRA LATERAL (SIDEBAR DEL ADMINISTRADOR) */}
      {/* Esta barra usa las clases que vas a encontrar en tu archivo admin.css viejo */}
      <aside className="admin-sidebar" style={{ width: '260px', background: '#2c3e50', color: '#ecf0f1', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div className="sidebar-brand" style={{ marginBottom: '30px', textAlign: 'center', borderBottom: '1px solid #34495e', paddingBottom: '15px' }}>
          <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 'bold' }}>CFP Navigator</h2>
          <span style={{ fontSize: '12px', color: '#bdc3c7' }}>Panel de Administración</span>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <nav className="sidebar-menu" style={{ flexGrow: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                to="/admin/dashboard" 
                className={isActive('/admin/dashboard')}
                style={{ color: '#ecf0f1', textDecoration: 'none', display: 'block', padding: '10px 15px', borderRadius: '4px' }}
              >
                📊 Dashboard (Incidencias)
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                to="/admin/usuarios" 
                className={isActive('/admin/usuarios')}
                style={{ color: '#ecf0f1', textDecoration: 'none', display: 'block', padding: '10px 15px', borderRadius: '4px' }}
              >
                👥 Gestión de Usuarios
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link 
                to="/admin/perfil" 
                className={isActive('/admin/perfil')}
                style={{ color: '#ecf0f1', textDecoration: 'none', display: 'block', padding: '10px 15px', borderRadius: '4px' }}
              >
                👤 Mi Perfil
              </Link>
            </li>
          </ul>
        </nav>

        {/* BOTÓN DE CIERRE DE SESIÓN */}
        <div className="sidebar-footer" style={{ borderTop: '1px solid #34495e', paddingTop: '15px' }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* 2. CONTENEDOR PRINCIPAL DE CONTENIDO CONTRASTANTE */}
      {/* El componente <Outlet /> de react-router-dom es la ventana mágica: */}
      {/* Ahí adentro React va a renderizar automáticamente Dashboard.jsx, Usuarios.jsx o Perfil.jsx */}
      <main className="admin-main-content" style={{ flexGrow: 1, padding: '30px', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;