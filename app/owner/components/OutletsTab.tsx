"use client";

import React, { useState } from "react";
import {
  Store,
  Building2,
  Plus,
  Edit2,
  Trash2,
  Phone,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Crown,
} from "lucide-react";
import {
  Outlet,
  SubscriptionPlan,
  INITIAL_OUTLETS,
  INITIAL_SUBSCRIPTION,
} from "../data/ownerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface OutletsTabProps {
  currentActiveOutletId: string;
  onSelectActiveOutlet: (outlet: Outlet) => void;
}

export default function OutletsTab({
  currentActiveOutletId,
  onSelectActiveOutlet,
}: OutletsTabProps) {
  const [outlets, setOutlets] = useState<Outlet[]>(INITIAL_OUTLETS);
  const [subscription, setSubscription] = useState<SubscriptionPlan>(INITIAL_SUBSCRIPTION);

  // Modal States
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingOutlet, setEditingOutlet] = useState<Outlet | null>(null);

  // Form States
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formType, setFormType] = useState<Outlet["type"]>("Flagship Store");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("Jakarta Selatan");
  const [formPhone, setFormPhone] = useState("");
  const [formManagerName, setFormManagerName] = useState("");
  const [formOperatingHours, setFormOperatingHours] = useState("08:00 - 22:00 WIB");
  const [formStatus, setFormStatus] = useState<Outlet["status"]>("Aktif");

  const isQuotaFull = outlets.length >= subscription.maxOutlets;

  const handleOpenAddModal = () => {
    if (isQuotaFull) {
      setIsUpgradeModalOpen(true);
      return;
    }
    setEditingOutlet(null);
    setFormName("");
    setFormCode(`OUT-00${outlets.length + 1}`);
    setFormType("Express / Kiosk");
    setFormAddress("");
    setFormCity("Jakarta");
    setFormPhone("0812-");
    setFormManagerName("");
    setFormOperatingHours("08:00 - 22:00 WIB");
    setFormStatus("Aktif");
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (outlet: Outlet) => {
    setEditingOutlet(outlet);
    setFormName(outlet.name);
    setFormCode(outlet.code);
    setFormType(outlet.type);
    setFormAddress(outlet.address);
    setFormCity(outlet.city);
    setFormPhone(outlet.phone);
    setFormManagerName(outlet.managerName);
    setFormOperatingHours(outlet.operatingHours);
    setFormStatus(outlet.status);
    setIsAddEditModalOpen(true);
  };

  const handleSaveOutlet = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOutlet) {
      setOutlets((prev) =>
        prev.map((o) =>
          o.id === editingOutlet.id
            ? {
                ...o,
                name: formName,
                code: formCode,
                type: formType,
                address: formAddress,
                city: formCity,
                phone: formPhone,
                managerName: formManagerName,
                operatingHours: formOperatingHours,
                status: formStatus,
              }
            : o
        )
      );
    } else {
      const newOutlet: Outlet = {
        id: `OUT-00${outlets.length + 1}`,
        code: formCode || `OUT-0${outlets.length + 1}`,
        name: formName,
        type: formType,
        address: formAddress,
        city: formCity,
        phone: formPhone,
        managerName: formManagerName,
        status: formStatus,
        operatingHours: formOperatingHours,
        totalEmployees: 2,
        todayRevenue: 0,
        isMainBranch: false,
      };
      setOutlets((prev) => [...prev, newOutlet]);
      setSubscription((sub) => ({
        ...sub,
        currentOutletsUsed: sub.currentOutletsUsed + 1,
      }));
    }
    setIsAddEditModalOpen(false);
  };

  const handleDeleteOutlet = (outletId: string) => {
    const target = outlets.find((o) => o.id === outletId);
    if (target?.isMainBranch) {
      alert("Outlet Utama (Pusat) tidak dapat dihapus!");
      return;
    }
    if (confirm("Apakah Anda yakin ingin menonaktifkan atau menghapus outlet ini?")) {
      setOutlets((prev) => prev.filter((o) => o.id !== outletId));
    }
  };

  const handleUpgradeToMultiOutlet = () => {
    setSubscription({
      planId: "multi_outlet",
      planName: "Multi-Outlet Pro",
      maxOutlets: 5,
      currentOutletsUsed: outlets.length,
      billingCycle: "Tahunan",
      renewalDate: "20 September 2027",
      pricePerMonth: 199000,
      badgeText: "Paket Multi-Outlet (Maks 5 Cabang)",
    });
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Subscription Quota Card */}
      <div className="p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#10B981] text-white neo-shadow-xs">
              <Crown className="w-5 h-5" />
            </span>
            <h2 className="font-extrabold text-lg sm:text-xl text-[#111827]">
              Langganan: {subscription.planName}
            </h2>
            <StickerBadge variant="yellow" rotate={1} className="text-[11px] py-0.5">
              {subscription.badgeText}
            </StickerBadge>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Jumlah cabang aktif dibatasi oleh paket langganan Anda. Anda saat ini menggunakan{" "}
            <strong className="text-[#111827] font-black">{outlets.length}</strong> dari{" "}
            <strong className="text-[#111827] font-black">{subscription.maxOutlets} kuota cabang</strong>.
          </p>

          {/* Progress Quota Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-500">Kapasitas Outlet:</span>
              <span className={isQuotaFull ? "text-[#FF6B4A] font-black" : "text-[#059669] font-black"}>
                {outlets.length} / {subscription.maxOutlets} Cabang ({Math.round((outlets.length / subscription.maxOutlets) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3.5 bg-gray-100 rounded-full border-2 border-[#111827] overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isQuotaFull ? "bg-[#FF6B4A]" : "bg-[#10B981]"
                }`}
                style={{ width: `${(outlets.length / subscription.maxOutlets) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Upgrade & Add Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
          <button
            onClick={handleOpenAddModal}
            className={`py-3 px-5 rounded-2xl border-2 border-[#111827] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer ${
              isQuotaFull
                ? "bg-[#FF6B4A] text-white"
                : "bg-[#10B981] text-white"
            }`}
          >
            {isQuotaFull ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Tambah Cabang (Upgrade Paket)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-3" />
                <span>Tambah Outlet Baru</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="py-2.5 px-4 rounded-xl border-2 border-gray-300 hover:border-[#111827] bg-[#FBF9F5] text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>Lihat Paket Multi-Cabang</span>
          </button>
        </div>
      </div>

      {/* Outlets Grid Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-extrabold text-base text-[#111827]">
              Daftar Outlet Terdaftar ({outlets.length})
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Pilih &ldquo;Aktifkan Outlet&rdquo; untuk beralih konteks backoffice
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {outlets.map((outlet) => {
            const isCurrentlySelected = outlet.id === currentActiveOutletId;

            return (
              <div
                key={outlet.id}
                className={`p-5 rounded-3xl border-2 transition-all relative flex flex-col justify-between ${
                  isCurrentlySelected
                    ? "border-[#111827] bg-white neo-shadow-sm ring-3 ring-[#10B981]/30"
                    : "border-gray-200 bg-white hover:border-[#111827]"
                }`}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl border-2 border-[#111827] flex items-center justify-center font-black text-lg ${
                          outlet.isMainBranch
                            ? "bg-[#FBBF24] text-[#111827]"
                            : "bg-[#FBF9F5] text-gray-700"
                        }`}
                      >
                        <Store className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base text-[#111827] tracking-tight">
                            {outlet.name}
                          </h4>
                          {outlet.isMainBranch && (
                            <span className="text-[10px] font-black bg-[#FBBF24] text-[#111827] px-2 py-0.5 rounded-md border border-[#111827]">
                              PUSAT 👑
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono font-bold text-gray-500">
                            {outlet.code}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-gray-100 text-gray-600">
                            {outlet.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border shrink-0 ${
                        outlet.status === "Aktif"
                          ? "bg-[#D1FAE5] text-[#059669] border-[#059669]"
                          : outlet.status === "Renovasi"
                          ? "bg-[#FEF3C7] text-[#D97706] border-[#D97706]"
                          : "bg-gray-100 text-gray-500 border-gray-300"
                      }`}
                    >
                      {outlet.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 py-3 border-y border-dashed border-gray-200 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{outlet.address}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>PIC: <strong>{outlet.managerName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-mono">{outlet.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{outlet.operatingHours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Omset: <strong>Rp {outlet.todayRevenue.toLocaleString("id-ID")}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(outlet)}
                      className="p-2 rounded-xl border border-gray-300 hover:border-[#111827] text-gray-700 hover:bg-gray-50 transition-colors"
                      title="Edit Data Cabang"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!outlet.isMainBranch && (
                      <button
                        onClick={() => handleDeleteOutlet(outlet.id)}
                        className="p-2 rounded-xl border border-gray-300 hover:border-[#DC2626] text-gray-500 hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                        title="Hapus Cabang"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {isCurrentlySelected ? (
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#10B981] text-white font-extrabold text-xs neo-shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                      <span>Outlet Aktif Saat Ini</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectActiveOutlet(outlet)}
                      className="px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-[#111827] hover:text-white text-[#111827] font-bold text-xs transition-colors cursor-pointer"
                    >
                      Beralih ke Outlet Ini
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Tambah / Edit Outlet */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-base text-[#111827]">
                  {editingOutlet ? "Edit Informasi Outlet" : "Tambah Outlet Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOutlet} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Outlet / Cabang:</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-bold"
                  placeholder="Contoh: Tokova Express - BSD City"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kode Cabang:</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono font-bold"
                    placeholder="OUT-003"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tipe Outlet:</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as Outlet["type"])}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-bold bg-white"
                  >
                    <option value="Flagship Store">Flagship Store</option>
                    <option value="Express / Kiosk">Express / Kiosk</option>
                    <option value="Mall Outlet">Mall Outlet</option>
                    <option value="Stand-alone">Stand-alone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Alamat Lengkap:</label>
                <input
                  type="text"
                  required
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  placeholder="Nama jalan, nomor ruko, kecamatan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kota / Wilayah:</label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nomor Telepon Toko:</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nama Manajer / PIC:</label>
                  <input
                    type="text"
                    required
                    value={formManagerName}
                    onChange={(e) => setFormManagerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Jam Operasional:</label>
                  <input
                    type="text"
                    value={formOperatingHours}
                    onChange={(e) => setFormOperatingHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Status Operasi:</label>
                <div className="flex gap-2">
                  {(["Aktif", "Renovasi", "Non-aktif"] as const).map((st) => (
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

              <div className="pt-3 flex gap-2">
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
                  {editingOutlet ? "Simpan Perubahan" : "Daftarkan Outlet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Upgrade Paket Langganan */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-[#111827] p-6 sm:p-7 neo-shadow space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B4A] text-white border-2 border-[#111827] flex items-center justify-center neo-shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#111827]">
                    Tingkatkan Kuota Outlet Bisnis Anda
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Cabang Anda terus berkembang? Buka kapasitas multi-cabang tanpa batasan!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current Plan */}
              <div className="p-4 rounded-2xl border-2 border-gray-200 bg-[#FBF9F5] text-xs space-y-2 opacity-75">
                <div className="font-bold text-gray-500 uppercase text-[10px]">Paket Saat Ini</div>
                <div className="font-extrabold text-sm text-[#111827]">{subscription.planName}</div>
                <div className="text-gray-600 font-medium">Maksimal {subscription.maxOutlets} Cabang</div>
                <div className="font-mono font-bold text-gray-700">Rp 99.000 / bln</div>
                <div className="pt-2 text-[11px] text-amber-700 font-bold">
                  ⚠️ Kuota outlet saat ini: {outlets.length}/{subscription.maxOutlets}
                </div>
              </div>

              {/* Recommended Upgrade */}
              <div className="p-4 rounded-2xl border-2 border-[#111827] bg-[#D1FAE5]/40 text-xs space-y-2 relative neo-shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#059669] uppercase text-[10px]">Rekomendasi</span>
                  <span className="bg-[#10B981] text-white text-[9px] font-black px-2 py-0.2 rounded-full">
                    +2 Kuota Baru
                  </span>
                </div>
                <div className="font-extrabold text-sm text-[#111827]">Paket Multi-Outlet Pro</div>
                <div className="text-gray-700 font-medium">Hingga 5 Cabang Terpisah</div>
                <div className="font-mono font-black text-sm text-[#10B981]">
                  Rp 199.000 <span className="text-[10px] text-gray-500 font-sans">/ bln</span>
                </div>
                <ul className="pt-1 space-y-1 text-[11px] text-gray-600 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    Transfer Stok Antar-Cabang
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#059669]" />
                    Laporan Konsolidasi Omset
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleUpgradeToMultiOutlet}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-black text-sm flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer"
              >
                <span>Upgrade ke Paket Multi-Outlet (Maks 5 Cabang)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-gray-500 font-medium mt-2">
                Simulasi instan untuk pengujian backoffice. Tidak ada tagihan kartu kredit nyata.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
