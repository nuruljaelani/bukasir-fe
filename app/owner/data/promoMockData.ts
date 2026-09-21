export interface PromoRule {
  id: string;
  code?: string; // Voucher code (e.g. "HEMAT20")
  name: string;
  type: "percentage" | "fixed_amount";
  value: number; // percentage (e.g. 20) or nominal (e.g. 10000)
  minSpend?: number; // Minimum belanja (e.g. 50000)
  maxDiscount?: number; // Cap for percentage discount (e.g. 25000)
  category?: string; // Optional target category or "Semua Kategori"
  startDate: string;
  endDate: string;
  usageCount: number;
  isActive: boolean;
  isVoucherCodeRequired: boolean; // if false, auto-clickable in cashier POS
  description: string;
}

export interface AppliedDiscount {
  id: string;
  name: string;
  code?: string;
  type: "percentage" | "fixed_amount" | "manual";
  value: number;
  calculatedAmount: number;
}

export const INITIAL_PROMOS: PromoRule[] = [
  {
    id: "PRM-001",
    code: "HEMAT20",
    name: "Diskon Pelanggan Baru 20%",
    type: "percentage",
    value: 20,
    minSpend: 50000,
    maxDiscount: 25000,
    category: "Semua Kategori",
    startDate: "01 Sep 2026",
    endDate: "30 Sep 2026",
    usageCount: 48,
    isActive: true,
    isVoucherCodeRequired: true,
    description: "Potongan 20% khusus transaksi minimal Rp 50.000 (Maks Rp 25.000).",
  },
  {
    id: "PRM-002",
    code: "JUMATBERKAH",
    name: "Jumat Berkah - Potongan Rp 10.000",
    type: "fixed_amount",
    value: 10000,
    minSpend: 40000,
    category: "Semua Kategori",
    startDate: "01 Sep 2026",
    endDate: "31 Des 2026",
    usageCount: 112,
    isActive: true,
    isVoucherCodeRequired: true,
    description: "Potongan langsung Rp 10.000 untuk belanja minimal Rp 40.000.",
  },
  {
    id: "PRM-003",
    code: "KOPISORE",
    name: "Happy Hour Kopi & Minuman 15%",
    type: "percentage",
    value: 15,
    minSpend: 30000,
    maxDiscount: 15000,
    category: "Kopi & Minuman",
    startDate: "10 Sep 2026",
    endDate: "25 Sep 2026",
    usageCount: 65,
    isActive: true,
    isVoucherCodeRequired: false,
    description: "Promo langsung klik di kasir untuk kategori minuman & kopi.",
  },
  {
    id: "PRM-004",
    code: "TOKOVA5K",
    name: "Voucher Kilat Rp 5.000",
    type: "fixed_amount",
    value: 5000,
    minSpend: 25000,
    category: "Semua Kategori",
    startDate: "15 Sep 2026",
    endDate: "30 Sep 2026",
    usageCount: 89,
    isActive: true,
    isVoucherCodeRequired: false,
    description: "Potongan langsung Rp 5.000 siap pakai oleh kasir tanpa input kode.",
  },
];
