import { Save, XCircle } from 'lucide-react';

const initialForm = {
  data: '',
  motor_fabricante: '',
  modelo: '',
  hp_cv: '',
  rpm: '',
  ligacao: '',
  vac: '',
  amp: '',
  comprimento: '',
  diametro: '',
  principal: '',
  auxiliar: '',
  polaridade: ''
};

function MotorForm({ formData, setFormData, onSubmit, editingId, onCancel }) {
  const isEditing = Boolean(editingId);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setFormData(initialForm);
    if (isEditing) onCancel();
  }

  const campos = [
    { name: 'data', label: 'Data (ex: 13/02/2026)' },
    { name: 'motor_fabricante', label: 'Motor / Fabricante' },
    { name: 'modelo', label: 'Modelo' },
    { name: 'hp_cv', label: 'HP/CV' },
    { name: 'rpm', label: 'RPM' },
    { name: 'ligacao', label: 'Ligacao' },
    { name: 'vac', label: 'VAC' },
    { name: 'amp', label: 'AMP' },
    { name: 'comprimento', label: 'Comprimento' },
    { name: 'diametro', label: 'Diametro' },
    { name: 'principal', label: 'Principal (passo/esp/fio)' },
    { name: 'auxiliar', label: 'Auxiliar (passo/esp/fio)' },
    { name: 'polaridade', label: 'Polaridade' }
  ];

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          {isEditing ? 'Editar registro' : 'Novo Registro'}
        </h2>
      </div>

      <div className="grid gap-4">
        {campos.map((campo) => (
          <label key={campo.name} className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            {campo.label}
            <input
              type="text"
              name={campo.name}
              value={formData[campo.name]}
              onChange={handleChange}
              className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
        >
          <Save size={18} />
          {isEditing ? 'Atualizar registro' : 'Registrar Motor'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <XCircle size={18} />
          {isEditing ? 'Cancelar edicao' : 'Limpar'}
        </button>
      </div>
    </form>
  );
}

export { initialForm };
export default MotorForm;
