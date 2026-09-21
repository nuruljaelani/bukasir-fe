"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Clock,
  User,
  Search,
  ArrowLeft,
  UtensilsCrossed,
  ShoppingBag,
  Receipt,
} from "lucide-react";

interface PosHeaderProps {
  orderType: "dine-in" | "take-away";
  setOrderType: (type: "dine-in" | "take-away") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenTransactions?: () => void;
}

export default function PosHeader({
  orderType,
  setOrderType,
  searchQuery,
  setSearchQuery,
  onOpenTransactions,
}: PosHeaderProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b-2 border-[#111827] px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left: Brand & Return */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <Link
            href="/"
            title="Kembali ke Beranda"
            className="p-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-[#111827] neo-shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-black text-sm">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-[#111827] leading-tight">
                  Tokova Coffee & Eatery
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 block leading-tight">
                Outlet Senopati • Kasir #01
              </span>
            </div>
          </div>

          {/* Action buttons & Clock for mobile */}
          <div className="lg:hidden flex items-center gap-1.5">
            <Link
              href="/pos/transactions"
              className="p-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-[#111827] flex items-center gap-1 text-xs font-black"
              title="Halaman Riwayat Transaksi"
            >
              <Receipt className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Struk</span>
            </Link>
            <div className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
              {time}
            </div>
          </div>
        </div>

        {/* Center: Search Box & Order Type Switcher */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama produk, SKU, atau scan barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#111827] bg-[#FBF9F5] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#10B981] font-medium"
            />
          </div>

          {/* Dine-In vs Take-Away Segmented Control */}
          <div className="flex items-center p-1 bg-[#F3F4F6] rounded-xl border-2 border-[#111827]">
            <button
              onClick={() => setOrderType("dine-in")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                orderType === "dine-in"
                  ? "bg-[#10B981] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>
            <button
              onClick={() => setOrderType("take-away")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                orderType === "take-away"
                  ? "bg-[#FF6B4A] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bungkus</span>
            </button>
          </div>
        </div>

        {/* Right: Cashier Badge, Transaction Button & Live Digital Clock */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/pos/transactions"
            className="flex items-center gap-1.5 bg-[#FBF9F5] hover:bg-[#D1FAE5] border-2 border-[#111827] px-3 py-1.5 rounded-xl text-xs font-extrabold text-[#111827] neo-shadow-sm transition-all"
            title="Lihat Riwayat Transaksi Shift Kasir"
          >
            <Receipt className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Riwayat Transaksi</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700 bg-[#FBF9F5] border-2 border-[#111827] px-3 py-1.5 rounded-xl neo-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2 bg-[#FEF3C7] border-2 border-[#111827] px-3 py-1.5 rounded-xl text-xs font-bold text-[#92400E]">
            <User className="w-3.5 h-3.5" />
            <span>Budi (Shift Pagi)</span>
          </div>

          <Link
            href="/owner"
            className="flex items-center gap-1.5 bg-[#FBBF24] hover:bg-[#F59E0B] border-2 border-[#111827] px-3 py-1.5 rounded-xl text-xs font-extrabold text-[#111827] neo-shadow-sm transition-all"
          >
            <span>Owner 👑</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
