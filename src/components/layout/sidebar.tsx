"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  ListTree,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Ship,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/operacoes-comex", label: "Operações Comex", icon: Ship },
  { href: "/cambio", label: "Câmbio / PTAX", icon: DollarSign },
  { href: "/contas-a-pagar", label: "Contas a Pagar", icon: ArrowDownCircle },
  { href: "/contas-a-receber", label: "Contas a Receber", icon: ArrowUpCircle },
  { href: "/fluxo-de-caixa", label: "Fluxo de Caixa", icon: TrendingUp },
  { href: "/conciliacao-bancaria", label: "Conciliação Bancária", icon: Landmark },
  { href: "/plano-de-contas", label: "Plano de Contas", icon: ListTree },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();

  const handleToggle = () => {
    onCollapsedChange?.(!collapsed);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-erp-gray transition-all duration-300",
        "backdrop-blur-md",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
      style={{
        background: "rgba(18, 18, 18, 0.95)",
      }}
    >
      {/* Logo */}
      <div className="relative flex h-16 items-center justify-between border-b border-erp-gray px-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            collapsed && "mx-auto"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-erp-gray bg-erp-gray">
            <Wallet className="h-4 w-4 text-erp-light" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-erp-light">MasterPort Comex</span>
          )}
        </Link>
        {!collapsed && (
        <button
          onClick={handleToggle}
          className="rounded-lg p-2 text-erp-muted transition-colors hover:bg-erp-dark hover:text-erp-light"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        )}
        {collapsed && (
          <button
            onClick={handleToggle}
            className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-erp-gray bg-erp-gray text-erp-muted shadow-lg backdrop-blur-sm transition-colors hover:bg-erp-gray hover:text-erp-light"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-erp-gray text-erp-light"
                  : "text-erp-muted hover:bg-erp-dark hover:text-erp-light",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive && "text-erp-light"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom accent */}
      <div
        className="h-1 w-full bg-erp-muted opacity-30"
        aria-hidden
      />
    </aside>
  );
}
