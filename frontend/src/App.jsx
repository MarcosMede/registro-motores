import { useEffect, useState } from 'react';
import { CalendarDays, Search } from 'lucide-react';
import DashboardCards from './components/DashboardCards';
import MotorForm, { initialForm } from './components/MotorForm';
import MotorTable from './components/MotorTable';
import { createMotor, deleteMotor, listMotores, updateMotor } from './services/motoresService';

const structuredFields = [
  { key: 'data', label: 'Data' },
  { key: 'rpm', label: 'RPM' },
  { key: 'ligacao', label: 'Ligacao' },
  { key: 'comprimento', label: 'Comprimento' },
  { key: 'diametro', label: 'Diametro' },
  { key: 'principal', label: 'Principal (passo/esp/fio)' },
  { key: 'auxiliar', label: 'Auxiliar (passo/esp/fio)' },
  { key: 'polaridade', label: 'Polaridade' }
];

function toApiPayload(formData) {
  const filled = (value) => {
    const text = String(value || '').trim();
    return text || 'Nao informado';
  };

  const observacoes = structuredFields
    .map(({ key, label }) => `${label}: ${String(formData[key] || '').trim()}`)
    .join('\n');

  return {
    numero_motor: filled(formData.motor_fabricante),
    modelo: filled(formData.modelo),
    potencia: filled(formData.hp_cv),
    tensao: filled(formData.vac),
    corrente: filled(formData.amp),
    responsavel: 'Nao informado',
    observacoes
  };
}

function parseStructuredObservacoes(observacoes) {
  const parsed = {};
  const content = String(observacoes || '');

  for (const { key, label } of structuredFields) {
    const match = content.match(new RegExp(`(?:^|\\n)${label}:\\s*(.*)`));
    parsed[key] = match ? match[1].trim() : '';
  }

  return parsed;
}

function App() {
  const today = new Date().toISOString().slice(0, 10);

  const [motores, setMotores] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [filterDate, setFilterDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalHoje, setTotalHoje] = useState(0);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  function getErrorMessage(error, fallback) {
    return error?.response?.data?.message || error?.message || fallback;
  }

  async function fetchMotores(date = filterDate) {
    setLoading(true);
    try {
      const data = await listMotores(date);
      setMotores(data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: getErrorMessage(error, 'Falha ao carregar os registros.')
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchTotalHoje() {
    try {
      const data = await listMotores(today);
      setTotalHoje(data.length);
    } catch {
      setTotalHoje(0);
    }
  }

  useEffect(() => {
    fetchMotores(today);
    fetchTotalHoje();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMotores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const payload = toApiPayload(formData);

      if (editingId) {
        await updateMotor(editingId, payload);
        setMessage({ type: 'success', text: 'Registro atualizado com sucesso.' });
      } else {
        await createMotor(payload);
        setMessage({ type: 'success', text: 'Motor cadastrado com sucesso.' });
      }

      setFormData(initialForm);
      setEditingId(null);
      fetchMotores();
      fetchTotalHoje();
    } catch (error) {
      setMessage({
        type: 'error',
        text: getErrorMessage(error, 'Nao foi possivel salvar o registro.')
      });
    }
  }

  function handleEdit(motor) {
    const parsed = parseStructuredObservacoes(motor.observacoes);

    setEditingId(motor.id);
    setFormData({
      data: parsed.data,
      motor_fabricante: motor.numero_motor || '',
      modelo: motor.modelo || '',
      hp_cv: motor.potencia || '',
      rpm: parsed.rpm,
      ligacao: parsed.ligacao,
      vac: motor.tensao || '',
      amp: motor.corrente || '',
      comprimento: parsed.comprimento,
      diametro: parsed.diametro,
      principal: parsed.principal,
      auxiliar: parsed.auxiliar,
      polaridade: parsed.polaridade
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) return;

    try {
      await deleteMotor(id);
      setMessage({ type: 'success', text: 'Registro excluido com sucesso.' });
      fetchMotores();
      fetchTotalHoje();
    } catch (error) {
      setMessage({
        type: 'error',
        text: getErrorMessage(error, 'Erro ao excluir registro.')
      });
    }
  }

  const filteredMotores = motores.filter((motor) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const searchable = [
      motor.numero_motor,
      motor.modelo,
      motor.potencia,
      motor.tensao,
      motor.corrente,
      motor.responsavel,
      motor.observacoes
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchable.includes(term);
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard de Registro de Motores</h1>
        <p className="mt-1 text-slate-600">Controle diario de motores industriais com MySQL.</p>
      </header>

      <DashboardCards
        totalHoje={totalHoje}
        onNovoRegistro={() => {
          setEditingId(null);
          setFormData(initialForm);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr,2fr]">
        <MotorForm
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingId(null);
            setFormData(initialForm);
          }}
        />

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/95 p-4 shadow-md ring-1 ring-slate-200">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Filtrar por data
                </span>
                <input
                  id="filterDate"
                  name="filterDate"
                  type="date"
                  value={filterDate}
                  onChange={(event) => setFilterDate(event.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Search size={16} />
                  Buscar motores cadastrados
                </span>
                <input
                  id="searchTerm"
                  name="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Ex.: WEG, 220, 5HP, polaridade"
                  className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
              </label>
            </div>
          </div>

          {message && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
                  : 'bg-red-100 text-red-800 ring-1 ring-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl bg-white/95 p-6 text-slate-500 shadow-md ring-1 ring-slate-200">
              Carregando registros...
            </div>
          ) : (
            <MotorTable motores={filteredMotores} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
