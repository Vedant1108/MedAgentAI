"use client";
import { useState } from "react";
import { Download, Share2, FileText, Sparkles, CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

const mockParameters = [
  { name: "Hemoglobin", value: "13.8", unit: "g/dL", range: "13.0 - 17.0", status: "normal" },
  { name: "Vitamin D", value: "14", unit: "ng/mL", range: "30.0 - 100.0", status: "low" },
  { name: "Cholesterol (Total)", value: "245", unit: "mg/dL", range: "< 200", status: "high" },
  { name: "Fasting Glucose", value: "95", unit: "mg/dL", range: "70 - 99", status: "normal" },
  { name: "TSH", value: "2.5", unit: "mIU/L", range: "0.4 - 4.0", status: "normal" },
];

export default function ReportAnalysisPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Comprehensive Blood Panel</h2>
          <p className="text-sm flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <FileText className="h-4 w-4" />
            Analyzed on Oct 12, 2024
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-hover)] border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <Share2 className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--bg-hover)] border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: AI Summary & Highlights */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Summary Card */}
          <div 
            className="rounded-3xl p-6 relative overflow-hidden"
            style={{ 
              background: "var(--primary-dark)", 
              color: "white",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <h3 className="font-semibold">AI Summary</h3>
            </div>
            
            <p className="text-sm leading-relaxed opacity-90 relative z-10">
              Overall, your blood panel looks mostly healthy. However, there are two areas that need attention. Your <strong>Vitamin D</strong> levels are significantly low (14 ng/mL), which is common but should be addressed with supplementation. Additionally, your <strong>Total Cholesterol</strong> is elevated (245 mg/dL). Given your profile notes on a vegetarian diet, this might be genetic or due to specific dietary fats.
            </p>
            
            <div className="mt-6 pt-4 border-t border-white/20 relative z-10">
              <p className="text-xs opacity-75">
                Next steps: Consider discussing a Vitamin D3 supplement with your doctor and reviewing your saturated fat intake.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-2xl p-4 flex flex-col items-center justify-center text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
               <span className="text-2xl font-bold mb-1" style={{ color: "var(--danger)" }}>2</span>
               <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Out of Range</span>
             </div>
             <div className="rounded-2xl p-4 flex flex-col items-center justify-center text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
               <span className="text-2xl font-bold mb-1" style={{ color: "var(--primary)" }}>18</span>
               <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Normal</span>
             </div>
          </div>
        </div>

        {/* Right Col: Parameters Table */}
        <div className="lg:col-span-2">
          <div 
            className="rounded-3xl overflow-hidden"
            style={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Detailed Parameters</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
                  <tr>
                    <th className="px-6 py-4 font-medium">Test Name</th>
                    <th className="px-6 py-4 font-medium">Result</th>
                    <th className="px-6 py-4 font-medium">Reference Range</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {mockParameters.map((param, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-hover)] transition-colors">
                      <td className="px-6 py-4 font-medium" style={{ color: "var(--text-primary)" }}>
                        {param.name}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        <span style={{ 
                          color: param.status === 'normal' ? 'var(--text-primary)' : 
                                 param.status === 'low' ? 'var(--info)' : 'var(--danger)' 
                        }}>
                          {param.value}
                        </span>
                        <span className="text-xs ml-1 font-normal" style={{ color: "var(--text-faint)" }}>{param.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-xs" style={{ color: "var(--text-muted)" }}>
                        {param.range}
                      </td>
                      <td className="px-6 py-4">
                        <div 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium capitalize"
                          style={{
                            background: param.status === 'normal' ? 'var(--primary-muted)' : 
                                        param.status === 'low' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: param.status === 'normal' ? 'var(--primary)' : 
                                   param.status === 'low' ? 'var(--info)' : 'var(--danger)'
                          }}
                        >
                          {param.status === 'normal' ? <CheckCircle2 className="h-3.5 w-3.5" /> : 
                           param.status === 'low' ? <ArrowDown className="h-3.5 w-3.5" /> : 
                           <ArrowUp className="h-3.5 w-3.5" />}
                          {param.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
