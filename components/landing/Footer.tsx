import React from "react";
import Link from "next/link";
import { Store, ArrowRight, ShieldCheck, Heart, Sparkles, MessageCircle } from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-12 border-t-2 border-[#111827]">
      {/* Top Banner Call-to-Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#10B981] rounded-3xl border-3 border-white p-8 sm:p-12 text-[#111827] flex flex-col lg:flex-row items-center justify-between gap-8 neo-shadow-lg relative overflow-hidden">
          <div className="space-y-2 text-center lg:text-left">
            <StickerBadge variant="yellow" rotate={-2}>
              MULAI SEKARANG JUGA ⚡
            </StickerBadge>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Bikin Kasir Tokomu Lebih Cepat & Rapi
            </h3>
            <p className="text-[#111827]/80 font-semibold max-w-xl">
              Coba langsung aplikasi kasirnya tanpa perlu kartu kredit atau komitmen apapun.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              href="/pos"
              className="px-8 py-4 rounded-2xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold text-center neo-shadow neo-shadow-hover transition-all flex items-center justify-center gap-2"
            >
              <span>Buka Kasir POS</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/?text=Halo%20Tokova,%20saya%20ingin%20tanya%20aplikasi%20kasir"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl border-2 border-[#111827] bg-white text-[#111827] font-extrabold text-center neo-shadow neo-shadow-hover transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#059669]" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info (Col 2) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#10B981] border-2 border-white flex items-center justify-center text-white font-extrabold text-lg">
                <Store className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                tokova<span className="text-[#10B981]">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">
              SaaS POS (Point of Sale) modern untuk mempermudah transaksi, manajemen stok, dan laporan keuangan ribuan UMKM Indonesia.
            </p>

            {/* Server Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-xs font-mono text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Gateway QRIS & Server Normal (99.98%)</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-4">
              Produk
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li>
                <Link href="/pos" className="hover:text-white transition-colors">
                  Web POS Kasir
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="hover:text-white transition-colors">
                  Integrasi QRIS
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="hover:text-white transition-colors">
                  Cetak Struk Bluetooth
                </Link>
              </li>
              <li>
                <Link href="#fitur" className="hover:text-white transition-colors">
                  Manajemen Meja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-4">
              Industri
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Kedai Kopi & Kafe
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Restoran & Warung
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Toko Retail & Distro
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Bakery & Kue
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-white mb-4">
              Bantuan & Kontak
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li>
                <Link href="#harga" className="hover:text-white transition-colors">
                  Pilihan Paket
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Tanya%20CS%20Tokova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Customer Support WA
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Panduan Setup 2 Menit
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Kebijakan Privasi
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Tokova POS. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF6B4A] text-[#FF6B4A]" />
            <span>untuk kemajuan UMKM Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
