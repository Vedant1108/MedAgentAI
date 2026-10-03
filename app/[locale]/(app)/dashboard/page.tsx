"use client";
import { StatCard } from "@/components/ui/stat-card";
import { FileText, Activity, Pill, Flame, Plus, Upload, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SkeletonCard, SkeletonRow } from "@/components/ui/loader";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div 
        className="rounded-3xl p-8 relative overflow-hidden"
        style={{ 
          background: "var(--primary-dark)", 
          color: "white"
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-2">{t("title")}</h2>
          <p className="opacity-90 mb-6">
            {t("subtitle")}
          </p>
          <div className="flex gap-4">
            <Link 
              href="/report-upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "var(--primary)", color: "white" }}
            >
              <Upload className="h-4 w-4" />
              {t("uploadBtn")}
            </Link>
            <Link 
              href="/symptom-checker"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Activity className="h-4 w-4" />
              {t("symptomsBtn")}
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute right-32 bottom-0 w-48 h-48 bg-[var(--primary)]/20 rounded-full blur-2xl translate-y-1/3" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title={t("stats.totalReports")}
          value="12" 
          icon={<FileText className="h-5 w-5" />} 
          trend={{ value: t("stats.totalReportsTrend"), isPositive: true }}
          delay={0.1}
        />
        <StatCard 
          title={t("stats.activeSymptoms")}
          value="0" 
          icon={<Activity className="h-5 w-5" />} 
          trend={{ value: t("stats.activeSymptomsTrend"), isPositive: true, isNeutral: true }}
          delay={0.2}
        />
        <StatCard 
          title={t("stats.medications")}
          value="3" 
          icon={<Pill className="h-5 w-5" />} 
          trend={{ value: t("stats.medicationsTrend"), isPositive: false }}
          delay={0.3}
        />
        <StatCard 
          title={t("stats.healthStreak")}
          value="28" 
          icon={<Flame className="h-5 w-5" />} 
          trend={{ value: t("stats.healthStreakTrend"), isPositive: true }}
          delay={0.4}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{t("recentReports")}</h3>
            <Link href="/history" className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: "var(--primary)" }}>
              {t("viewAll")} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div 
            className="rounded-2xl p-2 space-y-1"
            style={{ 
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {[
              { name: t("reports.r1"), date: "Oct 12, 2024", status: t("reports.analyzed"), highlight: false },
              { name: t("reports.r2"), date: "Sep 05, 2024", status: t("reports.analyzed"), highlight: false },
              { name: t("reports.r3"), date: "Jan 15, 2024", status: t("reports.analyzed"), highlight: false },
            ].map((report, i) => (
              <Link 
                key={i}
                href="/report-analysis"
                className="flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-[var(--bg-hover)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-muted)", color: "var(--primary)" }}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{report.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ background: "var(--bg-base)", color: "var(--text-secondary)" }}>
                    {report.status}
                  </span>
                  <ArrowRight className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions (1/3 width) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{t("quickActions")}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/medication"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-transform hover:scale-105"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: "rgba(59, 130, 246, 0.1)", color: "var(--info)" }}>
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center" style={{ color: "var(--text-secondary)" }}>{t("addMed")}</span>
            </Link>
            
            <Link 
              href="/settings"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-transform hover:scale-105"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: "rgba(245, 158, 11, 0.1)", color: "var(--warning)" }}>
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center" style={{ color: "var(--text-secondary)" }}>{t("updateVitals")}</span>
            </Link>
          </div>

          <div 
            className="rounded-2xl p-5 mt-4"
            style={{ background: "var(--primary-light)", border: "1px solid var(--primary-muted)" }}
          >
            <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--primary-dark)" }}>{t("healthTipTitle")}</h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--primary-dark)" }}>
              {t("healthTipDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
