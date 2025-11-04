import { ChevronLast, ChevronFirst, MoreVertical } from "lucide-react";
import { useContext, createContext, useState, type ReactNode } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const navigate = useNavigate();

  // Simula un usuario activo (puedes reemplazarlo con datos reales del login)
  const usuarioActivo = {
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    rol: "Administrador",
  };

  // Cerrar sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActivo"); // o la clave que uses
    navigate("/login"); // redirige al login
  };

  return (
    <>
      <aside
        className={`
          fixed left-0 top-0 h-screen z-50 bg-white border-r shadow-lg transition-all duration-300
          ${expanded ? "w-64" : "w-16"}  
        `}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="#"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* Perfil de usuario */}
          <div
            className="border-t flex p-3 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setShowUserModal(true)}
          >
            <CiUser />{" "}
            <div
              className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{usuarioActivo.nombre}</h4>
                <span className="text-xs text-gray-600">
                  {usuarioActivo.rol}
                </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>

      {showUserModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-transparent z-[100]"
          onClick={() => setShowUserModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-[50%] max-w-lg relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Perfil del Usuario
            </h2>

            {/* Formulario editable */}
            <div className="space-y-3 text-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={usuarioActivo.nombre}
                  onChange={(e) =>
                    setUsuarioActivo({
                      ...usuarioActivo,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Correo:
                </label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={usuarioActivo.correo}
                  onChange={(e) =>
                    setUsuarioActivo({
                      ...usuarioActivo,
                      correo: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Rol:
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1 bg-gray-100"
                  value={usuarioActivo.rol}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                onClick={() => {
                  // Aquí puedes guardar los cambios en localStorage o llamar a tu API
                  localStorage.setItem(
                    "usuarioActivo",
                    JSON.stringify(usuarioActivo)
                  );
                  alert("Datos actualizados!");
                }}
              >
                Guardar
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>

            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Items de la barra lateral
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  alert?: boolean;
}

export function SidebarItem({ icon, text, to, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }
  const { expanded } = context;
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
