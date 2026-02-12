export default function RelatoriosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Relatórios Financeiros
        </h1>
        <p className="mt-1 text-erp-muted">
          DRE, balanço, fluxo de caixa e análises gerenciais
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">DRE</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Demonstração do Resultado do Exercício
          </p>
          <p className="mt-4 text-xs text-erp-muted">Receitas, despesas e resultado</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">Balanço Patrimonial</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Ativo, passivo e patrimônio líquido
          </p>
          <p className="mt-4 text-xs text-erp-muted">Posição em uma data</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">Fluxo de Caixa (DFC)</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Demonstrativo dos fluxos de caixa
          </p>
          <p className="mt-4 text-xs text-erp-muted">Operacional, investimento, financiamento</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">Contas a Pagar</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Relatório por fornecedor e vencimento
          </p>
          <p className="mt-4 text-xs text-erp-muted">Análise de despesas</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">Contas a Receber</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Inadimplência e aging
          </p>
          <p className="mt-4 text-xs text-erp-muted">Análise de recebimentos</p>
        </a>
        <a
          href="#"
          className="glass-card group block rounded-lg p-6 transition-colors hover:border-erp-gray"
        >
          <h3 className="font-semibold text-erp-light">Centro de Custos</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Despesas por centro de custo
          </p>
          <p className="mt-4 text-xs text-erp-muted">Comparativo e evolução</p>
        </a>
      </div>
    </div>
  );
}
