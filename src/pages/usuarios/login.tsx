import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

export default function InicioSesionUsuarios() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioEncontrado = usuarios.find(
      (user: { correo_electronico: string }) =>
        user.correo_electronico === correo
    );

    if (!usuarioEncontrado) {
      setError("Correo no registrado");
      return;
    }

    if (usuarioEncontrado.contraseña !== contrasena) {
      setError("Contraseña incorrecta");
      return;
    }

    setError("");
    navigate("/inicio");
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(to bottom, var(--color-bg), #fff)",
      }}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-xl p-10 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          color: "var(--color-text)",
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-8 tracking-wide"
          style={{ color: "var(--color-text)" }}
        >
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div
            className="flex items-center border-b-2 pb-2 transition-colors"
            style={{
              borderColor: "var(--color-muted)",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-primary)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-muted)")
            }
          >
            <FiMail
              className="text-xl mr-3"
              style={{ color: "var(--color-muted)" }}
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="w-full bg-transparent outline-none"
              style={{
                color: "var(--color-text)",
                caretColor: "var(--color-primary)",
              }}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div
            className="flex items-center border-b-2 pb-2 transition-colors"
            style={{
              borderColor: "var(--color-muted)",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-primary)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-muted)")
            }
          >
            <FiLock
              className="text-xl mr-3"
              style={{ color: "var(--color-muted)" }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full bg-transparent outline-none"
              style={{
                color: "var(--color-text)",
                caretColor: "var(--color-primary)",
              }}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-center font-medium"
              style={{ color: "red" }}
            >
              {error}
            </p>
          )}

          {/* Botón */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold shadow-md transition-colors"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-secondary)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
            >
              Entrar
            </button>
          </div>

          {/* Registro */}
          <div className="text-center mt-4">
            <p style={{ color: "var(--color-muted)" }}>
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/registro")}
                className="font-semibold"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "underline",
                }}
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
