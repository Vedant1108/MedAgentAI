import { Navbar5 } from "@/components/ui/navbar-5";
import { Footer } from "@/components/ui/footer-section";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Navbar5 />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
