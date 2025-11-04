// src/pages/LandingPage.tsx
// src/pages/LandingPage.tsx
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">Pasanaku</h1>
          <div className="space-x-6">
            <a
              href="#como-funciona"
              className="text-gray-700 hover:text-blue-600"
            >
              Cómo funciona
            </a>
            <a href="#beneficios" className="text-gray-700 hover:text-blue-600">
              Beneficios
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-blue-600">
              Contacto
            </a>
          </div>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-blue-50 to-white px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Organiza tu Pasanaku fácil y sin complicaciones
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Gestiona tus grupos, aportes y turnos de manera digital y segura, sin
          perder el espíritu de confianza entre amigos.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          type="button"
          onClick={() => navigate("/login")}
        >
          Comenzar ahora
        </button>
      </section>

      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">¿Cómo funciona?</h3>
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
                className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {step.title}
                </h4>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Beneficios</h3>
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
                className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h3>
        <p className="text-gray-600 mb-8">
          Crea tu cuenta y empieza tu primer pasanaku hoy mismo.
        </p>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
          type="button"
          onClick={() => navigate("/registro")}
        >
          Registrarme
        </button>
      </section>

      <footer id="contacto" className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">
            © {new Date().getFullYear()} Pasanaku. Todos los derechos
            reservados.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
