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
} from "lucide-react";
import ReceiptEdge from "@/components/ornaments/ReceiptEdge";
import StickerBadge from "@/components/ornaments/StickerBadge";
import { Transaction, INITIAL_TRANSACTIONS } from "@/app/owner/data/transactionMockData";

interface CashierTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCashierName?: string;
  activeOutletName?: string;
}

export default function CashierTransactionsModal({
  isOpen,
  onClose,
  activeCashierName = "Budi Santoso",
  activeOutletName = "Tokova Store - Senopati",
}: CashierTransactionsModalProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "refunded">("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Supervisor PIN Gate for Void/Refund
  const [isPinGateOpen, setIsPinGateOpen] = useState(false);
  const [supervisorPin, setSupervisorPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [refundReason, setRefundReason] = useState("Salah input pesanan pelanggan");

  // Print & copy simulation
  const [isPrinting, setIsPrinting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Filtered only for current outlet transactions (Cashier Scope)
  const cashierTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        tx.id.toLowerCase().includes(q) ||
        tx.customerName.toLowerCase().includes(q) ||
        tx.items.some((i) => i.name.toLowerCase().includes(q));

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  // Financial summary for this cashier shift
  const shiftSuccessTx = useMemo(
    () => cashierTransactions.filter((t) => t.status === "success"),
    [cashierTransactions]
  );
  const shiftTotalSales = useMemo(
    () => shiftSuccessTx.reduce((sum, t) => sum + t.total, 0),
    [shiftSuccessTx]
  );

  if (!isOpen) return null;

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

    const text = `Halo Kak *${tx.customerName}*,%0A%0ATerima kasih telah berbelanja di *${activeOutletName}*. Berikut nota pembelian digital Anda:%0A%0A` +
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

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-4xl w-full neo-shadow-lg flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* 1. Modal Top Bar: Restricted Role Banner */}
        <div className="p-4 sm:p-5 bg-[#FBF9F5] border-b-2 border-[#111827] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] border-2 border-[#111827] flex items-center justify-center text-white font-black text-lg">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-[#111827]">
                  Riwayat Transaksi Kasir
                </h3>
                <StickerBadge variant="coral" rotate={-1} className="text-[9px] py-0.2 px-2">
                  🔒 AKSES TERBATAS
                </StickerBadge>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                <span>{activeOutletName}</span>
                <span>•</span>
                <span>Kasir: {activeCashierName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Shift Sales Badge */}
            <div className="bg-white px-3 py-1.5 rounded-xl border-2 border-[#111827] text-xs font-mono font-bold text-[#111827] neo-shadow-xs">
              Total Shift:{" "}
              <span className="text-[#059669]">
                Rp {shiftTotalSales.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-[#111827]"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Permission Notice Bar */}
        <div className="bg-[#FEF3C7] border-b-2 border-[#111827] px-4 py-2 text-xs font-medium text-[#92400E] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-[#D97706]" />
          <span>
            <strong>Hak Akses Kasir:</strong> Anda dapat melihat riwayat penjualan shift saat ini, mencetak ulang struk, dan mengirim nota via WhatsApp. Pembatalan/Void transaksi membutuhkan otorisasi PIN Supervisor.
          </span>
        </div>

        {/* 3. Search & Filter Bar */}
        <div className="p-4 border-b-2 border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari no invoice, pelanggan, atau barang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
            />
          </div>

          <div className="inline-flex p-1 bg-[#FBF9F5] rounded-xl border-2 border-[#111827] text-xs font-extrabold self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-[#111827] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Semua ({cashierTransactions.length})
            </button>
            <button
              onClick={() => setStatusFilter("success")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "success"
                  ? "bg-[#10B981] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Lunas ({shiftSuccessTx.length})
            </button>
            <button
              onClick={() => setStatusFilter("refunded")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "refunded"
                  ? "bg-[#DC2626] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Refund
            </button>
          </div>
        </div>

        {/* 4. Transactions List Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {cashierTransactions.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Receipt className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="font-bold text-sm">Tidak ada transaksi yang cocok</p>
              <span className="text-xs">Coba cari dengan kata kunci lain</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {cashierTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 border-[#111827] bg-white neo-shadow-xs hover:bg-[#FBF9F5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    tx.status === "refunded" ? "bg-red-50/40" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
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

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-[#111827]">
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
                      </div>

                      <div className="text-xs font-bold text-gray-700 mt-0.5">
                        {tx.customerName}{" "}
                        <span className="font-normal text-gray-500">
                          • {tx.items.length} jenis item ({tx.items.map((i) => i.name).join(", ").slice(0, 32)}...)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{tx.time}</span>
                        <span>•</span>
                        <span className="uppercase font-bold text-gray-700">
                          {tx.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <div className="font-mono font-black text-base text-[#111827]">
                        Rp {tx.total.toLocaleString("id-ID")}
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        PB1 10% termasuk
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="px-3 py-1.5 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs flex items-center gap-1.5 neo-shadow-xs active:translate-y-0.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Struk</span>
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(tx)}
                        className="p-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-[#D1FAE5] text-gray-700 hover:text-[#059669]"
                        title="Kirim Struk via WA"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handlePrintReceipt}
                        className="p-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-gray-700"
                        title="Cetak Ulang Struk"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Modal Footer */}
        <div className="p-4 bg-[#FBF9F5] border-t-2 border-[#111827] flex items-center justify-between text-xs text-gray-600 font-bold shrink-0">
          <span>Menampilkan {cashierTransactions.length} transaksi shift saat ini</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-xs font-black"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Detail Struk Modal for Cashier */}
      {selectedTx && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-sm w-full neo-shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative my-6">
            {/* Header */}
            <div className="p-3.5 bg-[#FBF9F5] border-b-2 border-[#111827] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#10B981]" />
                <span className="font-mono font-black text-xs text-[#111827]">
                  {selectedTx.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1 rounded-lg border border-[#111827] bg-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Paper Receipt */}
            <div className="p-5 bg-white max-h-[55vh] overflow-y-auto scrollbar-thin text-xs">
              <div className="text-center pb-3 border-b-2 border-dashed border-gray-300">
                <div className="font-black text-lg text-[#111827]">tokova.</div>
                <div className="text-xs font-bold text-gray-700">{selectedTx.outletName}</div>
                <div className="text-[10px] text-gray-500">Kasir: {selectedTx.cashierName}</div>

                {selectedTx.status === "refunded" && (
                  <div className="mt-2 p-1.5 bg-[#FEE2E2] border border-[#DC2626] rounded-lg text-left text-[11px] text-[#DC2626] font-bold">
                    ⚠️ VOID / REFUND: {selectedTx.refundReason}
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="py-2.5 border-b-2 border-dashed border-gray-300 space-y-1.5">
                {selectedTx.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="pr-2">
                      <div className="font-bold text-[#111827]">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-right">
                      Rp {item.subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="py-2.5 border-b-2 border-dashed border-gray-300 font-mono space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {selectedTx.subtotal.toLocaleString("id-ID")}</span>
                </div>
                {selectedTx.discountAmount > 0 && (
                  <div className="flex justify-between text-[#059669] font-bold">
                    <span>Diskon</span>
                    <span>-Rp {selectedTx.discountAmount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>PB1 10%</span>
                  <span>Rp {selectedTx.taxAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-[#111827] pt-1 border-t border-gray-200">
                  <span>TOTAL</span>
                  <span>Rp {selectedTx.total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-2 font-mono text-[11px] text-gray-600 space-y-0.5">
                <div className="flex justify-between">
                  <span>Metode</span>
                  <span className="font-bold text-[#111827] uppercase">{selectedTx.paymentMethod}</span>
                </div>
                {selectedTx.paymentMethod === "cash" && (
                  <>
                    <div className="flex justify-between">
                      <span>Tunai</span>
                      <span>Rp {selectedTx.paymentDetails.amountPaid.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#059669]">
                      <span>Kembalian</span>
                      <span>Rp {selectedTx.paymentDetails.change.toLocaleString("id-ID")}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <ReceiptEdge className="w-full text-white rotate-180 -mt-0.5" />

            {/* Action Buttons for Cashier */}
            <div className="p-4 bg-[#FBF9F5] border-t-2 border-[#111827] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrintReceipt}
                  disabled={isPrinting}
                  className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs flex items-center justify-center gap-1 neo-shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isPrinting ? "Mencetak..." : "Cetak Struk"}</span>
                </button>

                <button
                  onClick={() => handleShareWhatsApp(selectedTx)}
                  className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-[#25D366] hover:bg-[#1EBE5B] text-white font-extrabold text-xs flex items-center justify-center gap-1 neo-shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Kirim WA</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCopyReceipt(selectedTx)}
                  className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-white hover:bg-gray-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? "Tersalin!" : "Salin Teks"}</span>
                </button>

                {/* Restricted Void Action: Requires Supervisor PIN */}
                {selectedTx.status === "success" ? (
                  <button
                    onClick={() => setIsPinGateOpen(true)}
                    className="py-2 px-3 rounded-xl border-2 border-[#111827] bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] font-bold text-xs flex items-center justify-center gap-1"
                    title="Perlu Otorisasi Supervisor"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Refund (PIN)</span>
                  </button>
                ) : (
                  <div className="py-2 px-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 font-bold text-xs text-center">
                    Direfund
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supervisor PIN Gate Modal */}
      {isPinGateOpen && (
        <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-sm w-full p-5 neo-shadow-lg animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706] mb-3">
              <KeyRound className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-base text-[#111827]">
                Otorisasi Supervisor
              </h3>
              <StickerBadge variant="yellow" className="text-[8px] py-0 px-1.5">
                PIN WAJIB
              </StickerBadge>
            </div>
            <p className="text-xs text-gray-600 mt-1 mb-4">
              Role Kasir tidak diizinkan membatalkan / me-refund transaksi secara sepihak. Minta Supervisor atau Owner memasukkan PIN otorisasi.
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
                  placeholder="Masukkan 4-6 digit PIN..."
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
                  <option value="Barang rusak / cacat">Barang rusak / cacat</option>
                  <option value="Pelanggan membatalkan pesanan">Pelanggan membatalkan pesanan</option>
                  <option value="Kesalahan metode pembayaran">Kesalahan metode pembayaran</option>
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
                  Verifikasi & Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
