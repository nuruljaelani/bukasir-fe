"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Plus,
  Search,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  X,
  MessageCircle,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Supplier, INITIAL_SUPPLIERS } from "../data/ownerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function SuppliersTab() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<Supplier["category"]>("Sembako & Pangan");
  const [formPicName, setFormPicName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("Jakarta");
  const [formPaymentTerms, setFormPaymentTerms] = useState<Supplier["paymentTerms"]>("Tempo 14 Hari");
  const [formBankAccount, setFormBankAccount] = useState("");
  const [formStatus, setFormStatus] = useState<Supplier["status"]>("Aktif");

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const matchCat = selectedCategory === "semua" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        s.name.toLowerCase().includes(q) ||
        s.picName.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [suppliers, selectedCategory, searchQuery]);

  // Metrics
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter((s) => s.status === "Aktif").length;
  const tempoSuppliers = suppliers.filter((s) => s.paymentTerms.includes("Tempo")).length;
  const totalSuppliedSKUs = suppliers.reduce((acc, s) => acc + s.suppliedItemsCount, 0);

  const openAddModal = () => {
    setEditingSupplier(null);
    setFormName("");
    setFormCategory("Sembako & Pangan");
    setFormPicName("");
    setFormPhone("");
    setFormEmail("");
    setFormAddress("");
    setFormCity("Jakarta");
    setFormPaymentTerms("Tempo 14 Hari");
    setFormBankAccount("");
    setFormStatus("Aktif");
    setIsModalOpen(true);
  };

  const openEditModal = (s: Supplier) => {
    setEditingSupplier(s);
    setFormName(s.name);
    setFormCategory(s.category);
    setFormPicName(s.picName);
    setFormPhone(s.phone);
    setFormEmail(s.email);
    setFormAddress(s.address);
    setFormCity(s.city);
    setFormPaymentTerms(s.paymentTerms);
    setFormBankAccount(s.bankAccount);
    setFormStatus(s.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingSupplier) {
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === editingSupplier.id
            ? {
                ...s,
                name: formName,
                category: formCategory,
                picName: formPicName,
                phone: formPhone,
                email: formEmail,
                address: formAddress,
                city: formCity,
                paymentTerms: formPaymentTerms,
                bankAccount: formBankAccount,
                status: formStatus,
              }
            : s
        )
      );
    } else {
      const newSup: Supplier = {
        id: `SPL-00${suppliers.length + 1}`,
        name: formName,
        category: formCategory,
        picName: formPicName,
        phone: formPhone,
        email: formEmail,
        address: formAddress,
        city: formCity,
        paymentTerms: formPaymentTerms,
        bankAccount: formBankAccount,
        status: formStatus,
        suppliedItemsCount: 1,
      };
      setSuppliers((prev) => [...prev, newSup]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus supplier "${name}"?`)) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Supplier KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Total Pemasok / Vendor
            </span>
            <span className="text-2xl font-black text-[#111827] font-mono">
              {totalSuppliers}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">Vendor</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FBF9F5] border border-gray-300 text-gray-700">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Rekanan Pemasok Aktif
            </span>
            <span className="text-2xl font-black text-[#059669] font-mono">
              {activeSuppliers}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">Aktif</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#D1FAE5] border border-[#10B981] text-[#059669]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Fasilitas Tempo Pembayaran
            </span>
            <span className="text-2xl font-black text-[#EA580C] font-mono">
              {tempoSuppliers}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">Vendor</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FFEDD5] border border-[#EA580C] text-[#EA580C]">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Total Item Pasokan
            </span>
            <span className="text-2xl font-black text-[#111827] font-mono">
              {totalSuppliedSKUs}{" "}
              <span className="text-xs font-bold text-gray-500 font-sans">SKU Pasokan</span>
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#E0F2FE] border border-[#38BDF8] text-[#0284C7]">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama vendor, PIC, kota, atau ID suplier..."
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
          <span>Tambah Supplier Baru</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "semua", label: "✨ Semua Supplier" },
          { id: "Sembako & Pangan", label: "🌾 Sembako & Pangan" },
          { id: "Pakaian & Tekstil", label: "👕 Pakaian & Tekstil" },
          { id: "Elektronik & Aksesoris", label: "🔌 Elektronik & Gadget" },
          { id: "Bahan Minuman & Kopi", label: "☕ Kopi & Minuman" },
          { id: "Kemasan & Packaging", label: "📦 Dus & Packaging" },
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

      {/* Suppliers Table */}
      <div className="rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-600 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Vendor & Kategori</th>
                <th className="py-3.5 px-4">Kontak PIC</th>
                <th className="py-3.5 px-4">Kota & Alamat</th>
                <th className="py-3.5 px-4">Syarat Bayar (TOP)</th>
                <th className="py-3.5 px-4">Rekening Bank</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredSuppliers.map((s) => (
                <tr key={s.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                  {/* Company name & Category */}
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-extrabold text-[#111827] text-sm block">
                        {s.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px] text-gray-400">
                          {s.id}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {s.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* PIC & Phone */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{s.picName}</div>
                    <a
                      href={`https://wa.me/62${s.phone.replace(/[^0-9]/g, "").slice(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#059669] hover:underline font-mono font-semibold"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>{s.phone}</span>
                    </a>
                  </td>

                  {/* Address & City */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-gray-800">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{s.city}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 line-clamp-1">
                      {s.address}
                    </span>
                  </td>

                  {/* Payment Terms */}
                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold border ${
                        s.paymentTerms === "COD / Tunai"
                          ? "bg-gray-100 text-gray-700 border-gray-300"
                          : "bg-[#FEF3C7] text-[#B45309] border-[#F59E0B]"
                      }`}
                    >
                      {s.paymentTerms}
                    </span>
                  </td>

                  {/* Bank Account */}
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-700">
                    {s.bankAccount}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        s.status === "Aktif"
                          ? "bg-[#D1FAE5] text-[#059669] border border-[#10B981]/30"
                          : s.status === "Cadangan"
                          ? "bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]/30"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> {s.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/62${s.phone.replace(/[^0-9]/g, "").slice(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat WhatsApp Suplier"
                        className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => openEditModal(s)}
                        title="Edit Supplier"
                        className="p-1.5 rounded-lg border border-gray-300 hover:border-[#111827] bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        title="Hapus Supplier"
                        className="p-1.5 rounded-lg border border-gray-300 hover:border-red-600 bg-white hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-lg w-full neo-shadow-lg p-6 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-lg text-[#111827]">
                  {editingSupplier ? "Edit Data Supplier" : "Tambah Supplier / Vendor Baru"}
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
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Perusahaan / Vendor:</label>
                <input
                  type="text"
                  required
                  placeholder="cth: PT Sumber Pangan Nusantara"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kategori Pasokan:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Supplier["category"])}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-semibold bg-white"
                  >
                    <option value="Sembako & Pangan">🌾 Sembako & Pangan</option>
                    <option value="Pakaian & Tekstil">👕 Pakaian & Tekstil</option>
                    <option value="Elektronik & Aksesoris">🔌 Elektronik & Gadget</option>
                    <option value="Bahan Minuman & Kopi">☕ Kopi & Minuman</option>
                    <option value="Kemasan & Packaging">📦 Dus & Packaging</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Status Rekanan:</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as Supplier["status"])}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-semibold bg-white"
                  >
                    <option value="Aktif">🟢 Rekanan Utama (Aktif)</option>
                    <option value="Cadangan">🔵 Supplier Cadangan</option>
                    <option value="Nonaktif">⚪ Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nama Kontak (PIC):</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Hendra Wijaya"
                    value={formPicName}
                    onChange={(e) => setFormPicName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">No. WhatsApp PIC:</label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Syarat Bayar (Terms):</label>
                  <select
                    value={formPaymentTerms}
                    onChange={(e) => setFormPaymentTerms(e.target.value as Supplier["paymentTerms"])}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-semibold bg-white"
                  >
                    <option value="COD / Tunai">💵 COD / Tunai Langsung</option>
                    <option value="Tempo 7 Hari">⏱️ Tempo 7 Hari</option>
                    <option value="Tempo 14 Hari">⏱️ Tempo 14 Hari</option>
                    <option value="Tempo 30 Hari">⏱️ Tempo 30 Hari</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kota / Domisili Gudang:</label>
                  <input
                    type="text"
                    placeholder="cth: Bandung / Jakarta"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Rekening Bank Transfer:</label>
                <input
                  type="text"
                  placeholder="cth: BCA 8890-123-456 (PT Sumber Pangan)"
                  value={formBankAccount}
                  onChange={(e) => setFormBankAccount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Alamat Gudang / Kantor:</label>
                <textarea
                  rows={2}
                  placeholder="Alamat penjemputan atau pengiriman barang..."
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
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
                  {editingSupplier ? "Simpan Perubahan" : "Daftarkan Supplier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
