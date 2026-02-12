"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda, formatData } from "@/lib/format";
import type { ContaReceber, Moeda, TipoOperacao } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ContasAReceberPage() {
  const { contasReceber, addContaReceber, updateContaReceber, ptaxUSD } =
    useFinanceStore();
  const [filtro, setFiltro] = useState<string>("todas");
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<ContaReceber>>({
    cliente: "",
    descricao: "",
    vencimento: new Date().toISOString().slice(0, 10),
    valor: 0,
    moeda: "BRL",
    status: "a_receber",
    tipo: "nacional",
  });

  const filtered = contasReceber.filter((c) => {
    if (filtro !== "todas" && c.status !== filtro) return false;
    const termo = busca.toLowerCase();
    return (
      !termo ||
      c.cliente.toLowerCase().includes(termo) ||
      c.descricao.toLowerCase().includes(termo)
    );
  });

  const aReceber = contasReceber.filter((c) =>
    ["a_receber", "em_atraso"].includes(c.status)
  );
  const recebido = contasReceber.filter((c) => c.status === "recebido");
  const emAtraso = contasReceber.filter((c) => c.status === "em_atraso");

  const total = (list: ContaReceber[]) =>
    list.reduce(
      (s, c) => s + (c.moeda === "BRL" ? c.valor : c.valor * ptaxUSD),
      0
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cliente || !form.descricao || !form.vencimento || !form.valor)
      return;
    addContaReceber({
      cliente: form.cliente,
      descricao: form.descricao,
      vencimento: form.vencimento,
      valor: form.valor,
      moeda: form.moeda ?? "BRL",
      status: form.status ?? "a_receber",
      tipo: form.tipo ?? "nacional",
      nrOperacao: form.nrOperacao,
    });
    setForm({
      cliente: "",
      descricao: "",
      vencimento: new Date().toISOString().slice(0, 10),
      valor: 0,
      moeda: "BRL",
      status: "a_receber",
      tipo: "nacional",
    });
    setShowForm(false);
  };

  const valorEmBRL = (c: ContaReceber) =>
    c.moeda === "BRL" ? c.valor : c.valor * ptaxUSD;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Contas a Receber · Comex
        </h1>
        <p className="mt-1 text-erp-muted">
          Exportação, vendas nacionais e inadimplência
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">A receber (30 dias)</p>
          <p className="mt-1 text-xl font-bold text-erp-light">
            {formatMoeda(total(aReceber), "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">Em atraso</p>
          <p className="mt-1 text-xl font-bold text-rose-400">
            {formatMoeda(total(emAtraso), "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">Recebido este mês</p>
          <p className="mt-1 text-xl font-bold text-erp-light">
            {formatMoeda(total(recebido), "BRL")}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {(["todas", "a_receber", "recebido", "em_atraso"] as const).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setFiltro(s)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium",
                      filtro === s
                        ? "border border-erp-dark bg-erp-gray text-erp-light"
                        : "text-erp-muted hover:bg-erp-dark hover:text-erp-light"
                    )}
                  >
                    {s === "todas"
                      ? "Todas"
                      : s === "a_receber"
                        ? "A receber"
                        : s === "em_atraso"
                          ? "Em atraso"
                          : "Recebidas"}
                  </button>
                )
              )}
            </div>
            <input
              type="search"
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-48 rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light placeholder-erp-muted outline-none focus:border-erp-light"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-white/10"
          >
            {showForm ? "Cancelar" : "+ Nova receita"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-4 rounded-lg p-6"
          >
            <h3 className="font-semibold text-erp-light">
              Nova conta a receber
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Cliente
                </label>
                <input
                  required
                  value={form.cliente}
                  onChange={(e) =>
                    setForm({ ...form, cliente: e.target.value })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Descrição / NF
                </label>
                <input
                  required
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Vencimento
                </label>
                <input
                  type="date"
                  required
                  value={form.vencimento}
                  onChange={(e) =>
                    setForm({ ...form, vencimento: e.target.value })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Valor
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.valor || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      valor: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Moeda
                </label>
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
                <label className="mb-1 block text-xs text-erp-muted">
                  Tipo
                </label>
                <select
                  value={form.tipo}
                  onChange={(e) =>
                    setForm({ ...form, tipo: e.target.value as TipoOperacao })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                >
                  <option value="nacional">Nacional</option>
                  <option value="exportacao">Exportação</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-white/10"
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
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Descrição
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
                    <td className="px-6 py-4 text-erp-light">{c.cliente}</td>
                    <td className="px-6 py-4 text-erp-light">{c.descricao}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs",
                          c.tipo === "exportacao"
                            ? "bg-erp-gray text-erp-light"
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
                          c.status === "em_atraso" &&
"bg-erp-black text-erp-light",
                            c.status === "a_receber" &&
                            "bg-erp-gray text-erp-light",
                          c.status === "recebido" &&
                            "bg-erp-dark text-erp-light"
                        )}
                      >
                        {c.status === "a_receber"
                          ? "A receber"
                          : c.status === "em_atraso"
                            ? "Em atraso"
                            : "Recebido"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.status === "a_receber" && (
                        <button
                          onClick={() =>
                            updateContaReceber(c.id, { status: "recebido" })
                          }
                          className="text-sm text-erp-light hover:text-erp-light"
                        >
                          Marcar recebido
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
