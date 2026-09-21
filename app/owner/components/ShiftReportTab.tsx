"use client";

import React, { useState } from "react";
import {
  Clock,
  Banknote,
  QrCode,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Printer,
  X,
  Lock,
} from "lucide-react";
import { ShiftRecord, INITIAL_SHIFTS } from "../data/ownerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function ShiftReportTab() {
  const [shifts, setShifts] = useState<ShiftRecord[]>(INITIAL_SHIFTS);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [actualCashInput, setActualCashInput] = useState<number>(0);

  const activeShift = shifts.find((s) => s.status === "Berjalan") || shifts[0];
  const expectedCash = activeShift.openingCash + activeShift.cashSales;
  const currentDiscrepancy = actualCashInput ? actualCashInput - expectedCash : 0;

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    setShifts((prev) =>
      prev.map((s) =>
        s.id === activeShift.id
          ? {
              ...s,
              status: "Selesai",
              actualCashSubmitted: actualCashInput,
              discrepancy: currentDiscrepancy,
            }
          : s
      )
    );
    setIsCloseModalOpen(false);
    alert("Shift kasir berhasil ditutup dan rekap kas telah disimpan!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Active Shift Card */}
      <div className="p-6 rounded-3xl border-3 border-[#111827] bg-white neo-shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669]">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-[#111827]">
                  Shift Kasir Sedang Berjalan
                </h3>
                <StickerBadge variant="mint" rotate={1} className="text-[10px] py-0.2">
                  AKTIF BERJALAN ⚡
                </StickerBadge>
              </div>
              <span className="text-xs font-semibold text-gray-500 block mt-0.5">
                {activeShift.shiftName} • Bertugas: <strong>{activeShift.cashierName}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActualCashInput(expectedCash);
              setIsCloseModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FBBF24] text-[#111827] font-extrabold text-xs sm:text-sm neo-shadow-sm neo-shadow-hover transition-all flex items-center gap-2 self-stretch sm:self-auto justify-center"
          >
            <Lock className="w-4 h-4" />
            <span>Tutup Shift & Rekap Kas Fisik</span>
          </button>
        </div>

        {/* Breakdown Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-gray-200">
            <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
              Kas Modal Awal
            </span>
            <span className="text-base sm:text-lg font-black text-[#111827] font-mono">
              Rp {activeShift.openingCash.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-gray-200">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-500 mb-1">
              <span>Penjualan Tunai</span>
              <Banknote className="w-3.5 h-3.5 text-[#059669]" />
            </div>
            <span className="text-base sm:text-lg font-black text-[#059669] font-mono">
              Rp {activeShift.cashSales.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-gray-200">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-500 mb-1">
              <span>Penjualan QRIS</span>
              <QrCode className="w-3.5 h-3.5 text-[#0284C7]" />
            </div>
            <span className="text-base sm:text-lg font-black text-[#0284C7] font-mono">
              Rp {activeShift.qrisSales.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981]">
            <span className="text-[10px] font-black uppercase text-[#059669] block mb-1">
              Uang Fisik Wajib di Laci
            </span>
            <span className="text-lg sm:text-xl font-black text-[#059669] font-mono">
              Rp {expectedCash.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Historical Shifts Table */}
      <div className="rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm overflow-hidden">
        <div className="p-5 border-b-2 border-gray-100 flex items-center justify-between">
          <h4 className="font-extrabold text-base text-[#111827]">
            Riwayat Laporan Tutup Shift Kasir
          </h4>
          <span className="text-xs text-gray-500 font-medium">Audit Selisih Kasir</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#FBF9F5] border-b border-gray-200 text-gray-600 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Waktu Shift</th>
                <th className="py-3 px-4">Kasir</th>
                <th className="py-3 px-4">Penjualan Tunai</th>
                <th className="py-3 px-4">Penjualan QRIS</th>
                <th className="py-3 px-4">Kas Fisik Disetor</th>
                <th className="py-3 px-4">Selisih</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {shifts.map((s) => (
                <tr key={s.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#111827]">
                    <div>{s.date}</div>
                    <span className="text-[11px] text-gray-500 font-normal">
                      {s.shiftName}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-gray-800">
                    {s.cashierName}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    Rp {s.cashSales.toLocaleString("id-ID")}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    Rp {s.qrisSales.toLocaleString("id-ID")}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold">
                    {s.actualCashSubmitted !== undefined
                      ? `Rp ${s.actualCashSubmitted.toLocaleString("id-ID")}`
                      : "-"}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    {s.discrepancy !== undefined ? (
                      s.discrepancy === 0 ? (
                        <span className="text-[#059669] font-bold">Rp 0 (Pas)</span>
                      ) : (
                        <span className="text-[#DC2626] font-bold">
                          {s.discrepancy > 0 ? "+" : ""}
                          Rp {s.discrepancy.toLocaleString("id-ID")}
                        </span>
                      )
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        s.status === "Selesai"
                          ? "bg-green-100 text-green-800"
                          : s.status === "Berjalan"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Close Shift Modal */}
      {isCloseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-md w-full neo-shadow-lg p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-[#111827]">
                Tutup Shift & Rekap Setoran Kasir
              </h3>
              <button
                onClick={() => setIsCloseModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCloseShift} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-[#FBF9F5] rounded-xl border border-gray-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Kas Awal:</span>
                  <span className="font-mono">Rp {activeShift.openingCash.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Penjualan Tunai:</span>
                  <span className="font-mono">Rp {activeShift.cashSales.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-300 font-bold text-[#111827]">
                  <span>Uang Fisik Seharusnya:</span>
                  <span className="font-mono text-sm">
                    Rp {expectedCash.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Hitung Uang Fisik Aktual di Laci Kasir:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-400">
                    Rp
                  </span>
                  <input
                    type="number"
                    required
                    value={actualCashInput || ""}
                    onChange={(e) => setActualCashInput(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-bold text-base"
                  />
                </div>
              </div>

              {/* Discrepancy indicator */}
              <div className="p-3 rounded-xl border flex items-center justify-between text-xs font-bold font-mono">
                <span>Selisih Kas:</span>
                <span
                  className={
                    currentDiscrepancy === 0
                      ? "text-[#059669]"
                      : currentDiscrepancy > 0
                      ? "text-[#0284C7]"
                      : "text-[#DC2626]"
                  }
                >
                  {currentDiscrepancy === 0
                    ? "Rp 0 (Pas Sesuai)"
                    : `${currentDiscrepancy > 0 ? "+" : ""}Rp ${currentDiscrepancy.toLocaleString(
                        "id-ID"
                      )}`}
                </span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCloseModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] text-white font-extrabold neo-shadow-sm"
                >
                  Konfirmasi Tutup Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
