"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  DollarSign,
  PackagePlus,
  RotateCcw,
  Sliders,
  X,
} from "lucide-react";
import { Product, PRODUCTS as initialProducts } from "@/app/pos/data/mockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface StockAdjustmentModalProps {
  product: Product;
  onClose: () => void;
  onApplyAdjustment: (
    productId: string,
    type: "in" | "out" | "set",
    qty: number,
    reason: string
  ) => void;
}

function StockAdjustmentModal({
  product,
  onClose,
  onApplyAdjustment,
}: StockAdjustmentModalProps) {
  const [type, setType] = useState<"in" | "out" | "set">("in");
  const [qty, setQty] = useState<number>(10);
  const [reason, setReason] = useState("Restock Pembelian Baru");

  const calculatedNewStock = useMemo(() => {
    if (type === "in") return product.stock + Number(qty);
    if (type === "out") return Math.max(0, product.stock - Number(qty));
    return Number(qty);
  }, [type, qty, product.stock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyAdjustment(product.id, type, Number(qty), reason);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-md w-full neo-shadow-lg p-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{product.emoji}</span>
            <div>
              <h3 className="font-extrabold text-base text-[#111827]">
                Penyesuaian Stok Fisik
              </h3>
              <span className="text-[11px] font-mono text-gray-400">
                {product.sku} • {product.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Action Type: In vs Out vs Set */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setType("in")}
              className={`py-2 px-2 rounded-xl border-2 font-extrabold text-xs flex flex-col items-center gap-1 transition-all ${
                type === "in"
                  ? "bg-[#10B981] text-white border-[#111827] neo-shadow-sm"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <ArrowDownRight className="w-4 h-4 text-emerald-200" />
              <span>Stok Masuk</span>
            </button>

            <button
              type="button"
              onClick={() => setType("out")}
              className={`py-2 px-2 rounded-xl border-2 font-extrabold text-xs flex flex-col items-center gap-1 transition-all ${
                type === "out"
                  ? "bg-[#FF6B4A] text-white border-[#111827] neo-shadow-sm"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-orange-200" />
              <span>Stok Keluar</span>
            </button>

            <button
              type="button"
              onClick={() => setType("set")}
              className={`py-2 px-2 rounded-xl border-2 font-extrabold text-xs flex flex-col items-center gap-1 transition-all ${
                type === "set"
                  ? "bg-[#111827] text-white border-[#111827] neo-shadow-sm"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <Sliders className="w-4 h-4 text-gray-300" />
              <span>Opname Fisik</span>
            </button>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Jumlah Unit ({product.unit}):
            </label>
            <input
              type="number"
              min={1}
              required
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-bold text-lg"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Alasan Penyesuaian:</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium bg-white"
            >
              <option value="Restock Pembelian Baru">📥 Pembelian / Restock Suplier</option>
              <option value="Retur Barang Pelanggan">📥 Retur Kembali Pelanggan</option>
              <option value="Barang Rusak / Cacat">📤 Barang Rusak / Kadaluarsa</option>
              <option value="Barang Hilang / Selisih">📤 Barang Hilang / Selisih</option>
              <option value="Koreksi Stock Opname Bulanan">⚖️ Penyesuaian Opname Fisik</option>
            </select>
          </div>

          {/* Before and after calculation */}
          <div className="p-3 bg-[#FBF9F5] rounded-xl border border-gray-200 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-gray-400 block text-[10px]">Stok Saat Ini:</span>
              <span className="font-bold text-gray-800">
                {product.stock} {product.unit}
              </span>
            </div>
            <span className="text-gray-400">➔</span>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">Stok Sesudah Update:</span>
              <span className="font-black text-base text-[#059669]">
                {calculatedNewStock} {product.unit}
              </span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold neo-shadow-sm neo-shadow-hover transition-all"
            >
              Konfirmasi Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InventoryTab() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "low" | "out" | "safe">("all");
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);

  // Metrics
  const totalSku = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalInventoryCost = products.reduce((acc, p) => acc + p.stock * p.costPrice, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.minStockAlert).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.toLowerCase().includes(q));

      if (!matchSearch) return false;

      if (statusFilter === "low") return p.stock > 0 && p.stock <= p.minStockAlert;
      if (statusFilter === "out") return p.stock === 0;
      if (statusFilter === "safe") return p.stock > p.minStockAlert;
      return true;
    });
  }, [products, searchQuery, statusFilter]);

  const handleApplyAdjustment = (
    productId: string,
    type: "in" | "out" | "set",
    qty: number,
    _reason: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        let newStock = p.stock;
        if (type === "in") newStock += qty;
        else if (type === "out") newStock = Math.max(0, newStock - qty);
        else newStock = qty;
        return { ...p, stock: newStock };
      })
    );
    setAdjustingProduct(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Inventory KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Total Unit Fisik Tersimpan
            </span>
            <span className="text-2xl font-black text-[#111827] font-mono">
              {totalStockUnits.toLocaleString("id-ID")}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">Unit Fisik</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-gray-300 text-gray-700">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Nilai Valuasi Inventori
            </span>
            <span className="text-xl font-black text-[#059669] font-mono">
              Rp {totalInventoryCost.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#D1FAE5] border border-[#10B981] text-[#059669]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-[#FFFBEB] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
              Perlu Restock Segera
            </span>
            <span className="text-2xl font-black text-[#B45309] font-mono">
              {lowStockCount}{" "}
              <span className="text-xs font-bold text-gray-600 font-sans">Produk</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FDE68A] border border-[#F59E0B] text-[#B45309]">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Stok Habis (Kosong)
            </span>
            <span className="text-2xl font-black text-[#DC2626] font-mono">
              {outOfStockCount}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">Produk</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-red-100 border border-red-300 text-red-700">
            <X className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filter nama barang, kode SKU, atau barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] focus:bg-white text-xs sm:text-sm font-medium focus:outline-hidden"
          />
        </div>

        {/* Status segmented filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "Semua Stok" },
            { id: "low", label: "⚠️ Menipis" },
            { id: "out", label: "🚨 Habis" },
            { id: "safe", label: "✅ Aman" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as typeof statusFilter)}
              className={`px-3 py-2 rounded-xl border-2 font-bold text-xs whitespace-nowrap transition-all ${
                statusFilter === f.id
                  ? "bg-[#111827] text-white border-[#111827] neo-shadow-sm"
                  : "bg-[#FBF9F5] text-gray-700 border-gray-300 hover:border-[#111827]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Stock Control Table */}
      <div className="rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-600 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Barang & SKU</th>
                <th className="py-3.5 px-4">Satuan</th>
                <th className="py-3.5 px-4">Stok Fisik Saat Ini</th>
                <th className="py-3.5 px-4">Batas Minimum Alert</th>
                <th className="py-3.5 px-4">Nilai Aset (Stok x HPP)</th>
                <th className="py-3.5 px-4">Kondisi Stok</th>
                <th className="py-3.5 px-4 text-right">Mutasi / Penyesuaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredProducts.map((prod) => {
                const isOutOfStock = prod.stock === 0;
                const isLowStock = prod.stock > 0 && prod.stock <= prod.minStockAlert;
                const assetValue = prod.stock * prod.costPrice;

                return (
                  <tr key={prod.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0">{prod.emoji}</span>
                        <div>
                          <span className="font-extrabold text-[#111827] text-sm block">
                            {prod.name}
                          </span>
                          <span className="font-mono text-[11px] text-gray-400">
                            {prod.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-700">
                      {prod.unit}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-black text-base text-[#111827]">
                        {prod.stock.toLocaleString("id-ID")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-500">
                      {prod.minStockAlert} {prod.unit}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                      Rp {assetValue.toLocaleString("id-ID")}
                    </td>

                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                          🚨 Stok Habis
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          ⚠️ Perlu Restock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Stok Aman
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setAdjustingProduct(prod)}
                        className="px-3 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBBF24] hover:bg-[#F59E0B] text-[#111827] font-extrabold text-xs neo-shadow-sm transition-all inline-flex items-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Sesuaikan Stok</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustingProduct && (
        <StockAdjustmentModal
          product={adjustingProduct}
          onClose={() => setAdjustingProduct(null)}
          onApplyAdjustment={handleApplyAdjustment}
        />
      )}
    </div>
  );
}
