"use client";

import React, { useState } from "react";
import OwnerSidebar, { OwnerTab } from "./components/OwnerSidebar";
import OverviewTab from "./components/OverviewTab";
import TransactionsTab from "./components/TransactionsTab";
import ProductsTab from "./components/ProductsTab";
import CategoriesTab from "./components/CategoriesTab";
import InventoryTab from "./components/InventoryTab";
import SuppliersTab from "./components/SuppliersTab";
import PromosTab from "./components/PromosTab";
import CustomersTab from "./components/CustomersTab";
import EmployeesTab from "./components/EmployeesTab";
import ShiftReportTab from "./components/ShiftReportTab";
import OutletsTab from "./components/OutletsTab";
import ReceiptSettingsTab from "./components/ReceiptSettingsTab";
import { INITIAL_ANALYTICS, INITIAL_OUTLETS, Outlet } from "./data/ownerMockData";
import MerchantProfileTab from "./components/MerchantProfileTab";
import { INITIAL_MERCHANT, Merchant } from "./data/merchantMockData";
import {
  Menu,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<OwnerTab>("overview");
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [analytics] = useState(INITIAL_ANALYTICS);
  const [activeOutlet, setActiveOutlet] = useState<Outlet>(INITIAL_OUTLETS[0]);
  const [merchant] = useState<Merchant>(INITIAL_MERCHANT);

  const tabTitles: Record<OwnerTab, { title: string; subtitle: string }> = {
    overview: {
      title: "Ringkasan & Analitik Bisnis",
      subtitle: "Pantau performa penjualan, omset, dan metrik penting outlet.",
    },
    transactions: {
      title: "Riwayat & Detail Transaksi Penjualan",
      subtitle: "Audit catatan struk kasir, cetak ulang nota, dan kelola refund pelanggan.",
    },
    products: {
      title: "Katalog Produk & Harga",
      subtitle: "Kelola data produk, harga modal (HPP), harga jual, dan kode SKU barang.",
    },
    categories: {
      title: "Kategori & Klasifikasi Produk",
      subtitle: "Atur pengelompokan produk toko, emoji kasir, dan urutan tampil di POS.",
    },
    inventory: {
      title: "Manajemen Inventori & Stok Fisik",
      subtitle: "Kontrol pergerakan stok, penyesuaian barang masuk/keluar, dan audit opname.",
    },
    suppliers: {
      title: "Daftar Supplier & Pemasok",
      subtitle: "Kelola data vendor, kontak PIC, dan syarat pembayaran tempo.",
    },
    promos: {
      title: "Promo, Diskon, & Kupon Belanja",
      subtitle: "Atur diskon persentase, voucher belanja, dan syarat minimal pembelian kasir.",
    },
    customers: {
      title: "Data Pelanggan & Member Loyalitas",
      subtitle: "Kelola database pelanggan, tier keanggotaan (VIP), dan riwayat poin belanja.",
    },
    employees: {
      title: "Manajemen Karyawan & Hak Akses",
      subtitle: "Atur tim kasir, barista, supervisor, dan batas izin sistem.",
    },
    shifts: {
      title: "Shift Kasir & Rekap Setoran Kas",
      subtitle: "Audit uang fisik di laci kasir dan pantau riwayat tutup shift.",
    },
    outlets: {
      title: "Manajemen Outlet & Multi-Cabang",
      subtitle: "Kelola daftar cabang usaha, monitor kuota paket langganan, dan PIC toko.",
    },
    receipt: {
      title: "Format & Pengaturan Cetak Struk",
      subtitle: "Kustomisasi header, logo outlet, tarif pajak, dan footer struk thermal.",
    },
    merchant: {
      title: "Profil Merchant & Badan Usaha",
      subtitle: "Kelola identitas brand induk, data legal usaha, rekening pencairan saldo (settlement), dan kuota cabang.",
    },
  };

  return (
    <div className="min-h-screen flex bg-[#FBF9F5] text-[#111827]">
      {/* Sidebar Navigation */}
      <OwnerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        activeOutletName={activeOutlet.name}
        outletCountBadge="2/3 Cabang"
        merchantBrandName={merchant.brandName}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b-2 border-[#111827] px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpenMobile(true)}
                className="lg:hidden p-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-[#111827]"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                    {tabTitles[activeTab].title}
                  </h1>
                </div>
                <p className="text-xs text-gray-500 font-medium hidden sm:block">
                  {tabTitles[activeTab].subtitle}
                </p>
              </div>
            </div>

            {/* Right: Quick Branch Switcher & Bell Alert */}
            <div className="flex items-center gap-3">
              {/* Branch Selector (Interactive Button) */}
              <button
                type="button"
                onClick={() => setActiveTab("outlets")}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-[#D1FAE5]/50 text-xs font-bold text-[#111827] neo-shadow-sm transition-colors cursor-pointer group"
                title="Kelola & Ganti Cabang Aktif"
              >
                <Building2 className="w-4 h-4 text-[#10B981]" />
                <span className="truncate max-w-45">{activeOutlet.name}</span>
                <span className="text-[10px] bg-[#10B981] text-white px-1.5 py-0.2 rounded font-black">
                  Ganti
                </span>
              </button>

              {/* Date Indicator */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-gray-700 bg-white">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>20 Sep 2026</span>
              </div>

              {/* POS Quick Button for Header */}
              <Link
                href="/pos"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold text-xs neo-shadow-sm hover:scale-102 transition-transform"
              >
                <span>Terminal POS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewTab
              analytics={analytics}
              onNavigateToMasterData={() => setActiveTab("inventory")}
              onNavigateToShifts={() => setActiveTab("shifts")}
            />
          )}

          {activeTab === "transactions" && <TransactionsTab />}

          {activeTab === "products" && <ProductsTab />}

          {activeTab === "categories" && <CategoriesTab />}

          {activeTab === "inventory" && <InventoryTab />}

          {activeTab === "suppliers" && <SuppliersTab />}

          {activeTab === "promos" && <PromosTab />}

          {activeTab === "customers" && <CustomersTab />}

          {activeTab === "employees" && <EmployeesTab />}

          {activeTab === "shifts" && <ShiftReportTab />}

          {activeTab === "outlets" && (
            <OutletsTab
              currentActiveOutletId={activeOutlet.id}
              onSelectActiveOutlet={(outlet) => setActiveOutlet(outlet)}
            />
          )}

          {activeTab === "receipt" && (
            <ReceiptSettingsTab
              currentOutletName={activeOutlet.name}
              currentOutletAddress={activeOutlet.address}
              currentOutletPhone={activeOutlet.phone}
            />
          )}

          {activeTab === "merchant" && (
            <MerchantProfileTab
              onNavigateToOutlets={() => setActiveTab("outlets")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
