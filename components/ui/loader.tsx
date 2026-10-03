import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loader({ size = "md", text, className = "" }: LoaderProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 
        className={`animate-spin ${sizeMap[size]}`} 
        style={{ color: "var(--primary)" }} 
      />
      {text && (
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {text}
        </p>
      )}
    </div>
  );
}

export function SkeletonRow({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`h-12 w-full rounded-xl skeleton ${className}`}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`h-32 w-full rounded-2xl skeleton ${className}`}
    />
  );
}
