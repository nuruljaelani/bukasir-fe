"use client";

import React from "react";
import {
  TrendingUp,
  Receipt,
  QrCode,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { SalesAnalytics } from "../data/ownerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface OverviewTabProps {
  analytics: SalesAnalytics;
  onNavigateToMasterData: () => void;
  onNavigateToShifts: () => void;
}

export default function OverviewTab({
  analytics,
  onNavigateToMasterData,
  onNavigateToShifts,
}: OverviewTabProps) {
  const maxRevenue = Math.max(...analytics.weeklyTrend.map((t) => t.revenue));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Alert / Highlights */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[#111827] bg-[#ECFDF5] neo-shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#111827]">
                Performa Penjualan Meningkat Tajam! 🚀
              </span>
              <StickerBadge variant="mint" rotate={-1} className="text-[9px] py-0.2 px-2">
                +{analytics.growthPercent}% vs Kemarin
              </StickerBadge>
            </div>
            <p className="text-xs text-gray-600 font-medium mt-0.5">
              Target harian Rp 4.500.000 telah tercapai pada pukul 14:15 WIB.
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToShifts}
          className="px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-white font-extrabold text-xs text-[#111827] hover:bg-gray-50 flex items-center gap-1.5 transition-all self-end sm:self-auto"
        >
          <span>Pantau Shift Kasir</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Omset Hari Ini */}
        <div className="p-5 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Omset Hari Ini</span>
            <span className="p-2 rounded-xl bg-[#D1FAE5] text-[#059669] border border-[#10B981]/40">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#111827] font-mono tracking-tight">
              Rp {analytics.todayRevenue.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[#059669]">
              <span>↑ +{analytics.growthPercent}%</span>
              <span className="text-gray-400 font-normal">
                (Kemarin Rp {analytics.yesterdayRevenue.toLocaleString("id-ID")})
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Transaksi & Basket Size */}
        <div className="p-5 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Transaksi</span>
            <span className="p-2 rounded-xl bg-[#FEF3C7] text-[#D97706] border border-[#FBBF24]/40">
              <Receipt className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#111827] font-mono tracking-tight">
              {analytics.todayTransactions}{" "}
              <span className="text-sm font-bold text-gray-500 font-sans">Pesanan</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 font-medium">
              Rata-rata belanja:{" "}
              <strong className="text-[#111827] font-mono">
                Rp {analytics.avgBasketSize.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>
        </div>

        {/* Card 3: Dominasi QRIS */}
        <div className="p-5 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Metode Bayar</span>
            <span className="p-2 rounded-xl bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]/40">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#111827] font-mono tracking-tight">
              {analytics.paymentMethods.qris}%{" "}
              <span className="text-sm font-bold text-[#0284C7] font-sans">QRIS</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs font-bold text-gray-600">
              <span>💵 Tunai {analytics.paymentMethods.cash}%</span>
              <span>•</span>
              <span>💳 Debit {analytics.paymentMethods.debit}%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Restock Warning */}
        <div className="p-5 rounded-2xl border-2 border-[#111827] bg-[#FFFBEB] neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Peringatan Stok
            </span>
            <span className="p-2 rounded-xl bg-[#FDE68A] text-[#B45309] border border-[#F59E0B]/40">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#B45309] font-mono tracking-tight">
              3 Menu{" "}
              <span className="text-xs font-bold text-gray-600 font-sans">Hampir Habis</span>
            </div>
            <button
              onClick={onNavigateToMasterData}
              className="mt-2 text-xs font-extrabold text-[#D97706] hover:underline flex items-center gap-1"
            >
              <span>Restock Sekarang</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Trend Chart & Top Selling Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Chart (Col 7) */}
        <div className="lg:col-span-7 p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-base text-[#111827]">
                Grafik Penjualan 7 Hari Terakhir
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                Puncak omset terjadi pada hari Sabtu (Rp 6.400.000)
              </span>
            </div>
            <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-mono font-bold text-gray-700">
              Minggu Ini
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 pt-6 px-2">
            {analytics.weeklyTrend.map((item, idx) => {
              const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
              const isToday = item.day === "Min";

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <span className="text-[10px] font-mono font-extrabold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-1.5 py-0.5 rounded border border-gray-300 shadow-xs">
                    {(item.revenue / 1000000).toFixed(1)}jt
                  </span>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[36px] rounded-t-xl border-2 border-[#111827] transition-all duration-300 group-hover:brightness-110 ${
                      isToday
                        ? "bg-[#10B981] neo-shadow-sm"
                        : "bg-[#FDE68A] hover:bg-[#FBBF24]"
                    }`}
                  />

                  {/* Label */}
                  <span
                    className={`text-xs font-extrabold font-mono mt-1 ${
                      isToday ? "text-[#059669]" : "text-gray-600"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Selling Products List (Col 5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FF6B4A]" />
              <h3 className="font-extrabold text-base text-[#111827]">
                Menu Paling Laris Hari Ini
              </h3>
            </div>
            <span className="text-xs font-bold text-gray-500">Top 5</span>
          </div>

          {/* Product Ranking items */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            {analytics.topSelling.map((prod, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-gray-200 bg-[#FBF9F5] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-lg shrink-0">
                    {prod.emoji}
                  </div>
                  <div className="truncate">
                    <span className="font-extrabold text-[#111827] block truncate">
                      {prod.name}
                    </span>
                    <span className="text-gray-500 text-[11px]">{prod.category}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-[#10B981] font-mono block">
                    {prod.soldQty} Porsi
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">
                    Rp {prod.totalRevenue.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
