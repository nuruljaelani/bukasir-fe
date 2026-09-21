"use client";

import React, { useState } from "react";
import {
  UserPlus,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  Lock,
  X,
} from "lucide-react";
import { Employee, INITIAL_EMPLOYEES } from "../data/ownerMockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function EmployeesTab() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState<Employee["role"]>("Kasir");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("1234");
  const [canVoid, setCanVoid] = useState(false);
  const [canViewReports, setCanViewReports] = useState(false);
  const [canManageInventory, setCanManageInventory] = useState(false);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newEmp: Employee = {
      id: `EMP-00${employees.length + 1}`,
      name,
      role,
      phone: phone || "0812-xxxx-xxxx",
      pin: pin || "1234",
      status: "Aktif",
      joinedDate: "Hari Ini",
      avatarEmoji: role === "Barista / Koki" ? "☕" : role === "Supervisor" ? "👩‍💼" : "🧑‍💼",
      permissions: {
        canAccessPos: true,
        canViewReports,
        canVoidTransaction: canVoid,
        canManageInventory,
      },
    };

    setEmployees((prev) => [...prev, newEmp]);
    setIsModalOpen(false);
    setName("");
    setPhone("");
    setPin("1234");
  };

  const toggleStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: e.status === "Aktif" ? "Off Shift" : "Aktif",
            }
          : e
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-lg text-[#111827]">
              Manajemen Tim & Hak Akses
            </h3>
            <StickerBadge variant="yellow" rotate={-1} className="text-[10px] py-0.2">
              {employees.length} Karyawan Terdaftar
            </StickerBadge>
          </div>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Atur PIN masuk kasir dan batas hak akses agar operasional toko aman dan terkendali.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 neo-shadow-sm neo-shadow-hover transition-all self-stretch sm:self-auto justify-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Karyawan</span>
        </button>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {employees.map((emp) => {
          const isOwner = emp.role === "Owner";
          return (
            <div
              key={emp.id}
              className="p-5 rounded-3xl border-2 border-[#111827] bg-white neo-shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FBF9F5] border-2 border-[#111827] flex items-center justify-center text-2xl">
                      {emp.avatarEmoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-[#111827] leading-tight">
                        {emp.name}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400 block mt-0.5">
                        {emp.id} • Bergabung {emp.joinedDate}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isOwner}
                    onClick={() => toggleStatus(emp.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                      emp.status === "Aktif"
                        ? "bg-[#D1FAE5] text-[#059669] border-[#10B981]/40"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    {emp.status}
                  </button>
                </div>

                {/* Role Pill & Phone */}
                <div className="p-3 bg-[#FBF9F5] rounded-xl border border-gray-200 mb-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Jabatan:</span>
                    <span
                      className={`font-black px-2 py-0.5 rounded-md text-[10px] border ${
                        emp.role === "Owner"
                          ? "bg-[#FEF3C7] text-[#B45309] border-[#F59E0B]"
                          : emp.role === "Supervisor"
                          ? "bg-[#E0F2FE] text-[#0369A1] border-[#38BDF8]"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                    >
                      {emp.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">No. WhatsApp:</span>
                    <span className="font-mono font-bold text-gray-700">{emp.phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">PIN Kasir:</span>
                    <span className="font-mono font-black text-gray-900 tracking-widest">
                      •••• ({emp.pin})
                    </span>
                  </div>
                </div>

                {/* Permissions checklist */}
                <div className="space-y-1.5 mb-4 text-xs font-medium text-gray-600">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                    Hak Akses Sistem:
                  </span>
                  <div className="flex items-center justify-between">
                    <span>Akses Layar Kasir POS</span>
                    {emp.permissions.canAccessPos ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lihat Laporan Omset</span>
                    {emp.permissions.canViewReports ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Void / Batal Transaksi</span>
                    {emp.permissions.canVoidTransaction ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Edit Stok & Harga Menu</span>
                    {emp.permissions.canManageInventory ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-3 border-[#111827] max-w-md w-full neo-shadow-lg p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
              <h3 className="font-extrabold text-lg text-[#111827]">
                Tambah Anggota Tim Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Karyawan:</label>
                <input
                  type="text"
                  required
                  placeholder="cth: Rian Hidayat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Jabatan / Role:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Employee["role"])}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-semibold bg-white"
                  >
                    <option value="Kasir">Kasir</option>
                    <option value="Barista / Koki">Barista / Koki</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Manajer">Manajer</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">PIN Kasir (4 Angka):</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    placeholder="1234"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-[#111827] font-mono font-bold text-center tracking-widest"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Nomor WhatsApp:</label>
                <input
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 focus:border-[#111827] font-medium"
                />
              </div>

              {/* Checkbox permissions */}
              <div className="p-3 bg-[#FBF9F5] rounded-xl border border-gray-300 space-y-2 text-xs">
                <span className="font-bold text-gray-800 block">Izin Khusus:</span>
                <label className="flex items-center gap-2 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canViewReports}
                    onChange={(e) => setCanViewReports(e.target.checked)}
                    className="rounded text-[#10B981] focus:ring-0"
                  />
                  <span>Boleh melihat laporan omset toko</span>
                </label>
                <label className="flex items-center gap-2 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canVoid}
                    onChange={(e) => setCanVoid(e.target.checked)}
                    className="rounded text-[#10B981] focus:ring-0"
                  />
                  <span>Boleh melakukan Void / Batal Transaksi</span>
                </label>
                <label className="flex items-center gap-2 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canManageInventory}
                    onChange={(e) => setCanManageInventory(e.target.checked)}
                    className="rounded text-[#10B981] focus:ring-0"
                  />
                  <span>Boleh mengubah stok & harga barang</span>
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl border-2 border-[#111827] bg-[#FF6B4A] text-white font-extrabold neo-shadow-sm neo-shadow-hover transition-all"
                >
                  Simpan Staf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
