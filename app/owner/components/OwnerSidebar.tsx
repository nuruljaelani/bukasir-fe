"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  Package,
  Users,
  Clock,
  Settings,
  Store,
  ArrowUpRight,
  Home,
  Layers,
  SlidersHorizontal,
  Briefcase,
  TrendingUp,
  Boxes,
  Truck,
  Printer,
  Building2,
  Tag,
  UserCheck,
  FolderTree,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import StickerBadge from "@/components/ornaments/StickerBadge";

export type OwnerTab =
  | "overview"
  | "transactions"
  | "products"
  | "categories"
  | "inventory"
  | "suppliers"
  | "promos"
  | "customers"
  | "employees"
  | "shifts"
  | "merchant"
  | "outlets"
  | "receipt";

interface OwnerSidebarProps {
  activeTab: OwnerTab;
  setActiveTab: (tab: OwnerTab) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  activeOutletName?: string;
  merchantBrandName?: string;
  outletCountBadge?: string;
}

interface NavSection {
  title: string;
  icon?: React.ElementType;
  items: {
    id: OwnerTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export default function OwnerSidebar({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  activeOutletName = "Tokova Store - Senopati",
  merchantBrandName = "Tokova Retail Group",
  outletCountBadge = "2/3 Cabang",
}: OwnerSidebarProps) {
  const navSections: NavSection[] = [
    {
      title: "Analitik & Laporan",
      icon: TrendingUp,
      items: [
        { id: "overview", label: "Ringkasan & Omset", icon: BarChart3 },
        { id: "transactions", label: "Riwayat Transaksi", icon: Receipt, badge: "Live" },
      ],
    },
    {
      title: "Master Data",
      icon: Layers,
      items: [
        {
          id: "products",
          label: "Produk",
          icon: Package,
        },
        {
          id: "categories",
          label: "Kategori Produk",
          icon: FolderTree,
        },
        {
          id: "inventory",
          label: "Inventori",
          icon: Boxes,
          badge: "3 Menipis",
        },
        {
          id: "suppliers",
          label: "Supplier",
          icon: Truck,
        },
        {
          id: "promos",
          label: "Promo & Kupon",
          icon: Tag,
          badge: "4 Aktif",
        },
        {
          id: "customers",
          label: "Pelanggan",
          icon: UserCheck,
          badge: "Member",
        },
      ],
    },
    {
      title: "Operasional & Tim",
      icon: Briefcase,
      items: [
        {
          id: "shifts",
          label: "Shift Kasir & Rekap Kas",
          icon: Clock,
          badge: "Live",
        },
        {
          id: "employees",
          label: "Karyawan & Hak Akses",
          icon: Users,
        },
      ],
    },
    {
      title: "Pengaturan & Bisnis",
      icon: SlidersHorizontal,
      items: [
        {
          id: "merchant",
          label: "Profil Merchant",
          icon: ShieldCheck,
          badge: "Induk",
        },
        {
          id: "outlets",
          label: "Outlet Cabang",
          icon: Building2,
          badge: outletCountBadge,
        },
        {
          id: "receipt",
          label: "Format Struk",
          icon: Printer,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r-2 border-[#111827] justify-between p-4 sm:p-5 overflow-hidden">
      {/* Top: Logo, Branch & Sections */}
      <div className="flex flex-col flex-1 min-h-0 space-y-5 overflow-hidden">
        {/* Brand Logo */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-black text-lg neo-shadow-sm group-hover:rotate-6 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#111827]">
                  tokova<span className="text-[#10B981]">.</span>
                </span>
                <StickerBadge variant="yellow" rotate={2} className="text-[9px] py-0.2 px-1.5">
                  OWNER 👑
                </StickerBadge>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Backoffice Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Current Branch Pill (Clickable to jump to outlets) */}
        <button
          type="button"
          onClick={() => {
            setActiveTab("outlets");
            setIsOpenMobile(false);
          }}
          className="shrink-0 p-3 bg-[#FBF9F5] hover:bg-[#D1FAE5]/40 transition-colors rounded-2xl border-2 border-[#111827] text-xs text-left cursor-pointer group"
          title="Klik untuk kelola cabang"
        >
          <div className="flex items-center justify-between text-gray-500 font-bold mb-1">
            <span className="flex items-center gap-1">
              <span>Outlet Aktif</span>
              <span className="text-[10px] text-[#059669] underline font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                (Ganti)
              </span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          </div>
          <div className="font-extrabold text-sm text-[#111827] truncate">
            {activeOutletName}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            Paket Pro Kafe & Retail (Aktif)
          </span>
        </button>

        {/* Scrollable Navigation Sections */}
        <nav className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {navSections.map((section, sIdx) => {
            const SectionIcon = section.icon;
            return (
              <div key={sIdx} className="space-y-1.5">
                {/* Section Header */}
                <div className="flex items-center gap-1.5 px-3 py-1">
                  {SectionIcon && <SectionIcon className="w-3.5 h-3.5 text-[#059669]" />}
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </span>
                </div>

                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsOpenMobile(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 font-extrabold text-xs sm:text-sm transition-all text-left ${
                          isActive
                            ? "bg-[#111827] text-white border-[#111827] neo-shadow-sm"
                            : "bg-transparent text-gray-700 border-transparent hover:border-[#111827] hover:bg-[#FBF9F5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? "text-[#10B981]" : "text-gray-500"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ml-1.5 ${
                              item.badge === "Live"
                                ? "bg-[#D1FAE5] text-[#059669]"
                                : "bg-[#FEE2E2] text-[#DC2626]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Fast POS Switch & Return to Home */}
      <div className="pt-4 border-t-2 border-gray-100 space-y-2 shrink-0">
        <Link
          href="/pos"
          className="w-full py-2.5 px-3.5 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold text-xs flex items-center justify-center gap-2 neo-shadow-sm neo-shadow-hover transition-all"
        >
          <Store className="w-4 h-4" />
          <span>Buka Terminal Kasir POS</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        <Link
          href="/"
          className="w-full py-2 px-3 rounded-lg text-gray-600 hover:text-[#111827] hover:bg-gray-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Kembali ke Landing Page</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 h-full bg-white animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setIsOpenMobile(false)} />
        </div>
      )}
    </>
  );
}
