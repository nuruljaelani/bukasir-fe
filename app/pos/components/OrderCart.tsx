"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  X,
  ChevronUp,
  Tag,
  Percent,
  Sparkles,
  Zap,
  Check,
  AlertCircle,
} from "lucide-react";
import { CartItem } from "../data/mockData";
import { AppliedDiscount, INITIAL_PROMOS, PromoRule } from "@/app/owner/data/promoMockData";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface OrderCartProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onClearCart: () => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  customerName: string;
  setCustomerName: (val: string) => void;
  onProceedToPayment: () => void;
  orderType: "dine-in" | "take-away";
  appliedDiscount: AppliedDiscount | null;
  onApplyDiscount: (discount: AppliedDiscount | null) => void;
  discountAmount: number;
}

export default function OrderCart({
  cart,
  onUpdateQty,
  onClearCart,
  tableNumber,
  setTableNumber,
  customerName,
  setCustomerName,
  onProceedToPayment,
  orderType,
  appliedDiscount,
  onApplyDiscount,
  discountAmount,
}: OrderCartProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.qty,
    0
  );
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.1); // PB1 10%
  const total = taxableAmount + tax;
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

  // Apply Voucher by typing code
  const handleApplyVoucherCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;

    const found = INITIAL_PROMOS.find(
      (p) => p.code?.toUpperCase() === code && p.isActive
    );

    if (!found) {
      setPromoError("Kode kupon tidak valid atau sudah kadaluarsa.");
      return;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      setPromoError(
        `Minimal belanja untuk kupon ini adalah Rp ${found.minSpend.toLocaleString("id-ID")}. Kurang Rp ${(found.minSpend - subtotal).toLocaleString("id-ID")}`
      );
      return;
    }

    applyPromoRule(found);
    setVoucherInput("");
    setIsPromoModalOpen(false);
  };

  // Apply a specific promo rule
  const applyPromoRule = (promo: PromoRule) => {
    setPromoError(null);
    if (promo.minSpend && subtotal < promo.minSpend) {
      setPromoError(
        `Belanja belum mencapai syarat minimal Rp ${promo.minSpend.toLocaleString("id-ID")}`
      );
      return;
    }

    let calculated = 0;
    if (promo.type === "percentage") {
      calculated = Math.round(subtotal * (promo.value / 100));
      if (promo.maxDiscount && calculated > promo.maxDiscount) {
        calculated = promo.maxDiscount;
      }
    } else {
      calculated = promo.value;
    }

    onApplyDiscount({
      id: promo.id,
      name: promo.name,
      code: promo.code,
      type: promo.type,
      value: promo.value,
      calculatedAmount: calculated,
    });
    setIsPromoModalOpen(false);
  };

  // Apply manual quick discount
  const handleApplyManualDiscount = (type: "percent" | "fixed", value: number) => {
    let calculated = 0;
    let name = "";
    if (type === "percent") {
      calculated = Math.round(subtotal * (value / 100));
      name = `Diskon Kasir ${value}%`;
    } else {
      calculated = value;
      name = `Potongan Langsung Rp ${value.toLocaleString("id-ID")}`;
    }

    onApplyDiscount({
      id: `MANUAL-${Date.now()}`,
      name,
      type: type === "percent" ? "percentage" : "fixed_amount",
      value,
      calculatedAmount: Math.min(calculated, subtotal),
    });
    setIsPromoModalOpen(false);
  };

  // Reusable cart content
  const cartContent = (
    <div className="flex flex-col h-full">
      {/* Cart Header */}
      <div className="p-4 border-b-2 border-[#111827] flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B4A] text-white flex items-center justify-center font-bold">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[#111827]">
              Pesanan Kasir ({totalItems} Item)
            </h3>
            <span className="text-[11px] text-gray-500 font-semibold">
              {orderType === "dine-in" ? "🍽️ Makan di Tempat" : "🛍️ Bungkus (Take-Away)"}
            </span>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 p-1 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Customer & Table Inputs */}
      <div className="p-3 bg-[#FBF9F5] border-b-2 border-[#111827] grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="font-bold text-gray-600 block mb-0.5">Nama Pelanggan:</label>
          <input
            type="text"
            placeholder="Contoh: Kak Dika"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-300 focus:border-[#111827] bg-white font-medium outline-none"
          />
        </div>
        <div>
          <label className="font-bold text-gray-600 block mb-0.5">
            {orderType === "dine-in" ? "No. Meja:" : "No. Antrian:"}
          </label>
          <input
            type="text"
            placeholder={orderType === "dine-in" ? "Meja 04" : "Antrian A-12"}
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border-2 border-gray-300 focus:border-[#111827] bg-white font-bold outline-none"
          />
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-2">
            <ShoppingBag className="w-12 h-12 stroke-[1.5] text-gray-300 animate-bounce" />
            <p className="font-bold text-sm text-gray-500">Keranjang Masih Kosong</p>
            <p className="text-xs text-gray-400 max-w-50">
              Pilih produk dari katalog untuk menambah pesanan pelanggan.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.product.id}
              className="p-3 rounded-xl border-2 border-[#111827] bg-white neo-shadow-xs flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-2xl shrink-0 p-1 rounded-lg bg-[#FBF9F5] border border-gray-200">
                  {item.product.emoji}
                </span>
                <div className="min-w-0">
                  <h4 className="font-black text-[#111827] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-gray-500 font-mono">
                    @ Rp {item.product.price.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#111827] rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => onUpdateQty(item.product.id, -1)}
                    className="p-1 hover:bg-gray-100 text-gray-700"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 font-mono font-extrabold text-xs">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.product.id, 1)}
                    className="p-1 hover:bg-gray-100 text-gray-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <span className="font-extrabold text-[#111827] font-mono w-16 text-right">
                  Rp {(item.product.price * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promo & Voucher Section */}
      {cart.length > 0 && (
        <div className="px-4 py-2.5 bg-[#FBF9F5] border-t-2 border-[#111827]">
          {appliedDiscount ? (
            <div className="p-2.5 rounded-xl bg-[#D1FAE5] border-2 border-[#059669] flex items-center justify-between text-xs animate-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#059669] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-[#111827]">{appliedDiscount.name}</span>
                    {appliedDiscount.code && (
                      <span className="text-[9px] font-mono font-black bg-[#111827] text-white px-1.5 py-0.2 rounded">
                        {appliedDiscount.code}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#059669] font-bold block">
                    Hemat - Rp {discountAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onApplyDiscount(null)}
                className="p-1 rounded-lg hover:bg-white text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                title="Batalkan Promo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsPromoModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl border-2 border-dashed border-[#111827] bg-white hover:bg-[#FEF3C7] text-[#111827] font-extrabold text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#FF6B4A]" />
                <span>Gunakan Promo / Kode Kupon</span>
              </div>
              <span className="text-[10px] font-bold bg-[#10B981] text-white px-2 py-0.5 rounded-full">
                Ada Promo ⚡
              </span>
            </button>
          )}
        </div>
      )}

      {/* Calculation & Bill Breakdown */}
      <div className="p-4 bg-[#FBF9F5] border-t-2 border-[#111827] space-y-2 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} item):</span>
          <span className="font-mono">Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-[#059669] font-black">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diskon Promo:</span>
            </span>
            <span className="font-mono">- Rp {discountAmount.toLocaleString("id-ID")}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>PB1 Resto / PPN (10%):</span>
          <span className="font-mono">Rp {tax.toLocaleString("id-ID")}</span>
        </div>

        <div className="pt-2 border-t-2 border-[#111827] flex justify-between items-baseline">
          <span className="font-extrabold text-sm text-[#111827]">TOTAL BAYAR:</span>
          <span className="font-black text-xl text-[#059669] font-mono">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          disabled={cart.length === 0}
          onClick={() => {
            setMobileDrawerOpen(false);
            onProceedToPayment();
          }}
          className={`w-full mt-2 py-3.5 px-4 rounded-xl border-2 border-[#111827] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            cart.length > 0
              ? "bg-[#10B981] text-white neo-shadow neo-shadow-hover cursor-pointer"
              : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>Bayar Sekarang (Rp {total.toLocaleString("id-ID")})</span>
        </button>
      </div>

      <ReceiptEdge fillColor="#FBF9F5" teethCount={16} className="-mt-0.5" />

      {/* Promo & Voucher Modal */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#111827] p-5 sm:p-6 neo-shadow space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#FF6B4A]" />
                <h3 className="font-black text-base text-[#111827]">
                  Pilih Promo / Kode Kupon
                </h3>
              </div>
              <button
                onClick={() => setIsPromoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Voucher Code Form */}
            <form onSubmit={handleApplyVoucherCode} className="space-y-2">
              <label className="font-bold text-gray-700 block">Punya Kode Voucher?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: HEMAT20"
                  value={voucherInput}
                  onChange={(e) => {
                    setVoucherInput(e.target.value.toUpperCase());
                    setPromoError(null);
                  }}
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold uppercase outline-none focus:bg-[#FEF3C7]/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#111827] text-white font-black hover:bg-[#10B981] transition-colors cursor-pointer"
                >
                  Terapkan
                </button>
              </div>
              {promoError && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{promoError}</span>
                </div>
              )}
            </form>

            {/* Manual Quick Discounts */}
            <div className="pt-2 border-t border-dashed border-gray-200 space-y-2">
              <span className="font-bold text-gray-500 block uppercase text-[10px]">
                Diskon Manual Kasir:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleApplyManualDiscount("percent", pct)}
                    className="py-2 rounded-xl border-2 border-gray-300 hover:border-[#111827] bg-[#FBF9F5] font-black text-xs hover:bg-[#10B981] hover:text-white transition-all cursor-pointer"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[5000, 10000].map((nominal) => (
                  <button
                    key={nominal}
                    type="button"
                    onClick={() => handleApplyManualDiscount("fixed", nominal)}
                    className="py-2 rounded-xl border-2 border-gray-300 hover:border-[#111827] bg-[#FBF9F5] font-bold text-xs hover:bg-[#FF6B4A] hover:text-white transition-all cursor-pointer"
                  >
                    - Rp {nominal.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Store Promos */}
            <div className="pt-3 border-t border-dashed border-gray-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-500 uppercase text-[10px]">
                  Promo Tersedia ({INITIAL_PROMOS.filter((p) => p.isActive).length}):
                </span>
                <span className="text-[10px] text-gray-400 font-medium">Subtotal: Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {INITIAL_PROMOS.filter((p) => p.isActive).map((promo) => {
                  const isEligible = !promo.minSpend || subtotal >= promo.minSpend;

                  return (
                    <div
                      key={promo.id}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isEligible
                          ? "border-[#111827] bg-white hover:bg-[#FBF9F5]"
                          : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-[#111827] text-xs">
                            {promo.name}
                          </span>
                          {promo.code && (
                            <span className="text-[9px] font-mono font-black bg-[#111827] text-white px-1.5 py-0.2 rounded">
                              {promo.code}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500">{promo.description}</p>
                        {!isEligible && promo.minSpend && (
                          <span className="text-[10px] text-amber-700 font-bold block">
                            Kurang Rp {(promo.minSpend - subtotal).toLocaleString("id-ID")} lagi
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={!isEligible}
                        onClick={() => applyPromoRule(promo)}
                        className={`px-3 py-1.5 rounded-xl border-2 font-black text-xs shrink-0 transition-all ${
                          isEligible
                            ? "border-[#111827] bg-[#10B981] text-white neo-shadow-xs hover:scale-102 cursor-pointer"
                            : "border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Pakai
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex flex-col w-96 h-[calc(100vh-65px)] sticky top-16.25 bg-white border-l-2 border-[#111827] shrink-0">
        {cartContent}
      </aside>

      {/* Mobile Floating Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#111827] p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 text-left"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6B4A] text-white text-[10px] font-black flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </div>
            <div>
              <div className="font-extrabold text-xs text-[#111827]">
                {totalItems} Item
              </div>
              <div className="font-black text-sm text-[#059669] font-mono">
                Rp {total.toLocaleString("id-ID")}
              </div>
            </div>
          </button>

          <button
            disabled={cart.length === 0}
            onClick={() => setMobileDrawerOpen(true)}
            className="py-2.5 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-xs flex items-center gap-1.5 neo-shadow-sm"
          >
            <span>Buka Struk Pesanan</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Cart Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="w-full h-[90vh] bg-white rounded-t-3xl border-t-2 border-x-2 border-[#111827] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-center p-2 bg-[#FBF9F5] border-b border-gray-200">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-12 h-1.5 bg-gray-300 rounded-full"
              />
            </div>
            <div className="flex-1 overflow-hidden">{cartContent}</div>
          </div>
        </div>
      )}
    </>
  );
}
