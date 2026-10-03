"use client";
import { Plus, Pill, Clock, AlertCircle } from "lucide-react";

const medications = [
  { name: "Vitamin D3", dose: "2000 IU", frequency: "Daily", nextDose: "8:00 AM Tomorrow", taken: true },
  { name: "Atorvastatin", dose: "20 mg", frequency: "Daily", nextDose: "9:00 PM Today", taken: false },
  { name: "Lisinopril", dose: "10 mg", frequency: "Daily", nextDose: "8:00 AM Tomorrow", taken: true },
];

export default function MedicationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Medications</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage your prescriptions and supplements.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" />
          Add Medication
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((med, i) => (
          <div 
            key={i}
            className="rounded-3xl p-5 flex flex-col justify-between"
            style={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary-muted)", color: "var(--primary)" }}>
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{med.name}</h3>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{med.dose}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <Clock className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                <span>{med.frequency}</span>
              </div>
              
              <div 
                className="p-3 rounded-xl flex items-center justify-between"
                style={{ background: "var(--bg-hover)" }}
              >
                <div>
                  <p className="text-xs font-semibold mb-0.5 uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Next Dose</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{med.nextDose}</p>
                </div>
                <button 
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${med.taken ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                  style={{ 
                    background: med.taken ? "transparent" : "var(--primary)", 
                    color: med.taken ? "var(--text-muted)" : "white",
                    border: med.taken ? "1px solid var(--border)" : "none"
                  }}
                  disabled={med.taken}
                >
                  {med.taken ? "Taken" : "Mark Taken"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-4 p-4 rounded-xl mt-8" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--info)" }} />
        <div>
          <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>AI Interaction Warning</h4>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Our AI continuously checks your medication list against new symptom checker results and uploaded reports to warn you about potential drug interactions.
          </p>
        </div>
      </div>
    </div>
  );
}
