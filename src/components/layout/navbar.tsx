"use client";

import { Bell, Search, User } from "lucide-react";

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-erp-dark px-6 backdrop-blur-md"
      style={{ background: "rgba(0, 0, 0, 0.95)" }}
    >
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-erp-muted" />
          <input
            type="search"
            placeholder="Buscar operações, DI, fornecedores..."
            className="w-full rounded-lg border border-erp-dark bg-erp-gray/60 py-2.5 pl-10 pr-4 text-sm text-erp-light placeholder-erp-muted outline-none transition-colors focus:border-erp-light focus:ring-1 focus:ring-erp-gray"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          className="rounded-lg p-2.5 text-erp-muted transition-colors hover:bg-erp-dark hover:text-erp-light"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-erp-gray" />
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-erp-light transition-colors hover:bg-erp-dark">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-erp-dark bg-erp-gray">
            <User className="h-4 w-4 text-erp-muted" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-erp-light">Admin</p>
            <p className="text-xs text-erp-muted">CFO</p>
          </div>
        </button>
      </div>
    </header>
  );
}
