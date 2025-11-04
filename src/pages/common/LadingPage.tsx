import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="bg-white shadow-sm sticky top-0 z-50"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Pasanaku
          </h1>
          <div className="space-x-6">
            {["#como-funciona", "#beneficios", "#contacto"].map((href, i) => (
              <a
                key={i}
                href={href}
                className="font-medium transition-colors"
                style={{
                  color: "var(--color-text)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-primary)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
              >
                {href === "#como-funciona"
                  ? "Cómo funciona"
                  : href === "#beneficios"
                  ? "Beneficios"
                  : "Contacto"}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center py-24 px-6"
        style={{
          background: "linear-gradient(to bottom, var(--color-bg), #fff)",
        }}
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Organiza tu Pasanaku fácil y sin complicaciones
        </h2>
        <p
          className="text-lg mb-6 max-w-2xl"
          style={{ color: "var(--color-muted)" }}
        >
          Gestiona tus grupos, aportes y turnos de manera digital y segura, sin
          perder el espíritu de confianza entre amigos.
        </p>
        <button
          className="px-6 py-3 rounded-full font-medium transition"
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
          onClick={() => navigate("/login")}
        >
          Comenzar ahora
        </button>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h3
            className="text-3xl font-bold mb-12"
            style={{ color: "var(--color-text)" }}
          >
            ¿Cómo funciona?
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "1. Crea tu grupo",
                desc: "Invita a tus amigos o compañeros para formar tu pasanaku.",
              },
              {
                title: "2. Define los aportes",
                desc: "Elige el monto y la frecuencia de los pagos fácilmente.",
              },
              {
                title: "3. Recibe tu turno",
                desc: "El sistema sortea el orden y notifica automáticamente.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow transition"
                style={{
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-muted)",
                }}
              >
                <h4
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {step.title}
                </h4>
                <p style={{ color: "var(--color-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section
        id="beneficios"
        className="py-20"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="container mx-auto px-6 text-center">
          <h3
            className="text-3xl font-bold mb-12"
            style={{ color: "var(--color-text)" }}
          >
            Beneficios
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Seguridad",
                desc: "Tus datos y movimientos están protegidos.",
              },
              {
                title: "Facilidad",
                desc: "Todo desde tu celular o computadora.",
              },
              {
                title: "Transparencia",
                desc: "Visualiza aportes, turnos y pagos en tiempo real.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl shadow transition"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid var(--color-muted)",
                }}
              >
                <h4
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {benefit.title}
                </h4>
                <p style={{ color: "var(--color-muted)" }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: "#fff" }}>
        <h3
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-text)" }}
        >
          ¿Listo para comenzar?
        </h3>
        <p className="mb-8" style={{ color: "var(--color-muted)" }}>
          Crea tu cuenta y empieza tu primer pasanaku hoy mismo.
        </p>
        <button
          className="px-8 py-3 rounded-full font-medium transition"
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
          onClick={() => navigate("/registro")}
        >
          Registrarme
        </button>
      </section>

      {/* Footer */}
      <footer
        id="contacto"
        className="py-8"
        style={{
          backgroundColor: "var(--color-text)",
          color: "var(--color-bg)",
        }}
      >
        <div className="container mx-auto text-center">
          <p className="mb-2">
            © {new Date().getFullYear()} Pasanaku. Todos los derechos
            reservados.
          </p>
          <div className="space-x-4">
            {["Facebook", "Instagram", "Contacto"].map((link, i) => (
              <a
                key={i}
                href="#"
                className="hover:underline"
                style={{ color: "var(--color-accent)" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
