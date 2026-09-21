"use client";

import React, { useState, useMemo } from "react";
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
  DollarSign,
  TrendingUp,
  Download,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Banknote,
  QrCode,
  Tag,
  ShoppingBag,
} from "lucide-react";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";
import { Transaction, TransactionItem, INITIAL_TRANSACTIONS } from "../data/transactionMockData";

export default function TransactionsTab() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "refunded">("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");

  // Selected Transaction for Modal Detail
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Refund Modal State
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("Salah input item kasir");
  const [customRefundNote, setCustomRefundNote] = useState("");

  // Print simulation state
  const [isPrinting, setIsPrinting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Financial Metrics
  const successTransactions = useMemo(
    () => transactions.filter((t) => t.status === "success"),
    [transactions]
  );
  const refundedTransactions = useMemo(
    () => transactions.filter((t) => t.status === "refunded"),
    [transactions]
  );

  const totalOmset = useMemo(
    () => successTransactions.reduce((acc, curr) => acc + curr.total, 0),
    [successTransactions]
  );

  const avgBasketSize = useMemo(
    () => (successTransactions.length > 0 ? Math.round(totalOmset / successTransactions.length) : 0),
    [totalOmset, successTransactions]
  );

  const qrisCount = useMemo(
    () => transactions.filter((t) => t.paymentMethod === "qris").length,
    [transactions]
  );
  const cashCount = useMemo(
    () => transactions.filter((t) => t.paymentMethod === "cash").length,
    [transactions]
  );
  const debitCount = useMemo(
    () => transactions.filter((t) => t.paymentMethod === "debit").length,
    [transactions]
  );

  // Filtered List
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        tx.id.toLowerCase().includes(q) ||
        tx.customerName.toLowerCase().includes(q) ||
        tx.cashierName.toLowerCase().includes(q) ||
        tx.items.some((i) => i.name.toLowerCase().includes(q));

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;
      const matchPayment = paymentFilter === "all" || tx.paymentMethod === paymentFilter;
      const matchOrderType = orderTypeFilter === "all" || tx.orderType === orderTypeFilter;

      return matchSearch && matchStatus && matchPayment && matchOrderType;
    });
  }, [transactions, searchQuery, statusFilter, paymentFilter, orderTypeFilter]);

  const handlePrintReceipt = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert("Perintah cetak ulang berhasil dikirim ke printer kasir Bluetooth Tokova!");
    }, 1200);
  };

  const handleCopyReceiptText = (tx: Transaction) => {
    const itemsList = tx.items
      .map((i) => `• ${i.name} (${i.qty}x) = Rp ${i.subtotal.toLocaleString("id-ID")}`)
      .join("\n");

    const text = `🧾 *STRUK PEMBELIAN TOKOVA*\n` +
      `No. Invoice: ${tx.id}\n` +
      `Waktu: ${tx.date} ${tx.time}\n` +
      `Kasir: ${tx.cashierName}\n` +
      `Pelanggan: ${tx.customerName}\n` +
      `-------------------------\n` +
      `${itemsList}\n` +
      `-------------------------\n` +
      `Subtotal: Rp ${tx.subtotal.toLocaleString("id-ID")}\n` +
      (tx.discountAmount > 0 ? `Diskon: -Rp ${tx.discountAmount.toLocaleString("id-ID")}\n` : "") +
      `PB1 (10%): Rp ${tx.taxAmount.toLocaleString("id-ID")}\n` +
      `*TOTAL: Rp ${tx.total.toLocaleString("id-ID")}*\n` +
      `Metode: ${tx.paymentMethod.toUpperCase()}\n` +
      `Status: ${tx.status === "success" ? "LUNAS ✅" : "REFUND ⚠️"}\n` +
      `Terima kasih telah berbelanja!`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareWhatsApp = (tx: Transaction) => {
    const phone = tx.customerPhone ? tx.customerPhone.replace(/^0/, "62") : "";
    const itemsList = tx.items
      .map((i) => `- ${i.name} (${i.qty}x) : Rp ${i.subtotal.toLocaleString("id-ID")}`)
      .join("%0A");

    const text = `Halo Kak *${tx.customerName}*,%0A%0ATerima kasih telah berbelanja di *${tx.outletName}*. Berikut rincian struk transaksi Anda:%0A%0A` +
      `*No. Invoice:* ${tx.id}%0A` +
      `*Waktu:* ${tx.date} ${tx.time}%0A` +
      `*Kasir:* ${tx.cashierName}%0A%0A` +
      `*Daftar Belanja:*%0A${itemsList}%0A%0A` +
      `*Subtotal:* Rp ${tx.subtotal.toLocaleString("id-ID")}%0A` +
      (tx.discountAmount > 0 ? `*Diskon:* -Rp ${tx.discountAmount.toLocaleString("id-ID")}%0A` : "") +
      `*Pajak PB1 (10%):* Rp ${tx.taxAmount.toLocaleString("id-ID")}%0A` +
      `*TOTAL BAYAR:* Rp ${tx.total.toLocaleString("id-ID")}%0A` +
      `*Metode Pembayaran:* ${tx.paymentMethod.toUpperCase()}%0A%0A` +
      `Simpan pesan ini sebagai bukti pembayaran digital yang sah. Semoga harimu menyenangkan! ✨`;

    const waUrl = phone
      ? `https://wa.me/${phone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(waUrl, "_blank");
  };

  const handleProcessRefund = () => {
    if (!selectedTx) return;

    const reason = customRefundNote.trim()
      ? `${refundReason} (${customRefundNote.trim()})`
      : refundReason;

    const updatedTx: Transaction = {
      ...selectedTx,
      status: "refunded",
      refundReason: reason,
      refundedAt: `${new Date().toISOString().split("T")[0]} ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`,
    };

    setTransactions((prev) =>
      prev.map((t) => (t.id === selectedTx.id ? updatedTx : t))
    );
    setSelectedTx(updatedTx);
    setIsRefundModalOpen(false);
    setCustomRefundNote("");
  };

  const exportCSV = () => {
    const headers = "No Invoice,Tanggal,Waktu,Kasir,Pelanggan,Metode Bayar,Total,Status\n";
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.date}","${t.time}","${t.cashierName}","${t.customerName}","${t.paymentMethod.toUpperCase()}",${t.total},"${t.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan-transaksi-tokova-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Omset Hari Ini */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Total Omset Transaksi
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#111827] font-mono">
              Rp {totalOmset.toLocaleString("id-ID")}
            </div>
            <span className="text-[11px] text-[#059669] font-bold mt-1 block">
              Dari {successTransactions.length} transaksi sukses
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669]">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Transaksi & Status */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Volume Transaksi
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#111827]">
              {transactions.length}
              <span className="text-xs text-gray-400 font-bold ml-1.5">
                Struk
              </span>
            </div>
            <span className="text-[11px] text-gray-500 font-bold mt-1 flex items-center gap-1.5">
              <span className="text-[#059669]">{successTransactions.length} Berhasil</span>
              <span>•</span>
              <span className="text-[#DC2626]">{refundedTransactions.length} Refund</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706]">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        {/* Rata-rata Basket Size */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Rata-rata Pembelian
            </span>
            <div className="text-xl sm:text-2xl font-black text-[#111827] font-mono">
              Rp {avgBasketSize.toLocaleString("id-ID")}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Per struk / customer basket
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] border-2 border-[#111827] flex items-center justify-center text-[#0284C7]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Komposisi Pembayaran */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Metode Pembayaran
            </span>
            <div className="text-sm font-black text-[#111827] flex items-center gap-2 mt-1">
              <span className="bg-[#D1FAE5] text-[#059669] px-2 py-0.5 rounded-md border border-[#111827]">
                QRIS: {qrisCount}
              </span>
              <span className="bg-[#FFEDD5] text-[#EA580C] px-2 py-0.5 rounded-md border border-[#111827]">
                Tunai: {cashCount}
              </span>
              <span className="bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-md border border-[#111827]">
                Debit: {debitCount}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 mt-1.5 block">
              Dominan transaksi digital QRIS
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] border-2 border-[#111827] flex items-center justify-center text-[#111827] shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Control Bar: Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari No Invoice (INV-...), kasir, pelanggan, produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          {/* Status Tabs */}
          <div className="inline-flex p-1 bg-[#FBF9F5] rounded-xl border-2 border-[#111827] text-xs font-extrabold">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-[#111827] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Semua ({transactions.length})
            </button>
            <button
              onClick={() => setStatusFilter("success")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "success"
                  ? "bg-[#10B981] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Berhasil ({successTransactions.length})
            </button>
            <button
              onClick={() => setStatusFilter("refunded")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "refunded"
                  ? "bg-[#DC2626] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Refund ({refundedTransactions.length})
            </button>
          </div>

          {/* Payment Method Select */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-extrabold focus:outline-hidden"
          >
            <option value="all">Semua Metode Bayar</option>
            <option value="qris">QRIS Digital</option>
            <option value="cash">Tunai (Cash)</option>
            <option value="debit">Kartu Debit</option>
          </select>

          {/* Order Type Select */}
          <select
            value={orderTypeFilter}
            onChange={(e) => setOrderTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-extrabold focus:outline-hidden"
          >
            <option value="all">Semua Tipe Order</option>
            <option value="Retail">Retail / Takeaway</option>
            <option value="Dine-in">Dine-in</option>
            <option value="Takeaway">Takeaway</option>
          </select>

          {/* Export CSV Button */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-[#111827] font-extrabold text-xs flex items-center gap-1.5 neo-shadow-sm transition-all"
            title="Download Rekap CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 3. Transaction History Table */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-[#111827] text-center neo-shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border-2 border-[#111827] flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Receipt className="w-8 h-8" />
          </div>
          <h3 className="font-black text-lg text-[#111827] mb-1">
            Transaksi Tidak Ditemukan
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
            Tidak ada transaksi yang cocok dengan kata kunci &quot;{searchQuery}&quot; atau filter yang sedang aktif.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setPaymentFilter("all");
              setOrderTypeFilter("all");
            }}
            className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-[#111827] overflow-hidden neo-shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-700 font-black text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">No. Invoice & Waktu</th>
                  <th className="py-3.5 px-4">Pelanggan & Kasir</th>
                  <th className="py-3.5 px-4">Tipe & Cabang</th>
                  <th className="py-3.5 px-4">Rincian Item</th>
                  <th className="py-3.5 px-4">Metode Bayar</th>
                  <th className="py-3.5 px-4 text-right">Total Tagihan</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Opsi Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100 font-bold">
                {filteredTransactions.map((tx) => {
                  const totalItemsCount = tx.items.reduce((sum, item) => sum + item.qty, 0);
                  const firstItemName = tx.items[0]?.name || "";
                  const otherItemsCount = tx.items.length - 1;

                  return (
                    <tr
                      key={tx.id}
                      className={`hover:bg-[#FBF9F5]/70 transition-colors ${
                        tx.status === "refunded" ? "bg-red-50/40" : ""
                      }`}
                    >
                      {/* Invoice & Time */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-black text-sm text-[#111827]">
                          {tx.id}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-[11px] font-medium mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{tx.time}</span>
                          <span>•</span>
                          <span>{tx.date}</span>
                        </div>
                      </td>

                      {/* Customer & Cashier */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-[#111827]">
                            {tx.customerName}
                          </span>
                          {tx.customerTier && (
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded-md border border-[#111827] ${
                                tx.customerTier === "Platinum"
                                  ? "bg-[#111827] text-white"
                                  : tx.customerTier === "Gold"
                                  ? "bg-[#FBBF24] text-[#111827]"
                                  : "bg-[#E5E7EB] text-[#111827]"
                              }`}
                            >
                              {tx.customerTier}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-500 font-medium block">
                          Kasir: {tx.cashierName}
                        </span>
                      </td>

                      {/* Type & Branch */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md border border-[#111827] bg-[#FBF9F5] text-[10px] font-black uppercase text-gray-700">
                          {tx.orderType}
                        </span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">
                          {tx.outletName.replace("Tokova Store - ", "")}
                        </span>
                      </td>

                      {/* Items Summary */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="truncate text-gray-800">
                          <span className="font-extrabold text-[#111827]">
                            {totalItemsCount} item
                          </span>{" "}
                          ({firstItemName}
                          {otherItemsCount > 0 ? `, +${otherItemsCount} lainnya` : ""})
                        </div>
                        {tx.discountAmount > 0 && (
                          <span className="text-[10px] text-[#059669] font-bold flex items-center gap-1 mt-0.5">
                            <Tag className="w-2.5 h-2.5" />
                            <span>Hemat Rp {tx.discountAmount.toLocaleString("id-ID")}</span>
                          </span>
                        )}
                      </td>

                      {/* Payment Method */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#111827] text-xs font-black uppercase ${
                            tx.paymentMethod === "qris"
                              ? "bg-[#D1FAE5] text-[#059669]"
                              : tx.paymentMethod === "cash"
                              ? "bg-[#FFEDD5] text-[#EA580C]"
                              : "bg-[#E0F2FE] text-[#0284C7]"
                          }`}
                        >
                          {tx.paymentMethod === "qris" && <QrCode className="w-3 h-3" />}
                          {tx.paymentMethod === "cash" && <Banknote className="w-3 h-3" />}
                          {tx.paymentMethod === "debit" && <CreditCard className="w-3 h-3" />}
                          <span>{tx.paymentMethod}</span>
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-mono font-black text-sm text-[#111827]">
                          Rp {tx.total.toLocaleString("id-ID")}
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">
                          Pajak 10% incl.
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {tx.status === "success" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#059669] bg-[#D1FAE5] text-[#059669] text-[10px] font-black">
                            <CheckCircle className="w-3 h-3" />
                            <span>Selesai</span>
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#DC2626] bg-[#FEE2E2] text-[#DC2626] text-[10px] font-black"
                            title={tx.refundReason || "Transaksi di-refund"}
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Refund</span>
                          </span>
                        )}
                      </td>

                      {/* Action Options */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Detail Button */}
                          <button
                            onClick={() => setSelectedTx(tx)}
                            className="px-2.5 py-1.5 rounded-lg border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs flex items-center gap-1 neo-shadow-xs transition-transform active:translate-y-0.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detail</span>
                          </button>

                          {/* Quick WhatsApp Share */}
                          <button
                            onClick={() => handleShareWhatsApp(tx)}
                            className="p-1.5 rounded-lg border-2 border-[#111827] bg-[#FBF9F5] hover:bg-[#D1FAE5] text-gray-700 hover:text-[#059669] transition-colors"
                            title="Kirim Struk via WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Print */}
                          <button
                            onClick={handlePrintReceipt}
                            className="p-1.5 rounded-lg border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-gray-700 transition-colors"
                            title="Cetak Ulang Struk"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Modal Detail Transaksi (Digital Receipt & Action Panel) */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-md w-full neo-shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative my-8">
            {/* Header Modal */}
            <div className="p-4 bg-[#FBF9F5] border-b-2 border-[#111827] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-black">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#111827]">
                    Detail Nota Transaksi
                  </h3>
                  <span className="font-mono text-[10px] text-gray-600 block">
                    {selectedTx.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-[#111827]"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body: Tactile Paper Look with Zigzag Edge */}
            <div className="p-6 bg-white max-h-[60vh] overflow-y-auto scrollbar-thin">
              {/* Receipt Header Store */}
              <div className="text-center pb-4 border-b-2 border-dashed border-gray-300">
                <div className="font-black text-xl tracking-tight text-[#111827]">
                  tokova<span className="text-[#10B981]">.</span>
                </div>
                <div className="text-xs font-extrabold text-gray-700 mt-0.5">
                  {selectedTx.outletName}
                </div>
                <div className="text-[10px] text-gray-500">
                  Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan
                </div>
                <div className="text-[10px] text-gray-500">
                  Telp: 0812-8899-7700
                </div>

                {/* Refund Banner if refunded */}
                {selectedTx.status === "refunded" && (
                  <div className="mt-3 p-2 bg-[#FEE2E2] border-2 border-[#DC2626] rounded-xl text-left">
                    <div className="flex items-center gap-1.5 text-[#DC2626] font-black text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      <span>TRANSAKSI TELAH DI-REFUND</span>
                    </div>
                    <div className="text-[10px] text-gray-700 mt-1 font-medium">
                      Alasan: <strong>{selectedTx.refundReason || "Dibatalkan kasir"}</strong>
                    </div>
                    {selectedTx.refundedAt && (
                      <div className="text-[9px] text-gray-500">
                        Waktu: {selectedTx.refundedAt}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Transaction Metadata */}
              <div className="py-3 border-b-2 border-dashed border-gray-300 text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">No. Invoice</span>
                  <span className="font-bold text-[#111827]">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Waktu</span>
                  <span className="text-gray-800">{selectedTx.date} {selectedTx.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Kasir</span>
                  <span className="text-gray-800">{selectedTx.cashierName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pelanggan</span>
                  <span className="font-bold text-[#111827]">
                    {selectedTx.customerName}{" "}
                    {selectedTx.customerTier ? `(${selectedTx.customerTier})` : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipe Pesanan</span>
                  <span className="font-bold text-gray-800 uppercase">{selectedTx.orderType}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="py-3 border-b-2 border-dashed border-gray-300 space-y-2.5">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                  Rincian Barang Belanja
                </div>
                {selectedTx.items.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-start justify-between font-bold text-[#111827]">
                      <div className="flex items-start gap-1.5 flex-1 pr-2">
                        <span>{item.emoji}</span>
                        <div>
                          <span>{item.name}</span>
                          {item.notes && (
                            <div className="text-[10px] text-gray-500 italic font-medium">
                              Note: {item.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-right shrink-0">
                        Rp {item.subtotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono pl-5">
                      {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals & Calculations */}
              <div className="py-3 border-b-2 border-dashed border-gray-300 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {selectedTx.subtotal.toLocaleString("id-ID")}</span>
                </div>

                {selectedTx.discountAmount > 0 && (
                  <div className="flex justify-between text-[#059669] font-bold">
                    <span>Diskon Promo</span>
                    <span>- Rp {selectedTx.discountAmount.toLocaleString("id-ID")}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Pajak Resto/PB1 (10%)</span>
                  <span>Rp {selectedTx.taxAmount.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#111827] pt-2 border-t border-gray-200">
                  <span>TOTAL BAYAR</span>
                  <span>Rp {selectedTx.total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-3 text-xs space-y-1 font-mono text-gray-600">
                <div className="flex justify-between">
                  <span>Metode Bayar</span>
                  <span className="font-black text-[#111827] uppercase">
                    {selectedTx.paymentMethod}
                  </span>
                </div>
                {selectedTx.paymentMethod === "cash" ? (
                  <>
                    <div className="flex justify-between">
                      <span>Uang Diterima</span>
                      <span>Rp {selectedTx.paymentDetails.amountPaid.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#059669]">
                      <span>Kembalian</span>
                      <span>Rp {selectedTx.paymentDetails.change.toLocaleString("id-ID")}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span>No. Referensi</span>
                    <span className="text-[11px] font-bold text-gray-800">
                      {selectedTx.paymentDetails.referenceNo || "-"}
                    </span>
                  </div>
                )}
              </div>

              {/* Receipt Footer Message */}
              <div className="text-center text-[10px] text-gray-400 font-mono mt-6 mb-2">
                Terima kasih atas kunjungan Anda!<br />
                Kritik & saran: halo@tokova.id
              </div>
            </div>

            {/* Receipt Zigzag Bottom Border */}
            <ReceiptEdge className="w-full text-white rotate-180 -mt-0.5" />

            {/* Action Bar at Modal Bottom */}
            <div className="p-4 bg-[#FBF9F5] border-t-2 border-[#111827] space-y-3">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block">
                Opsi Aksi Transaksi
              </span>

              <div className="grid grid-cols-2 gap-2">
                {/* Print Button */}
                <button
                  onClick={handlePrintReceipt}
                  disabled={isPrinting}
                  className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs active:translate-y-0.5 transition-all disabled:opacity-50"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isPrinting ? "Mencetak..." : "Cetak Ulang Struk"}</span>
                </button>

                {/* WhatsApp Share Button */}
                <button
                  onClick={() => handleShareWhatsApp(selectedTx)}
                  className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-[#25D366] hover:bg-[#1EBE5B] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs active:translate-y-0.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim WhatsApp</span>
                </button>

                {/* Copy Text Button */}
                <button
                  onClick={() => handleCopyReceiptText(selectedTx)}
                  className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-[#111827] font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copySuccess ? "Tersalin! ✅" : "Salin Teks Nota"}</span>
                </button>

                {/* Refund Action Button */}
                {selectedTx.status === "success" ? (
                  <button
                    onClick={() => setIsRefundModalOpen(true)}
                    className="py-2.5 px-3 rounded-xl border-2 border-[#111827] bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] font-extrabold text-xs flex items-center justify-center gap-1.5 neo-shadow-xs transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Refund / Batal</span>
                  </button>
                ) : (
                  <div className="py-2 px-3 rounded-xl border-2 border-gray-300 bg-gray-100 text-gray-500 font-extrabold text-xs flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Sudah Direfund</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Konfirmasi Refund */}
      {isRefundModalOpen && selectedTx && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl border-3 border-[#111827] p-5 neo-shadow animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] border-2 border-[#111827] flex items-center justify-center text-[#DC2626] mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-black text-base text-[#111827] mb-1">
              Refund Transaksi {selectedTx.id}?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Dana senilai{" "}
              <strong className="text-[#111827] font-black font-mono">
                Rp {selectedTx.total.toLocaleString("id-ID")}
              </strong>{" "}
              akan dikembalikan kepada pelanggan dan status transaksi akan ditandai sebagai batal / direfund.
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  Pilih Alasan Refund <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5]"
                >
                  <option value="Salah input item kasir">Salah input item kasir</option>
                  <option value="Barang reject / cacat produk">Barang reject / cacat produk</option>
                  <option value="Pelanggan membatalkan pesanan">Pelanggan membatalkan pesanan</option>
                  <option value="Masalah transaksi pembayaran ganda">Masalah transaksi pembayaran ganda</option>
                  <option value="Lainnya">Alasan lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Keterangan singkat pengembalian dana..."
                  value={customRefundNote}
                  onChange={(e) => setCustomRefundNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] resize-none focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-gray-100">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleProcessRefund}
                className="px-4 py-1.5 rounded-xl border-2 border-[#111827] bg-[#DC2626] hover:bg-red-700 text-white text-xs font-black neo-shadow-sm"
              >
                Ya, Proses Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
