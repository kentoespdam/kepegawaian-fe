"use client";

import { CalendarRange, ChevronLeft, DollarSign, FileText, LayoutGrid, Menu, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { UserMenu } from "@/components/user-menu";
import { MASTER_ENTITIES } from "@/config/entities";
import { can, getRoles } from "@/lib/auth/can";
import { cn } from "@/lib/utils";
import type { AppwriteUser } from "@/types/auth";

const MODULES = [
  {
    id: "master",
    label: "Master",
    icon: LayoutGrid,
    entities: MASTER_ENTITIES,
  },
  { id: "kepegawaian", label: "Kepegawaian", icon: Users, entities: [] },
  { id: "cuti", label: "Cuti", icon: CalendarRange, entities: [] },
  { id: "laporan", label: "Laporan", icon: FileText, entities: [] },
  { id: "penggajian", label: "Penggajian", icon: DollarSign, entities: [] },
  { id: "sistem", label: "Sistem", icon: Settings, entities: [] },
];

export const MODULE_ENTITY_MAP = MODULES.flatMap((m) => m.entities.map((e) => ({ ...e, moduleId: m.id })));

export function AppShell({ user, children }: { user: AppwriteUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const roles = getRoles(user);

  const activeModule = MODULES.find((m) => m.entities.some((e) => pathname.startsWith(`/master/${e.id}`)));
  const activeEntity = MODULE_ENTITY_MAP.find((e) => pathname === `/master/${e.id}`);

  const filteredEntities = activeModule ? activeModule.entities.filter((e) => can(roles, "view", e.id)) : [];

  const sidebar = (
    <div className="flex h-full">
      <nav className="flex w-14 flex-col items-center gap-1 border-r border-border bg-card py-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule?.id === mod.id;
          return (
            <Link
              key={mod.id}
              href={mod.entities.length > 0 ? `/master/${mod.entities[0].id}` : "#"}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              title={mod.label}
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="size-5" />
            </Link>
          );
        })}
      </nav>
      {activeModule && (
        <div
          className={cn(
            "flex flex-col border-r border-border bg-card transition-all duration-200 overflow-hidden",
            panelCollapsed ? "w-0 border-none" : "w-56",
          )}
        >
          <div className="flex items-center justify-between px-3 h-12 border-b border-border">
            <span className="text-sm font-medium text-foreground">{activeModule.label}</span>
            <button
              type="button"
              onClick={() => setPanelCollapsed(true)}
              className="flex size-6 items-center justify-center rounded hover:bg-muted text-muted-foreground"
              aria-label="Ciutkan panel"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {filteredEntities.map((entity) => {
              const isActive = pathname === `/master/${entity.id}`;
              return (
                <Link
                  key={entity.id}
                  href={`/master/${entity.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {entity.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {!activeModule && (
        <div className="flex w-56 flex-col items-center justify-center border-r border-border bg-card p-4 text-center text-sm text-muted-foreground">
          Pilih modul
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">{sidebar}</div>

      {/* Content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-label="Menu"
              >
                <Menu className="size-5" />
              </button>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Navigasi</SheetTitle>
                {sidebar}
              </SheetContent>
            </Sheet>
            {pathname.startsWith("/master/") && activeEntity ? (
              <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm">
                <span className="text-muted-foreground">{activeModule?.label ?? "Master"}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{activeEntity.label}</span>
              </nav>
            ) : (
              <h1 className="text-sm font-medium text-foreground">
                {pathname === "/" && "Beranda"}
                {pathname === "/profil" && "Profil"}
              </h1>
            )}
          </div>
          <UserMenu user={user} />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Desktop: if panel collapsed, show expand button */}
      {activeModule && panelCollapsed && (
        <button
          type="button"
          onClick={() => setPanelCollapsed(false)}
          className="hidden md:flex fixed left-14 top-1/2 -translate-y-1/2 z-10 size-6 items-center justify-center rounded-r-lg border border-l-0 border-border bg-card text-muted-foreground hover:text-foreground"
          aria-label="Buka panel"
        >
          <ChevronLeft className="size-4 rotate-180" />
        </button>
      )}
    </div>
  );
}
