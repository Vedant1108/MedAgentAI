"use client";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    isNeutral?: boolean;
  };
  delay?: number;
}

export function StatCard({ title, value, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="p-5 rounded-2xl flex flex-col gap-3"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {title}
        </span>
        <div 
          className="h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ background: "var(--bg-hover)", color: "var(--text-secondary)" }}
        >
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-3 mt-1">
        <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          {value}
        </span>
        
        {trend && (
          <div 
            className="flex items-center gap-1 text-sm font-medium mb-1 px-1.5 py-0.5 rounded-md"
            style={{ 
              color: trend.isNeutral ? "var(--text-muted)" : (trend.isPositive ? "var(--primary)" : "var(--danger)"),
              background: trend.isNeutral ? "var(--bg-hover)" : (trend.isPositive ? "var(--primary-muted)" : "rgba(239,68,68,0.1)"),
            }}
          >
            {trend.isNeutral ? (
              <Minus className="h-3.5 w-3.5" />
            ) : trend.isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
