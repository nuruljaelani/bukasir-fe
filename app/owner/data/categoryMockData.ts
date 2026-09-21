export interface ProductCategory {
  id: string;
  name: string;
  code: string;
  emoji: string;
  description: string;
  color: string;
  itemCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export const INITIAL_CATEGORIES: ProductCategory[] = [
  {
    id: "fnb",
    name: "Makanan & Minuman",
    code: "CAT-FNB",
    emoji: "☕",
    description: "Kopi spesialti, teh artisanal, makanan ringan, dan camilan kafe.",
    color: "#10B981", // Emerald Mint
    itemCount: 8,
    isActive: true,
    sortOrder: 1,
    createdAt: "2024-01-10",
  },
  {
    id: "fashion",
    name: "Pakaian & Fashion",
    code: "CAT-FSH",
    emoji: "👕",
    description: "Kaos sablon, kemeja flannel, celana chinos, aksesoris pakaian.",
    color: "#FF6B4A", // Tangerine
    itemCount: 12,
    isActive: true,
    sortOrder: 2,
    createdAt: "2024-01-12",
  },
  {
    id: "sembako",
    name: "Sembako & Kebutuhan Harian",
    code: "CAT-SBK",
    emoji: "🛒",
    description: "Beras pulen, minyak goreng, gula pasir, telur, dan bumbu dapur pokok.",
    color: "#FBBF24", // Sunshine Amber
    itemCount: 15,
    isActive: true,
    sortOrder: 3,
    createdAt: "2024-01-15",
  },
  {
    id: "elektronik",
    name: "Gadget & Aksesoris",
    code: "CAT-ELK",
    emoji: "🔌",
    description: "Kabel data fast charging, adaptor charger, TWS bluetooth, power bank.",
    color: "#38BDF8", // Sky Blue
    itemCount: 6,
    isActive: true,
    sortOrder: 4,
    createdAt: "2024-02-01",
  },
  {
    id: "kecantikan",
    name: "Perawatan & Farmasi",
    code: "CAT-KCK",
    emoji: "🧴",
    description: "Serum wajah, sunscreen, sabun mandi herbal, dan vitamin harian.",
    color: "#EC4899", // Rose Pink
    itemCount: 9,
    isActive: true,
    sortOrder: 5,
    createdAt: "2024-02-10",
  },
  {
    id: "atk",
    name: "Alat Tulis & Kantor",
    code: "CAT-ATK",
    emoji: "📚",
    description: "Buku catatan spiral, pulpen gel, binder clip, kertas HVS A4.",
    color: "#14B8A6", // Teal
    itemCount: 5,
    isActive: true,
    sortOrder: 6,
    createdAt: "2024-02-20",
  },
  {
    id: "lainnya",
    name: "Lain-lain & Grosir",
    code: "CAT-LNN",
    emoji: "📦",
    description: "Kemasan kardus packing, bubble wrap, tali rafia, dan kantong kresek.",
    color: "#6B7280", // Gray Slate
    itemCount: 4,
    isActive: false,
    sortOrder: 7,
    createdAt: "2024-03-01",
  },
];
