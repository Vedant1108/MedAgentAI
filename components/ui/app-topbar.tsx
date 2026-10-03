"use client";
import { Search, Bell, Sun, Moon, User as UserIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";

export function AppTopBar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const t = useTranslations("Topbar");
  const navT = useTranslations("Navigation");
  
  // Simple title formatter based on pathname
  const getPageTitle = () => {
    if (!pathname || pathname === "/") return navT("dashboard");
    const path = pathname.split("/").filter(Boolean)[0];
    if (!path) return navT("dashboard");
    
    // Map path segments to navigation keys
    if (path === "dashboard") return navT("dashboard");
    if (path === "symptom-checker") return navT("symptomChecker");
    if (path === "report-upload") return navT("reportUpload");
    if (path === "report-analysis") return navT("reportAnalysis");
    if (path === "medication") return navT("medication");
    if (path === "history") return navT("history");
    if (path === "settings") return navT("settings");
    
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header 
      className="flex items-center justify-between h-16 px-6 sticky top-0 z-30 transition-colors duration-300"
      style={{ 
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <h1 
          className="text-lg font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex relative group">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors" 
            style={{ color: "var(--text-faint)" }} 
          />
          <input
            type="text"
            placeholder={t("search")}
            className="pl-9 pr-4 py-2 rounded-full text-sm outline-none transition-all duration-200"
            style={{
              background: "var(--bg-hover)",
              color: "var(--text-primary)",
              border: "1px solid transparent",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.background = "var(--bg-surface)";
              e.currentTarget.style.boxShadow = "0 0 0 4px var(--primary-muted)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-full transition-colors flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-full transition-colors relative flex items-center justify-center"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Bell className="h-[18px] w-[18px]" />
          <span 
            className="absolute top-1.5 right-2 h-2 w-2 rounded-full border-2"
            style={{ background: "var(--danger)", borderColor: "var(--bg-surface)" }}
          />
        </button>

        {/* User Profile Placeholder */}
        <button
          className="h-8 w-8 rounded-full flex items-center justify-center transition-transform hover:scale-105"
          style={{ background: "var(--primary-light)", border: "1px solid var(--border)" }}
        >
          <UserIcon className="h-4 w-4" style={{ color: "var(--primary)" }} />
        </button>
      </div>
    </header>
  );
}
