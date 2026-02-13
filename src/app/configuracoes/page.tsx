export default function ConfiguracoesPage() {
  return (
    <div className="space-y-8">
      <div className="pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Configurações Financeiras
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Contas bancárias, categorias, formas de pagamento e integrações
        </p>
      </div>

      <div className="space-y-4">
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-slate-900">Contas bancárias</h3>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie contas correntes, caixa e aplicações
          </p>
          <button className="mt-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-slate-900">Categorias de receitas e despesas</h3>
          <p className="mt-1 text-sm text-slate-500">
            Classificação de lançamentos financeiros
          </p>
          <button className="mt-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-slate-900">Formas de pagamento</h3>
          <p className="mt-1 text-sm text-slate-500">
            PIX, boleto, transferência, cartão, dinheiro
          </p>
          <button className="mt-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-slate-900">Integração bancária</h3>
          <p className="mt-1 text-sm text-slate-500">
            Importação automática de extratos
          </p>
          <button className="mt-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Configurar →
          </button>
        </div>
      </div>
    </div>
  );
}
