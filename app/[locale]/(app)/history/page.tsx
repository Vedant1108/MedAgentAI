"use client";
import { FileText, Activity, Search, Filter } from "lucide-react";
import Link from "next/link";

const history = [
  { id: 1, type: "report", title: "Comprehensive Blood Panel", date: "Oct 12, 2024", result: "2 Abnormalities" },
  { id: 2, type: "symptom", title: "Symptom Check: Headache, Fever", date: "Sep 28, 2024", result: "Common Cold" },
  { id: 3, type: "report", title: "Vitamin D Test", date: "Sep 05, 2024", result: "Normal" },
  { id: 4, type: "report", title: "Annual Health Checkup", date: "Jan 15, 2024", result: "Normal" },
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>History</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>View past reports and symptom checks.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-faint)" }} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-colors"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
          </div>
          <button className="p-2 rounded-xl transition-colors hover:bg-[var(--bg-hover)] border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div 
        className="rounded-3xl overflow-hidden"
        style={{ 
          background: "var(--bg-card)", 
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {history.map((item) => (
            <Link 
              href={item.type === "report" ? "/report-analysis" : "/symptom-checker"}
              key={item.id}
              className="flex items-center justify-between p-5 transition-colors hover:bg-[var(--bg-hover)] group"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="h-12 w-12 rounded-xl flex items-center justify-center" 
                  style={{ 
                    background: item.type === "report" ? "var(--primary-muted)" : "rgba(245, 158, 11, 0.1)", 
                    color: item.type === "report" ? "var(--primary)" : "var(--warning)"
                  }}
                >
                  {item.type === "report" ? <FileText className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-0.5" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.date}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <span 
                  className="text-xs font-semibold px-2.5 py-1 rounded-md hidden sm:inline-block"
                  style={{ 
                    background: "var(--bg-surface)", 
                    color: item.result.includes("Abnormal") ? "var(--danger)" : "var(--text-secondary)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {item.result}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
