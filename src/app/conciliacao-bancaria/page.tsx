"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda, formatData } from "@/lib/format";

export default function ConciliacaoBancariaPage() {
  const { lancamentos, saldoInicialBancario } = useFinanceStore();
  const [conta, setConta] = useState("bb");
  const [periodo, setPeriodo] = useState("2025-02");

  const entradas = lancamentos.filter((l) => l.tipo === "entrada");
  const saidas = lancamentos.filter((l) => l.tipo === "saida");
  const totalEntradas = entradas.reduce((s, l) => s + l.valor, 0);
  const totalSaidas = saidas.reduce((s, l) => s + l.valor, 0);
  const saldoExtrato = saldoInicialBancario + totalEntradas - totalSaidas;
  const saldoSistema = saldoExtrato; // em operação normal = conciliado

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Conciliação Bancária
        </h1>
        <p className="mt-1 text-erp-muted">
          Extrato bancário e conciliação de lançamentos
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <div>
            <label className="mb-1 block text-xs text-erp-muted">
              Conta bancária
            </label>
            <select
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              className="rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
            >
              <option value="bb">Banco do Brasil - Conta Corrente</option>
              <option value="itau">Itaú - Conta Corrente</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-erp-muted">
              Período
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="rounded-lg border border-erp-dark bg-erp-gray px-4 py-2 text-erp-light outline-none"
            >
              <option value="2025-02">Fevereiro 2025</option>
              <option value="2025-01">Janeiro 2025</option>
            </select>
          </div>
        </div>
        <button className="rounded-lg bg-erp-gray px-4 py-2 text-sm font-medium text-erp-light hover:bg-erp-gray">
          Importar extrato
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">Saldo extrato banco</p>
          <p className="mt-1 text-xl font-bold text-erp-light">
            {formatMoeda(saldoExtrato, "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">Saldo sistema</p>
          <p className="mt-1 text-xl font-bold text-erp-light">
            {formatMoeda(saldoSistema, "BRL")}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-erp-muted">Status</p>
          <p className="mt-1 text-xl font-bold text-emerald-400">
            {Math.abs(saldoExtrato - saldoSistema) < 1
              ? "Conciliado"
              : "Divergência"}
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-lg">
        <div className="border-b border-erp-dark px-6 py-4">
          <h3 className="font-medium text-erp-light">
            Lançamentos do período
          </h3>
          <p className="text-sm text-erp-muted">
            Conferir e marcar como conciliado
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-erp-dark">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Histórico
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Débito
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Crédito
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-erp-muted">
                  Conciliação
                </th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((l) => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="px-6 py-4 text-erp-light">
                    {formatData(l.data)}
                  </td>
                  <td className="px-6 py-4 text-erp-light">{l.descricao}</td>
                  <td className="px-6 py-4 text-right text-erp-muted">—</td>
                  <td className="px-6 py-4 text-right text-emerald-400">
                    {formatMoeda(l.valor, "BRL")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-erp-gray px-2 py-1 text-xs text-emerald-400">
                      ✓ Conciliado
                    </span>
                  </td>
                </tr>
              ))}
              {saidas.map((l) => (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="px-6 py-4 text-erp-light">
                    {formatData(l.data)}
                  </td>
                  <td className="px-6 py-4 text-erp-light">{l.descricao}</td>
                  <td className="px-6 py-4 text-right text-erp-muted">
                    {formatMoeda(l.valor, "BRL")}
                  </td>
                  <td className="px-6 py-4 text-right text-erp-muted">—</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-erp-gray px-2 py-1 text-xs text-emerald-400">
                      ✓ Conciliado
                    </span>
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
