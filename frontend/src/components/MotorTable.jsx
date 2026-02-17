import { Pencil, Trash2 } from 'lucide-react';

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleString('pt-BR');
}

function MotorTable({ motores, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow-md ring-1 ring-slate-200">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Registros recentes</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-3 py-2">Motor</th>
              <th className="px-3 py-2">Modelo</th>
              <th className="px-3 py-2">Potencia</th>
              <th className="px-3 py-2">Data</th>
              <th className="px-3 py-2">Responsavel</th>
              <th className="px-3 py-2">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {motores.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                  Nenhum registro encontrado para o filtro selecionado.
                </td>
              </tr>
            ) : (
              motores.map((motor) => (
                <tr key={motor.id} className="rounded-xl bg-slate-50 text-slate-700">
                  <td className="px-3 py-2 font-medium">{motor.numero_motor}</td>
                  <td className="px-3 py-2">{motor.modelo}</td>
                  <td className="px-3 py-2">{motor.potencia}</td>
                  <td className="px-3 py-2">{formatDate(motor.data_registro)}</td>
                  <td className="px-3 py-2">{motor.responsavel}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(motor)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2 py-1 text-slate-700 transition hover:bg-white"
                      >
                        <Pencil size={14} />
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(motor.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2 py-1 text-red-700 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MotorTable;
