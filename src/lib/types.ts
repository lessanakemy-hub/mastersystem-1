export type Moeda = "BRL" | "USD" | "EUR";

export type StatusPagar = "pendente" | "pago" | "vencido" | "agendado";
export type StatusReceber = "a_receber" | "recebido" | "em_atraso";

export type TipoOperacao = "importacao" | "exportacao" | "nacional";

export interface ContaPagar {
  id: string;
  descricao: string;
  fornecedor: string;
  vencimento: string;
  valor: number;
  moeda: Moeda;
  status: StatusPagar;
  tipo: TipoOperacao;
  nrOperacao?: string;
}

export interface ContaReceber {
  id: string;
  cliente: string;
  descricao: string;
  vencimento: string;
  valor: number;
  moeda: Moeda;
  status: StatusReceber;
  tipo: TipoOperacao;
  nrOperacao?: string;
}

export interface OperacaoComex {
  id: string;
  numero: string;
  tipo: TipoOperacao;
  descricao: string;
  valorOriginal: number;
  moeda: Moeda;
  valorBRL: number;
  cotacao: number;
  dataOperacao: string;
  status: "em_andamento" | "liquidado" | "cancelado";
  incoterm?: string;
}

export interface CotacaoCambio {
  moeda: Moeda;
  compra: number;
  venda: number;
  data: string;
}

export interface LancamentoFluxo {
  id: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  moeda: Moeda;
  categoria: string;
}
