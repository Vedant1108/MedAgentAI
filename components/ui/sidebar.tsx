"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Activity, FileUp, FileText, Pill, History,
  Settings, HeartPulse, ChevronLeft, ChevronRight,
} from "lucide-react";

import { useTranslations } from "next-intl";

const nav = [
  { key: "dashboard",       href: "/dashboard",        icon: LayoutDashboard },
  { key: "symptomChecker",  href: "/symptom-checker",  icon: Activity },
  { key: "reportUpload",    href: "/report-upload",    icon: FileUp },
  { key: "reportAnalysis",  href: "/report-analysis",  icon: FileText },
  { key: "medication",      href: "/medication",       icon: Pill },
  { key: "history",         href: "/history",          icon: History },
];

const bottom = [
  { key: "settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const t = useTranslations("Navigation");

  const isActive = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <aside
      className="hidden md:flex flex-col h-full relative transition-all duration-300"
      style={{
        width: collapsed ? "72px" : "240px",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 px-4 gap-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0"
          style={{ background: "var(--primary)" }}
        >
          <HeartPulse className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="text-[16px] font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
            MedAgent
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {nav.map(({ key, href, icon: Icon }) => {
            const active = isActive(href);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const label = (t as any)(key);
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    color: active ? "var(--primary)" : "var(--text-muted)",
                    background: active ? "var(--primary-muted)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }
                  }}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.5 : 2} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {active && !collapsed && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <ul className="space-y-0.5 px-2">
          {bottom.map(({ key, href, icon: Icon }) => {
            const active = isActive(href);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const label = (t as any)(key);
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    color: active ? "var(--primary)" : "var(--text-muted)",
                    background: active ? "var(--primary-muted)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }
                  }}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.5 : 2} />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex items-center justify-center h-6 w-6 rounded-full border shadow-sm z-10 transition-colors"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border)",
          color: "var(--text-muted)",
        }}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
