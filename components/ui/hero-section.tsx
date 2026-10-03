"use client";
import { motion } from "motion/react";
import { ArrowRight, Shield, CheckCircle, FileText, User, Lock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");
  return (
    <section
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      style={{ background: "var(--primary-light)" }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,163,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,163,74,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 md:px-10 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* LEFT */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="block h-px w-8" style={{ background: "var(--primary)" }} />
            <span className="text-sm font-medium tracking-wide" style={{ color: "var(--primary)" }}>
              {t("badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
            {t("title1")}{" "}
            <span style={{ color: "var(--primary)" }}>{t("title2")}</span>
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-muted)" }}>
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.a
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full text-white font-semibold px-7 py-3.5 text-sm"
              style={{ background: "var(--primary)", boxShadow: "0 4px 24px rgba(16,163,74,0.3)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("cta1")}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full font-medium px-6 py-3.5 text-sm transition-colors"
              style={{ border: "1px solid var(--primary)", color: "var(--primary)" }}
            >
              <Shield className="h-4 w-4" />
              {t("cta2")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--text-muted)" }}>
            {[t("feature1"), t("feature2"), t("feature3")].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" style={{ color: "var(--primary)" }} />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — data flow card */}
        <motion.div
          className="flex-1 w-full max-w-md lg:max-w-[460px]"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <DataFlowCard />
        </motion.div>
      </div>
    </section>
  );
}

function DataFlowCard() {
  const t = useTranslations("Hero");
  return (
    <div
      className="rounded-2xl overflow-hidden font-mono text-xs"
      style={{
        border: "1px solid rgba(16,163,74,0.2)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: "#0d3d22" }}>
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 opacity-70" />
          <span className="text-[11px] tracking-widest opacity-80 uppercase">{t("terminalTitle")}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] opacity-60">
          <Lock className="h-3 w-3" /> {t("terminalEncrypted")}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <StepCard icon={<FileText className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />} label="REPORT.PDF" delay={0}>
          <Row k="name" v="Patient" muted />
          <Row k="phone" v="••••••••••" muted />
          <Row k="hemoglobin" v="13.8" bold />
          <Row k="vitamin_d" v="14" bold />
        </StepCard>

        <Connector icon="+" label="Your health profile merged" />

        <StepCard icon={<User className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />} label="HEALTH_PROFILE" sublabel="saved in your MedAgent profile" delay={0.4}>
          <Row k="condition" v="hypertension" green />
          <Row k="smoking" v="non-smoker" green />
          <Row k="diet" v="vegetarian" green />
        </StepCard>

        <Connector icon="↓" label="" />

        <StepCard icon={<Lock className="h-3.5 w-3.5 text-orange-500" />} label="SCRUB_STEP — STRIPS IDENTITY" delay={0.8}>
          <div className="flex items-center justify-between">
            <span style={{ color: "var(--text-muted)" }}>name · phone · dob · address · doctor</span>
            <span className="text-[10px] font-bold uppercase text-orange-500 bg-orange-50 border border-orange-200 rounded px-1.5 py-0.5">
              removed
            </span>
          </div>
        </StepCard>

        <Connector icon="↓" label="" />

        <motion.div
          className="rounded-xl p-3 space-y-2"
          style={{ border: "1px solid var(--primary)", background: "var(--primary-light)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary-dark)" }}>
            <Sparkles className="h-3 w-3" style={{ color: "var(--primary)" }} />
            THE AI SEES VALUES + YOUR CONTEXT,{" "}
            <span className="text-orange-600 underline underline-offset-2">NEVER YOU</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              hemoglobin 13.8 · vitamin_d 14 · hypertension · non-smoker · vegetarian
            </p>
            <span className="shrink-0 text-[10px] font-semibold flex items-center gap-0.5" style={{ color: "var(--primary)" }}>
              → personalised
            </span>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-[10px] pt-1"
          style={{ color: "var(--text-faint)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          your profile personalises the report. the AI never learns who you are. delete anytime.
        </motion.p>
      </div>
    </div>
  );
}

function StepCard({ icon, label, sublabel, delay = 0, children }: {
  icon: React.ReactNode; label: string; sublabel?: string; delay?: number; children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-xl p-3 space-y-2"
      style={{ border: "1px solid var(--border)", background: "var(--bg-surface)", boxShadow: "var(--shadow-sm)" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
        {icon}{label}
      </div>
      {sublabel && <p className="text-[9px] -mt-1" style={{ color: "var(--text-faint)" }}>{sublabel}</p>}
      <div className="space-y-1">{children}</div>
    </motion.div>
  );
}

function Row({ k, v, muted, bold, green }: { k: string; v: string; muted?: boolean; bold?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span style={{ color: "var(--text-muted)" }}>{k}</span>
      <span style={{ color: green ? "var(--primary)" : "var(--text-primary)", fontWeight: bold || green ? 600 : 400 }}>{v}</span>
    </div>
  );
}

function Connector({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.div className="flex items-center justify-center gap-2 py-0.5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
      <span className="font-bold text-base leading-none" style={{ color: "var(--primary)" }}>{icon}</span>
      {label && <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{label}</span>}
    </motion.div>
  );
}
