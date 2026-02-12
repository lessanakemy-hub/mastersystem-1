"use client";

import { cn } from "@/lib/utils";
import {
  DollarSign,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  AlertCircle,
};

interface GlassCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon | keyof typeof ICON_MAP;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
}

export function GlassCard({
  title,
  value,
  subtitle,
  icon: iconProp,
  trend,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        "hover:shadow-glow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-erp-muted">{title}</p>
          <p className="mt-2 text-2xl font-bold text-erp-light tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-erp-muted">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                trend.isPositive ? "text-erp-light" : "text-erp-light"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              {trend.label && (
                <span className="ml-1 text-erp-muted font-normal">
                  {trend.label}
                </span>
              )}
            </p>
          )}
        </div>
        {((): React.ReactNode => {
          const Icon =
            typeof iconProp === "string" ? ICON_MAP[iconProp] : iconProp;
          return Icon ? (
            <div className="rounded-lg bg-erp-gray border border-erp-dark p-3">
              <Icon className="h-6 w-6 text-erp-light" />
            </div>
          ) : null;
        })()}
      </div>
    </div>
  );
}
