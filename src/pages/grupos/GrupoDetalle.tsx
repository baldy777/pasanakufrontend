import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Miembro {
  id: number;
  nombre: string;
  aporte: string;
  turno: number;
}

const miembrosMock: Miembro[] = [
  { id: 1, nombre: "Carlos Pérez", aporte: "$50", turno: 1 },
  { id: 2, nombre: "Ana Gómez", aporte: "$50", turno: 2 },
  { id: 3, nombre: "Luis Sánchez", aporte: "$50", turno: 3 },
];

const GrupoDetalle: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const grupoNombre = `Grupo #${id}`;
  const frecuencia = "Mensual";

  return (
    <div className="p-6 bg-[var(--color-bg)] min-h-screen text-[var(--color-text)]">
      {/* Botón Volver */}
      <button
        className="
          mb-6 flex items-center gap-2 text-[var(--color-primary)] font-medium 
          hover:text-[var(--color-secondary)] transition
        "
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      {/* Encabezado */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 mb-6 border border-[var(--color-muted)]">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          {grupoNombre}
        </h1>
        <p className="text-[var(--color-muted)] text-lg">
          Frecuencia: <span className="font-medium text-[var(--color-text)]">{frecuencia}</span>
        </p>
      </div>

      {/* Sección Miembros */}
      <h2 className="text-2xl font-semibold mb-3 text-[var(--color-primary)]">
        Miembros
      </h2>
      <div className="space-y-3 mb-8">
        {miembrosMock.map((miembro) => (
          <div
            key={miembro.id}
            className="
              bg-white/70 backdrop-blur-sm border border-[var(--color-muted)] 
              rounded-xl shadow-sm p-4 flex justify-between items-center
              hover:shadow-md hover:border-[var(--color-primary)] transition-all duration-300
            "
          >
            <span className="font-medium">{miembro.nombre}</span>
            <span className="text-[var(--color-primary)] font-semibold">{miembro.aporte}</span>
            <span className="text-[var(--color-muted)]">Turno {miembro.turno}</span>
          </div>
        ))}
      </div>

      {/* Próximos turnos */}
      <h2 className="text-2xl font-semibold mb-3 text-[var(--color-primary)]">
        Próximos turnos
      </h2>
      <ul className="list-disc pl-6 text-[var(--color-text)] space-y-1">
        {miembrosMock.map((miembro) => (
          <li key={miembro.id}>
            <span className="font-medium">{miembro.nombre}</span> → Turno{" "}
            {miembro.turno}{" "}
            <span className="text-[var(--color-muted)]">
              (Aporte: {miembro.aporte})
            </span>
          </li>
        ))}
      </ul>

      {/* Botón Pagar */}
      <div className="mt-8 flex justify-center">
        <button
          className="
            bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg 
            font-semibold shadow-md hover:bg-[var(--color-secondary)] 
            transition-all duration-300
          "
          onClick={() => alert('Función de pagar aporte aún no implementada')}
        >
          💰 Pagar aporte
        </button>
      </div>
    </div>
  );
};

export default GrupoDetalle;
