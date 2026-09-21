"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter UMKM",
      badge: "Untuk Usaha Mikro",
      badgeColor: "white" as const,
      priceMonthly: 59000,
      priceAnnual: 49000,
      description: "Pilihan hemat untuk warung, booth minuman, dan toko kelontong permulaan.",
      features: [
        "1 Akun Kasir",
        "Hingga 150 Menu / Produk",
        "Transaksi Tunai & QRIS Statis",
        "Cetak Struk Bluetooth 58mm",
        "Rekap Laporan Mingguan",
      ],
      isPopular: false,
      buttonText: "Mulai Paket Starter",
    },
    {
      name: "Pro Kafe & Resto",
      badge: "Paling Laris ⚡",
      badgeColor: "yellow" as const,
      priceMonthly: 119000,
      priceAnnual: 99000,
      description: "Paling ideal untuk kafe, resto, bakery, distro fashion, dan kedai kekinian.",
      features: [
        "Kasir Tak Terbatas (Multi-Device)",
        "Katalog Produk & Varian Unlimited",
        "QRIS Dinamis Otomatis Verifikasi",
        "Manajemen Meja & Dine-In / Take Away",
        "Struk WhatsApp & Struk Cetak Logo",
        "Laporan Omset & Stok Real-Time",
        "Support Prioritas WhatsApp 24/7",
      ],
      isPopular: true,
      buttonText: "Mulai Uji Coba Gratis 14 Hari",
    },
    {
      name: "Multi-Outlet",
      badge: "Banyak Cabang",
      badgeColor: "sky" as const,
      priceMonthly: 239000,
      priceAnnual: 199000,
      description: "Untuk bisnis berkembang yang punya 2 hingga 5 cabang terpisah.",
      features: [
        "Semua fitur paket Pro",
        "Kelola hingga 5 Outlet / Cabang",
        "Transfer Stok Antar-Cabang",
        "Hak Akses Kasir, Manajer & Owner",
        "Integrasi Akuntansi & Export Excel",
        "Dedicated Account Manager",
      ],
      isPopular: false,
      buttonText: "Hubungi Tim Bisnis",
    },
  ];

  return (
    <section id="harga" className="py-20 lg:py-28 bg-[#FBF9F5] border-b-2 border-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-block">
            <StickerBadge variant="mint" rotate={-1} withSparkle>
              Investasi Terjangkau
            </StickerBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Langganan Kasir Tanpa Beban,{" "}
            <span className="text-[#EA580C]">Bisa Batal Kapan Saja</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Tanpa potongan biaya per transaksi yang mencekik. Cukup satu biaya langganan bulanan murah untuk seluruh operasional tokomu.
          </p>

          {/* Billing Frequency Switch */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl border-2 border-[#111827] text-xs sm:text-sm font-extrabold transition-all ${
                !isAnnual
                  ? "bg-[#111827] text-white neo-shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#111827] text-xs sm:text-sm font-extrabold transition-all ${
                isAnnual
                  ? "bg-[#10B981] text-white neo-shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>Bayar Tahunan</span>
              <span className="bg-[#FBBF24] text-[#111827] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#111827]">
                HEMAT 20% ⚡
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={idx}
                className={`rounded-3xl border-3 border-[#111827] p-8 flex flex-col justify-between relative transition-all ${
                  plan.isPopular
                    ? "bg-white neo-shadow-lg lg:-translate-y-4 ring-4 ring-[#10B981]/20"
                    : "bg-white/80 neo-shadow"
                }`}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <StickerBadge variant="yellow" rotate={-1}>
                      ⚡ PALING BANYAK DIPILIH
                    </StickerBadge>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-[#111827]">{plan.name}</h3>
                    <StickerBadge variant={plan.badgeColor} rotate={2} className="text-[10px]">
                      {plan.badge}
                    </StickerBadge>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="pb-6 mb-6 border-b-2 border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-gray-500 uppercase font-mono">Rp</span>
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#111827] font-mono tracking-tight">
                        {price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-xs font-bold text-gray-500 font-mono">/bulan</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium block mt-1">
                      {isAnnual ? "Ditagih tahunan (Garansi uang kembali 30 hari)" : "Ditagih per bulan tanpa komitmen"}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-gray-800">
                        <div className="w-5 h-5 rounded-full bg-[#D1FAE5] border border-[#10B981] flex items-center justify-center text-[#059669] shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action CTA */}
                <div>
                  <Link
                    href="/pos"
                    className={`w-full py-3.5 px-6 rounded-2xl border-2 border-[#111827] font-extrabold text-sm sm:text-base text-center transition-all flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover ${
                      plan.isPopular
                        ? "bg-[#FF6B4A] text-white"
                        : "bg-[#FBF9F5] hover:bg-[#D1FAE5] text-[#111827]"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
