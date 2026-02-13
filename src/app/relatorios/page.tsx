export default function RelatoriosPage() {
  return (
    <div className="space-y-8">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Relatórios Financeiros
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          DRE, balanço, fluxo de caixa e análises gerenciais
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">DRE</h3>
          <p className="mt-1 text-sm text-slate-500">
            Demonstração do Resultado do Exercício
          </p>
          <p className="mt-4 text-xs text-slate-500">Receitas, despesas e resultado</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">Balanço Patrimonial</h3>
          <p className="mt-1 text-sm text-slate-500">
            Ativo, passivo e patrimônio líquido
          </p>
          <p className="mt-4 text-xs text-slate-500">Posição em uma data</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">Fluxo de Caixa (DFC)</h3>
          <p className="mt-1 text-sm text-slate-500">
            Demonstrativo dos fluxos de caixa
          </p>
          <p className="mt-4 text-xs text-slate-500">Operacional, investimento, financiamento</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">Contas a Pagar</h3>
          <p className="mt-1 text-sm text-slate-500">
            Relatório por fornecedor e vencimento
          </p>
          <p className="mt-4 text-xs text-slate-500">Análise de despesas</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">Contas a Receber</h3>
          <p className="mt-1 text-sm text-slate-500">
            Inadimplência e aging
          </p>
          <p className="mt-4 text-xs text-slate-500">Análise de recebimentos</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-xl p-6 transition-colors hover:border-slate-300"
        >
          <h3 className="font-semibold text-slate-900">Centro de Custos</h3>
          <p className="mt-1 text-sm text-slate-500">
            Despesas por centro de custo
          </p>
          <p className="mt-4 text-xs text-slate-500">Comparativo e evolução</p>
        </a>
      </div>
    </div>
  );
}
