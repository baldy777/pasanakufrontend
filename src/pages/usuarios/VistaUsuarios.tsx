import { useEffect, useState } from "react";
import "../../index.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import UsuarioModal from "../../components/componentsUsuario/ModalUsuario";

interface Usuario {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono?: string;
  aporte?: string;
  correo_electronico?: string;
  direccion?: string;
}

const VistaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    aporte: "",
  });

  useEffect(() => {
    const usuariosGuardados = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );
    setUsuarios(usuariosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const abrirAgregar = () => {
    setEditarUsuario(null);
    setFormData({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      telefono: "",
      aporte: "",
    });
    setModalIsOpen(true);
  };

  const abrirEditar = (usuario: Usuario) => {
    setEditarUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellido_paterno: usuario.apellido_paterno,
      apellido_materno: usuario.apellido_materno,
      telefono: usuario.telefono || "",
      aporte: usuario.aporte || "",
    });
    setModalIsOpen(true);
  };

  const guardarUsuario = () => {
    if (editarUsuario) {
      const actualizado = usuarios.map((u) =>
        u.id === editarUsuario.id ? { ...u, ...formData } : u
      );
      setUsuarios(actualizado);
    } else {
      const nuevo: Usuario = { id: Date.now(), ...formData };
      setUsuarios([...usuarios, nuevo]);
    }
    setModalIsOpen(false);
  };

  const eliminarUsuario = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      {/* Título y botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[95vw] mb-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center md:text-left">
          Vista de Usuarios
        </h1>
        <button
          onClick={abrirAgregar}
          className="mt-4 md:mt-0 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-2 rounded-lg transition-colors duration-300"
        >
          Agregar Usuario
        </button>
      </div>

      {/* Tabla */}
      <div className="w-full max-w-[95vw] bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Apellido Paterno
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Apellido Materno
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aporte
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {usuarios.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-8 py-4 text-sm font-medium text-gray-900">
                    {u.nombre}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">
                    {u.apellido_paterno}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">
                    {u.apellido_materno}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">
                    {u.telefono || "—"}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">
                    {u.aporte || "—"}
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500 flex gap-4">
                    <button
                      onClick={() => abrirEditar(u)}
                      className="text-yellow-500 hover:text-yellow-600"
                      aria-label="Editar usuario"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u.id)}
                      className="text-red-500 hover:text-red-600"
                      aria-label="Eliminar usuario"
                    >
                      <RiDeleteBinFill className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UsuarioModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSave={guardarUsuario}
        editarUsuario={editarUsuario}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default VistaUsuarios;
