import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const HomeDashboard: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, Carlos</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Grupos activos</p>
          <p className="text-2xl font-semibold">3</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Próximo aporte</p>
          <p className="text-2xl font-semibold">$50 - 10 Nov</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total aportado</p>
          <p className="text-2xl font-semibold">$230</p>
        </div>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/app/mis-grupos")}
      >
        Ver mis grupos
      </button>
    </div>
  );
};

export default HomeDashboard;
