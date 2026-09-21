"use client";

import React, { useState } from "react";
import { Store, Printer, Wifi, Shield, Save, Check } from "lucide-react";
import { StoreSettings, INITIAL_SETTINGS } from "../data/ownerMockData";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";

export default function StoreSettingsTab() {
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Form Settings (Col 7) */}
        <div className="lg:col-span-7 p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-6">
            <div>
              <h3 className="font-extrabold text-base text-[#111827]">
                Konfigurasi Profil Outlet & Struk
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Informasi ini akan tercetak langsung pada struk belanja dan QRIS pelanggan.
              </p>
            </div>
            <span className="p-2 rounded-xl bg-[#D1FAE5] text-[#059669]">
              <Store className="w-5 h-5" />
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Nama Kedai / Toko:</label>
              <input
                type="text"
                required
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Alamat Lengkap:</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">No. Kontak Kasir:</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Tarif PB1 Resto (%):</label>
                <input
                  type="number"
                  value={settings.taxPercent}
                  onChange={(e) => setSettings({ ...settings, taxPercent: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-bold"
                />
              </div>
            </div>

            {/* Guest Wifi Info */}
            <div className="p-3 bg-[#FBF9F5] rounded-xl border border-gray-200 grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama WiFi Pengunjung:</label>
                <input
                  type="text"
                  value={settings.wifiName}
                  onChange={(e) => setSettings({ ...settings, wifiName: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-medium text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Password WiFi:</label>
                <input
                  type="text"
                  value={settings.wifiPass}
                  onChange={(e) => setSettings({ ...settings, wifiPass: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white font-medium text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">
                Pesan Footer Struk (Greeting Message):
              </label>
              <textarea
                rows={2}
                value={settings.receiptFooterMessage}
                onChange={(e) =>
                  setSettings({ ...settings, receiptFooterMessage: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Perubahan Berhasil Disimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengaturan Outlet</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Struk Preview (Col 5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#059669]" />
              <h4 className="font-extrabold text-sm text-[#111827]">
                Live Preview Cetak Struk 58mm
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase">
              Otomatis Terupdate
            </span>
          </div>

          {/* Struk Card Simulation */}
          <div className="bg-[#FBF9F5] rounded-2xl border-2 border-[#111827] p-5 font-mono text-xs space-y-3">
            <div className="text-center pb-3 border-b border-dashed border-gray-300 font-sans space-y-0.5">
              <div className="font-black text-sm text-[#111827] uppercase">
                {settings.storeName || "TOKOVA COFFEE"}
              </div>
              <div className="text-[11px] text-gray-500">{settings.address}</div>
              <div className="text-[10px] text-gray-400">Telp: {settings.phone}</div>
              <div className="text-[10px] text-gray-400 pt-1">
                20/09/2026 14:30 • Kasir: Budi • Order #TK-9921
              </div>
            </div>

            {/* Dummy Items */}
            <div className="py-2 space-y-1.5 font-sans border-b border-dashed border-gray-300">
              <div className="flex justify-between">
                <span>2x Kopi Susu Tokova</span>
                <span className="font-mono font-bold">Rp 36.000</span>
              </div>
              <div className="flex justify-between">
                <span>1x Croissant Butter</span>
                <span className="font-mono font-bold">Rp 25.000</span>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>Rp 61.000</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PB1 ({settings.taxPercent}%):</span>
                <span>Rp {Math.round(61000 * (settings.taxPercent / 100)).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#111827] pt-1 border-t border-gray-300">
                <span>TOTAL:</span>
                <span className="text-[#059669]">
                  Rp {(61000 + Math.round(61000 * (settings.taxPercent / 100))).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Wifi & Footer Greetings */}
            <div className="pt-3 border-t border-dashed border-gray-300 text-center space-y-1">
              {settings.wifiName && (
                <div className="text-[10px] text-gray-500 font-sans">
                  📶 WiFi: <strong>{settings.wifiName}</strong> / Pass: {settings.wifiPass}
                </div>
              )}
              <div className="text-[11px] font-bold text-gray-700 italic pt-1">
                &ldquo;{settings.receiptFooterMessage}&rdquo;
              </div>
            </div>
          </div>

          <ReceiptEdge fillColor="#FBF9F5" teethCount={16} className="-mt-0.5" />
        </div>
      </div>
    </div>
  );
}
