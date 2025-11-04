import Modal from "react-modal";
import { useEffect } from "react";

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

    useEffect(() => {
    document.title = editarUsuario ? "Editar Usuario" : "Agregar Usuario";
  }, [editarUsuario]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Usuario Modal"
      className="bg-white rounded-lg max-w-md mx-auto mt-20 p-6 outline-none shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-xl font-bold mb-4 text-black">
        {editarUsuario ? "Editar Usuario" : "Agregar Usuario"}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          className="border w-full px-2 py-1 rounded text-black"
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={formData.apellido_paterno}
          onChange={(e) =>
            setFormData({ ...formData, apellido_paterno: e.target.value })
          }
          className="border w-full px-2 py-1 rounded text-black"
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={formData.apellido_materno}
          onChange={(e) =>
            setFormData({ ...formData, apellido_materno: e.target.value })
          }
          className="border w-full px-2 py-1 rounded text-black"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={(e) =>
            setFormData({ ...formData, telefono: e.target.value })
          }
          className="border w-full px-2 py-1 rounded text-black"
        />
        <input
          type="text"
          placeholder="Aporte"
          value={formData.aporte}
          onChange={(e) =>
            setFormData({ ...formData, aporte: e.target.value })
          }
          className="border w-full px-2 py-1 rounded text-black"
        />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          {editarUsuario ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </Modal>
  );
};

export default UsuarioModal;
