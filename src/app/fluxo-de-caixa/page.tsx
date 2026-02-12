"use client";

import { useMemo, useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda, formatData } from "@/lib/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FluxoDeCaixaPage() {
  const { lancamentos, contasPagar, contasReceber, ptaxUSD } =
    useFinanceStore();
  const [periodo, setPeriodo] = useState<"mes" | "30" | "60">("mes");

  const entradas = useMemo(
    () =>
      lancamentos
        .filter((l) => l.tipo === "entrada")
        .reduce((s, l) => s + l.valor, 0),
    [lancamentos]
  );
  const saidas = useMemo(
    () =>
      lancamentos
        .filter((l) => l.tipo === "saida")
        .reduce((s, l) => s + l.valor, 0),
    [lancamentos]
  );
  const saldo = entradas - saidas;

  const aReceber = contasReceber
    .filter((c) => ["a_receber", "em_atraso"].includes(c.status))
    .reduce(
      (s, c) => s + (c.moeda === "BRL" ? c.valor : c.valor * ptaxUSD),
      0
    );
  const aPagar = contasPagar
    .filter((c) => ["pendente", "vencido"].includes(c.status))
    .reduce(
      (s, c) => s + (c.moeda === "BRL" ? c.valor : c.valor * ptaxUSD),
      0
    );

  const chartData = useMemo(() => {
    const byCategoria = lancamentos.reduce(
      (acc, l) => {
        const key = l.categoria;
        if (!acc[key]) acc[key] = { entrada: 0, saida: 0 };
        if (l.tipo === "entrada") acc[key].entrada += l.valor;
        else acc[key].saida += l.valor;
        return acc;
      },
      {} as Record<string, { entrada: number; saida: number }>
    );
    return Object.entries(byCategoria).map(([name, v]) => ({
      name,
      Entradas: v.entrada,
      Saídas: v.saida,
    }));
  }, [lancamentos]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Fluxo de Caixa · Multi-moeda
        </h1>
        <p className="mt-1 text-erp-muted">
          Entradas, saídas e projeção convertidos em BRL
        </p>
      </div>

      <div className="flex gap-2">
        {(["mes", "30", "60"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriodo(p)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              periodo === p
                ? "border border-erp-dark bg-erp-gray text-erp-light"
                : "text-erp-muted hover:bg-erp-dark hover:text-erp-light"
            }`}
          >
            {p === "mes" ? "Mês atual" : p === "30" ? "30 dias" : "60 dias"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-lg p-6">
          <p className="text-sm text-erp-muted">Total entradas</p>
          <p className="mt-1 text-2xl font-bold text-erp-light">
            {formatMoeda(entradas, "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-6">
          <p className="text-sm text-erp-muted">Total saídas</p>
          <p className="mt-1 text-2xl font-bold text-rose-400">
            {formatMoeda(saidas, "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-6">
          <p className="text-sm text-erp-muted">Saldo líquido</p>
          <p className="mt-1 text-2xl font-bold text-erp-light">
            {formatMoeda(saldo, "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-6">
          <p className="text-sm text-erp-muted">Previsão (a receber − a pagar)</p>
          <p className="mt-1 text-2xl font-bold text-erp-light">
            {formatMoeda(aReceber - aPagar, "BRL")}
          </p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold text-erp-light">
            Fluxo por categoria
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
                  stroke="#5A5A5A"
                  fontSize={12}
                />
                <YAxis
                  stroke="#5A5A5A"
                  fontSize={12}
                  tickFormatter={(v) =>
                    `R$ ${(v / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip
                  contentStyle={{
                    background: "#2A2A2A",
                    border: "1px solid #3A3A3A",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    formatMoeda(value, "BRL"),
                    "",
                  ]}
                />
                <Legend />
                <Bar dataKey="Entradas" fill="#5A5A5A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Saídas" fill="#3A3A3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="glass-card overflow-hidden rounded-lg">
        <h3 className="border-b border-erp-dark px-6 py-4 font-semibold text-erp-light">
          Lançamentos
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-erp-dark">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Descrição
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Categoria
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((l) => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="px-6 py-4 text-erp-light">
                    {formatData(l.data)}
                  </td>
                  <td className="px-6 py-4 text-erp-light">{l.descricao}</td>
                  <td className="px-6 py-4 text-erp-muted">{l.categoria}</td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      l.tipo === "entrada" ? "text-erp-light" : "text-erp-muted"
                    }`}
                  >
                    {l.tipo === "entrada" ? "+" : "−"}{" "}
                    {formatMoeda(l.valor, "BRL")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
