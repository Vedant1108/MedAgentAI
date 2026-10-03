"use client";
import { useTheme } from "@/components/ui/theme-provider";
import { User, Bell, Lock, Palette, LogOut, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Settings</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage your account, preferences, and health profile.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Nav sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { icon: User, label: "Profile", active: true },
            { icon: Bell, label: "Notifications", active: false },
            { icon: Lock, label: "Privacy & Security", active: false },
            { icon: Palette, label: "Appearance", active: false },
          ].map((tab, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ 
                background: tab.active ? "var(--bg-hover)" : "transparent",
                color: tab.active ? "var(--text-primary)" : "var(--text-secondary)",
                border: tab.active ? "1px solid var(--border)" : "1px solid transparent"
              }}
            >
              <tab.icon className="h-4 w-4" style={{ color: tab.active ? "var(--primary)" : "var(--text-faint)" }} />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-4 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-red-50 text-red-600">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div 
            className="rounded-3xl p-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Appearance</h3>
            
            <div className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Theme Preference</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Choose between light and dark mode.</p>
              </div>
              <div 
                className="flex p-1 rounded-xl"
                style={{ background: "var(--bg-hover)" }}
              >
                <button
                  className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
                  style={{ 
                    background: theme === "light" ? "var(--bg-card)" : "transparent",
                    color: theme === "light" ? "var(--text-primary)" : "var(--text-muted)",
                    boxShadow: theme === "light" ? "var(--shadow-sm)" : "none"
                  }}
                  onClick={() => { if(theme === "dark") toggle(); }}
                >
                  Light
                </button>
                <button
                  className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
                  style={{ 
                    background: theme === "dark" ? "var(--bg-card)" : "transparent",
                    color: theme === "dark" ? "var(--text-primary)" : "var(--text-muted)",
                    boxShadow: theme === "dark" ? "var(--shadow-sm)" : "none"
                  }}
                  onClick={() => { if(theme === "light") toggle(); }}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>

          <div 
            className="rounded-3xl p-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Health Profile</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Dietary Preference</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors appearance-none"
                  style={{ 
                    background: "var(--bg-hover)", 
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)"
                  }}
                  defaultValue="vegetarian"
                >
                  <option value="none">No specific diet</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Pre-existing Conditions</label>
                <button 
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors text-left"
                  style={{ 
                    background: "var(--bg-hover)", 
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)"
                  }}
                >
                  <span>Hypertension, Non-smoker</span>
                  <ChevronRight className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--primary)" }}
              >
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="p-4 rounded-xl flex items-start gap-4" style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
             <Lock className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--danger)" }} />
             <div>
               <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--danger)" }}>Delete Account Data</h4>
               <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                 Permanently delete all your reports, symptoms, and health profile data. This action cannot be undone.
               </p>
               <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: "var(--danger)" }}>
                 Delete Data
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
