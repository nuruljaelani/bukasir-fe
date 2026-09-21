"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Coffee, ShoppingBag, Utensils } from "lucide-react";

const sampleOrders = [
  { icon: Coffee, text: "2x Kopi Susu Tokova", amount: "Rp 36.000", table: "Meja 04", method: "QRIS" },
  { icon: Utensils, text: "1x Nasi Goreng Spesial", amount: "Rp 32.000", table: "Meja 02", method: "Tunai" },
  { icon: ShoppingBag, text: "3x Croissant Butter", amount: "Rp 75.000", table: "Take Away", method: "QRIS" },
  { icon: Coffee, text: "1x Matcha Latte Oat", amount: "Rp 28.000", table: "Meja 07", method: "Debit" },
];

export default function FloatingOrderPill() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % sampleOrders.length);
        setIsVisible(true);
      }, 400);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const current = sampleOrders[index];
  const Icon = current.icon;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#111827] neo-shadow-sm transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#D1FAE5] border border-[#10B981] flex items-center justify-center text-[#059669]">
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-left text-xs leading-tight">
        <div className="flex items-center gap-1.5 font-bold text-[#111827]">
          <span>{current.text}</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-[#FFEDD5] text-[#EA580C] font-extrabold rounded-md border border-[#EA580C]/30">
            {current.table}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
          <span className="font-semibold text-[#059669]">{current.amount}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3 h-3 inline" /> Lunas {current.method}
          </span>
        </div>
      </div>
    </div>
  );
}
