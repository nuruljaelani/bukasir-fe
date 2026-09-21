"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Store, ArrowRight, Menu, X, Sparkles, Smartphone } from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBF9F5]/90 backdrop-blur-md border-b-2 border-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-xl bg-[#10B981] border-2 border-[#111827] neo-shadow-sm flex items-center justify-center text-white font-extrabold text-xl group-hover:rotate-6 transition-transform">
            <Store className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-[#111827]">
                tokova<span className="text-[#10B981]">.</span>
              </span>
              <StickerBadge variant="yellow" rotate={3} className="text-[10px] py-0.5 px-2">
                POS ⚡
              </StickerBadge>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#4B5563]">
              Kasir Cerdas UMKM
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-[#111827]">
          <Link href="#fitur" className="hover:text-[#10B981] transition-colors">
            Fitur Kasir
          </Link>
          <Link href="#industri" className="hover:text-[#10B981] transition-colors">
            Untuk Siapa
          </Link>
          <Link href="#harga" className="hover:text-[#10B981] transition-colors">
            Harga Paket
          </Link>
          <Link href="#testimoni" className="hover:text-[#10B981] transition-colors">
            Kata Pedagang
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/owner"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FBBF24] text-[#111827] font-bold text-xs sm:text-sm neo-shadow-sm neo-shadow-hover transition-all"
          >
            <span>Portal Owner 👑</span>
          </Link>
          <Link
            href="/pos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-bold text-xs sm:text-sm neo-shadow-sm neo-shadow-hover transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Buka Kasir POS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border-2 border-[#111827] bg-white text-[#111827] neo-shadow-sm"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-[#111827] bg-white px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-bold text-[#111827]">
            <Link
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#10B981]"
            >
              Fitur Kasir
            </Link>
            <Link
              href="#industri"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#10B981]"
            >
              Untuk Siapa
            </Link>
            <Link
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#10B981]"
            >
              Harga Paket
            </Link>
            <Link
              href="#testimoni"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#10B981]"
            >
              Kata Pedagang
            </Link>
          </nav>
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <Link
              href="/pos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold text-sm neo-shadow-sm text-center"
            >
              <Smartphone className="w-4 h-4" />
              Buka Kasir POS Sekarang
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("harga")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3 rounded-xl border-2 border-[#111827] bg-[#FBBF24] text-[#111827] font-extrabold text-sm neo-shadow-sm text-center"
            >
              Coba Gratis 14 Hari
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
