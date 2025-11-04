import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiUser, FiLock, FiCalendar, FiMapPin } from "react-icons/fi";

export default function RegistroUsuarios() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo_electronico: "",
    fecha_nacimiento: "",
    direccion: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const usuariosGuardados = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    const nuevoUsuario = {
      id: Date.now(),
      nombre: formData.nombre,
      apellido_paterno: formData.apellido_paterno,
      apellido_materno: formData.apellido_materno,
      correo_electronico: formData.correo_electronico,
      fecha_nacimiento: formData.fecha_nacimiento,
      direccion: formData.direccion,
      contraseña: formData.contraseña,
    };

    usuariosGuardados.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    setFormData({
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      correo_electronico: "",
      fecha_nacimiento: "",
      direccion: "",
      contraseña: "",
      confirmarContraseña: "",
    });

    navigate("/app/*");
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(to bottom, var(--color-bg), #fff)",
      }}
    >
      <div
        className="w-full max-w-4xl rounded-xl shadow-xl p-10 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          color: "var(--color-text)",
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-8 tracking-wide"
          style={{ color: "var(--color-text)" }}
        >
          Registro de Usuarios
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Campo genérico */}
          {[
            { name: "nombre", icon: <FiUser /> },
            { name: "apellido_paterno", icon: <FiUser /> },
            { name: "apellido_materno", icon: <FiUser /> },
            { name: "correo_electronico", icon: <FiMail /> },
            { name: "fecha_nacimiento", icon: <FiCalendar />, type: "date" },
            { name: "direccion", icon: <FiMapPin /> },
            { name: "contraseña", icon: <FiLock />, type: "password" },
            {
              name: "confirmarContraseña",
              icon: <FiLock />,
              type: "password",
            },
          ].map((field, i) => (
            <div
              key={i}
              className="flex items-center border-b-2 pb-2 transition-colors"
              style={{ borderColor: "var(--color-muted)" }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-primary)")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-muted)")
              }
            >
              <div className="text-xl mr-3" style={{ color: "var(--color-muted)" }}>
                {field.icon}
              </div>
              <input
                type={field.type || "text"}
                placeholder={
                  field.name
                    .replace("_", " ")
                    .replace("confirmarContraseña", "Confirme Contraseña")
                    .replace("correo electronico", "Correo Electrónico")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                }
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
                style={{
                  color: "var(--color-text)",
                  caretColor: "var(--color-primary)",
                }}
                required
              />
            </div>
          ))}

          {/* Botón */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold shadow-md transition-colors"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-secondary)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              Registrarse
            </button>
          </div>

          {/* Iniciar sesión */}
          <div className="md:col-span-2 text-center mt-4">
            <p style={{ color: "var(--color-muted)" }}>
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "underline",
                }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
