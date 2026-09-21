"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Sparkles,
  Barcode,
  Tag,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Product, PRODUCTS as initialProducts } from "@/app/pos/data/mockData";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formBarcode, setFormBarcode] = useState("");
  const [formCategory, setFormCategory] = useState<Product["category"]>("fashion");
  const [formUnit, setFormUnit] = useState<Product["unit"]>("Pcs");
  const [formPrice, setFormPrice] = useState<number>(50000);
  const [formCostPrice, setFormCostPrice] = useState<number>(25000);
  const [formEmoji, setFormEmoji] = useState("📦");
  const [formBadge, setFormBadge] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "semua" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.barcode && p.barcode.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormBarcode("");
    setFormCategory("fashion");
    setFormUnit("Pcs");
    setFormPrice(50000);
    setFormCostPrice(25000);
    setFormEmoji("📦");
    setFormBadge("");
    setFormDesc("");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSku(prod.sku);
    setFormBarcode(prod.barcode || "");
    setFormCategory(prod.category);
    setFormUnit(prod.unit);
    setFormPrice(prod.price);
    setFormCostPrice(prod.costPrice);
    setFormEmoji(prod.emoji);
    setFormBadge(prod.badge || "");
    setFormDesc(prod.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                sku: formSku || p.sku,
                barcode: formBarcode || undefined,
                category: formCategory,
                unit: formUnit,
                price: Number(formPrice),
                costPrice: Number(formCostPrice),
                emoji: formEmoji,
                badge: formBadge || undefined,
                description: formDesc,
              }
            : p
        )
      );
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        sku: formSku || `SKU-${Date.now().toString().slice(-4)}`,
        barcode: formBarcode || undefined,
        category: formCategory,
        unit: formUnit,
        price: Number(formPrice),
        costPrice: Number(formCostPrice),
        stock: 20, // default initial stock
        minStockAlert: 5,
        emoji: formEmoji,
        badge: formBadge || undefined,
        description: formDesc || "Produk retail Tokova",
      };
      setProducts((prev) => [newProd, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus produk "${name}" dari katalog?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Action Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama produk, SKU, atau barcode (cth: TSH-OVS, 899...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] focus:bg-white text-xs sm:text-sm font-medium focus:outline-hidden"
          />
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-3" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "semua", label: "✨ Semua Produk" },
          { id: "fashion", label: "👕 Pakaian & Fashion" },
          { id: "sembako", label: "🛒 Sembako & Harian" },
          { id: "elektronik", label: "🔌 Gadget & Elektronik" },
          { id: "kecantikan", label: "🧴 Perawatan & Farmasi" },
          { id: "fnb", label: "☕ Makanan & Minuman" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl border-2 font-bold text-xs whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-[#111827] text-white border-[#111827] neo-shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#111827]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Commercial Catalog Table */}
      <div className="rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-600 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Nama Produk</th>
                <th className="py-3.5 px-4">Kode SKU & Barcode</th>
                <th className="py-3.5 px-4">Kategori & Satuan</th>
                <th className="py-3.5 px-4">Harga Modal (HPP)</th>
                <th className="py-3.5 px-4">Harga Jual</th>
                <th className="py-3.5 px-4">Estimasi Margin</th>
                <th className="py-3.5 px-4">Status Jual</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredProducts.map((prod) => {
                const marginPercent =
                  prod.price > 0
                    ? Math.round(((prod.price - prod.costPrice) / prod.price) * 100)
                    : 0;

                return (
                  <tr key={prod.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#FBF9F5] border border-gray-300 flex items-center justify-center text-xl shrink-0">
                          {prod.emoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[#111827] text-sm">
                              {prod.name}
                            </span>
                            {prod.badge && (
                              <span className="px-1.5 py-0.2 bg-[#FEF3C7] text-[#B45309] font-bold text-[9px] rounded border border-[#F59E0B]">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-500 line-clamp-1">
                            {prod.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SKU & Barcode */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-xs font-bold text-gray-800">
                        {prod.sku}
                      </div>
                      {prod.barcode && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                          <Barcode className="w-3 h-3" />
                          <span>{prod.barcode}</span>
                        </div>
                      )}
                    </td>

                    {/* Category & Unit */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block capitalize font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md text-[11px] mb-1">
                        {prod.category}
                      </span>
                      <span className="text-[11px] text-gray-500 block">
                        Satuan: <strong>{prod.unit}</strong>
                      </span>
                    </td>

                    {/* Cost Price */}
                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      Rp {prod.costPrice.toLocaleString("id-ID")}
                    </td>

                    {/* Selling Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#111827]">
                      Rp {prod.price.toLocaleString("id-ID")}
                    </td>

                    {/* Margin */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-[#D1FAE5] text-[#059669]">
                        +{marginPercent}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D1FAE5] text-[#059669] border border-[#10B981]/30">
                        <CheckCircle className="w-3 h-3" /> Aktif Dijual
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(prod)}
                          title="Edit Produk"
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-[#111827] bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          title="Hapus Produk"
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-red-600 bg-white hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-xl w-full neo-shadow-lg p-6 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-lg text-[#111827]">
                  {editingProduct ? "Edit Informasi Produk" : "Tambah Produk Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="font-bold text-gray-700 block mb-1">Emoji / Icon:</label>
                  <input
                    type="text"
                    value={formEmoji}
                    onChange={(e) => setFormEmoji(e.target.value)}
                    className="w-full text-center text-2xl py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5]"
                    maxLength={2}
                  />
                </div>
                <div className="col-span-3">
                  <label className="font-bold text-gray-700 block mb-1">Nama Produk:</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Kemeja Flannel Tartan / Minyak Goreng 2L"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-bold"
                  />
                </div>
              </div>

              {/* SKU & Barcode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kode SKU Barang:</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: TSH-OVS-BLK"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Barcode EAN/UPC (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="cth: 899277014521"
                    value={formBarcode}
                    onChange={(e) => setFormBarcode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-mono"
                  />
                </div>
              </div>

              {/* Category & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kategori Produk:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Product["category"])}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-semibold bg-white"
                  >
                    <option value="fashion">👕 Pakaian & Fashion Retail</option>
                    <option value="sembako">🛒 Sembako & Minimarket</option>
                    <option value="elektronik">🔌 Gadget & Elektronik</option>
                    <option value="kecantikan">🧴 Perawatan & Farmasi</option>
                    <option value="fnb">☕ Makanan & Minuman (F&B)</option>
                    <option value="lainnya">📦 Kategori Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Satuan Penjualan:</label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value as Product["unit"])}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-semibold bg-white"
                  >
                    <option value="Pcs">Pcs (Satuan)</option>
                    <option value="Pack">Pack</option>
                    <option value="Botol">Botol</option>
                    <option value="Box">Box / Dus</option>
                    <option value="Kg">Kg (Kilogram)</option>
                    <option value="Porsi">Porsi</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Sak">Sak</option>
                    <option value="Tube">Tube</option>
                    <option value="Cup">Cup</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>
              </div>

              {/* Cost Price (HPP) & Selling Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Harga Modal / Beli (HPP):
                  </label>
                  <input
                    type="number"
                    required
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Harga Jual Konsumen:</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-bold text-[#059669]"
                  />
                </div>
              </div>

              {/* Profit preview */}
              <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-gray-200 flex justify-between text-xs font-mono">
                <span className="text-gray-600 font-sans font-bold">Estimasi Profit Kotor per Unit:</span>
                <span className="font-extrabold text-[#059669]">
                  Rp {(formPrice - formCostPrice).toLocaleString("id-ID")} (
                  {formPrice > 0 ? Math.round(((formPrice - formCostPrice) / formPrice) * 100) : 0}%)
                </span>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Badge Label (Opsional):</label>
                <input
                  type="text"
                  placeholder="cth: Paling Laris ⚡ / Garansi Resmi / Best Value"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Deskripsi & Catatan Produk:</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan bahan, ukuran, garansi, atau detail produk..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold neo-shadow-sm neo-shadow-hover transition-all"
                >
                  {editingProduct ? "Simpan Perubahan" : "Tambahkan ke Katalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
