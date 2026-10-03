"use client";
import { useState } from "react";
import { MenuIcon, X, HeartPulse, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ui/theme-provider";
import Link from "next/link";

const navLinks = [
  { label: "Blog",    href: "#blog" },
  { label: "Tools",   href: "#tools" },
  { label: "FAQ",     href: "#faq" },
  { label: "Pricing", href: "#pricing" },
];

export const Navbar5 = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
      <div style={{ backdropFilter: "blur(12px)", position: "absolute", inset: 0, zIndex: -1 }} />
      <div className="container mx-auto px-6 md:px-10">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg transition-colors" style={{ background: "var(--primary)" }}>
              <HeartPulse className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>MedAgent</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-primary)"; (e.target as HTMLElement).style.background = "var(--bg-hover)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-muted)"; (e.target as HTMLElement).style.background = "transparent"; }}
              >{link.label}</a>
            ))}
          </div>

          {/* Desktop CTA + theme toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: "var(--text-muted)", background: "transparent" }}
              title="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/login" className="text-sm font-medium transition-colors px-3 py-2" style={{ color: "var(--text-muted)" }}>Sign In</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 rounded-full text-white text-sm font-semibold px-5 py-2.5 transition-colors shadow-sm" style={{ background: "var(--primary)" }}>
              Get started
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg" style={{ color: "var(--text-muted)" }}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto" style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg" style={{ background: "var(--primary)" }}>
                        <HeartPulse className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-[17px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>MedAgent</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col px-4 py-6 gap-4">
                  {navLinks.map((link) => (
                    <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                      className="text-base font-medium py-1 transition-colors" style={{ color: "var(--text-secondary)" }}>
                      {link.label}
                    </a>
                  ))}
                  <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <Link href="/login" className="text-center text-sm font-medium rounded-full py-2.5" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>Sign In</Link>
                    <Link href="/dashboard" className="text-center rounded-full text-white text-sm font-semibold py-2.5" style={{ background: "var(--primary)" }}>Get started</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};
