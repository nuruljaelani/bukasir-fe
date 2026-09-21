"use client";

import React, { useState, useMemo } from "react";
import {
  Tag,
  Plus,
  Search,
  Edit2,
  Trash2,
  Percent,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  X,
  Check,
  Zap,
  ShoppingBag,
  TrendingDown,
  Copy,
} from "lucide-react";
import { PromoRule, INITIAL_PROMOS } from "../data/promoMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function PromosTab() {
  const [promos, setPromos] = useState<PromoRule[]>(INITIAL_PROMOS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "voucher" | "auto">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoRule | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formType, setFormType] = useState<PromoRule["type"]>("percentage");
  const [formValue, setFormValue] = useState<number>(10);
  const [formMinSpend, setFormMinSpend] = useState<number>(30000);
  const [formMaxDiscount, setFormMaxDiscount] = useState<number>(20000);
  const [formCategory, setFormCategory] = useState("Semua Kategori");
  const [formStartDate, setFormStartDate] = useState("20 Sep 2026");
  const [formEndDate, setFormEndDate] = useState("31 Okt 2026");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsVoucherRequired, setFormIsVoucherRequired] = useState(true);
  const [formDescription, setFormDescription] = useState("");

  const filteredPromos = useMemo(() => {
    return promos.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        (p.code && p.code.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);

      let matchFilter = true;
      if (filterType === "active") matchFilter = p.isActive;
      if (filterType === "voucher") matchFilter = p.isVoucherCodeRequired;
      if (filterType === "auto") matchFilter = !p.isVoucherCodeRequired;

      return matchSearch && matchFilter;
    });
  }, [promos, searchQuery, filterType]);

  // Metrics
  const totalActivePromos = promos.filter((p) => p.isActive).length;
  const totalUsage = promos.reduce((acc, p) => acc + p.usageCount, 0);
  const estimatedSavings = promos.reduce((acc, p) => {
    const avgSavings = p.type === "fixed_amount" ? p.value : 12500;
    return acc + avgSavings * p.usageCount;
  }, 0);

  const handleOpenAddModal = () => {
    setEditingPromo(null);
    setFormName("");
    setFormCode("");
    setFormType("percentage");
    setFormValue(15);
    setFormMinSpend(30000);
    setFormMaxDiscount(20000);
    setFormCategory("Semua Kategori");
    setFormStartDate("20 Sep 2026");
    setFormEndDate("31 Okt 2026");
    setFormIsActive(true);
    setFormIsVoucherRequired(true);
    setFormDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (promo: PromoRule) => {
    setEditingPromo(promo);
    setFormName(promo.name);
    setFormCode(promo.code || "");
    setFormType(promo.type);
    setFormValue(promo.value);
    setFormMinSpend(promo.minSpend || 0);
    setFormMaxDiscount(promo.maxDiscount || 0);
    setFormCategory(promo.category || "Semua Kategori");
    setFormStartDate(promo.startDate);
    setFormEndDate(promo.endDate);
    setFormIsActive(promo.isActive);
    setFormIsVoucherRequired(promo.isVoucherCodeRequired);
    setFormDescription(promo.description);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDeletePromo = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus promosi ini?")) {
      setPromos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo) {
      setPromos((prev) =>
        prev.map((p) =>
          p.id === editingPromo.id
            ? {
                ...p,
                name: formName,
                code: formCode.toUpperCase().trim() || undefined,
                type: formType,
                value: Number(formValue),
                minSpend: Number(formMinSpend),
                maxDiscount: formType === "percentage" ? Number(formMaxDiscount) : undefined,
                category: formCategory,
                startDate: formStartDate,
                endDate: formEndDate,
                isActive: formIsActive,
                isVoucherCodeRequired: formIsVoucherRequired,
                description: formDescription,
              }
            : p
        )
      );
    } else {
      const newPromo: PromoRule = {
        id: `PRM-00${promos.length + 1}`,
        name: formName,
        code: formCode.toUpperCase().trim() || undefined,
        type: formType,
        value: Number(formValue),
        minSpend: Number(formMinSpend),
        maxDiscount: formType === "percentage" ? Number(formMaxDiscount) : undefined,
        category: formCategory,
        startDate: formStartDate,
        endDate: formEndDate,
        usageCount: 0,
        isActive: formIsActive,
        isVoucherCodeRequired: formIsVoucherRequired,
        description: formDescription,
      };
      setPromos((prev) => [...prev, newPromo]);
    }
    setIsModalOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Promo & Voucher Aktif</div>
            <div className="text-2xl font-black text-[#111827] mt-1">{totalActivePromos} Promo</div>
            <div className="text-[11px] text-[#059669] font-bold mt-0.5">Siap digunakan di POS</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669] neo-shadow-xs">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Total Transaksi Promo</div>
            <div className="text-2xl font-black text-[#111827] mt-1">{totalUsage}x Transaksi</div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">Bulan berjalan</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706] neo-shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Total Penghematan Pembeli</div>
            <div className="text-2xl font-black text-[#10B981] font-mono mt-1">
              Rp {estimatedSavings.toLocaleString("id-ID")}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">Mendorong loyalitas</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] border-2 border-[#111827] flex items-center justify-center text-[#10B981] neo-shadow-xs">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-[#FF6B4A] text-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white/80">Kupon Paling Laris</div>
            <div className="text-xl font-black mt-1">JUMATBERKAH</div>
            <div className="text-[11px] font-bold text-white/90 mt-0.5">112x Berhasil Digunakan</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-white text-[#FF6B4A] border-2 border-[#111827] flex items-center justify-center neo-shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Add Button */}
      <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kode promo (misal: HEMAT20) atau nama diskon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] text-xs sm:text-sm font-medium outline-none transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "Semua" },
              { id: "active", label: "Hanya Aktif" },
              { id: "voucher", label: "Kode Kupon" },
              { id: "auto", label: "Promo Kasir" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as typeof filterType)}
                className={`px-3 py-1.5 rounded-xl border-2 font-extrabold text-xs shrink-0 transition-all ${
                  filterType === tab.id
                    ? "bg-[#111827] text-white border-[#111827]"
                    : "bg-[#FBF9F5] text-gray-600 border-gray-300 hover:border-[#111827]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Promo Button */}
        <button
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-3" />
          <span>Buat Promosi Baru</span>
        </button>
      </div>

      {/* Promos Table / List */}
      <div className="border-2 border-[#111827] rounded-3xl bg-white neo-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-600 font-extrabold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Kupon & Nama Promo</th>
                <th className="py-3.5 px-4">Nilai Diskon</th>
                <th className="py-3.5 px-4">Syarat Minimum</th>
                <th className="py-3.5 px-4">Masa Berlaku</th>
                <th className="py-3.5 px-4 text-center">Pemakaian</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-medium">
              {filteredPromos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 font-bold">
                    Tidak ada promosi yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredPromos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                    {/* Kupon & Nama */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl border border-[#111827] flex items-center justify-center font-bold shrink-0 ${
                            promo.type === "percentage"
                              ? "bg-[#D1FAE5] text-[#059669]"
                              : "bg-[#FEF3C7] text-[#D97706]"
                          }`}
                        >
                          {promo.type === "percentage" ? (
                            <Percent className="w-4 h-4" />
                          ) : (
                            <Tag className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[#111827] text-sm">
                              {promo.name}
                            </span>
                            {promo.code ? (
                              <button
                                onClick={() => handleCopyCode(promo.code!)}
                                className="font-mono text-[10px] font-black bg-[#111827] text-white px-2 py-0.5 rounded border border-[#111827] hover:bg-[#059669] transition-colors flex items-center gap-1 cursor-pointer"
                                title="Klik untuk salin kode"
                              >
                                <span>{promo.code}</span>
                                <Copy className="w-2.5 h-2.5" />
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                Klik di Kasir
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 max-w-sm">
                            {promo.description}
                          </p>
                          {copiedCode === promo.code && (
                            <span className="text-[10px] text-[#059669] font-bold block">
                              ✓ Kode berhasil disalin!
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Nilai Diskon */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#111827]">
                        {promo.type === "percentage" ? (
                          <span className="text-[#059669] font-black">{promo.value}% OFF</span>
                        ) : (
                          <span className="text-[#FF6B4A] font-black font-mono">
                            - Rp {promo.value.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                      {promo.maxDiscount && (
                        <div className="text-[10px] text-gray-500">
                          Maks. Rp {promo.maxDiscount.toLocaleString("id-ID")}
                        </div>
                      )}
                    </td>

                    {/* Syarat Minimum */}
                    <td className="py-3.5 px-4 text-gray-600">
                      <div>
                        {promo.minSpend ? (
                          <span>Min. Rp {promo.minSpend.toLocaleString("id-ID")}</span>
                        ) : (
                          <span className="text-gray-400 font-bold">Tanpa Min. Belanja</span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400">{promo.category}</div>
                    </td>

                    {/* Masa Berlaku */}
                    <td className="py-3.5 px-4 text-gray-600 text-xs font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{promo.endDate}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">Mulai {promo.startDate}</div>
                    </td>

                    {/* Pemakaian */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-extrabold text-[#111827]">{promo.usageCount}x</span>
                      <span className="text-[10px] text-gray-400 block">dipakai</span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(promo.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          promo.isActive
                            ? "bg-[#D1FAE5] text-[#059669] border-[#059669]"
                            : "bg-gray-100 text-gray-400 border-gray-300"
                        }`}
                      >
                        {promo.isActive ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(promo)}
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-[#111827] text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                          title="Edit Promo"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePromo(promo.id)}
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-red-600 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Promo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah / Edit Promo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-base text-[#111827]">
                  {editingPromo ? "Edit Data Promo & Diskon" : "Buat Promosi / Voucher Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePromo} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Promosi:</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-bold"
                  placeholder="Contoh: Promo Gajian Diskon 15%"
                />
              </div>

              {/* Tipe Diskon Switch */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tipe Potongan:</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as PromoRule["type"])}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-bold bg-white"
                  >
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixed_amount">Nominal Rupiah (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Besaran {formType === "percentage" ? "(%)" : "(Rp)"}:
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formValue}
                    onChange={(e) => setFormValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold"
                  />
                </div>
              </div>

              {/* Kode Voucher & Mode Kasir */}
              <div className="p-3 bg-[#FBF9F5] rounded-2xl border-2 border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800 text-xs block">
                      Wajib Kode Voucher?
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Jika aktif, kasir harus mengetik kode kupon saat checkout.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formIsVoucherRequired}
                    onChange={(e) => setFormIsVoucherRequired(e.target.checked)}
                    className="w-4 h-4 accent-[#10B981] rounded"
                  />
                </div>

                {formIsVoucherRequired && (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Kode Voucher:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formCode}
                        onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold uppercase"
                        placeholder="Contoh: GAJIANHEMAT"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormCode(
                            `PROMO${Math.floor(100 + Math.random() * 900)}`
                          )
                        }
                        className="px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-bold text-xs shrink-0"
                      >
                        Auto
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Minimum Belanja & Maksimal Diskon */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Min. Belanja (Rp):</label>
                  <input
                    type="number"
                    min={0}
                    value={formMinSpend}
                    onChange={(e) => setFormMinSpend(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono font-medium"
                    placeholder="0 jika tanpa min."
                  />
                </div>

                {formType === "percentage" ? (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Maks. Diskon (Rp):
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formMaxDiscount}
                      onChange={(e) => setFormMaxDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono font-medium"
                      placeholder="Batas maksimal"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Target Kategori:</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium bg-white"
                    >
                      <option value="Semua Kategori">Semua Kategori</option>
                      <option value="Kopi & Minuman">Kopi & Minuman</option>
                      <option value="Makanan & Snack">Makanan & Snack</option>
                      <option value="Pakaian & Fashion">Pakaian & Fashion</option>
                      <option value="Sembako & Harian">Sembako & Harian</option>
                      <option value="Elektronik & Gadget">Elektronik & Gadget</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Masa Berlaku */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tanggal Mulai:</label>
                  <input
                    type="text"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tanggal Berakhir:</label>
                  <input
                    type="text"
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Deskripsi & Syarat:</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  placeholder="Keterangan singkat promo untuk kasir..."
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold neo-shadow-sm hover:opacity-95"
                >
                  {editingPromo ? "Simpan Perubahan" : "Buat Promosi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
