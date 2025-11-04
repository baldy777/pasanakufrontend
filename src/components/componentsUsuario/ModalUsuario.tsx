import Modal from "react-modal";
import { useEffect, useState } from "react";

interface FormData {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  aporte: string;
}

interface UsuarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editarUsuario: any;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

Modal.setAppElement("#root");

const UsuarioModal = ({
  isOpen,
  onClose,
  onSave,
  editarUsuario,
  formData,
  setFormData,
}: UsuarioModalProps) => {
  const [errores, setErrores] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
  });

  useEffect(() => {
    document.title = editarUsuario ? "Editar Usuario" : "Agregar Usuario";
  }, [editarUsuario]);

  const validar = () => {
    const nuevosErrores = {
      nombre: formData.nombre.trim() ? "" : "El nombre es obligatorio",
      apellido_paterno: formData.apellido_paterno.trim()
        ? ""
        : "El apellido paterno es obligatorio",
      apellido_materno: formData.apellido_materno.trim()
        ? ""
        : "El apellido materno es obligatorio",
    };

    setErrores(nuevosErrores);

    // Si alguno tiene texto, hay error
    return !Object.values(nuevosErrores).some((e) => e !== "");
  };

  const manejarGuardar = () => {
    if (validar()) {
      onSave();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Usuario Modal"
      className="bg-white rounded-2xl w-[90%] md:w-[50%] mx-auto mt-24 p-8 outline-none shadow-2xl border border-gray-200"
      overlayClassName="fixed inset-0 flex items-start justify-center bg-transparent"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {editarUsuario ? "Editar Usuario" : "Agregar Usuario"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className={`border w-full px-3 py-2 rounded-lg mt-1 text-gray-800 ${
              errores.nombre ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nombre"
          />
          {errores.nombre && (
            <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">Apellido Paterno</label>
          <input
            type="text"
            value={formData.apellido_paterno}
            onChange={(e) =>
              setFormData({ ...formData, apellido_paterno: e.target.value })
            }
            className={`border w-full px-3 py-2 rounded-lg mt-1 text-gray-800 ${
              errores.apellido_paterno ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Apellido Paterno"
          />
          {errores.apellido_paterno && (
            <p className="text-red-500 text-xs mt-1">
              {errores.apellido_paterno}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">Apellido Materno</label>
          <input
            type="text"
            value={formData.apellido_materno}
            onChange={(e) =>
              setFormData({ ...formData, apellido_materno: e.target.value })
            }
            className={`border w-full px-3 py-2 rounded-lg mt-1 text-gray-800 ${
              errores.apellido_materno ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Apellido Materno"
          />
          {errores.apellido_materno && (
            <p className="text-red-500 text-xs mt-1">
              {errores.apellido_materno}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">Teléfono</label>
          <input
            type="text"
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            className="border border-gray-300 w-full px-3 py-2 rounded-lg mt-1 text-gray-800"
            placeholder="Teléfono"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Aporte</label>
          <input
            type="text"
            value={formData.aporte}
            onChange={(e) =>
              setFormData({ ...formData, aporte: e.target.value })
            }
            className="border border-gray-300 w-full px-3 py-2 rounded-lg mt-1 text-gray-800"
            placeholder="Aporte"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-all duration-200"
        >
          Cancelar
        </button>
        <button
          onClick={manejarGuardar}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
        >
          {editarUsuario ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </Modal>
  );
};

export default UsuarioModal;
