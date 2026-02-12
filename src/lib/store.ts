import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ContaPagar,
  ContaReceber,
  OperacaoComex,
  CotacaoCambio,
  LancamentoFluxo,
} from "./types";

const contasPagarInicial: ContaPagar[] = [
  {
    id: "1",
    descricao: "Pagamento matéria-prima - DI 12345",
    fornecedor: "Steel Corp USA",
    vencimento: "2025-02-15",
    valor: 48500,
    moeda: "USD",
    status: "pendente",
    tipo: "importacao",
    nrOperacao: "IMP-2025-001",
  },
  {
    id: "2",
    descricao: "Frete internacional",
    fornecedor: "Maersk Logistics",
    vencimento: "2025-02-20",
    valor: 12500,
    moeda: "USD",
    status: "pendente",
    tipo: "importacao",
  },
  {
    id: "3",
    descricao: "Aluguel comercial",
    fornecedor: "Imobiliária XYZ",
    vencimento: "2025-02-15",
    valor: 4200,
    moeda: "BRL",
    status: "pendente",
    tipo: "nacional",
  },
  {
    id: "4",
    descricao: "II e impostos - DI 12345",
    fornecedor: "Receita Federal",
    vencimento: "2025-02-18",
    valor: 28900,
    moeda: "BRL",
    status: "vencido",
    tipo: "importacao",
  },
  {
    id: "5",
    descricao: "Energia elétrica",
    fornecedor: "CPFL",
    vencimento: "2025-02-25",
    valor: 1850,
    moeda: "BRL",
    status: "agendado",
    tipo: "nacional",
  },
];

const contasReceberInicial: ContaReceber[] = [
  {
    id: "1",
    cliente: "Trading Co Europe",
    descricao: "NF Exportação 001234 - FOB Santos",
    vencimento: "2025-02-18",
    valor: 62400,
    moeda: "USD",
    status: "a_receber",
    tipo: "exportacao",
    nrOperacao: "EXP-2025-002",
  },
  {
    id: "2",
    cliente: "Distribuidora Norte",
    descricao: "NF 001230",
    vencimento: "2025-02-05",
    valor: 32000,
    moeda: "BRL",
    status: "em_atraso",
    tipo: "nacional",
  },
  {
    id: "3",
    cliente: "Importadora Sul",
    descricao: "NF 001231",
    vencimento: "2025-02-28",
    valor: 48500,
    moeda: "BRL",
    status: "a_receber",
    tipo: "nacional",
  },
];

const operacoesInicial: OperacaoComex[] = [
  {
    id: "1",
    numero: "IMP-2025-001",
    tipo: "importacao",
    descricao: "Importação aço carbono - China",
    valorOriginal: 48500,
    moeda: "USD",
    valorBRL: 283455,
    cotacao: 5.845,
    dataOperacao: "2025-02-01",
    status: "em_andamento",
    incoterm: "CIF Santos",
  },
  {
    id: "2",
    numero: "EXP-2025-002",
    tipo: "exportacao",
    descricao: "Exportação celulose - Europa",
    valorOriginal: 62400,
    moeda: "USD",
    valorBRL: 364728,
    cotacao: 5.845,
    dataOperacao: "2025-02-05",
    status: "em_andamento",
    incoterm: "FOB Santos",
  },
];

const cotacoesInicial: CotacaoCambio[] = [
  { moeda: "USD", compra: 5.847, venda: 5.865, data: "2025-02-12" },
  { moeda: "EUR", compra: 6.312, venda: 6.335, data: "2025-02-12" },
];

const lancamentosInicial: LancamentoFluxo[] = [
  { id: "1", data: "2025-02-01", descricao: "Recebimento exportação", valor: 364728, tipo: "entrada", moeda: "BRL", categoria: "Exportação" },
  { id: "2", data: "2025-02-05", descricao: "Pagamento frete importação", valor: 73063, tipo: "saida", moeda: "BRL", categoria: "Importação" },
  { id: "3", data: "2025-02-10", descricao: "Recebimento cliente nacional", valor: 32000, tipo: "entrada", moeda: "BRL", categoria: "Vendas" },
];

interface FinanceStore {
  contasPagar: ContaPagar[];
  contasReceber: ContaReceber[];
  operacoesComex: OperacaoComex[];
  cotacoes: CotacaoCambio[];
  lancamentos: LancamentoFluxo[];
  ptaxUSD: number;

  addContaPagar: (conta: Omit<ContaPagar, "id">) => void;
  updateContaPagar: (id: string, conta: Partial<ContaPagar>) => void;
  removeContaPagar: (id: string) => void;

  addContaReceber: (conta: Omit<ContaReceber, "id">) => void;
  updateContaReceber: (id: string, conta: Partial<ContaReceber>) => void;
  removeContaReceber: (id: string) => void;

  addOperacao: (op: Omit<OperacaoComex, "id">) => void;
  updateOperacao: (id: string, op: Partial<OperacaoComex>) => void;

  setPtaxUSD: (valor: number) => void;

  saldoInicialBancario: number;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      contasPagar: contasPagarInicial,
      contasReceber: contasReceberInicial,
      operacoesComex: operacoesInicial,
      cotacoes: cotacoesInicial,
      lancamentos: lancamentosInicial,
      ptaxUSD: 5.847,

      addContaPagar: (conta) =>
        set((s) => ({
          contasPagar: [
            ...s.contasPagar,
            { ...conta, id: crypto.randomUUID() },
          ],
        })),

      updateContaPagar: (id, conta) =>
        set((s) => ({
          contasPagar: s.contasPagar.map((c) =>
            c.id === id ? { ...c, ...conta } : c
          ),
        })),

      removeContaPagar: (id) =>
        set((s) => ({
          contasPagar: s.contasPagar.filter((c) => c.id !== id),
        })),

      addContaReceber: (conta) =>
        set((s) => ({
          contasReceber: [
            ...s.contasReceber,
            { ...conta, id: crypto.randomUUID() },
          ],
        })),

      updateContaReceber: (id, conta) =>
        set((s) => ({
          contasReceber: s.contasReceber.map((c) =>
            c.id === id ? { ...c, ...conta } : c
          ),
        })),

      removeContaReceber: (id) =>
        set((s) => ({
          contasReceber: s.contasReceber.filter((c) => c.id !== id),
        })),

      addOperacao: (op) =>
        set((s) => ({
          operacoesComex: [
            ...s.operacoesComex,
            { ...op, id: crypto.randomUUID() },
          ],
        })),

      updateOperacao: (id, op) =>
        set((s) => ({
          operacoesComex: s.operacoesComex.map((o) =>
            o.id === id ? { ...o, ...op } : o
          ),
        })),

      setPtaxUSD: (valor) => set({ ptaxUSD: valor }),

      saldoInicialBancario: 132970,
    }),
    { name: "finance-comex-store" }
  )
);
