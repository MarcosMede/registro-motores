import { Activity, PlusCircle } from 'lucide-react';

function DashboardCards({ totalHoje, onNovoRegistro }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-white/95 p-5 shadow-md ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total de motores hoje</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{totalHoje}</h2>
          </div>
          <span className="rounded-xl bg-teal-100 p-3 text-teal-700">
            <Activity size={24} />
          </span>
        </div>
      </div>

      <button
        onClick={onNovoRegistro}
        className="rounded-2xl bg-slatebrand-700 p-5 text-left text-white shadow-md transition hover:bg-slatebrand-600"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-200">Acoes rapidas</p>
            <h2 className="mt-2 text-2xl font-semibold">Novo registro</h2>
          </div>
          <PlusCircle size={28} />
        </div>
      </button>
    </div>
  );
}

export default DashboardCards;
