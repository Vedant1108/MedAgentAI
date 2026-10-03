import { HeroSection } from "@/components/ui/hero-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MedAgent AI — Analyze Medical Reports Privately",
  description: "Upload your lab PDF and get instant AI analysis of every parameter in plain language. Your report is never used to train AI.",
};

export default function LandingPage() {
  return <HeroSection />;
}
