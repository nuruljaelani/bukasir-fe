"use client";

import React, { useState } from "react";
import {
  Building2,
  Store,
  Crown,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Edit2,
  Save,
  Plus,
  Sparkles,
  ExternalLink,
  Layers,
  HelpCircle,
} from "lucide-react";
import StickerBadge from "@/components/ornaments/StickerBadge";
import { Merchant, INITIAL_MERCHANT } from "../data/merchantMockData";

interface MerchantProfileTabProps {
  onNavigateToOutlets: () => void;
}

export default function MerchantProfileTab({
  onNavigateToOutlets,
}: MerchantProfileTabProps) {
  const [merchant, setMerchant] = useState<Merchant>(INITIAL_MERCHANT);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [brandName, setBrandName] = useState(merchant.brandName);
  const [companyName, setCompanyName] = useState(merchant.companyName);
  const [businessCategory, setBusinessCategory] = useState(merchant.businessCategory);
  const [businessType, setBusinessType] = useState(merchant.businessType);
  const [taxId, setTaxId] = useState(merchant.taxId);
  const [email, setEmail] = useState(merchant.email);
  const [phone, setPhone] = useState(merchant.phone);
  const [address, setAddress] = useState(merchant.headquartersAddress);
  const [city, setCity] = useState(merchant.city);

  // Bank Form State
  const [bankName, setBankName] = useState(merchant.bankAccount.bankName);
  const [accountNumber, setAccountNumber] = useState(merchant.bankAccount.accountNumber);
  const [accountHolder, setAccountHolder] = useState(merchant.bankAccount.accountHolder);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMerchant((prev) => ({
      ...prev,
      brandName: brandName.trim(),
      companyName: companyName.trim(),
      businessCategory: businessCategory.trim(),
      businessType,
      taxId: taxId.trim(),
      email: email.trim(),
      phone: phone.trim(),
      headquartersAddress: address.trim(),
      city: city.trim(),
      bankAccount: {
        bankName,
        accountNumber: accountNumber.trim(),
        accountHolder: accountHolder.trim().toUpperCase(),
      },
    }));
    setIsEditing(false);
    alert("Profil Merchant & Rekening Settlement berhasil disimpan!");
  };

  const outletsUsed = merchant.outlets.length;
  const maxOutlets = merchant.subscription.maxOutlets;
  const quotaPercent = Math.min(100, Math.round((outletsUsed / maxOutlets) * 100));

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Header Card: Merchant Brand & Verification */}
      <div className="bg-white rounded-3xl border-3 border-[#111827] p-6 neo-shadow relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-black text-2xl neo-shadow-sm shrink-0">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#111827]">
                  {merchant.brandName}
                </h2>
                <StickerBadge variant="mint" rotate={1} className="text-[10px] py-0.5 px-2 font-black">
                  MERCHANT TERVERIFIKASI ✅
                </StickerBadge>
              </div>

              <p className="text-xs sm:text-sm font-bold text-gray-600">
                {merchant.companyName} ({merchant.businessType})
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 font-mono">
                <span>ID Merchant: <strong>{merchant.id}</strong></span>
                <span>•</span>
                <span>Kategori: {merchant.businessCategory}</span>
                <span>•</span>
                <span>Akun Terdaftar Sejak: {merchant.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#111827] text-white text-xs font-extrabold flex items-center gap-1.5 neo-shadow-sm neo-shadow-hover transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Ubah Profil Bisnis</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SaaS Subscription & Outlet Quota Card */}
      <div className="bg-[#FBF9F5] rounded-3xl border-2 border-[#111827] p-6 neo-shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24] border-2 border-[#111827] flex items-center justify-center text-[#111827]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-[#111827]">
                  Paket Langganan Merchant: {merchant.subscription.planName}
                </h3>
                <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#059669] px-2 py-0.5 rounded-md border border-[#059669]">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Satu user merchant memiliki hak mengelola hingga <strong>{maxOutlets} cabang outlet</strong> dalam satu akun.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBBF24] hover:bg-[#F59E0B] text-[#111827] font-black text-xs flex items-center justify-center gap-1.5 neo-shadow-xs transition-transform active:translate-y-0.5 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upgrade Kuota Cabang</span>
          </button>
        </div>

        {/* Quota Progress Bar */}
        <div className="bg-white p-4 rounded-2xl border-2 border-[#111827] space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-[#111827]">
            <div className="flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#10B981]" />
              <span>Penggunaan Kuota Outlet: {outletsUsed} dari {maxOutlets} Cabang</span>
            </div>
            <span className="font-mono text-[#059669]">{quotaPercent}% Terpakai</span>
          </div>

          {/* Bar */}
          <div className="w-full h-3.5 bg-gray-100 rounded-full border border-[#111827] overflow-hidden p-0.5">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${quotaPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium pt-1">
            <span>Tersisa <strong>{maxOutlets - outletsUsed} slot outlet</strong> dapat didaftarkan di paket ini.</span>
            <span>Perpanjangan: <strong>{merchant.subscription.renewalDate}</strong></span>
          </div>
        </div>

        {/* Quick Outlet Badges Under This Merchant */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {merchant.outlets.map((outlet, idx) => (
            <div
              key={outlet.id}
              className="p-3 bg-white rounded-xl border-2 border-[#111827] flex items-center justify-between"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1 text-[10px] font-black text-gray-500 uppercase">
                  <span>Cabang #{idx + 1}</span>
                  {outlet.isMainBranch && (
                    <span className="text-[#059669] font-extrabold">• Pusat</span>
                  )}
                </div>
                <div className="font-extrabold text-xs text-[#111827] truncate">
                  {outlet.name}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {outlet.city}
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" title="Aktif" />
            </div>
          ))}

          {/* Empty Slot */}
          {outletsUsed < maxOutlets && (
            <button
              onClick={onNavigateToOutlets}
              className="p-3 bg-white hover:bg-[#D1FAE5]/40 transition-colors rounded-xl border-2 border-dashed border-[#111827] flex items-center justify-center gap-2 text-xs font-extrabold text-[#059669] group cursor-pointer"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Tambah Cabang Ke-{outletsUsed + 1}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Form: Business & Settlement Information */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section: Legal Information */}
        <div className="bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-gray-100">
            <FileText className="w-5 h-5 text-[#FF6B4A]" />
            <div>
              <h3 className="font-black text-base text-[#111827]">
                Informasi Legalitas & Kontak Bisnis
              </h3>
              <p className="text-xs text-gray-500">
                Data resmi entitas merchant yang terikat pada akun Anda
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Nama Brand / Toko <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Nama Badan Usaha (PT / CV / Firma)
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Bentuk Usaha
              </label>
              <select
                disabled={!isEditing}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              >
                <option value="PT">Perseroan Terbatas (PT)</option>
                <option value="CV">Commanditaire Vennootschap (CV)</option>
                <option value="Perorangan / UMKM">Perorangan / UMKM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                NPWP Badan Usaha / Pemilik
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-mono font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Email Korespondensi Bisnis
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Nomor Telepon Kantor Pusat
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-[#111827] mb-1">
                Alamat Kantor Pusat Merchant
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section: Bank Settlement */}
        <div className="bg-white rounded-3xl border-2 border-[#111827] p-6 neo-shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-gray-100">
            <CreditCard className="w-5 h-5 text-[#0284C7]" />
            <div>
              <h3 className="font-black text-base text-[#111827]">
                Rekening Pencairan Finansial (Settlement Bank)
              </h3>
              <p className="text-xs text-gray-500">
                Rekening utama untuk menerima hasil pencairan otomatis transaksi QRIS & kartu dari seluruh outlet
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Bank Tujuan Pencairan
              </label>
              <select
                disabled={!isEditing}
                value={bankName}
                onChange={(e) => setBankName(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              >
                <option value="BCA">Bank BCA</option>
                <option value="Mandiri">Bank Mandiri</option>
                <option value="BRI">Bank BRI</option>
                <option value="BNI">Bank BNI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Nomor Rekening
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-mono font-bold bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-[#111827] mb-1">
                Nama Pemilik Rekening
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold uppercase bg-[#FBF9F5] disabled:bg-gray-50 disabled:text-gray-700 focus:outline-hidden focus:bg-white"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#10B981] text-xs text-[#166534] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
            <span>
              Rekening telah terverifikasi untuk menerima dana pencairan otomatis harian (H+1 hari kerja) tanpa potongan biaya admin antar-outlet.
            </span>
          </div>
        </div>

        {/* Save Bar if Editing */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-extrabold hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs flex items-center gap-1.5 neo-shadow-sm neo-shadow-hover transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Merchant</span>
            </button>
          </div>
        )}
      </form>

      {/* Upgrade Subscription Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border-3 border-[#111827] p-6 neo-shadow animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706] mb-3">
              <Crown className="w-6 h-6" />
            </div>

            <h3 className="font-black text-lg text-[#111827] mb-1">
              Upgrade Paket Langganan Tokova
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Paket <strong>Pro Kafe & Retail</strong> saat ini membatasi 1 Merchant memiliki maksimal 3 cabang outlet. Beralih ke <strong>Enterprise</strong> untuk kuota cabang tanpa batas.
            </p>

            <div className="space-y-3 mb-5">
              <div className="p-4 rounded-2xl border-2 border-[#10B981] bg-[#ECFDF5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[#111827]">Paket Enterprise Multi-Cabang</span>
                    <span className="text-[10px] font-black bg-[#10B981] text-white px-2 py-0.5 rounded-md">
                      Rekomendasi
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Hingga 10+ Outlet Cabang • Sentralisasi Gudang • Laporan Konsolidasi
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#111827] font-mono">Rp 199.000</div>
                  <span className="text-[10px] text-gray-500">/ bulan</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
                className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Permintaan upgrade paket berhasil diajukan ke tim Tokova Billing!");
                  setIsUpgradeModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs neo-shadow-sm"
              >
                Hubungi Sales & Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
