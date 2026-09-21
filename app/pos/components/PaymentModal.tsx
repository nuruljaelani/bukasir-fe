"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  QrCode,
  Banknote,
  CheckCircle2,
  Printer,
  Share2,
  RotateCcw,
  X,
  Sparkles,
} from "lucide-react";
import { CartItem } from "../data/mockData";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";

import { AppliedDiscount } from "@/app/owner/data/promoMockData";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tableNumber: string;
  customerName: string;
  orderType: "dine-in" | "take-away";
  onCompleteTransaction: () => void;
  appliedDiscount?: AppliedDiscount | null;
  discountAmount?: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  cart,
  tableNumber,
  customerName,
  orderType,
  onCompleteTransaction,
  appliedDiscount,
  discountAmount = 0,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"qris" | "cash">("qris");
  const [cashTendered, setCashTendered] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [orderNumber] = useState(
    () => `TK-${Math.floor(1000 + Math.random() * 9000)}`
  );

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.qty,
    0
  );
  const discount = discountAmount || 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.1);
  const total = taxableAmount + tax;
  const change = Math.max(0, cashTendered - total);
  const isCashSufficient = cashTendered >= total;

  const triggerSuccess = () => {
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#FF6B4A", "#FBBF24", "#38BDF8"],
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert("Struk berhasil dikirim ke printer Bluetooth Tokova!");
    }, 1200);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setCashTendered(0);
    onCompleteTransaction();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-md w-full neo-shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Close button if not finished */}
        {!isSuccess && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-gray-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b-2 border-[#111827] bg-[#FBF9F5] text-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Total Tagihan Kasir
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] font-mono tracking-tight">
                Rp {total.toLocaleString("id-ID")}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs font-semibold text-gray-600">
                <span>{tableNumber || (orderType === "dine-in" ? "Meja 01" : "Take-Away")}</span>
                <span>•</span>
                <span>{customerName || "Pelanggan Umum"}</span>
              </div>
              {discount > 0 && (
                <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#059669] border border-[#059669] text-xs font-bold">
                  Hemat Rp {discount.toLocaleString("id-ID")} {appliedDiscount?.code ? `(${appliedDiscount.code})` : ""}
                </div>
              )}
            </div>

            {/* Payment Method Tabs */}
            <div className="p-4 border-b border-gray-200 grid grid-cols-2 gap-2 bg-white">
              <button
                onClick={() => setMethod("qris")}
                className={`py-2.5 px-3 rounded-xl border-2 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  method === "qris"
                    ? "bg-[#10B981] text-white border-[#111827] neo-shadow-sm"
                    : "bg-[#FBF9F5] text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>QRIS Dinamis</span>
              </button>
              <button
                onClick={() => setMethod("cash")}
                className={`py-2.5 px-3 rounded-xl border-2 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  method === "cash"
                    ? "bg-[#FF6B4A] text-white border-[#111827] neo-shadow-sm"
                    : "bg-[#FBF9F5] text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Uang Tunai</span>
              </button>
            </div>

            {/* Tab 1: QRIS Content */}
            {method === "qris" && (
              <div className="p-6 text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-2xl border-2 border-[#111827] neo-shadow-sm">
                  <div className="w-44 h-44 mx-auto flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 relative p-2">
                    <QrCode className="w-36 h-36 text-[#111827]" />
                    <span className="text-[10px] font-black text-[#059669] tracking-wider uppercase">
                      QRIS DINAMIS • {orderNumber}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#111827]">
                    Arahkan pelanggan scan QRIS di layar atau tablet
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Support BCA, Mandiri, BRI, GoPay, OVO, DANA, ShopeePay
                  </p>
                </div>

                <button
                  onClick={triggerSuccess}
                  className="w-full py-3.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-sm neo-shadow neo-shadow-hover flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                  <span>Simulasi: Pembayaran Terdeteksi Berhasil</span>
                </button>
              </div>
            )}

            {/* Tab 2: Cash Content */}
            {method === "cash" && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Nominal Uang Diterima dari Pelanggan:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={cashTendered || ""}
                      onChange={(e) => setCashTendered(Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-extrabold text-lg focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Quick cash denomination buttons */}
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1.5">
                    Tombol Cepat:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setCashTendered(total)}
                      className="p-2 rounded-lg border border-[#111827] bg-[#D1FAE5] font-extrabold text-xs text-[#059669] hover:bg-[#A7F3D0]"
                    >
                      Uang Pas
                    </button>
                    {[50000, 100000, 200000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setCashTendered(amt)}
                        className="p-2 rounded-lg border border-gray-300 hover:border-[#111827] bg-white font-mono font-bold text-xs hover:bg-gray-50"
                      >
                        {amt / 1000}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kembalian box */}
                <div className="p-3 bg-[#FBF9F5] rounded-xl border-2 border-[#111827] flex items-center justify-between font-mono">
                  <span className="text-xs font-bold text-gray-600">UANG KEMBALIAN:</span>
                  <span
                    className={`text-lg font-black ${
                      isCashSufficient ? "text-[#059669]" : "text-gray-400"
                    }`}
                  >
                    Rp {change.toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  disabled={!isCashSufficient}
                  onClick={triggerSuccess}
                  className={`w-full py-3.5 rounded-xl border-2 border-[#111827] font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                    isCashSufficient
                      ? "bg-[#10B981] text-white neo-shadow neo-shadow-hover cursor-pointer"
                      : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Konfirmasi Pembayaran Tunai</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Transaction Successful View with Authentic Sawtooth Receipt */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D1FAE5] border-2 border-[#10B981] mx-auto flex items-center justify-center text-[#059669]">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <StickerBadge variant="mint" rotate={-1}>
                PEMBAYARAN LUNAS ⚡
              </StickerBadge>
              <h3 className="text-xl font-extrabold text-[#111827] mt-2">
                Transaksi Berhasil Dicatat!
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Pesanan #{orderNumber} sudah masuk ke antrean dapur & kasir.
              </p>
            </div>

            {/* Digital Receipt Card */}
            <div className="bg-[#FBF9F5] rounded-2xl border-2 border-[#111827] p-4 text-xs font-mono text-left space-y-2">
              <div className="text-center pb-2 border-b border-dashed border-gray-300 font-sans">
                <div className="font-extrabold text-[#111827] text-sm">
                  TOKOVA COFFEE & EATERY
                </div>
                <div className="text-[11px] text-gray-500">
                  Jl. Senopati No. 42, Jakarta Selatan
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  {new Date().toLocaleString("id-ID")} • Kasir: Budi
                </div>
              </div>

              {/* Items in receipt */}
              <div className="py-1 space-y-1 max-h-32 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between font-sans">
                    <span className="truncate">
                      {item.qty}x {item.product.name}
                    </span>
                    <span className="font-mono font-bold shrink-0">
                      Rp {(item.product.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals in receipt */}
              <div className="pt-2 border-t border-dashed border-gray-300 space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#059669] font-bold">
                    <span>Diskon {appliedDiscount?.code ? `(${appliedDiscount.code})` : ""}:</span>
                    <span className="font-mono">- Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>PB1 (10%):</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-[#111827] pt-1 border-t border-gray-300">
                  <span>TOTAL:</span>
                  <span className="text-[#059669]">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-[11px]">
                  <span>Metode:</span>
                  <span className="uppercase font-bold">
                    {method === "qris" ? "QRIS Dinamis" : "Uang Tunai"}
                  </span>
                </div>
                {method === "cash" && (
                  <div className="flex justify-between text-gray-600 text-[11px]">
                    <span>Kembalian:</span>
                    <span>Rp {change.toLocaleString("id-ID")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sawtooth Edge */}
            <ReceiptEdge fillColor="#FBF9F5" teethCount={16} className="-mt-0.5" />

            {/* Action Buttons: Print / WhatsApp / New Order */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-50 text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Printer className="w-4 h-4 text-[#059669]" />
                  <span>{isPrinting ? "Mencetak..." : "Cetak Struk"}</span>
                </button>
                <button
                  onClick={() => alert(`Struk ${orderNumber} telah disiapkan untuk WhatsApp!`)}
                  className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-50 text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-4 h-4 text-[#EA580C]" />
                  <span>Kirim WA</span>
                </button>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-sm neo-shadow neo-shadow-hover flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Transaksi Baru (Pesanan Berikutnya)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
