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
      <div className="pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Contas a Pagar · Comex
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
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
                      "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      filtro === s
                        ? "border border-slate-300 bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
              className="w-48 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-300 focus:bg-white focus:ring-1 focus:ring-slate-200"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            {showForm ? "Cancelar" : "+ Nova conta"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-5 rounded-xl p-6"
          >
            <h3 className="text-base font-semibold text-slate-900">Nova conta a pagar</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Descrição</label>
                <input
                  required
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Fornecedor</label>
                <input
                  required
                  value={form.fornecedor}
                  onChange={(e) => setForm({ ...form, fornecedor: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Vencimento</label>
                <input
                  type="date"
                  required
                  value={form.vencimento}
                  onChange={(e) => setForm({ ...form, vencimento: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.valor || ""}
                  onChange={(e) =>
                    setForm({ ...form, valor: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Moeda</label>
                <select
                  value={form.moeda}
                  onChange={(e) =>
                    setForm({ ...form, moeda: e.target.value as Moeda })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                >
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) =>
                    setForm({ ...form, tipo: e.target.value as TipoOperacao })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-slate-300 focus:ring-1 focus:ring-slate-200"
                >
                  <option value="nacional">Nacional</option>
                  <option value="importacao">Importação</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Salvar
            </button>
          </form>
        )}

        <div className="glass-card overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Descrição
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Fornecedor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Vencimento
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100">
                    <td className="px-6 py-4 text-slate-900">{c.descricao}</td>
                    <td className="px-6 py-4 text-slate-900">{c.fornecedor}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs font-medium",
                          c.tipo === "importacao"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {c.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {formatData(c.vencimento)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-medium tabular-nums text-slate-900">
                        {formatMoeda(c.valor, c.moeda)}
                      </span>
                      {c.moeda !== "BRL" && (
                        <span className="ml-1 text-xs text-slate-500">
                          ≈ {formatMoeda(valorEmBRL(c), "BRL")}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium",
                          c.status === "vencido" && "bg-rose-100 text-rose-800",
                          c.status === "pendente" && "bg-amber-100 text-amber-800",
                          c.status === "pago" && "bg-emerald-100 text-emerald-800",
                          c.status === "agendado" && "bg-slate-100 text-slate-600"
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
                          className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
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
