"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda, formatData } from "@/lib/format";
import type { ContaPagar, Moeda, TipoOperacao } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ContasAPagarPage() {
  const { contasPagar, addContaPagar, updateContaPagar, ptaxUSD } =
    useFinanceStore();
  const [filtro, setFiltro] = useState<string>("todas");
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<ContaPagar>>({
    descricao: "",
    fornecedor: "",
    vencimento: new Date().toISOString().slice(0, 10),
    valor: 0,
    moeda: "BRL",
    status: "pendente",
    tipo: "nacional",
  });

  const filtered = contasPagar.filter((c) => {
    if (filtro !== "todas" && c.status !== filtro) return false;
    const termo = busca.toLowerCase();
    return (
      !termo ||
      c.descricao.toLowerCase().includes(termo) ||
      c.fornecedor.toLowerCase().includes(termo)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.descricao || !form.fornecedor || !form.vencimento || !form.valor)
      return;
    addContaPagar({
      descricao: form.descricao,
      fornecedor: form.fornecedor,
      vencimento: form.vencimento,
      valor: form.valor,
      moeda: form.moeda ?? "BRL",
      status: form.status ?? "pendente",
      tipo: form.tipo ?? "nacional",
      nrOperacao: form.nrOperacao,
    });
    setForm({
      descricao: "",
      fornecedor: "",
      vencimento: new Date().toISOString().slice(0, 10),
      valor: 0,
      moeda: "BRL",
      status: "pendente",
      tipo: "nacional",
    });
    setShowForm(false);
  };

  const valorEmBRL = (c: ContaPagar) =>
    c.moeda === "BRL" ? c.valor : c.valor * ptaxUSD;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Contas a Pagar · Comex
        </h1>
        <p className="mt-1 text-erp-muted">
          Fornecedores, II, frete internacional e despesas
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {(["todas", "pendente", "pago", "vencido", "agendado"] as const).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setFiltro(s)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium",
                      filtro === s
                        ? "border border-erp-dark bg-erp-gray text-erp-light"
                        : "text-erp-muted hover:bg-white/5 hover:text-erp-light"
                    )}
                  >
                    {s === "todas" ? "Todas" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                )
              )}
            </div>
            <input
              type="search"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light placeholder-erp-muted outline-none focus:border-erp-light w-48"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-erp-gray"
          >
            {showForm ? "Cancelar" : "+ Nova conta"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-4 rounded-lg p-6"
          >
            <h3 className="font-semibold text-erp-light">Nova conta a pagar</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Descrição</label>
                <input
                  required
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Fornecedor</label>
                <input
                  required
                  value={form.fornecedor}
                  onChange={(e) => setForm({ ...form, fornecedor: e.target.value })}
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Vencimento</label>
                <input
                  type="date"
                  required
                  value={form.vencimento}
                  onChange={(e) => setForm({ ...form, vencimento: e.target.value })}
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.valor || ""}
                  onChange={(e) =>
                    setForm({ ...form, valor: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Moeda</label>
                <select
                  value={form.moeda}
                  onChange={(e) =>
                    setForm({ ...form, moeda: e.target.value as Moeda })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                >
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) =>
                    setForm({ ...form, tipo: e.target.value as TipoOperacao })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                >
                  <option value="nacional">Nacional</option>
                  <option value="importacao">Importação</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-erp-gray"
            >
              Salvar
            </button>
          </form>
        )}

        <div className="glass-card overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-erp-dark">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Descrição
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Fornecedor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Vencimento
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-white/5">
                    <td className="px-6 py-4 text-erp-light">{c.descricao}</td>
                    <td className="px-6 py-4 text-erp-light">{c.fornecedor}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs",
                          c.tipo === "importacao"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-erp-gray text-erp-muted"
                        )}
                      >
                        {c.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-erp-light">
                      {formatData(c.vencimento)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-erp-light">
                        {formatMoeda(c.valor, c.moeda)}
                      </span>
                      {c.moeda !== "BRL" && (
                        <span className="ml-1 text-xs text-erp-muted">
                          ≈ {formatMoeda(valorEmBRL(c), "BRL")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          c.status === "vencido" && "bg-erp-black text-erp-light",
                          c.status === "pendente" && "bg-erp-gray text-erp-light",
                          c.status === "pago" && "bg-erp-dark text-erp-light",
                          c.status === "agendado" && "bg-erp-gray text-erp-muted"
                        )}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.status === "pendente" && (
                        <button
                          onClick={() =>
                            updateContaPagar(c.id, { status: "pago" })
                          }
                          className="text-sm text-erp-light hover:text-erp-light"
                        >
                          Marcar pago
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
