// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNavbarRouter from "./components/BottomNavbarRouter";

// Componentes de la App de Usuario
import Login from "./pages/admin/Login"; 
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Sectors from "./pages/Sectors";
import Spaces from "./pages/Spaces";
import SpaceDetail from "./pages/SpaceDetail";
import HowToGet from "./pages/HowToGet";
import SocialStory from "./pages/SocialStory";
import ReportForm from "./pages/ReportForm";
import ReportSuccess from "./pages/ReportSuccess";

// 🗺️ Importamos el mapa desde su nueva ubicación en la carpeta admin
import MapUsuario from "./pages/admin/Map"; 
import MapAdmin from "./pages/admin/Map"; 

// Componentes para el Prototipo de Admin
import { AdminLayout } from "./components/AdminLayout"; 
import Dashboard from "./pages/admin/Dashboard";
import Usuarios from "./pages/admin/Usuarios";
import Perfil from "./pages/admin/Perfil";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        
        <Routes>
          {/* ========================================== */}
          {/* 1. RUTAS DE LA APP MOBILE (USUARIOS)       */}
          {/* ========================================== */}
          <Route
            path="/*"
            element={
              <>
                {/* Los componentes globales del usuario común se quedan acá */}
                <Header onOpenMenu={() => setIsSidebarOpen(true)} />
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <div style={{ paddingTop: '60px', paddingBottom: '100px' }}>
                  <Routes>
                    <Route path="/" element={<Login />} /> 
                    <Route path="/home" element={<Home />} />
                    <Route path="/ajustes" element={<Settings />} /> 
                    <Route path="/mapa" element={<MapUsuario />} />
                    <Route path="/sectores" element={<Sectors />} />
                    <Route path="/espacios" element={<Spaces />} />
                    <Route path="/detalle-espacio" element={<SpaceDetail />} />
                    <Route path="/como-llegar" element={<HowToGet />} />
                    <Route path="/historia-social" element={<SocialStory />} />
                    <Route path="/reportes" element={<ReportForm />} />
                    <Route path="/reporte-exitoso" element={<ReportSuccess />} />
                  </Routes>
                </div>

                {/* La barra de abajo solo aparece en las pantallas de usuario */}
                <BottomNavbarRouter />
              </>
            }
          />

          {/* ========================================== */}
          {/* 2. NUEVO: RUTAS DE ADMINISTRACIÓN (ESCRITORIO) */}
          {/* ========================================== */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Si entran a /admin a secas, los manda directo al dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="mapa" element={<MapAdmin />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}

export default App;