"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  QrCode,
  Printer,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
} from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";
import ReceiptEdge from "../ornaments/ReceiptEdge";
import FloatingOrderPill from "../ornaments/FloatingOrderPill";

interface DemoItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

const initialMenuItems = [
  { id: "1", name: "Kopi Susu Tokova", price: 18000, emoji: "☕" },
  { id: "2", name: "Croissant Butter", price: 25000, emoji: "🥐" },
  { id: "3", name: "Matcha Latte Oat", price: 28000, emoji: "🍵" },
  { id: "4", name: "Kentang Goreng Truffle", price: 22000, emoji: "🍟" },
];

export default function HeroSection() {
  const [cart, setCart] = useState<DemoItem[]>([
    { id: "1", name: "Kopi Susu Tokova", price: 18000, qty: 2, emoji: "☕" },
    { id: "2", name: "Croissant Butter", price: 25000, qty: 1, emoji: "🥐" },
  ]);

  const addItem = (item: (typeof initialMenuItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.qty + delta;
            return nextQty > 0 ? { ...i, qty: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as DemoItem[]
    );
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b-2 border-[#111827]">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-receipt-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FBBF24]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Floating Badge & Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <StickerBadge variant="yellow" rotate={-2} withSparkle>
                Aplikasi Kasir POS No. 1 UMKM
              </StickerBadge>
              <div className="hidden sm:block">
                <FloatingOrderPill />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.1]">
              Aplikasi Kasir yang Bikin Antrean Toko & Kafemu{" "}
              <span className="relative inline-block text-white bg-[#10B981] px-3 py-1 rounded-xl border-2 border-[#111827] neo-shadow -rotate-1 mx-1">
                Sat-Set! ⚡
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[#4B5563] max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Tinggalkan buku nota kusam dan kasir lambat. Tokova hadir dengan tampilan super <em>catchy</em>, transaksi QRIS otomatis, cetak struk bluetooth, dan rekap omset harian langsung di genggamanmu.
            </p>

            {/* Micro Benefits list */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-sm font-bold text-[#111827]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Bisa di HP, Tablet, Laptop
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Support QRIS Statis & Dinamis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Siap Pakai Dalam 2 Menit
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/pos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold text-base sm:text-lg neo-shadow neo-shadow-hover transition-all group"
              >
                <span>Coba Demo Kasir POS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => {
                  document.getElementById("harga")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-[#111827] bg-white text-[#111827] font-extrabold text-base neo-shadow neo-shadow-hover transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <span>Mulai Coba 14 Hari</span>
              </button>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#4B5563]">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#111827] bg-[#FBBF24] text-xs font-bold">☕</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#111827] bg-[#38BDF8] text-xs font-bold">🥐</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#111827] bg-[#10B981] text-xs font-bold">👕</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#111827] bg-[#FF6B4A] text-xs font-bold">🍜</span>
              </div>
              <span>Digunakan oleh <strong>2.400+</strong> pemilik kedai kopi, distro & restoran di Indonesia</span>
            </div>
          </div>

          {/* Right Column: Interactive Live POS Preview Widget */}
          <div className="lg:col-span-5 relative">
            {/* Floating Badges on Widget */}
            <div className="absolute -top-4 -left-4 z-20 hidden sm:block animate-float">
              <StickerBadge variant="coral" rotate={-4}>
                ⚡ Klik Menu di Bawah!
              </StickerBadge>
            </div>

            <div className="absolute -bottom-5 -right-3 z-20 hidden sm:block animate-float-delayed">
              <StickerBadge variant="mint" rotate={3}>
                🧾 Struk Otomatis Terkalkulasi
              </StickerBadge>
            </div>

            {/* Main Interactive Widget Container */}
            <div className="bg-white rounded-3xl border-3 border-[#111827] neo-shadow-lg p-5 sm:p-6 overflow-hidden relative">
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border border-[#111827]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FBBF24] border border-[#111827]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-[#111827]" />
                  <span className="ml-2 font-extrabold text-xs text-[#111827] tracking-tight">
                    SIMULASI KASIR LANGSUNG
                  </span>
                </div>
                <Link
                  href="/pos"
                  className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1"
                >
                  Buka Full POS <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Quick Menu Picker Buttons */}
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  Pilih Menu untuk Menambah Pesanan:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {initialMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addItem(item)}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-[#111827] bg-[#FBF9F5] hover:bg-[#D1FAE5] text-left transition-all text-xs font-bold active:scale-95"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-base">{item.emoji}</span>
                        <span className="truncate text-[#111827]">{item.name}</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Digital Receipt Box */}
              <div className="bg-[#FBF9F5] rounded-2xl border-2 border-[#111827] p-4 text-xs font-mono">
                <div className="text-center pb-2 border-b border-dashed border-gray-300">
                  <div className="font-extrabold text-[#111827] text-sm">TOKOVA COFFEE & EATERY</div>
                  <div className="text-[11px] text-gray-500">Nota Pesanan #TK-8839 • Meja 03</div>
                </div>

                {/* Items in Cart */}
                <div className="py-2.5 space-y-2 max-h-40 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="py-4 text-center text-gray-400 font-sans italic text-xs">
                      Keranjang kosong. Klik salah satu menu di atas!
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-2 font-sans">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-bold text-[#111827] truncate">
                            {item.emoji} {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 font-mono">
                          <div className="flex items-center border border-gray-300 rounded-md bg-white">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="p-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-1.5 font-bold text-xs">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="p-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="font-bold text-[#111827] text-xs">
                            Rp {(item.price * item.qty).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="pt-2 border-t border-dashed border-gray-300 space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Pajak (10%):</span>
                    <span>Rp {tax.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm text-[#111827] pt-1 border-t border-gray-200 font-mono">
                    <span>TOTAL BAYAR:</span>
                    <span className="text-[#059669]">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Receipt Zig-Zag Edge */}
              <ReceiptEdge fillColor="#FBF9F5" teethCount={16} className="-mt-0.5" />

              {/* Quick Checkout Simulator Action */}
              <div className="mt-4 pt-2 flex items-center gap-2">
                <Link
                  href="/pos"
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-xs sm:text-sm text-center neo-shadow-sm neo-shadow-hover transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Bayar QRIS / Tunai di Full POS</span>
                </Link>
                <button
                  onClick={() => setCart([])}
                  title="Reset Keranjang"
                  className="p-3 rounded-xl border-2 border-[#111827] bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
