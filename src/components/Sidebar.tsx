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

  const usuarioActivo = {
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    rol: "Administrador",
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <>
      <aside
        className={`
          fixed left-0 top-0 h-screen z-50
          bg-[var(--color-bg)] border-r border-[var(--color-muted)]
          shadow-lg transition-all duration-300
          ${expanded ? "w-64" : "w-16"}
        `}
      >
        <nav className="h-full flex flex-col">
          {/* Encabezado */}
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="#"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="rounded-lg bg-[var(--color-bg)] hover:bg-[var(--color-primary)]/10 p-1"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          {/* Ítems */}
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* Usuario activo */}
          <div
            className="border-t border-[var(--color-muted)] flex p-3 cursor-pointer hover:bg-[var(--color-primary)]/10 transition"
            onClick={() => setShowUserModal(true)}
          >
            <CiUser className="text-[var(--color-text)]" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-[var(--color-text)]">
                  {usuarioActivo.nombre}
                </h4>
                <span className="text-xs text-[var(--color-muted)]">
                  {usuarioActivo.rol}
                </span>
              </div>
              <MoreVertical
                size={20}
                className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition"
              />
            </div>
          </div>
        </nav>
      </aside>

      {/* Modal de usuario */}
      {showUserModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-[100]"
          onClick={() => setShowUserModal(false)}
        >
          <div
            className="bg-[var(--color-bg)] p-6 rounded-xl shadow-xl w-[50%] max-w-lg relative border border-[var(--color-muted)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4 text-center">
              Perfil del Usuario
            </h2>

            <div className="space-y-3 text-[var(--color-text)]">
              <div>
                <label className="block text-sm font-medium text-[var(--color-muted)]">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-[var(--color-muted)] rounded px-2 py-1 bg-transparent text-[var(--color-text)] focus:border-[var(--color-primary)] outline-none transition"
                  value={usuarioActivo.nombre}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-muted)]">
                  Correo:
                </label>
                <input
                  type="email"
                  className="mt-1 w-full border border-[var(--color-muted)] rounded px-2 py-1 bg-transparent text-[var(--color-text)] focus:border-[var(--color-primary)] outline-none transition"
                  value={usuarioActivo.correo}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-muted)]">
                  Rol:
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-[var(--color-muted)] rounded px-2 py-1 bg-[var(--color-muted)]/10 text-[var(--color-text)]"
                  value={usuarioActivo.rol}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition"
                onClick={() => {
                  alert("Datos actualizados!");
                  setShowUserModal(false);
                }}
              >
                Guardar
              </button>

              <button
                className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-text)] rounded-lg hover:brightness-90 transition"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>

            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-2 right-3 text-[var(--color-muted)] hover:text-[var(--color-text)]"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ----------- ITEMS DE LA BARRA LATERAL ----------- */

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
          relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "hover:bg-[var(--color-primary)]/10 text-[var(--color-text)]"
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
            className={`absolute right-2 w-2 h-2 rounded bg-[var(--color-accent)] ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm
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
