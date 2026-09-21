export interface Employee {
  id: string;
  name: string;
  role: "Owner" | "Manajer" | "Supervisor" | "Kasir" | "Barista / Koki";
  pin: string;
  phone: string;
  status: "Aktif" | "Cuti" | "Off Shift";
  joinedDate: string;
  avatarEmoji: string;
  permissions: {
    canAccessPos: boolean;
    canViewReports: boolean;
    canVoidTransaction: boolean;
    canManageInventory: boolean;
  };
}

export interface Supplier {
  id: string;
  name: string;
  category: "Pakaian & Tekstil" | "Sembako & Pangan" | "Elektronik & Aksesoris" | "Bahan Minuman & Kopi" | "Kemasan & Packaging";
  picName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentTerms: "COD / Tunai" | "Tempo 7 Hari" | "Tempo 14 Hari" | "Tempo 30 Hari";
  bankAccount: string;
  status: "Aktif" | "Cadangan" | "Nonaktif";
  suppliedItemsCount: number;
}

export interface ShiftRecord {
  id: string;
  cashierName: string;
  shiftName: "Shift Pagi (07:00 - 15:00)" | "Shift Sore (15:00 - 23:00)";
  date: string;
  openingCash: number; // Kas modal awal di laci
  cashSales: number; // Penjualan tunai tercatat
  qrisSales: number; // Penjualan QRIS tercatat
  debitSales: number; // Penjualan kartu debit
  totalSales: number;
  expectedCashInDrawer: number; // openingCash + cashSales
  actualCashSubmitted?: number; // Kas fisik yang disetor
  discrepancy?: number; // Selisih (aktual - ekspektasi)
  status: "Berjalan" | "Selesai" | "Perlu Review";
}

export interface SalesAnalytics {
  todayRevenue: number;
  yesterdayRevenue: number;
  growthPercent: number;
  todayTransactions: number;
  avgBasketSize: number;
  paymentMethods: {
    qris: number;
    cash: number;
    debit: number;
  };
  weeklyTrend: { day: string; revenue: number; orders: number }[];
  topSelling: {
    name: string;
    category: string;
    soldQty: number;
    totalRevenue: number;
    emoji: string;
  }[];
}

export const INITIAL_ANALYTICS: SalesAnalytics = {
  todayRevenue: 4850000,
  yesterdayRevenue: 4095000,
  growthPercent: 18.4,
  todayTransactions: 162,
  avgBasketSize: 29938,
  paymentMethods: {
    qris: 64, // 64%
    cash: 26, // 26%
    debit: 10, // 10%
  },
  weeklyTrend: [
    { day: "Sen", revenue: 3200000, orders: 110 },
    { day: "Sel", revenue: 3650000, orders: 125 },
    { day: "Rab", revenue: 3900000, orders: 132 },
    { day: "Kam", revenue: 4100000, orders: 140 },
    { day: "Jum", revenue: 5200000, orders: 175 },
    { day: "Sab", revenue: 6400000, orders: 215 },
    { day: "Min", revenue: 4850000, orders: 162 },
  ],
  topSelling: [
    {
      name: "Kaos Polos Heavyweight 24s",
      category: "Pakaian & Fashion",
      soldQty: 54,
      totalRevenue: 4590000,
      emoji: "👕",
    },
    {
      name: "Minyak Goreng Sawit 2L",
      category: "Sembako & Harian",
      soldQty: 48,
      totalRevenue: 1632000,
      emoji: "🍳",
    },
    {
      name: "Kopi Susu Aren Tokova",
      category: "Makanan & Minuman",
      soldQty: 45,
      totalRevenue: 810000,
      emoji: "☕",
    },
    {
      name: "Kabel Data Type-C 65W",
      category: "Gadget & Elektronik",
      soldQty: 32,
      totalRevenue: 1440000,
      emoji: "🔌",
    },
    {
      name: "Sunscreen Serum SPF 50+",
      category: "Perawatan & Farmasi",
      soldQty: 26,
      totalRevenue: 1768000,
      emoji: "🧴",
    },
  ],
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    name: "Ahmad Rifai",
    role: "Owner",
    pin: "9988",
    phone: "0812-8888-1234",
    status: "Aktif",
    joinedDate: "Jan 2024",
    avatarEmoji: "👔",
    permissions: {
      canAccessPos: true,
      canViewReports: true,
      canVoidTransaction: true,
      canManageInventory: true,
    },
  },
  {
    id: "EMP-002",
    name: "Budi Santoso",
    role: "Kasir",
    pin: "1234",
    phone: "0813-7777-5678",
    status: "Aktif",
    joinedDate: "Maret 2024",
    avatarEmoji: "🧑‍💼",
    permissions: {
      canAccessPos: true,
      canViewReports: false,
      canVoidTransaction: false,
      canManageInventory: false,
    },
  },
  {
    id: "EMP-003",
    name: "Siti Rahma",
    role: "Supervisor",
    pin: "5566",
    phone: "0812-3344-9012",
    status: "Aktif",
    joinedDate: "Feb 2024",
    avatarEmoji: "👩‍💼",
    permissions: {
      canAccessPos: true,
      canViewReports: true,
      canVoidTransaction: true,
      canManageInventory: true,
    },
  },
  {
    id: "EMP-004",
    name: "Dimas Aditya",
    role: "Barista / Koki",
    pin: "4321",
    phone: "0857-1122-3344",
    status: "Aktif",
    joinedDate: "Mei 2024",
    avatarEmoji: "☕",
    permissions: {
      canAccessPos: true,
      canViewReports: false,
      canVoidTransaction: false,
      canManageInventory: true,
    },
  },
  {
    id: "EMP-005",
    name: "Linda Kusuma",
    role: "Kasir",
    pin: "2468",
    phone: "0818-9900-1122",
    status: "Off Shift",
    joinedDate: "Juni 2024",
    avatarEmoji: "👩‍💼",
    permissions: {
      canAccessPos: true,
      canViewReports: false,
      canVoidTransaction: false,
      canManageInventory: false,
    },
  },
];

export const INITIAL_SHIFTS: ShiftRecord[] = [
  {
    id: "SHF-2026-0920-A",
    cashierName: "Budi Santoso",
    shiftName: "Shift Pagi (07:00 - 15:00)",
    date: "Hari Ini, 20 Sep 2026",
    openingCash: 200000,
    cashSales: 1261000,
    qrisSales: 3104000,
    debitSales: 485000,
    totalSales: 4850000,
    expectedCashInDrawer: 1461000, // 200rb + 1.261rb
    status: "Berjalan",
  },
  {
    id: "SHF-2026-0919-B",
    cashierName: "Linda Kusuma",
    shiftName: "Shift Sore (15:00 - 23:00)",
    date: "Kemarin, 19 Sep 2026",
    openingCash: 200000,
    cashSales: 1150000,
    qrisSales: 2540000,
    debitSales: 405000,
    totalSales: 4095000,
    expectedCashInDrawer: 1350000,
    actualCashSubmitted: 1350000,
    discrepancy: 0,
    status: "Selesai",
  },
  {
    id: "SHF-2026-0919-A",
    cashierName: "Budi Santoso",
    shiftName: "Shift Pagi (07:00 - 15:00)",
    date: "Kemarin, 19 Sep 2026",
    openingCash: 200000,
    cashSales: 980000,
    qrisSales: 2100000,
    debitSales: 350000,
    totalSales: 3430000,
    expectedCashInDrawer: 1180000,
    actualCashSubmitted: 1175000,
    discrepancy: -5000, // Selisih kurang 5rb
    status: "Perlu Review",
  },
];

export interface StoreSettings {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  taxPercent: number;
  serviceChargePercent: number;
  receiptFooterMessage: string;
  wifiName: string;
  wifiPass: string;
  qrisMerchantName: string;
  qrisNmid: string;
}

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Tokova Coffee & Eatery",
  tagline: "Kopi Nikmat, Rasa Hebat",
  address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
  phone: "0812-9988-7766",
  taxPercent: 10,
  serviceChargePercent: 0,
  receiptFooterMessage: "Terima kasih atas kunjungannya! Follow Instagram: @tokovacoffee",
  wifiName: "Tokova_Guest_5G",
  wifiPass: "kopienak123",
  qrisMerchantName: "TOKOVA SENOPATI GROUP",
  qrisNmid: "ID1020260909001",
};

export interface Outlet {
  id: string;
  code: string;
  name: string;
  type: "Flagship Store" | "Express / Kiosk" | "Mall Outlet" | "Stand-alone";
  address: string;
  city: string;
  phone: string;
  managerName: string;
  status: "Aktif" | "Renovasi" | "Non-aktif";
  operatingHours: string;
  totalEmployees: number;
  todayRevenue: number;
  isMainBranch: boolean;
}

export interface SubscriptionPlan {
  planId: "starter" | "pro" | "multi_outlet" | "enterprise";
  planName: string;
  maxOutlets: number;
  currentOutletsUsed: number;
  billingCycle: "Bulanan" | "Tahunan";
  renewalDate: string;
  pricePerMonth: number;
  badgeText: string;
}

export const INITIAL_SUBSCRIPTION: SubscriptionPlan = {
  planId: "pro",
  planName: "Pro Kafe & Retail",
  maxOutlets: 3,
  currentOutletsUsed: 2,
  billingCycle: "Tahunan",
  renewalDate: "15 Agustus 2027",
  pricePerMonth: 99000,
  badgeText: "Paket Pro (Maks 3 Cabang)",
};

export const INITIAL_OUTLETS: Outlet[] = [
  {
    id: "OUT-001",
    code: "JKT-SENOPATI",
    name: "Tokova Store - Senopati",
    type: "Flagship Store",
    address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
    city: "Jakarta Selatan",
    phone: "0812-9988-7766",
    managerName: "Budi Santoso",
    status: "Aktif",
    operatingHours: "07:00 - 22:00 WIB",
    totalEmployees: 6,
    todayRevenue: 4850000,
    isMainBranch: true,
  },
  {
    id: "OUT-002",
    code: "TNG-BINTARO",
    name: "Tokova Express - Bintaro Sektor 7",
    type: "Express / Kiosk",
    address: "Ruko Bintaro Jaya Sektor 7 Blok B3 No. 15, Pondok Aren",
    city: "Tangerang Selatan",
    phone: "0813-2211-9988",
    managerName: "Rian Hidayat",
    status: "Aktif",
    operatingHours: "08:00 - 21:00 WIB",
    totalEmployees: 4,
    todayRevenue: 2410000,
    isMainBranch: false,
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "SPL-001",
    name: "PT Sumber Pangan Sejahtera",
    category: "Sembako & Pangan",
    picName: "Hendra Wijaya",
    phone: "0812-3344-5566",
    email: "hendra@sumberpangan.co.id",
    address: "Kawasan Industri Pulo Gadung Blok B4",
    city: "Jakarta Timur",
    paymentTerms: "Tempo 14 Hari",
    bankAccount: "BCA 8890-123-456 (PT Sumber Pangan)",
    status: "Aktif",
    suppliedItemsCount: 14,
  },
  {
    id: "SPL-002",
    name: "CV Konveksi Katun Mandiri",
    category: "Pakaian & Tekstil",
    picName: "Asep Sunandar",
    phone: "0813-8899-0011",
    email: "konveksi.mandiri@gmail.com",
    address: "Jl. Cigondewah No. 88",
    city: "Bandung",
    paymentTerms: "Tempo 30 Hari",
    bankAccount: "Mandiri 131-00-9988-771 (CV Katun Mandiri)",
    status: "Aktif",
    suppliedItemsCount: 8,
  },
  {
    id: "SPL-003",
    name: "Harco Digital Aksesoris",
    category: "Elektronik & Aksesoris",
    picName: "Steven Lie",
    phone: "0818-4455-6677",
    email: "steven@harcodigital.id",
    address: "Harco Mangga Dua Blok C No. 12",
    city: "Jakarta Pusat",
    paymentTerms: "COD / Tunai",
    bankAccount: "BCA 542-112-9090 (Steven Lie)",
    status: "Aktif",
    suppliedItemsCount: 12,
  },
  {
    id: "SPL-004",
    name: "Koperasi Tani Gayo Lestari",
    category: "Bahan Minuman & Kopi",
    picName: "Tengku Mahdi",
    phone: "0852-6677-8899",
    email: "gayolestari.coffee@gmail.com",
    address: "Desa Simpang Tiga, Takengon",
    city: "Aceh Tengah",
    paymentTerms: "Tempo 14 Hari",
    bankAccount: "BRI 0018-01-098765-50-1 (Kop Gayo)",
    status: "Aktif",
    suppliedItemsCount: 5,
  },
  {
    id: "SPL-005",
    name: "Mitra Pack Packaging",
    category: "Kemasan & Packaging",
    picName: "Dewi Lestari",
    phone: "0811-2233-4455",
    email: "sales@mitrapack.com",
    address: "Pergudangan Cikupa Mas Blok D No. 5",
    city: "Tangerang",
    paymentTerms: "Tempo 7 Hari",
    bankAccount: "BCA 771-002-3344 (PT Mitra Pack)",
    status: "Cadangan",
    suppliedItemsCount: 6,
  },
];

