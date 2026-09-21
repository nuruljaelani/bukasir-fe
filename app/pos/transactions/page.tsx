"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Receipt,
  Search,
  Printer,
  Share2,
  RotateCcw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Store,
  Lock,
  KeyRound,
  AlertTriangle,
  CreditCard,
  Banknote,
  QrCode,
  Tag,
  Copy,
  MessageSquare,
  ShieldAlert,
  ArrowLeft,
  Filter,
  Calendar,
  UtensilsCrossed,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";
import { Transaction, INITIAL_TRANSACTIONS } from "@/app/owner/data/transactionMockData";

export default function CashierTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "refunded">("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(INITIAL_TRANSACTIONS[0]);

  // Supervisor PIN Gate for Void/Refund
  const [isPinGateOpen, setIsPinGateOpen] = useState(false);
  const [supervisorPin, setSupervisorPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [refundReason, setRefundReason] = useState("Salah input pesanan pelanggan");

  // Print & copy simulation
  const [isPrinting, setIsPrinting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Live time
  const [currentTime, setCurrentTime] = useState("");
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered only for current outlet transactions (Cashier Scope)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        tx.id.toLowerCase().includes(q) ||
        tx.customerName.toLowerCase().includes(q) ||
        tx.items.some((i) => i.name.toLowerCase().includes(q));

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;
      const matchPayment = paymentFilter === "all" || tx.paymentMethod === paymentFilter;
      const matchOrderType = orderTypeFilter === "all" || tx.orderType === orderTypeFilter;

      return matchSearch && matchStatus && matchPayment && matchOrderType;
    });
  }, [transactions, searchQuery, statusFilter, paymentFilter, orderTypeFilter]);

  // Financial summary for this cashier shift
  const shiftSuccessTx = useMemo(
    () => filteredTransactions.filter((t) => t.status === "success"),
    [filteredTransactions]
  );
  const shiftTotalSales = useMemo(
    () => shiftSuccessTx.reduce((sum, t) => sum + t.total, 0),
    [shiftSuccessTx]
  );
  const cashTotal = useMemo(
    () =>
      shiftSuccessTx
        .filter((t) => t.paymentMethod === "cash")
        .reduce((sum, t) => sum + t.total, 0),
    [shiftSuccessTx]
  );
  const nonCashTotal = useMemo(
    () =>
      shiftSuccessTx
        .filter((t) => t.paymentMethod !== "cash")
        .reduce((sum, t) => sum + t.total, 0),
    [shiftSuccessTx]
  );

  const handlePrintReceipt = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert("Struk berhasil dikirim ke printer thermal Bluetooth Kasir!");
    }, 1200);
  };

  const handleCopyReceipt = (tx: Transaction) => {
    const itemsList = tx.items
      .map((i) => `• ${i.name} (${i.qty}x) = Rp ${i.subtotal.toLocaleString("id-ID")}`)
      .join("\n");

    const text = `🧾 *STRUK BELANJA TOKOVA*\n` +
      `No. Invoice: ${tx.id}\n` +
      `Kasir: ${tx.cashierName} (Shift Pagi)\n` +
      `Pelanggan: ${tx.customerName}\n` +
      `Waktu: ${tx.date} ${tx.time}\n` +
      `-------------------------\n` +
      `${itemsList}\n` +
      `-------------------------\n` +
      `Subtotal: Rp ${tx.subtotal.toLocaleString("id-ID")}\n` +
      (tx.discountAmount > 0 ? `Diskon: -Rp ${tx.discountAmount.toLocaleString("id-ID")}\n` : "") +
      `Pajak PB1 (10%): Rp ${tx.taxAmount.toLocaleString("id-ID")}\n` +
      `*TOTAL: Rp ${tx.total.toLocaleString("id-ID")}*\n` +
      `Metode: ${tx.paymentMethod.toUpperCase()}\n` +
      `Status: ${tx.status === "success" ? "LUNAS ✅" : "REFUND ⚠️"}`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareWhatsApp = (tx: Transaction) => {
    const phone = tx.customerPhone ? tx.customerPhone.replace(/^0/, "62") : "";
    const itemsList = tx.items
      .map((i) => `- ${i.name} (${i.qty}x) : Rp ${i.subtotal.toLocaleString("id-ID")}`)
      .join("%0A");

    const text = `Halo Kak *${tx.customerName}*,%0A%0ATerima kasih telah berbelanja di *${tx.outletName}*. Berikut nota pembelian digital Anda:%0A%0A` +
      `*No. Invoice:* ${tx.id}%0A` +
      `*Waktu:* ${tx.date} ${tx.time}%0A` +
      `*Kasir:* ${tx.cashierName}%0A%0A` +
      `*Daftar Belanja:*%0A${itemsList}%0A%0A` +
      `*TOTAL BAYAR:* Rp ${tx.total.toLocaleString("id-ID")}%0A` +
      `*Metode Pembayaran:* ${tx.paymentMethod.toUpperCase()}%0A%0A` +
      `Simpan struk ini sebagai bukti pembayaran yang sah. Terima kasih! ✨`;

    const waUrl = phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(waUrl, "_blank");
  };

  const handleAuthorizeRefund = (e: React.FormEvent) => {
    e.preventDefault();
    // Valid Supervisor / Owner PINs: "9988" (Ahmad Rifai - Owner) or "7788" (Supervisor)
    if (supervisorPin !== "9988" && supervisorPin !== "7788") {
      setPinError("PIN Otorisasi Supervisor / Manajer tidak valid!");
      return;
    }

    if (!selectedTx) return;

    const authorizedBy = supervisorPin === "9988" ? "Owner (Ahmad Rifai)" : "Supervisor (Sarah Wijaya)";

    const updatedTx: Transaction = {
      ...selectedTx,
      status: "refunded",
      refundReason: `${refundReason} (Diotorisasi oleh ${authorizedBy})`,
      refundedAt: `${new Date().toISOString().split("T")[0]} ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`,
    };

    setTransactions((prev) =>
      prev.map((t) => (t.id === selectedTx.id ? updatedTx : t))
    );
    setSelectedTx(updatedTx);
    setIsPinGateOpen(false);
    setSupervisorPin("");
    setPinError("");
    alert(`Transaksi ${selectedTx.id} berhasil dibatalkan/refund setelah disetujui oleh ${authorizedBy}.`);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setOrderTypeFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111827] flex flex-col">
      {/* 1. Top Navbar Header */}
      <header className="bg-white border-b-2 border-[#111827] px-4 sm:px-6 py-3 sticky top-0 z-30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/pos"
              className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] hover:bg-[#EA580C] text-white font-black text-xs flex items-center gap-1.5 neo-shadow-sm neo-shadow-hover transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Terminal Kasir POS</span>
            </Link>

            <div className="h-6 w-0.5 bg-gray-200 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-[#111827]">
                  Riwayat Transaksi Kasir
                </h1>
                <StickerBadge variant="coral" rotate={-1} className="text-[9px] py-0.2 px-2">
                  🔒 AKSES TERBATAS
                </StickerBadge>
              </div>
              <span className="text-[11px] text-gray-500 font-semibold block">
                Tokova Store - Senopati • Kasir: Budi Santoso (Shift Pagi)
              </span>
            </div>
          </div>

          {/* Right: Info & Clock */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700 bg-[#FBF9F5] border-2 border-[#111827] px-3 py-1.5 rounded-xl neo-shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{currentTime}</span>
            </div>

            <Link
              href="/owner"
              className="flex items-center gap-1.5 bg-[#FBBF24] hover:bg-[#F59E0B] border-2 border-[#111827] px-3 py-1.5 rounded-xl text-xs font-extrabold text-[#111827] neo-shadow-sm transition-all"
            >
              <span>Portal Owner 👑</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Operational Security Banner */}
      <div className="bg-[#FEF3C7] border-b-2 border-[#111827] px-4 sm:px-6 py-2.5 text-xs font-semibold text-[#92400E] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-[#D97706]" />
          <span>
            <strong>Hak Akses Kasir Aktif:</strong> Hanya menampilkan riwayat transaksi shift berjalan Anda di Outlet Senopati. Cetak ulang struk dan kirim WhatsApp diizinkan. Pembatalan/Void transaksi wajib menggunakan PIN Supervisor.
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] bg-white/80 px-2 py-0.5 rounded-md border border-[#D97706] font-mono shrink-0">
          Shift ID: SHIFT-20260920-01
        </span>
      </div>

      {/* 3. Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Cards: Shift Performance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Total Omset Shift Ini
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#111827] font-mono">
                Rp {shiftTotalSales.toLocaleString("id-ID")}
              </div>
              <span className="text-[11px] text-[#059669] font-bold mt-1 block">
                {shiftSuccessTx.length} transaksi lunas
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669]">
              <Receipt className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Uang Tunai di Laci
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#EA580C] font-mono">
                Rp {cashTotal.toLocaleString("id-ID")}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Kas fisik setoran
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] border-2 border-[#111827] flex items-center justify-center text-[#EA580C]">
              <Banknote className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Non-Tunai (QRIS & Kartu)
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#0284C7] font-mono">
                Rp {nonCashTotal.toLocaleString("id-ID")}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Masuk rekening digital
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] border-2 border-[#111827] flex items-center justify-center text-[#0284C7]">
              <QrCode className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Status Transaksi
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#111827]">
                {filteredTransactions.length}{" "}
                <span className="text-xs text-gray-400 font-bold">Struk</span>
              </div>
              <span className="text-[11px] text-gray-500 font-bold mt-1 flex items-center gap-1.5">
                <span className="text-[#059669]">{shiftSuccessTx.length} Berhasil</span>
                <span>•</span>
                <span className="text-[#DC2626]">
                  {filteredTransactions.length - shiftSuccessTx.length} Refund
                </span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706]">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 4. Complete Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
              <span className="font-black text-xs sm:text-sm text-[#111827] uppercase tracking-wider">
                Filter Riwayat Transaksi Shift
              </span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-gray-500 hover:text-[#DC2626] transition-colors"
            >
              Reset Filter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari invoice, pelanggan, produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-extrabold bg-[#FBF9F5] focus:outline-hidden"
              >
                <option value="all">Semua Status Transaksi</option>
                <option value="success">Status: Lunas / Berhasil</option>
                <option value="refunded">Status: Dibatalkan / Refund</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-extrabold bg-[#FBF9F5] focus:outline-hidden"
              >
                <option value="all">Semua Metode Pembayaran</option>
                <option value="qris">QRIS Digital</option>
                <option value="cash">Tunai (Cash Laci)</option>
                <option value="debit">Kartu Debit</option>
              </select>
            </div>

            {/* Order Type Filter */}
            <div>
              <select
                value={orderTypeFilter}
                onChange={(e) => setOrderTypeFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-extrabold bg-[#FBF9F5] focus:outline-hidden"
              >
                <option value="all">Semua Tipe Pesanan</option>
                <option value="Retail">Retail Toko</option>
                <option value="Dine-in">Dine-in (Makan di Tempat)</option>
                <option value="Takeaway">Takeaway (Bungkus)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Split Workspace: Left Transactions List, Right Struk Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Table / List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-[#111827] overflow-hidden neo-shadow-sm">
            <div className="p-4 bg-[#FBF9F5] border-b-2 border-[#111827] flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-wider text-gray-700">
                Daftar Struk Shift ({filteredTransactions.length})
              </span>
              <span className="text-[11px] text-gray-500 font-bold">
                Pilih baris untuk melihat detail nota
              </span>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Receipt className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <h4 className="font-black text-base text-[#111827] mb-1">
                  Tidak Ada Transaksi Sesuai Filter
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  Silakan ubah kata kunci pencarian atau reset filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="divide-y-2 divide-gray-100 max-h-155 overflow-y-auto scrollbar-thin">
                {filteredTransactions.map((tx) => {
                  const isSelected = selectedTx?.id === tx.id;
                  const totalItems = tx.items.reduce((s, i) => s + i.qty, 0);

                  return (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className={`p-4 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[#D1FAE5]/40 border-l-6 border-l-[#10B981]"
                          : "hover:bg-[#FBF9F5]"
                      } ${tx.status === "refunded" ? "bg-red-50/30" : ""}`}
                    >
                      {/* Left: Payment Icon & Meta */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl border-2 border-[#111827] flex items-center justify-center shrink-0 ${
                            tx.status === "refunded"
                              ? "bg-[#FEE2E2] text-[#DC2626]"
                              : tx.paymentMethod === "qris"
                              ? "bg-[#D1FAE5] text-[#059669]"
                              : "bg-[#FFEDD5] text-[#EA580C]"
                          }`}
                        >
                          {tx.status === "refunded" ? (
                            <RotateCcw className="w-5 h-5" />
                          ) : tx.paymentMethod === "qris" ? (
                            <QrCode className="w-5 h-5" />
                          ) : tx.paymentMethod === "cash" ? (
                            <Banknote className="w-5 h-5" />
                          ) : (
                            <CreditCard className="w-5 h-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs sm:text-sm text-[#111827]">
                              {tx.id}
                            </span>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded-md border border-[#111827] uppercase ${
                                tx.status === "success"
                                  ? "bg-[#D1FAE5] text-[#059669]"
                                  : "bg-[#FEE2E2] text-[#DC2626]"
                              }`}
                            >
                              {tx.status === "success" ? "Lunas" : "Refund"}
                            </span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase bg-gray-100 px-1.5 py-0.2 rounded border border-gray-300">
                              {tx.orderType}
                            </span>
                          </div>

                          <div className="font-bold text-xs text-gray-800 truncate mt-0.5">
                            {tx.customerName}
                            <span className="text-gray-500 font-normal ml-1">
                              • {totalItems} item ({tx.items.map((i) => i.name).join(", ").slice(0, 30)}...)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{tx.time}</span>
                            <span>•</span>
                            <span className="uppercase font-bold text-gray-700">
                              {tx.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Total & Action Icon */}
                      <div className="text-right shrink-0">
                        <div className="font-mono font-black text-sm sm:text-base text-[#111827]">
                          Rp {tx.total.toLocaleString("id-ID")}
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {tx.discountAmount > 0 ? `Hemat Rp ${tx.discountAmount.toLocaleString("id-ID")}` : "PB1 10%"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Digital Thermal Receipt Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-20">
            {selectedTx ? (
              <div className="bg-white rounded-3xl border-3 border-[#111827] neo-shadow-md overflow-hidden animate-in fade-in duration-150">
                {/* Panel Header */}
                <div className="p-4 bg-[#FBF9F5] border-b-2 border-[#111827] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#10B981]" />
                    <span className="font-black text-xs text-[#111827]">
                      Nota Struk Digital Kasir
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black text-[#111827]">
                    {selectedTx.id}
                  </span>
                </div>

                {/* Printable Paper Struk */}
                <div className="p-5 bg-white max-h-115 overflow-y-auto scrollbar-thin text-xs">
                  <div className="text-center pb-3 border-b-2 border-dashed border-gray-300">
                    <div className="font-black text-xl tracking-tight text-[#111827]">
                      tokova<span className="text-[#10B981]">.</span>
                    </div>
                    <div className="text-xs font-extrabold text-gray-700 mt-0.5">
                      {selectedTx.outletName}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Jl. Senopati No. 42, Kebayoran Baru, Jakarta
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Kasir: {selectedTx.cashierName} (Shift Pagi)
                    </div>

                    {selectedTx.status === "refunded" && (
                      <div className="mt-2.5 p-2 bg-[#FEE2E2] border border-[#DC2626] rounded-xl text-left text-[11px] text-[#DC2626] font-bold">
                        ⚠️ TRANSAKSI INI TELAH DI-REFUND
                        <div className="text-[10px] text-gray-700 font-medium mt-0.5">
                          Alasan: {selectedTx.refundReason}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="py-2.5 border-b-2 border-dashed border-gray-300 font-mono text-[11px] space-y-0.5 text-gray-600">
                    <div className="flex justify-between">
                      <span>No Invoice</span>
                      <span className="font-bold text-[#111827]">{selectedTx.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Waktu</span>
                      <span>{selectedTx.date} {selectedTx.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pelanggan</span>
                      <span className="font-bold text-[#111827]">{selectedTx.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tipe</span>
                      <span className="uppercase font-bold text-gray-800">{selectedTx.orderType}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-3 border-b-2 border-dashed border-gray-300 space-y-2">
                    {selectedTx.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div className="pr-2">
                          <div className="font-bold text-[#111827] flex items-center gap-1">
                            <span>{item.emoji}</span>
                            <span>{item.name}</span>
                          </div>
                          {item.notes && (
                            <div className="text-[10px] text-gray-500 italic pl-4">
                              Note: {item.notes}
                            </div>
                          )}
                          <div className="text-[10px] text-gray-500 font-mono pl-4">
                            {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                          </div>
                        </div>
                        <span className="font-mono font-bold text-right">
                          Rp {item.subtotal.toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="py-2.5 border-b-2 border-dashed border-gray-300 font-mono space-y-1 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {selectedTx.subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    {selectedTx.discountAmount > 0 && (
                      <div className="flex justify-between text-[#059669] font-bold">
                        <span>Diskon Promo</span>
                        <span>- Rp {selectedTx.discountAmount.toLocaleString("id-ID")}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Pajak Resto/PB1 (10%)</span>
                      <span>Rp {selectedTx.taxAmount.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-black text-sm text-[#111827] pt-1.5 border-t border-gray-200">
                      <span>TOTAL BAYAR</span>
                      <span>Rp {selectedTx.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="pt-2 font-mono text-[11px] text-gray-600 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Metode Bayar</span>
                      <span className="font-black text-[#111827] uppercase">{selectedTx.paymentMethod}</span>
                    </div>
                    {selectedTx.paymentMethod === "cash" ? (
                      <>
                        <div className="flex justify-between">
                          <span>Tunai Diterima</span>
                          <span>Rp {selectedTx.paymentDetails.amountPaid.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#059669]">
                          <span>Kembalian</span>
                          <span>Rp {selectedTx.paymentDetails.change.toLocaleString("id-ID")}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <span>No. Ref</span>
                        <span className="text-gray-800 font-bold">{selectedTx.paymentDetails.referenceNo || "-"}</span>
                      </div>
                    )}
                  </div>
                </div>

                <ReceiptEdge className="w-full text-white rotate-180 -mt-0.5" />

                {/* Cashier Action Buttons */}
                <div className="p-4 bg-[#FBF9F5] border-t-2 border-[#111827] space-y-2.5">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block">
                    Opsi Aksi Kasir
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handlePrintReceipt}
                      disabled={isPrinting}
                      className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs active:translate-y-0.5 transition-all disabled:opacity-50"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{isPrinting ? "Mencetak..." : "Cetak Ulang Struk"}</span>
                    </button>

                    <button
                      onClick={() => handleShareWhatsApp(selectedTx)}
                      className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-[#25D366] hover:bg-[#1EBE5B] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs active:translate-y-0.5 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim WhatsApp</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyReceipt(selectedTx)}
                      className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copySuccess ? "Tersalin! ✅" : "Salin Teks Nota"}</span>
                    </button>

                    {/* Restricted Void: Requires Supervisor PIN */}
                    {selectedTx.status === "success" ? (
                      <button
                        onClick={() => setIsPinGateOpen(true)}
                        className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] font-extrabold text-xs flex items-center justify-center gap-1.5"
                        title="Pembatalan memerlukan PIN Supervisor"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Refund (PIN)</span>
                      </button>
                    ) : (
                      <div className="py-2 px-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 font-bold text-xs text-center flex items-center justify-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Telah Direfund</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-3 border-dashed border-gray-300 p-8 text-center text-gray-400">
                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-bold text-sm">Pilih salah satu transaksi untuk melihat nota struk.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supervisor PIN Gate Modal */}
      {isPinGateOpen && selectedTx && (
        <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-sm w-full p-5 neo-shadow-lg animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706] mb-3">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-base text-[#111827]">
                Otorisasi Supervisor Wajib
              </h3>
              <StickerBadge variant="yellow" className="text-[8px] py-0 px-1.5">
                PIN GATE
              </StickerBadge>
            </div>
            <p className="text-xs text-gray-600 mt-1 mb-3">
              Kasir tidak diizinkan membatalkan / me-refund transaksi secara sepihak. Panggil Supervisor atau Owner untuk memasukkan PIN otorisasi.
            </p>

            <form onSubmit={handleAuthorizeRefund} className="space-y-3">
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  PIN Supervisor / Owner
                </label>
                <input
                  type="password"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="Ketik 4-6 digit PIN..."
                  value={supervisorPin}
                  onChange={(e) => {
                    setSupervisorPin(e.target.value);
                    setPinError("");
                  }}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-center font-mono text-base font-black tracking-widest bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
                />
                {pinError ? (
                  <p className="text-[11px] text-[#DC2626] font-bold mt-1">
                    {pinError}
                  </p>
                ) : (
                  <p className="text-[10px] text-gray-500 mt-1">
                    Demo PIN Owner: <code>9988</code> atau Supervisor: <code>7788</code>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  Alasan Void / Refund
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5]"
                >
                  <option value="Salah input pesanan pelanggan">Salah input pesanan pelanggan</option>
                  <option value="Barang rusak / reject produk">Barang rusak / reject produk</option>
                  <option value="Pelanggan membatalkan pesanan">Pelanggan membatalkan pesanan</option>
                  <option value="Kesalahan nominal pembayaran">Kesalahan nominal pembayaran</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsPinGateOpen(false);
                    setSupervisorPin("");
                    setPinError("");
                  }}
                  className="px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl border-2 border-[#111827] bg-[#DC2626] hover:bg-red-700 text-white text-xs font-black neo-shadow-sm"
                >
                  Verifikasi & Batalkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
