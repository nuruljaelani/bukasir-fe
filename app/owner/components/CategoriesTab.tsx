"use client";

import React, { useState, useMemo } from "react";
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
  Package,
  Layers,
  ArrowUpDown,
  Sparkles,
  Info,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";
import StickerBadge from "@/components/ornaments/StickerBadge";
import { ProductCategory, INITIAL_CATEGORIES } from "../data/categoryMockData";

const PRESET_EMOJIS = [
  "☕", "🍔", "🍕", "🍰", "🥤",
  "👕", "👗", "👟", "🧢", "👜",
  "🛒", "🍞", "🥚", "🌾", "🍎",
  "🔌", "🎧", "📱", "💻", "🎮",
  "🧴", "💊", "💄", "🧼", "🌿",
  "📚", "✏️", "🎨", "📦", "🎁",
];

const PRESET_COLORS = [
  { label: "Emerald Mint", value: "#10B981", bgClass: "bg-[#10B981]" },
  { label: "Tangerine", value: "#FF6B4A", bgClass: "bg-[#FF6B4A]" },
  { label: "Sunshine", value: "#FBBF24", bgClass: "bg-[#FBBF24]" },
  { label: "Sky Blue", value: "#38BDF8", bgClass: "bg-[#38BDF8]" },
  { label: "Rose Pink", value: "#EC4899", bgClass: "bg-[#EC4899]" },
  { label: "Teal Green", value: "#14B8A6", bgClass: "bg-[#14B8A6]" },
  { label: "Dark Ink", value: "#111827", bgClass: "bg-[#111827]" },
];

export default function CategoriesTab() {
  const [categories, setCategories] = useState<ProductCategory[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formEmoji, setFormEmoji] = useState("🏷️");
  const [formDescription, setFormDescription] = useState("");
  const [formColor, setFormColor] = useState("#10B981");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSortOrder, setFormSortOrder] = useState(1);

  // Delete Confirm State
  const [categoryToDelete, setCategoryToDelete] = useState<ProductCategory | null>(null);

  // Summary Metrics
  const totalCategories = categories.length;
  const activeCategoriesCount = categories.filter((c) => c.isActive).length;
  const totalProductsLinked = categories.reduce((sum, c) => sum + c.itemCount, 0);
  const topCategory = useMemo(() => {
    if (categories.length === 0) return null;
    return [...categories].sort((a, b) => b.itemCount - a.itemCount)[0];
  }, [categories]);

  // Filtered Categories
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        const matchSearch =
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? cat.isActive
            : !cat.isActive;

        return matchSearch && matchStatus;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories, searchQuery, statusFilter]);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormCode(`CAT-${Math.random().toString(36).substring(2, 5).toUpperCase()}`);
    setFormEmoji("🏷️");
    setFormDescription("");
    setFormColor("#10B981");
    setFormIsActive(true);
    setFormSortOrder(categories.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (category: ProductCategory) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormCode(category.code);
    setFormEmoji(category.emoji);
    setFormDescription(category.description);
    setFormColor(category.color);
    setFormIsActive(category.isActive);
    setFormSortOrder(category.sortOrder);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formName.trim(),
                code: formCode.trim().toUpperCase(),
                emoji: formEmoji,
                description: formDescription.trim(),
                color: formColor,
                isActive: formIsActive,
                sortOrder: Number(formSortOrder) || 1,
              }
            : c
        )
      );
    } else {
      const newCat: ProductCategory = {
        id: `cat-${Date.now()}`,
        name: formName.trim(),
        code: formCode.trim().toUpperCase() || `CAT-${Date.now().toString().slice(-4)}`,
        emoji: formEmoji,
        description: formDescription.trim(),
        color: formColor,
        itemCount: 0,
        isActive: formIsActive,
        sortOrder: Number(formSortOrder) || categories.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCategories((prev) => [...prev, newCat]);
    }

    setIsModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;
    setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Kategori */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Total Kategori
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#111827]">
              {totalCategories}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Grup master produk
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-[#059669]">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>

        {/* Kategori Aktif di POS */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Aktif di Kasir POS
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#059669]">
              {activeCategoriesCount}
              <span className="text-xs text-gray-400 font-bold ml-1.5">
                / {totalCategories}
              </span>
            </div>
            <span className="text-[11px] text-[#059669] font-bold mt-1 block">
              Siap ditap di kasir
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border-2 border-[#111827] flex items-center justify-center text-[#10B981]">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Total Produk Terkelompok */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Total Item Produk
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#111827]">
              {totalProductsLinked}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">
              Produk terdistribusi
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-[#111827] flex items-center justify-center text-[#D97706]">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Kategori Terbanyak */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Item Terbanyak
            </span>
            <div className="text-lg sm:text-xl font-black text-[#111827] truncate flex items-center gap-1.5">
              <span>{topCategory?.emoji}</span>
              <span className="truncate">{topCategory?.name || "-"}</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">
              {topCategory?.itemCount || 0} varian produk
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FFEDD5] border-2 border-[#111827] flex items-center justify-center text-[#FF6B4A] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Control Bar: Search, Status Filter, View Toggle, Add Button */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#111827] neo-shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau kode kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white transition-colors"
          />
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
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
              Semua ({categories.length})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "active"
                  ? "bg-[#10B981] text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Aktif di Kasir
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "inactive"
                  ? "bg-gray-400 text-white"
                  : "text-gray-600 hover:text-[#111827]"
              }`}
            >
              Disembunyikan
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1 bg-[#FBF9F5] rounded-xl border-2 border-[#111827]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-[#111827] text-white"
                  : "text-gray-500 hover:text-[#111827]"
              }`}
              title="Tampilan Grid Kartu"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-[#111827] text-white"
                  : "text-gray-500 hover:text-[#111827]"
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Category Button */}
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs flex items-center gap-2 neo-shadow-sm neo-shadow-hover transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
        </div>
      </div>

      {/* 3. Categories Content (Grid or Table) */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-[#111827] text-center neo-shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border-2 border-[#111827] flex items-center justify-center mx-auto mb-4 text-gray-400">
            <FolderTree className="w-8 h-8" />
          </div>
          <h3 className="font-black text-lg text-[#111827] mb-1">
            Kategori Tidak Ditemukan
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
            Tidak ada kategori produk yang cocok dengan kata kunci &quot;{searchQuery}&quot; atau filter yang dipilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
            className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
          >
            Reset Filter
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-2xl border-2 border-[#111827] p-5 neo-shadow-sm hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden ${
                !category.isActive ? "opacity-75 bg-gray-50" : ""
              }`}
            >
              {/* Top Accent Color Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-2 border-b border-[#111827]"
                style={{ backgroundColor: category.color }}
              />

              <div>
                {/* Header: Emoji & Code Badge & Status */}
                <div className="flex items-start justify-between gap-2 mb-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-[#111827] flex items-center justify-center text-2xl neo-shadow-xs shrink-0"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.emoji}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">
                        {category.code}
                      </span>
                      <h4 className="font-extrabold text-base text-[#111827] line-clamp-1">
                        {category.name}
                      </h4>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <button
                    onClick={() => toggleStatus(category.id)}
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md border border-[#111827] flex items-center gap-1 transition-colors ${
                      category.isActive
                        ? "bg-[#D1FAE5] text-[#059669]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    title="Klik untuk toggle status tampil di kasir"
                  >
                    {category.isActive ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>POS Aktif</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span>Sembunyi</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                  {category.description || "Tidak ada keterangan kategori."}
                </p>
              </div>

              {/* Bottom Info & Action Buttons */}
              <div className="pt-3 border-t-2 border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1 bg-[#FBF9F5] px-2.5 py-1 rounded-lg border border-[#111827] text-xs font-bold text-gray-700">
                    <Package className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{category.itemCount} Produk</span>
                  </div>
                  <span className="text-[11px] text-gray-600 font-semibold">
                    Urutan #{category.sortOrder}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 rounded-lg border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-[#111827] transition-colors"
                    title="Edit Kategori"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCategoryToDelete(category)}
                    className="p-2 rounded-lg border-2 border-[#111827] bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] transition-colors"
                    title="Hapus Kategori"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border-2 border-[#111827] overflow-hidden neo-shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FBF9F5] border-b-2 border-[#111827] text-gray-700 font-black text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 w-16 text-center">Urutan</th>
                  <th className="py-3 px-4">Kategori & Ikon</th>
                  <th className="py-3 px-4">Kode SKU</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4 text-center">Jml Produk</th>
                  <th className="py-3 px-4 text-center">Status Kasir</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100 font-bold">
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className={`hover:bg-[#FBF9F5]/70 transition-colors ${
                      !category.isActive ? "bg-gray-50/60" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center font-extrabold text-gray-500">
                      #{category.sortOrder}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 rounded-xl border-2 border-[#111827] flex items-center justify-center text-lg shrink-0"
                          style={{ backgroundColor: `${category.color}25` }}
                        >
                          {category.emoji}
                        </div>
                        <div>
                          <div className="font-extrabold text-sm text-[#111827]">
                            {category.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-[10px] text-gray-600 font-bold">
                              {category.color}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                      {category.code}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">
                      {category.description || "-"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-[#FBF9F5] px-2.5 py-1 rounded-md border border-[#111827] text-xs font-black">
                        {category.itemCount} item
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(category.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-black ${
                          category.isActive
                            ? "bg-[#D1FAE5] text-[#059669] border-[#059669]"
                            : "bg-gray-200 text-gray-600 border-gray-400"
                        }`}
                      >
                        {category.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Tampil</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Disembunyikan</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-1.5 rounded-lg border border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-[#111827]"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(category)}
                          className="p-1.5 rounded-lg border border-[#111827] bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626]"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Modal Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl border-2 border-[#111827] p-5 sm:p-6 neo-shadow relative animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] border-2 border-[#111827] flex items-center justify-center text-xl">
                  {formEmoji}
                </div>
                <div>
                  <h3 className="font-black text-base text-[#111827]">
                    {editingCategory ? "Edit Kategori Produk" : "Tambah Kategori Baru"}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-bold">
                    Konfigurasi nama, ikon, dan visibilitas di kasir
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] hover:bg-gray-100 text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Nama Kategori */}
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  Nama Kategori <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Minuman Boba, Kosmetik, dll"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
                />
              </div>

              {/* Kode Kategori & Urutan Tampil */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#111827] mb-1">
                    Kode Kategori
                  </label>
                  <input
                    type="text"
                    placeholder="CAT-XXX"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-mono font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#111827] mb-1">
                    Urutan Tampil (POS)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formSortOrder}
                    onChange={(e) => setFormSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white"
                  />
                </div>
              </div>

              {/* Pilih Emoji Cepat */}
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1.5">
                  Pilih Ikon / Emoji ({formEmoji})
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-[#FBF9F5] rounded-xl border-2 border-[#111827] max-h-28 overflow-y-auto scrollbar-thin">
                  {PRESET_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormEmoji(emoji)}
                      className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${
                        formEmoji === emoji
                          ? "bg-[#111827] text-white scale-110 shadow-xs"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilihan Warna Badge */}
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1.5">
                  Warna Aksen Kategori
                </label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setFormColor(col.value)}
                      className={`w-7 h-7 rounded-full border-2 border-[#111827] transition-transform ${
                        formColor === col.value
                          ? "ring-2 ring-offset-2 ring-[#111827] scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: col.value }}
                      title={col.label}
                    />
                  ))}
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-black text-[#111827] mb-1">
                  Deskripsi Kategori (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Keterangan singkat tentang kelompok barang ini..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border-2 border-[#111827] text-xs font-bold bg-[#FBF9F5] focus:outline-hidden focus:bg-white resize-none"
                />
              </div>

              {/* Toggle Aktif di POS */}
              <div className="p-3 bg-[#FBF9F5] rounded-xl border-2 border-[#111827] flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#111827] block">
                    Tampilkan di Kasir POS
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold">
                    Kasir dapat memfilter produk berdasarkan kategori ini
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`w-11 h-6 rounded-full border-2 border-[#111827] flex items-center p-0.5 transition-colors ${
                    formIsActive ? "bg-[#10B981] justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white border border-[#111827] shadow-xs" />
                </button>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl border-2 border-[#111827] bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs neo-shadow-sm neo-shadow-hover transition-all"
                >
                  {editingCategory ? "Simpan Perubahan" : "Buat Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Delete Confirmation */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl border-2 border-[#111827] p-5 neo-shadow animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] border-2 border-[#111827] flex items-center justify-center text-[#DC2626] mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-[#111827] mb-1">
              Hapus Kategori {categoryToDelete.name}?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Kategori ini memiliki{" "}
              <strong className="text-[#111827] font-black">
                {categoryToDelete.itemCount} produk
              </strong>{" "}
              terdaftar. Menghapus kategori tidak akan menghapus produk, namun produk akan beralih ke kategori &quot;Lain-lain&quot;.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-gray-100">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-3.5 py-1.5 rounded-xl border-2 border-[#111827] bg-[#FBF9F5] text-xs font-bold hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 rounded-xl border-2 border-[#111827] bg-[#DC2626] hover:bg-red-700 text-white text-xs font-black neo-shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
