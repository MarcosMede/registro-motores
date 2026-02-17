function AuthForm({
  mode,
  authData,
  setAuthData,
  onSubmit,
  onSwitchMode,
  loading,
  message
}) {
  const isRegister = mode === 'register';

  return (
    <section className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-slate-900">{isRegister ? 'Criar conta' : 'Entrar'}</h1>
      <p className="mt-1 text-sm text-slate-600">Acesso ao dashboard com autenticacao JWT e MySQL.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {isRegister && (
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Nome
            <input
              type="text"
              value={authData.nome}
              onChange={(event) => setAuthData((prev) => ({ ...prev, nome: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              required
            />
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={authData.email}
            onChange={(event) => setAuthData((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Senha
          <input
            type="password"
            value={authData.password}
            onChange={(event) => setAuthData((prev) => ({ ...prev, password: event.target.value }))}
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            required
          />
        </label>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Processando...' : isRegister ? 'Registrar' : 'Entrar'}
        </button>
      </form>

      <button
        className="mt-4 text-sm text-teal-700 hover:text-teal-600"
        onClick={onSwitchMode}
        type="button"
      >
        {isRegister ? 'Ja tem conta? Fazer login' : 'Nao tem conta? Criar conta'}
      </button>
    </section>
  );
}

export default AuthForm;
