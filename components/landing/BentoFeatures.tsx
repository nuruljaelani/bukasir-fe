import React from "react";
import {
  Zap,
  QrCode,
  Printer,
  Smartphone,
  TrendingUp,
  LayoutGrid,
  CheckCircle,
  BellRing,
  Share2,
} from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";
import ReceiptEdge from "../ornaments/ReceiptEdge";

export default function BentoFeatures() {
  return (
    <section id="fitur" className="py-20 lg:py-28 bg-[#FBF9F5] border-b-2 border-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block">
            <StickerBadge variant="coral" rotate={-2} withSparkle>
              Fitur Andalan UMKM Juara
            </StickerBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Semua yang Dibutuhkan Kasir,{" "}
            <span className="text-[#059669] underline decoration-[#FBBF24] decoration-4 underline-offset-8">
              Tanpa Bikin Pusing
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Dirancang khusus dengan alur kerja nyata di toko dan kafe. Kasir baru bisa langsung jago jualan hanya dalam hitungan menit.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Bento Item 1: Transaksi QRIS Kilat (Span 7) */}
          <div className="md:col-span-7 bg-white rounded-3xl border-3 border-[#111827] neo-shadow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-4 right-4 z-10">
              <StickerBadge variant="mint" rotate={2}>
                ⚡ Tercepat di Kelasnya
              </StickerBadge>
            </div>

            <div className="space-y-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669]">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">
                Transaksi Kilat & QRIS Dinamis Otomatis
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                Pelanggan cukup scan satu QRIS dari kasir. Nominal terinput otomatis, notifikasi bayar langsung berdering di layar kasir tanpa perlu cek mutasi m-banking manual!
              </p>
            </div>

            {/* Interactive Visual Element */}
            <div className="bg-[#FBF9F5] rounded-2xl border-2 border-[#111827] p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white p-3 rounded-xl border-2 border-[#111827] shadow-sm flex flex-col items-center">
                <QrCode className="w-24 h-24 text-[#111827]" />
                <span className="text-[10px] font-extrabold text-[#059669] mt-1 uppercase">
                  QRIS Terverifikasi
                </span>
              </div>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#059669] text-xs font-extrabold">
                  <CheckCircle className="w-3.5 h-3.5" /> Pembayaran Berhasil Terdeteksi
                </div>
                <div className="font-mono text-xs text-gray-500">
                  Total: <strong className="text-[#111827] text-sm">Rp 48.000</strong>
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Support BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja.
                </p>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Multi-Device Kasir (Span 5) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#FFEDD5] to-[#FEE2E2] rounded-3xl border-3 border-[#111827] neo-shadow p-6 sm:p-8 flex flex-col justify-between relative">
            <div className="space-y-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#111827] flex items-center justify-center text-[#EA580C]">
                <Smartphone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">
                Gunakan Gadget Apapun
              </h3>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                Tidak perlu beli mesin kasir jutaan rupiah yang mahal. Buka Tokova langsung di tablet Android/iPad, HP staf, atau laptop bekas sekalipun.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#111827] p-4 text-center">
              <div className="flex items-center justify-around text-xs font-extrabold text-[#111827]">
                <span className="flex flex-col items-center gap-1">
                  <span className="text-2xl">📱</span>
                  <span>Smartphone</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex flex-col items-center gap-1">
                  <span className="text-2xl">📟</span>
                  <span>Tablet POS</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex flex-col items-center gap-1">
                  <span className="text-2xl">💻</span>
                  <span>Laptop / PC</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Cetak Struk Bluetooth & WhatsApp (Span 5) */}
          <div className="md:col-span-5 bg-white rounded-3xl border-3 border-[#111827] neo-shadow p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706]">
                <Printer className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">
                Struk Keren & Kirim WA
              </h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                Cetak struk ke printer thermal Bluetooth (58mm/80mm) atau kirim struk digital berlogo tokomu langsung ke WhatsApp pelanggan. Hemat kertas, lebih modern!
              </p>
            </div>

            {/* Simulated Mini Receipt Card */}
            <div className="bg-[#FBF9F5] border-2 border-[#111827] rounded-xl p-3 font-mono text-[11px] relative">
              <div className="flex items-center justify-between border-b border-gray-300 pb-1.5 font-sans">
                <span className="font-extrabold text-[#111827]">TOKOVA CAFE & BAKERY</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-800 font-bold">LUNAS</span>
              </div>
              <div className="py-2 flex items-center justify-between font-sans">
                <span>1x Kopi Gula Aren + 1x Roti</span>
                <span className="font-bold">Rp 35.000</span>
              </div>
              <div className="pt-2 border-t border-dashed border-gray-300 flex gap-2 font-sans">
                <button className="flex-1 py-1 px-2 rounded-lg border border-[#111827] bg-[#10B981] text-white font-bold text-[10px] flex items-center justify-center gap-1">
                  <Printer className="w-3 h-3" /> Cetak
                </button>
                <button className="flex-1 py-1 px-2 rounded-lg border border-[#111827] bg-white font-bold text-[10px] flex items-center justify-center gap-1">
                  <Share2 className="w-3 h-3 text-[#059669]" /> WhatsApp
                </button>
              </div>
              <ReceiptEdge fillColor="#FBF9F5" teethCount={12} className="-mt-0.5" />
            </div>
          </div>

          {/* Bento Item 4: Laporan Omset Real-time & Manajemen Menu (Span 7) */}
          <div className="md:col-span-7 bg-[#ECFDF5] rounded-3xl border-3 border-[#111827] neo-shadow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#111827] flex items-center justify-center text-[#059669]">
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">
                Pantau Omset Real-time Dari Mana Saja
              </h3>
              <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">
                Pemilik toko tidak perlu lagi nunggu kasir tutup toko di malam hari. Cek grafik penjualan, produk paling laris, dan sisa stok bahan langsung dari ponselmu saat sedang liburan.
              </p>
            </div>

            {/* Mini Dashboard Metric Grid */}
            <div className="grid grid-cols-3 gap-3 bg-white rounded-2xl border-2 border-[#111827] p-4 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Omset Hari Ini</span>
                <span className="text-sm sm:text-base font-extrabold text-[#059669] font-mono">Rp 4.250.000</span>
              </div>
              <div className="border-x border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Transaksi</span>
                <span className="text-sm sm:text-base font-extrabold text-[#111827] font-mono">148 Order</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Menu Terlaris</span>
                <span className="text-xs sm:text-sm font-bold text-[#EA580C] truncate block">☕ Kopi Susu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
