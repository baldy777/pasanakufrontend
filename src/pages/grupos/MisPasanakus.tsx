import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Grupo {
  id: number;
  nombre: string;
  aporte: string;
  frecuencia: string;
}

const gruposMock: Grupo[] = [
  { id: 1, nombre: "Amigos del cole", aporte: "$50", frecuencia: "Mensual" },
  { id: 2, nombre: "Trabajo", aporte: "$100", frecuencia: "Quincenal" },
  { id: 3, nombre: "Familia", aporte: "$30", frecuencia: "Mensual" },
];

const MisPasanakus: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-[var(--color-text)] bg-[var(--color-bg)] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">
        Mis Pasanakus
      </h1>

      {gruposMock.length === 0 ? (
        <p className="text-[var(--color-muted)] text-lg">
          No tienes grupos aún. Crea uno para comenzar.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gruposMock.map((grupo) => (
            <div
              key={grupo.id}
              className="
                border border-[var(--color-muted)] rounded-2xl p-5 shadow-sm 
                hover:shadow-md hover:border-[var(--color-primary)] 
                hover:-translate-y-1 transition-all duration-300 cursor-pointer
                bg-white/70 backdrop-blur-sm
              "
              onClick={() => navigate(`/app/grupos/${grupo.id}`)}
            >
              <h2 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">
                {grupo.nombre}
              </h2>

              <div className="space-y-1 text-[var(--color-text)]">
                <p>
                  <span className="font-medium text-[var(--color-muted)]">
                    Aporte:
                  </span>{" "}
                  {grupo.aporte}
                </p>
                <p>
                  <span className="font-medium text-[var(--color-muted)]">
                    Frecuencia:
                  </span>{" "}
                  {grupo.frecuencia}
                </p>
              </div>

              <button
                className="
                  mt-5 w-full bg-[var(--color-primary)] text-white 
                  font-medium px-4 py-2 rounded-lg
                  hover:bg-[var(--color-secondary)] transition
                "
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/app/grupos/${grupo.id}`);
                }}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPasanakus;
