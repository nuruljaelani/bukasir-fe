"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Crown,
  Star,
  Coins,
  Calendar,
  X,
  Check,
  MessageCircle,
  ExternalLink,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { Customer, INITIAL_CUSTOMERS } from "../data/customerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomerForPoints, setSelectedCustomerForPoints] = useState<Customer | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTier, setFormTier] = useState<Customer["tier"]>("Bronze");
  const [formPoints, setFormPoints] = useState<number>(0);
  const [formStatus, setFormStatus] = useState<Customer["status"]>("Aktif");
  const [formNotes, setFormNotes] = useState("");

  // Points adjustment form
  const [pointsDelta, setPointsDelta] = useState<number>(50);
  const [pointsAction, setPointsAction] = useState<"add" | "deduct">("add");
  const [pointsReason, setPointsReason] = useState("Bonus Belanja & Loyalitas");

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        c.id.toLowerCase().includes(q);

      const matchTier = selectedTier === "all" || c.tier.toLowerCase() === selectedTier.toLowerCase();

      return matchSearch && matchTier;
    });
  }, [customers, searchQuery, selectedTier]);

  // Metrics
  const totalCustomers = customers.length;
  const totalActive = customers.filter((c) => c.status === "Aktif").length;
  const vipMembers = customers.filter((c) => c.tier === "Platinum" || c.tier === "Gold").length;
  const totalCirculatingPoints = customers.reduce((acc, c) => acc + c.points, 0);
  const totalLifetimeRevenue = customers.reduce((acc, c) => acc + c.totalSpend, 0);

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setFormName("");
    setFormPhone("08");
    setFormEmail("");
    setFormTier("Bronze");
    setFormPoints(25); // Welcome bonus points
    setFormStatus("Aktif");
    setFormNotes("");
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (cust: Customer) => {
    setEditingCustomer(cust);
    setFormName(cust.name);
    setFormPhone(cust.phone);
    setFormEmail(cust.email || "");
    setFormTier(cust.tier);
    setFormPoints(cust.points);
    setFormStatus(cust.status);
    setFormNotes(cust.notes || "");
    setIsAddEditModalOpen(true);
  };

  const handleOpenPointsModal = (cust: Customer) => {
    setSelectedCustomerForPoints(cust);
    setPointsDelta(50);
    setPointsAction("add");
    setPointsReason("Bonus Belanja & Loyalitas");
    setIsPointsModalOpen(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id
            ? {
                ...c,
                name: formName,
                phone: formPhone,
                email: formEmail || undefined,
                tier: formTier,
                points: Number(formPoints),
                status: formStatus,
                notes: formNotes,
              }
            : c
        )
      );
    } else {
      const newCustomer: Customer = {
        id: `CST-00${customers.length + 1}`,
        name: formName,
        phone: formPhone,
        email: formEmail || undefined,
        tier: formTier,
        points: Number(formPoints),
        totalSpend: 0,
        totalVisits: 1,
        joinedDate: "20 Sep 2026",
        lastVisitDate: "Hari Ini, Baru Daftar",
        status: formStatus,
        notes: formNotes,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
    setIsAddEditModalOpen(false);
  };

  const handleSavePointsAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerForPoints) return;

    const delta = pointsAction === "add" ? pointsDelta : -pointsDelta;
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomerForPoints.id
          ? {
              ...c,
              points: Math.max(0, c.points + delta),
            }
          : c
      )
    );
    setIsPointsModalOpen(false);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pelanggan ini?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const getTierBadge = (tier: Customer["tier"]) => {
    switch (tier) {
      case "Platinum":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#111827] text-[#FBBF24] border border-[#111827]">
            <Crown className="w-3 h-3 text-[#FBBF24]" />
            <span>Platinum VIP</span>
          </span>
        );
      case "Gold":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#FEF3C7] text-[#D97706] border border-[#D97706]">
            <Star className="w-3 h-3 fill-[#D97706]" />
            <span>Gold Member</span>
          </span>
        );
      case "Silver":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-gray-100 text-gray-700 border border-gray-400">
            <Award className="w-3 h-3" />
            <span>Silver</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-50 text-amber-800 border border-amber-300">
            <span>Bronze</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Total Pelanggan Terdaftar</div>
            <div className="text-2xl font-black text-[#111827] mt-1">{totalCustomers} Member</div>
            <div className="text-[11px] text-[#059669] font-bold mt-0.5">
              {totalActive} Member Aktif
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669] neo-shadow-xs">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Member VIP (Gold & Plat)</div>
            <div className="text-2xl font-black text-[#111827] mt-1">{vipMembers} Pelanggan</div>
            <div className="text-[11px] text-[#D97706] font-bold mt-0.5">
              Kontribusi omset terbesar
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706] neo-shadow-xs">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-500">Saldo Poin Beredar</div>
            <div className="text-2xl font-black text-[#10B981] font-mono mt-1">
              {totalCirculatingPoints} Pts
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
              Siap ditukar voucher
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] border-2 border-[#111827] flex items-center justify-center text-[#10B981] neo-shadow-xs">
            <Coins className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border-2 border-[#111827] bg-[#111827] text-white neo-shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white/70">Total Belanja Member</div>
            <div className="text-xl font-black mt-1 font-mono text-[#FBBF24]">
              Rp {totalLifetimeRevenue.toLocaleString("id-ID")}
            </div>
            <div className="text-[11px] font-bold text-white/90 mt-0.5">
              Nilai transaksi tercatat
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-white text-[#111827] border-2 border-white flex items-center justify-center neo-shadow-xs">
            <TrendingUp className="w-5 h-5" />
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
              placeholder="Cari nama member, nomor WhatsApp, atau ID pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] text-xs sm:text-sm font-medium outline-none transition-colors"
            />
          </div>

          {/* Filter Tier */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "Semua Tier" },
              { id: "platinum", label: "Platinum" },
              { id: "gold", label: "Gold" },
              { id: "silver", label: "Silver" },
              { id: "bronze", label: "Bronze" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTier(tab.id)}
                className={`px-3 py-1.5 rounded-xl border-2 font-extrabold text-xs shrink-0 transition-all ${
                  selectedTier === tab.id
                    ? "bg-[#111827] text-white border-[#111827]"
                    : "bg-[#FBF9F5] text-gray-600 border-gray-300 hover:border-[#111827]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Customer Button */}
        <button
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-3" />
          <span>Daftarkan Pelanggan</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="border-2 border-[#111827] rounded-3xl bg-white neo-shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-600 font-extrabold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Nama & Member ID</th>
                <th className="py-3.5 px-4">Kontak WhatsApp</th>
                <th className="py-3.5 px-4">Tier Keanggotaan</th>
                <th className="py-3.5 px-4">Saldo Poin</th>
                <th className="py-3.5 px-4">Total Belanja & Kunjungan</th>
                <th className="py-3.5 px-4">Terakhir Belanja</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 font-bold">
                    Tidak ada data pelanggan yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                    {/* Nama & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FBF9F5] border-2 border-[#111827] flex items-center justify-center font-black text-[#111827] shrink-0 text-sm">
                          {cust.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[#111827] text-sm">
                              {cust.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded border border-gray-200">
                              {cust.id}
                            </span>
                          </div>
                          {cust.notes && (
                            <p className="text-[11px] text-gray-500 mt-0.5 max-w-xs truncate">
                              💬 {cust.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Kontak WhatsApp */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <a
                          href={`https://wa.me/62${cust.phone.replace(/[^0-9]/g, "").substring(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#059669] hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{cust.phone}</span>
                        </a>
                        {cust.email && (
                          <div className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="truncate max-w-40">{cust.email}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="py-3.5 px-4">
                      {getTierBadge(cust.tier)}
                    </td>

                    {/* Saldo Poin */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#111827] font-mono text-sm">
                          {cust.points} Pts
                        </span>
                        <button
                          onClick={() => handleOpenPointsModal(cust)}
                          className="p-1 rounded-md border border-gray-300 hover:border-[#111827] hover:bg-[#FEF3C7] text-gray-700 transition-colors"
                          title="Sesuaikan Poin Loyalitas"
                        >
                          <Coins className="w-3.5 h-3.5 text-[#D97706]" />
                        </button>
                      </div>
                    </td>

                    {/* Total Belanja */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#111827] font-mono">
                        Rp {cust.totalSpend.toLocaleString("id-ID")}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {cust.totalVisits} kali kunjungan
                      </div>
                    </td>

                    {/* Terakhir Belanja */}
                    <td className="py-3.5 px-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{cust.lastVisitDate}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Gabung: {cust.joinedDate}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(cust)}
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-[#111827] text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                          title="Edit Pelanggan"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(cust.id)}
                          className="p-1.5 rounded-lg border border-gray-300 hover:border-red-600 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Pelanggan"
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

      {/* Modal: Tambah & Edit Pelanggan */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-base text-[#111827]">
                  {editingCustomer ? "Edit Profil Pelanggan" : "Daftarkan Member / Pelanggan Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-bold"
                  placeholder="Contoh: Dika Pratama"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nomor WhatsApp / HP:</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono font-medium"
                    placeholder="0812-xxxx-xxxx"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Email (Opsional):</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                    placeholder="nama@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tier Member:</label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as Customer["tier"])}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-bold bg-white"
                  >
                    <option value="Bronze">Bronze (Member Baru)</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum (VIP)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Saldo Poin Awal:</label>
                  <input
                    type="number"
                    min={0}
                    value={formPoints}
                    onChange={(e) => setFormPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Catatan Khusus / Preferensi:</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  placeholder="Contoh: Suka kopi less sugar, alergi kacang, pelanggan takeaway pagi..."
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Status Keanggotaan:</label>
                <div className="flex gap-2">
                  {(["Aktif", "Nonaktif"] as const).map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setFormStatus(st)}
                      className={`flex-1 py-1.5 rounded-xl border font-bold text-xs ${
                        formStatus === st
                          ? "bg-[#111827] text-white border-[#111827]"
                          : "bg-[#FBF9F5] text-gray-600 border-gray-300"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold neo-shadow-sm hover:opacity-95"
                >
                  {editingCustomer ? "Simpan Perubahan" : "Daftarkan Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Sesuaikan Poin Loyalitas */}
      {isPointsModalOpen && selectedCustomerForPoints && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow space-y-4 animate-in zoom-in-95 duration-150 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-extrabold text-base text-[#111827]">
                  Sesuaikan Poin Member
                </h3>
              </div>
              <button
                onClick={() => setIsPointsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-gray-200">
              <div className="font-black text-sm text-[#111827]">{selectedCustomerForPoints.name}</div>
              <div className="text-xs text-gray-500 font-mono mt-0.5">
                Saldo Saat Ini: <strong className="text-[#059669] font-black">{selectedCustomerForPoints.points} Pts</strong>
              </div>
            </div>

            <form onSubmit={handleSavePointsAdjustment} className="space-y-3.5">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Aksi Perubahan:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPointsAction("add")}
                    className={`py-2 rounded-xl border-2 font-black text-xs ${
                      pointsAction === "add"
                        ? "bg-[#10B981] text-white border-[#111827] neo-shadow-xs"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    + Tambah Poin
                  </button>
                  <button
                    type="button"
                    onClick={() => setPointsAction("deduct")}
                    className={`py-2 rounded-xl border-2 font-black text-xs ${
                      pointsAction === "deduct"
                        ? "bg-[#FF6B4A] text-white border-[#111827] neo-shadow-xs"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    - Tukar / Kurang
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Jumlah Poin:</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={pointsDelta}
                  onChange={(e) => setPointsDelta(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold text-base"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Alasan Penyesuaian:</label>
                <input
                  type="text"
                  value={pointsReason}
                  onChange={(e) => setPointsReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPointsModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl border-2 border-[#111827] bg-[#111827] text-white font-extrabold neo-shadow-sm"
                >
                  Konfirmasi Poin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
