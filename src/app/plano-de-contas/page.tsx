export default function PlanoDeContasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">Plano de Contas</h1>
        <p className="mt-1 text-erp-muted">
          Categorias, centros de custo e estrutura contábil
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between">
          <input
            type="search"
            placeholder="Buscar conta..."
            className="rounded-lg border border-white/10 bg-erp-gray px-4 py-2 text-erp-light placeholder-erp-muted outline-none focus:border-white/20 w-64"
          />
          <button className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-erp-gray">
            + Nova conta
          </button>
        </div>

        <div className="glass-card overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Código
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Conta
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Centro de custo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-erp-dark">
                  <td className="px-6 py-4 font-mono text-sm text-erp-light">1</td>
                  <td className="px-6 py-4 text-erp-light">Ativo</td>
                  <td className="px-6 py-4 text-erp-muted">Grupo</td>
                  <td className="px-6 py-4 text-center text-erp-muted">—</td>
                </tr>
                <tr className="border-b border-erp-dark">
                  <td className="px-6 py-4 font-mono text-sm text-erp-light pl-10">1.1</td>
                  <td className="px-6 py-4 text-erp-light">Ativo Circulante</td>
                  <td className="px-6 py-4 text-erp-muted">Subgrupo</td>
                  <td className="px-6 py-4 text-center text-erp-muted">—</td>
                </tr>
                <tr className="border-b border-erp-dark">
                  <td className="px-6 py-4 font-mono text-sm text-erp-light pl-14">1.1.01</td>
                  <td className="px-6 py-4 text-erp-light">Caixa</td>
                  <td className="px-6 py-4 text-erp-light">Conta</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded bg-erp-gray px-2 py-1 text-xs text-erp-muted">
                      Administrativo
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-erp-dark">
                  <td className="px-6 py-4 font-mono text-sm text-erp-light pl-14">1.1.02</td>
                  <td className="px-6 py-4 text-erp-light">Bancos</td>
                  <td className="px-6 py-4 text-erp-light">Conta</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded bg-erp-gray px-2 py-1 text-xs text-erp-muted">
                      —
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-erp-light">3</td>
                  <td className="px-6 py-4 text-erp-light">Despesas</td>
                  <td className="px-6 py-4 text-erp-muted">Grupo</td>
                  <td className="px-6 py-4 text-center text-erp-muted">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
