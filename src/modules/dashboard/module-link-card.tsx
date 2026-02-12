"use client";

import Link from "next/link";
import {
  ChevronRight,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  ListTree,
  Ship,
  DollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  ListTree,
  Ship,
  DollarSign,
};

interface ModuleLinkCardProps {
  href: string;
  title: string;
  description: string;
  icon: keyof typeof ICON_MAP;
  className?: string;
}

export function ModuleLinkCard({
  href,
  title,
  description,
  icon: iconName,
  className,
}: ModuleLinkCardProps) {
  const Icon = ICON_MAP[iconName];
  return (
    <Link
      href={href}
      className={cn(
        "glass-card group flex items-start justify-between p-6 transition-all hover:border-erp-gray",
        className
      )}
    >
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-erp-dark bg-erp-gray">
          {Icon && <Icon className="h-6 w-6 text-erp-light" />}
        </div>
        <div>
          <h3 className="font-semibold text-erp-light">{title}</h3>
          <p className="mt-1 text-sm text-erp-muted">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-erp-muted transition-transform group-hover:translate-x-1 group-hover:text-erp-light" />
    </Link>
  );
}
