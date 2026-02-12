export default function ConfiguracoesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Configurações Financeiras
        </h1>
        <p className="mt-1 text-erp-muted">
          Contas bancárias, categorias, formas de pagamento e integrações
        </p>
      </div>

      <div className="space-y-4">
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold text-erp-light">Contas bancárias</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Gerencie contas correntes, caixa e aplicações
          </p>
          <button className="mt-4 text-sm text-erp-light hover:text-erp-light">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold text-erp-light">Categorias de receitas e despesas</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Classificação de lançamentos financeiros
          </p>
          <button className="mt-4 text-sm text-erp-light hover:text-erp-light">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold text-erp-light">Formas de pagamento</h3>
          <p className="mt-1 text-sm text-erp-muted">
            PIX, boleto, transferência, cartão, dinheiro
          </p>
          <button className="mt-4 text-sm text-erp-light hover:text-erp-light">
            Configurar →
          </button>
        </div>
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold text-erp-light">Integração bancária</h3>
          <p className="mt-1 text-sm text-erp-muted">
            Importação automática de extratos
          </p>
          <button className="mt-4 text-sm text-erp-light hover:text-erp-light">
            Configurar →
          </button>
        </div>
      </div>
    </div>
  );
}
