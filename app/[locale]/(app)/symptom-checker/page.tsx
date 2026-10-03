"use client";
import { useState } from "react";
import { Search, Activity, ChevronRight, CheckCircle2, User as BodyIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function SymptomCheckerPage() {
  const t = useTranslations("SymptomChecker");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { conditions: string[], advice: string }>(null);

  const addSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !symptoms.includes(currentInput.trim())) {
      setSymptoms([...symptoms, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const removeSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(s => s !== symptomToRemove));
  };

  const handleAnalyze = () => {
    if (symptoms.length === 0) return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        conditions: ["Common Cold", "Seasonal Allergies", "Sinusitis"],
        advice: "Based on your symptoms, this appears to be a mild viral infection or allergic reaction. Ensure you stay hydrated and get plenty of rest. If symptoms worsen or persist for more than 7 days, please consult a healthcare professional."
      });
    }, 2000);
  };

  const reset = () => {
    setSymptoms([]);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Input */}
        <div className="flex-1 space-y-6">
          <div 
            className="rounded-3xl p-6"
            style={{ 
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary-muted)", color: "var(--primary)" }}>
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{t("title")}</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t("subtitle")}</p>
              </div>
            </div>

            <form onSubmit={addSymptom} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: "var(--text-faint)" }} />
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-colors"
                style={{ 
                  background: "var(--bg-hover)", 
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)"
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                disabled={isAnalyzing || result !== null}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
                style={{ background: "var(--primary)" }}
                disabled={!currentInput.trim() || isAnalyzing || result !== null}
              >
                {t("addBtn")}
              </button>
            </form>

            <div className="min-h-[100px]">
              {symptoms.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8 opacity-60">
                  <BodyIcon className="h-10 w-10 mb-2" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t("empty")}</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {symptoms.map(symptom => (
                      <motion.div
                        key={symptom}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{ 
                          background: "var(--primary-muted)", 
                          color: "var(--primary)",
                          border: "1px solid rgba(16, 163, 74, 0.2)"
                        }}
                      >
                        {symptom}
                        {!result && (
                          <button 
                            onClick={() => removeSymptom(symptom)}
                            className="hover:text-red-500 transition-colors"
                          >
                            &times;
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {!result && (
              <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "var(--text-faint)" }}>{t("commonTitle")}</p>
                <div className="flex flex-wrap gap-2">
                  {t.raw("symptomsList").map((s: string) => (
                    <button
                      key={s}
                      onClick={() => { if (!symptoms.includes(s)) setSymptoms([...symptoms, s]) }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-[var(--bg-hover)] disabled:opacity-50"
                      style={{ 
                        border: "1px solid var(--border)", 
                        color: "var(--text-secondary)",
                        background: symptoms.includes(s) ? "var(--bg-hover)" : "transparent"
                      }}
                      disabled={symptoms.includes(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="flex-1 md:max-w-md">
          {!result && !isAnalyzing ? (
            <div 
              className="h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center border-dashed border-2"
              style={{ 
                borderColor: "var(--border)",
                background: "var(--bg-surface)"
              }}
            >
              <div className="h-16 w-16 rounded-full mb-4 flex items-center justify-center" style={{ background: "var(--bg-hover)" }}>
                <Activity className="h-8 w-8" style={{ color: "var(--text-faint)" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{t("readyTitle")}</h3>
              <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-muted)" }}>
                {t("readyDesc")}
              </p>
              <button
                onClick={handleAnalyze}
                disabled={symptoms.length === 0}
                className="px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "var(--primary)", boxShadow: symptoms.length > 0 ? "0 4px 14px rgba(16, 163, 74, 0.4)" : "none" }}
              >
                {t("analyzeBtn")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : isAnalyzing ? (
            <div 
              className="h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center"
              style={{ 
                background: "var(--primary-dark)",
                color: "white"
              }}
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ border: "2px solid var(--primary)", opacity: 0.5 }} />
                <div className="h-16 w-16 rounded-full flex items-center justify-center relative z-10" style={{ background: "var(--primary)" }}>
                  <Activity className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("analyzingTitle")}</h3>
              <p className="text-sm opacity-80 max-w-xs">
                {t("analyzingDesc")}
              </p>
              
              <div className="w-full max-w-xs mt-8 space-y-3">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-xs opacity-60 text-left">{t("processing")}</p>
              </div>
            </div>
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full rounded-3xl p-6"
              style={{ 
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div className="flex items-center gap-2 mb-6 text-sm font-semibold" style={{ color: "var(--primary)" }}>
                <CheckCircle2 className="h-5 w-5" />
                {t("completeTitle")}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{t("conditionsTitle")}</h4>
                  <ul className="space-y-2">
                    {result.conditions.map((condition, i) => (
                      <motion.li 
                        key={condition}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "var(--bg-hover)" }}
                      >
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{condition}</span>
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                          <div className="h-full" style={{ background: "var(--primary)", width: `${90 - (i * 20)}%` }} />
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{t("adviceTitle")}</h4>
                  <p className="text-sm leading-relaxed p-4 rounded-xl" style={{ background: "var(--primary-light)", color: "var(--primary-dark)", border: "1px solid var(--primary-muted)" }}>
                    {result.advice}
                  </p>
                </div>
                
                <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                   <p className="text-xs text-center mb-4" style={{ color: "var(--text-muted)" }}>
                     {t("disclaimer")}
                   </p>
                   <button
                    onClick={reset}
                    className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
                   >
                     {t("startNew")}
                   </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
