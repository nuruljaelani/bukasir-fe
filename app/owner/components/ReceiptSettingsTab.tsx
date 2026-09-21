"use client";

import React, { useState } from "react";
import {
  Printer,
  Wifi,
  Save,
  Check,
  QrCode,
  Store,
  FileText,
  Sliders,
  Sparkles,
} from "lucide-react";
import { StoreSettings, INITIAL_SETTINGS } from "../data/ownerMockData";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface ReceiptSettingsTabProps {
  currentOutletName?: string;
  currentOutletAddress?: string;
  currentOutletPhone?: string;
}

export default function ReceiptSettingsTab({
  currentOutletName = "Tokova Store - Senopati",
  currentOutletAddress = "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
  currentOutletPhone = "0812-9988-7766",
}: ReceiptSettingsTabProps) {
  const [settings, setSettings] = useState<StoreSettings>({
    ...INITIAL_SETTINGS,
    storeName: currentOutletName,
    address: currentOutletAddress,
    phone: currentOutletPhone,
  });

  const [paperWidth, setPaperWidth] = useState<"58mm" | "80mm">("58mm");
  const [showWifiOnReceipt, setShowWifiOnReceipt] = useState(true);
  const [showQueueNumber, setShowQueueNumber] = useState(true);
  const [showQrCode, setShowQrCode] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] border-2 border-[#111827] flex items-center justify-center neo-shadow-sm shrink-0">
            <Printer className="w-6 h-6 text-[#111827]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg text-[#111827]">
                Format & Desain Cetak Struk
              </h2>
              <StickerBadge variant="yellow" rotate={-1} className="text-[10px] py-0.5">
                Thermal POS
              </StickerBadge>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Sesuaikan layout struk belanja fisik, teks ucapan, persentase pajak, dan informasi WiFi pengunjung.
            </p>
          </div>
        </div>

        {/* Paper Size Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FBF9F5] rounded-xl border-2 border-[#111827]">
          <button
            type="button"
            onClick={() => setPaperWidth("58mm")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              paperWidth === "58mm"
                ? "bg-[#111827] text-white neo-shadow-xs"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Lebar 58mm (Standar)
          </button>
          <button
            type="button"
            onClick={() => setPaperWidth("80mm")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              paperWidth === "80mm"
                ? "bg-[#111827] text-white neo-shadow-xs"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Lebar 80mm (Lebar)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Form Settings (Col 7) */}
        <div className="lg:col-span-7 p-6 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
            {/* Header Struk */}
            <div className="space-y-3 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#111827]">
                <Store className="w-4 h-4 text-[#10B981]" />
                <span>Informasi Header Struk</span>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Toko pada Struk:</label>
                <input
                  type="text"
                  required
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-bold"
                  placeholder="Contoh: Tokova Coffee & Eatery"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Slogan / Tagline Struk:</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  placeholder="Contoh: Kopi Nikmat, Rasa Hebat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Alamat Outlet:</label>
                  <input
                    type="text"
                    required
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">No. Kontak / Hotline:</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Pajak & Service Charge */}
            <div className="space-y-3 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#111827]">
                <Sliders className="w-4 h-4 text-[#FF6B4A]" />
                <span>Pajak (PB1 / PPN) & Biaya Layanan</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Tarif Pajak Resto / PPN (%):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={settings.taxPercent}
                      onChange={(e) =>
                        setSettings({ ...settings, taxPercent: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold pr-8"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Biaya Layanan (Service Charge %):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={settings.serviceChargePercent}
                      onChange={(e) =>
                        setSettings({ ...settings, serviceChargePercent: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-mono font-bold pr-8"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Switch & Elemen Tambahan */}
            <div className="space-y-3 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#111827]">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <span>Elemen Tambahan pada Struk</span>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 bg-[#FBF9F5] cursor-pointer hover:border-[#111827] transition-colors">
                  <div>
                    <span className="font-extrabold text-xs text-[#111827] block">
                      Cetak Nomor Antrian & Meja
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Memudahkan barista & staff dapur mencocokkan pesanan.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showQueueNumber}
                    onChange={(e) => setShowQueueNumber(e.target.checked)}
                    className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 bg-[#FBF9F5] cursor-pointer hover:border-[#111827] transition-colors">
                  <div>
                    <span className="font-extrabold text-xs text-[#111827] block">
                      Cetak Kode QR / QRIS Dinamik
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Menampilkan QR di bawah struk untuk verifikasi atau invoice digital.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showQrCode}
                    onChange={(e) => setShowQrCode(e.target.checked)}
                    className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 bg-[#FBF9F5] cursor-pointer hover:border-[#111827] transition-colors">
                  <div>
                    <span className="font-extrabold text-xs text-[#111827] block">
                      Sertakan Info WiFi Pengunjung
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Pelanggan dapat langsung melihat nama SSID dan kata sandi WiFi.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showWifiOnReceipt}
                    onChange={(e) => setShowWifiOnReceipt(e.target.checked)}
                    className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
                  />
                </label>
              </div>

              {showWifiOnReceipt && (
                <div className="p-3 bg-white rounded-xl border-2 border-dashed border-[#10B981] grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Nama WiFi (SSID):</label>
                    <input
                      type="text"
                      value={settings.wifiName}
                      onChange={(e) => setSettings({ ...settings, wifiName: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Password WiFi:</label>
                    <input
                      type="text"
                      value={settings.wifiPass}
                      onChange={(e) => setSettings({ ...settings, wifiPass: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Pesan Footer */}
            <div className="space-y-2">
              <label className="font-bold text-gray-700 block">
                Pesan Penutup & Media Sosial (Footer Struk):
              </label>
              <textarea
                rows={2}
                value={settings.receiptFooterMessage}
                onChange={(e) =>
                  setSettings({ ...settings, receiptFooterMessage: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                placeholder="Terima kasih atas kunjungannya! Follow IG @tokovacoffee"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 stroke-3" />
                    <span>Format Struk Berhasil Disimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Konfigurasi Struk</span>
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
                Live Preview Cetak ({paperWidth})
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase">
              Real-Time
            </span>
          </div>

          {/* Struk Card Simulation */}
          <div
            className={`bg-[#FBF9F5] rounded-2xl border-2 border-[#111827] p-5 font-mono text-xs space-y-3 mx-auto transition-all ${
              paperWidth === "58mm" ? "max-w-xs" : "max-w-sm"
            }`}
          >
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-gray-400 font-sans space-y-0.5">
              <div className="font-black text-sm text-[#111827] uppercase tracking-wide">
                {settings.storeName || "TOKOVA STORE"}
              </div>
              {settings.tagline && (
                <div className="text-[10px] text-gray-500 italic">&ldquo;{settings.tagline}&rdquo;</div>
              )}
              <div className="text-[10px] text-gray-600 leading-tight pt-1">{settings.address}</div>
              <div className="text-[10px] text-gray-500">Hotline: {settings.phone}</div>

              {showQueueNumber && (
                <div className="mt-2 py-1 px-2 rounded-lg bg-white border border-dashed border-[#111827] inline-block font-mono">
                  <span className="text-[10px] font-bold text-gray-500">NO. ANTRIAN: </span>
                  <span className="text-sm font-black text-[#10B981]">A-024</span>
                </div>
              )}

              <div className="text-[9px] text-gray-400 pt-1">
                20/09/2026 14:35 • Kasir: Budi • Order #TK-9942
              </div>
            </div>

            {/* Dummy Items */}
            <div className="py-2 space-y-1.5 font-sans border-b border-dashed border-gray-400">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-[#111827]">2x Kopi Susu Tokova</div>
                  <div className="text-[10px] text-gray-400">@ Rp 18.000 (Less Sugar)</div>
                </div>
                <span className="font-mono font-bold">Rp 36.000</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-[#111827]">1x Croissant Butter</div>
                  <div className="text-[10px] text-gray-400">@ Rp 25.000</div>
                </div>
                <span className="font-mono font-bold">Rp 25.000</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-[#111827]">1x Kaos Polos 24s Heavy</div>
                  <div className="text-[10px] text-gray-400">Size L - Hitam Solid</div>
                </div>
                <span className="font-mono font-bold">Rp 85.000</span>
              </div>
            </div>

            {/* Subtotal, Pajak, Service */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>Rp 146.000</span>
              </div>
              {settings.serviceChargePercent > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Service Charge ({settings.serviceChargePercent}%):</span>
                  <span>
                    Rp{" "}
                    {Math.round(
                      146000 * (settings.serviceChargePercent / 100)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
              {settings.taxPercent > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Pajak Resto/PPN ({settings.taxPercent}%):</span>
                  <span>
                    Rp{" "}
                    {Math.round(
                      146000 * (settings.taxPercent / 100)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-[#111827] pt-1.5 border-t border-gray-400">
                <span>TOTAL:</span>
                <span className="text-[#059669]">
                  Rp{" "}
                  {(
                    146000 +
                    Math.round(146000 * (settings.taxPercent / 100)) +
                    Math.round(146000 * (settings.serviceChargePercent / 100))
                  ).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 pt-0.5">
                <span>Bayar (QRIS Dinamis):</span>
                <span>LUNAS</span>
              </div>
            </div>

            {/* QR Code Simulation */}
            {showQrCode && (
              <div className="pt-2 pb-1 text-center border-t border-dashed border-gray-400">
                <div className="w-20 h-20 mx-auto bg-white p-1.5 rounded-lg border border-gray-300 flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-[#111827]" />
                </div>
                <span className="text-[9px] text-gray-400 block mt-1">
                  Scan QR untuk Invoice & E-Receipt
                </span>
              </div>
            )}

            {/* Wifi & Footer Greetings */}
            <div className="pt-2 border-t border-dashed border-gray-400 text-center space-y-1">
              {showWifiOnReceipt && settings.wifiName && (
                <div className="text-[10px] text-gray-600 font-sans bg-white py-1 px-2 rounded border border-gray-200">
                  📶 WiFi: <strong>{settings.wifiName}</strong> | Pass: {settings.wifiPass}
                </div>
              )}
              <div className="text-[10px] font-bold text-gray-700 italic pt-1">
                &ldquo;{settings.receiptFooterMessage}&rdquo;
              </div>
              <div className="text-[9px] text-gray-400 font-mono">
                *** TOKOVA CLOUD POS v2.4 ***
              </div>
            </div>
          </div>

          <div className={`${paperWidth === "58mm" ? "max-w-xs" : "max-w-sm"} mx-auto`}>
            <ReceiptEdge fillColor="#FBF9F5" teethCount={paperWidth === "58mm" ? 14 : 18} className="-mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
