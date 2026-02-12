"use client";

import { useState } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatMoeda } from "@/lib/format";

export default function CambioPage() {
  const { cotacoes, ptaxUSD, setPtaxUSD } = useFinanceStore();
  const [editPtax, setEditPtax] = useState(false);
  const [novoPtax, setNovoPtax] = useState(ptaxUSD.toString());

  const handleSavePtax = () => {
    const v = parseFloat(novoPtax.replace(",", "."));
    if (!isNaN(v) && v > 0) {
      setPtaxUSD(v);
      setEditPtax(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-erp-light">
          Câmbio / PTAX
        </h1>
        <p className="mt-1 text-erp-muted">
          Cotações vigentes e cotação de referência para conversão
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-sm font-medium text-erp-muted">PTAX USD (compra)</h3>
          {editPtax ? (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-erp-muted">R$</span>
              <input
                type="text"
                value={novoPtax}
                onChange={(e) => setNovoPtax(e.target.value)}
                className="w-24 rounded border border-erp-dark bg-erp-gray px-2 py-1 text-erp-light outline-none"
              />
              <button
                onClick={handleSavePtax}
                className="text-sm text-erp-light hover:text-erp-light"
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setEditPtax(false);
                  setNovoPtax(ptaxUSD.toString());
                }}
                className="text-sm text-erp-muted hover:text-erp-light"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p className="mt-2 text-2xl font-bold text-erp-light">
              {formatMoeda(ptaxUSD, "BRL")}
            </p>
          )}
          <p className="mt-1 text-xs text-erp-muted">
            Cotação de referência para conversão
          </p>
          {!editPtax && (
            <button
              onClick={() => {
                setEditPtax(true);
                setNovoPtax(ptaxUSD.toString());
              }}
              className="mt-2 text-sm text-erp-light hover:text-erp-light"
            >
              Editar cotação
            </button>
          )}
        </div>

        {cotacoes.map((c) => (
          <div key={c.moeda} className="glass-card rounded-lg p-6">
            <h3 className="text-sm font-medium text-erp-muted">
              {c.moeda} - {c.data}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-erp-muted">Compra</p>
                <p className="text-xl font-bold text-emerald-400">
                  R$ {c.compra.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-xs text-erp-muted">Venda</p>
                <p className="text-xl font-bold text-erp-muted">
                  R$ {c.venda.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-lg p-6">
        <h3 className="font-semibold text-erp-light">Conversor</h3>
        <p className="mt-1 text-sm text-erp-muted">
          Utilize a PTAX vigente para converter valores. Ex: US$ 10.000 = R${" "}
          {(10000 * ptaxUSD).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-lg border border-erp-dark bg-erp-gray p-4">
            <p className="text-xs text-erp-muted">US$ 1.000 =</p>
            <p className="text-lg font-bold text-erp-light">
              {formatMoeda(1000 * ptaxUSD, "BRL")}
            </p>
          </div>
          <div className="rounded-lg border border-erp-dark bg-erp-gray p-4">
            <p className="text-xs text-erp-muted">US$ 10.000 =</p>
            <p className="text-lg font-bold text-erp-light">
              {formatMoeda(10000 * ptaxUSD, "BRL")}
            </p>
          </div>
          <div className="rounded-lg border border-erp-dark bg-erp-gray p-4">
            <p className="text-xs text-erp-muted">US$ 100.000 =</p>
            <p className="text-lg font-bold text-erp-light">
              {formatMoeda(100000 * ptaxUSD, "BRL")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
