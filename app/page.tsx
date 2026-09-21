import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import IndustryMarquee from "@/components/landing/IndustryMarquee";
import BentoFeatures from "@/components/landing/BentoFeatures";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsReceipts from "@/components/landing/TestimonialsReceipts";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#111827] selection:bg-[#FBBF24] selection:text-[#111827]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <IndustryMarquee />
        <BentoFeatures />
        <PricingSection />
        <TestimonialsReceipts />
      </main>
      <Footer />
    </div>
  );
}
