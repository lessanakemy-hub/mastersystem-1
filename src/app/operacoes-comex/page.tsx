"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda, formatData } from "@/lib/format";
import type { OperacaoComex, TipoOperacao } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function OperacoesComexPage() {
  const { operacoesComex, addOperacao, cotacoes } = useFinanceStore();
  const [filtro, setFiltro] = useState<TipoOperacao | "todas">("todas");
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<OperacaoComex>>({
    numero: "",
    tipo: "importacao",
    descricao: "",
    valorOriginal: 0,
    moeda: "USD",
    cotacao: 5.845,
    dataOperacao: new Date().toISOString().slice(0, 10),
    status: "em_andamento",
    incoterm: "",
  });

  const cotacaoUSD = cotacoes.find((c) => c.moeda === "USD")?.compra ?? 5.847;

  const filtered = operacoesComex.filter((o) => {
    if (filtro !== "todas" && o.tipo !== filtro) return false;
    const termo = busca.toLowerCase();
    return (
      !termo ||
      o.numero.toLowerCase().includes(termo) ||
      o.descricao.toLowerCase().includes(termo)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.numero ||
      !form.descricao ||
      !form.valorOriginal ||
      !form.dataOperacao
    )
      return;
    const cot = form.moeda === "USD" ? cotacaoUSD : 6.31;
    addOperacao({
      numero: form.numero,
      tipo: form.tipo ?? "importacao",
      descricao: form.descricao,
      valorOriginal: form.valorOriginal,
      moeda: form.moeda ?? "USD",
      valorBRL: form.valorOriginal * cot,
      cotacao: cot,
      dataOperacao: form.dataOperacao,
      status: form.status ?? "em_andamento",
      incoterm: form.incoterm,
    });
    setForm({
      numero: "",
      tipo: "importacao",
      descricao: "",
      valorOriginal: 0,
      moeda: "USD",
      cotacao: cotacaoUSD,
      dataOperacao: new Date().toISOString().slice(0, 10),
      status: "em_andamento",
      incoterm: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Operações de Comércio Exterior
        </h1>
        <p className="mt-1 text-erp-muted">
          Importação, exportação e acompanhamento de operações
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {(["todas", "importacao", "exportacao"] as const).map((s) => (
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
                  {s === "todas" ? "Todas" : s === "importacao" ? "Importação" : "Exportação"}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Buscar por número ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-64 rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light placeholder-erp-muted outline-none focus:border-erp-light"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-white/10"
          >
            {showForm ? "Cancelar" : "+ Nova operação"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-4 rounded-lg p-6"
          >
            <h3 className="font-semibold text-erp-light">
              Nova operação Comex
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Número
                </label>
                <input
                  required
                  placeholder="IMP-2025-003"
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
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
                  <option value="importacao">Importação</option>
                  <option value="exportacao">Exportação</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-erp-muted">
                  Descrição
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
                  Valor original
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.valorOriginal || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      valorOriginal: parseFloat(e.target.value) || 0,
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
                  onChange={(e) => {
                    const m = e.target.value as "USD" | "EUR";
                    const cot = m === "USD" ? cotacaoUSD : 6.31;
                    setForm({
                      ...form,
                      moeda: m,
                      cotacao: cot,
                    });
                  }}
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Data
                </label>
                <input
                  type="date"
                  required
                  value={form.dataOperacao}
                  onChange={(e) =>
                    setForm({ ...form, dataOperacao: e.target.value })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-erp-muted">
                  Incoterm
                </label>
                <input
                  placeholder="FOB Santos, CIF..."
                  value={form.incoterm || ""}
                  onChange={(e) =>
                    setForm({ ...form, incoterm: e.target.value })
                  }
                  className="w-full rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
                />
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
                    Número
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Descrição
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Data
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                    BRL
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-erp-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-white/5">
                    <td className="px-6 py-4 font-medium text-erp-light">
                      {o.numero}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs",
                          o.tipo === "importacao"
                            ? "bg-erp-gray text-erp-light"
                            : "bg-erp-dark text-erp-light"
                        )}
                      >
                        {o.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-erp-light">{o.descricao}</td>
                    <td className="px-6 py-4 text-erp-muted">
                      {formatData(o.dataOperacao)}
                    </td>
                    <td className="px-6 py-4 text-right text-erp-light">
                      {formatMoeda(o.valorOriginal, o.moeda)}
                    </td>
                    <td className="px-6 py-4 text-right text-erp-light">
                      {formatMoeda(o.valorBRL, "BRL")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          o.status === "em_andamento" &&
                            "bg-erp-gray text-erp-light",
                          o.status === "liquidado" &&
                            "bg-erp-dark text-erp-light",
                          o.status === "cancelado" &&
                            "bg-erp-black text-erp-light"
                        )}
                      >
                        {o.status === "em_andamento"
                          ? "Em andamento"
                          : o.status}
                      </span>
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
