import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar, { SidebarItem } from "./components/Sidebar";
import "./index.css";
import { Home, Users } from "lucide-react";

import VistaUsuarios from "./pages/usuarios/VistaUsuarios";
import RegistroUsuarios from "./pages/usuarios/RegistroUsuarios";
import InicioSesionUsuarios from "./pages/usuarios/login";
import LandingPage from "./pages/common/LadingPage";
import MisPasanakus from "./pages/grupos/MisPasanakus";
import GrupoDetalle from "./pages/grupos/GrupoDetalle";
import HomeDashboard from "./pages/common/homeDashboard";
import { FaPeopleGroup } from "react-icons/fa6";

function App() {
  return (
    <Router>
      <Routes>
        {/* vista pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Login y Registro */}
        <Route path="/login" element={<InicioSesionUsuarios />} />
        <Route path="/registro" element={<RegistroUsuarios />} />

        {/* Layout con Sidebar */}
        <Route
          path="/app/*"
          element={
            <div className="flex min-h-screen">
              <Navbar>
                <SidebarItem icon={<Home />} text="Inicio" to="/app/inicio" />
                <SidebarItem
                  icon={<Users />}
                  text="Usuarios"
                  to="/app/tabla-usuarios"
                />
                <SidebarItem
                  icon={<FaPeopleGroup />}
                  text="Grupos"
                  to="/app/mis-grupos"
                />
              </Navbar>

              <main className="flex-1 ml-16 p-6 bg-gray-50">
                <Routes>
                  <Route path="inicio" element={<HomeDashboard />} />
                  <Route path="tabla-usuarios" element={<VistaUsuarios />} />
                  <Route path="mis-grupos" element={<MisPasanakus />} />
                  <Route path="grupos/:id" element={<GrupoDetalle />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
