export default function PlanoDeContasPage() {
  return (
    <div className="space-y-8">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Plano de Contas</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Categorias, centros de custo e estrutura contábil
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="search"
            placeholder="Buscar conta..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-300 focus:bg-white focus:ring-1 focus:ring-slate-200"
          />
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            + Nova conta
          </button>
        </div>

        <div className="glass-card overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Código
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Conta
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Centro de custo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-mono text-sm text-slate-900">1</td>
                  <td className="px-6 py-4 text-slate-900">Ativo</td>
                  <td className="px-6 py-4 text-slate-500">Grupo</td>
                  <td className="px-6 py-4 text-center text-slate-400">—</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="pl-10 px-6 py-4 font-mono text-sm text-slate-900">1.1</td>
                  <td className="px-6 py-4 text-slate-900">Ativo Circulante</td>
                  <td className="px-6 py-4 text-slate-500">Subgrupo</td>
                  <td className="px-6 py-4 text-center text-slate-400">—</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="pl-14 px-6 py-4 font-mono text-sm text-slate-900">1.1.01</td>
                  <td className="px-6 py-4 text-slate-900">Caixa</td>
                  <td className="px-6 py-4 text-slate-900">Conta</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      Administrativo
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="pl-14 px-6 py-4 font-mono text-sm text-slate-900">1.1.02</td>
                  <td className="px-6 py-4 text-slate-900">Bancos</td>
                  <td className="px-6 py-4 text-slate-900">Conta</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      —
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-slate-900">3</td>
                  <td className="px-6 py-4 text-slate-900">Despesas</td>
                  <td className="px-6 py-4 text-slate-500">Grupo</td>
                  <td className="px-6 py-4 text-center text-slate-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
