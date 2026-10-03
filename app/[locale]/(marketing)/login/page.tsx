"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeartPulse, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-144px)] flex items-center justify-center p-6" style={{ background: "var(--bg-base)" }}>
      <div 
        className="w-full max-w-md rounded-3xl p-8"
        style={{ 
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div 
            className="flex items-center justify-center h-12 w-12 rounded-xl mb-4"
            style={{ background: "var(--primary)" }}
          >
            <HeartPulse className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
            Welcome back
          </h1>
          <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
            Sign in to access your secure health dashboard
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div 
          className="flex p-1 rounded-xl mb-8"
          style={{ background: "var(--bg-hover)" }}
        >
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'shadow-sm' : ''}`}
            style={{ 
              background: isLogin ? "var(--bg-card)" : "transparent",
              color: isLogin ? "var(--text-primary)" : "var(--text-muted)"
            }}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'shadow-sm' : ''}`}
            style={{ 
              background: !isLogin ? "var(--bg-card)" : "transparent",
              color: !isLogin ? "var(--text-primary)" : "var(--text-muted)"
            }}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full pl-4 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ 
                        background: "var(--bg-hover)", 
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-faint)" }} />
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                    style={{ 
                      background: "var(--bg-hover)", 
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Password</label>
                  {isLogin && (
                    <Link href="#" className="text-xs font-medium hover:underline" style={{ color: "var(--primary)" }}>
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-faint)" }} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                    style={{ 
                      background: "var(--bg-hover)", 
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 py-3 px-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ background: "var(--primary)" }}
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>OR CONTINUE WITH</span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            <button 
              type="button"
              className="w-full mt-6 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              style={{ 
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-surface)"}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
