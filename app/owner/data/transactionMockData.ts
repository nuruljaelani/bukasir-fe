export interface TransactionItem {
  productId: string;
  name: string;
  emoji: string;
  qty: number;
  price: number;
  costPrice: number;
  subtotal: number;
  notes?: string;
}

export interface Transaction {
  id: string; // Invoice number e.g. INV-20260920-0042
  date: string; // YYYY-MM-DD
  time: string; // HH:mm WIB
  cashierName: string;
  customerName: string;
  customerPhone?: string;
  customerTier?: "Bronze" | "Silver" | "Gold" | "Platinum";
  outletName: string;
  orderType: "Dine-in" | "Takeaway" | "Retail";
  items: TransactionItem[];
  subtotal: number;
  discountAmount: number;
  discountName?: string;
  taxAmount: number;
  total: number;
  paymentMethod: "qris" | "cash" | "debit" | "transfer";
  paymentDetails: {
    amountPaid: number;
    change: number;
    referenceNo?: string;
  };
  status: "success" | "refunded" | "cancelled";
  refundReason?: string;
  refundedAt?: string;
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "INV-20260920-0048",
    date: "2026-09-20",
    time: "14:25 WIB",
    cashierName: "Budi Santoso",
    customerName: "Dika Pratama",
    customerPhone: "081234567890",
    customerTier: "Platinum",
    outletName: "Tokova Store - Senopati",
    orderType: "Retail",
    items: [
      {
        productId: "fsh-1",
        name: "Kaos Polos Heavyweight 24s",
        emoji: "👕",
        qty: 2,
        price: 85000,
        costPrice: 48000,
        subtotal: 170000,
        notes: "Warna Hitam size XL",
      },
      {
        productId: "fnb-1",
        name: "Iced Caramel Macchiato",
        emoji: "☕",
        qty: 1,
        price: 32000,
        costPrice: 14000,
        subtotal: 32000,
        notes: "Less sugar, oat milk",
      },
    ],
    subtotal: 202000,
    discountAmount: 20000,
    discountName: "Voucher HEMAT20 (Diskon Member VIP)",
    taxAmount: 18200,
    total: 200200,
    paymentMethod: "qris",
    paymentDetails: {
      amountPaid: 200200,
      change: 0,
      referenceNo: "QRIS-BCA-9823411029",
    },
    status: "success",
  },
  {
    id: "INV-20260920-0047",
    date: "2026-09-20",
    time: "14:10 WIB",
    cashierName: "Dewi Lestari",
    customerName: "Siti Rahmawati",
    customerPhone: "081987654321",
    customerTier: "Gold",
    outletName: "Tokova Store - Senopati",
    orderType: "Takeaway",
    items: [
      {
        productId: "fnb-2",
        name: "Croissant Almond Toast",
        emoji: "🥐",
        qty: 2,
        price: 28000,
        costPrice: 13000,
        subtotal: 56000,
      },
      {
        productId: "fnb-3",
        name: "Matcha Latte Signature",
        emoji: "🍵",
        qty: 2,
        price: 35000,
        costPrice: 16000,
        subtotal: 70000,
        notes: "Dingin, es sedikit",
      },
    ],
    subtotal: 126000,
    discountAmount: 10000,
    discountName: "Kupon JUMATBERKAH",
    taxAmount: 11600,
    total: 127600,
    paymentMethod: "cash",
    paymentDetails: {
      amountPaid: 150000,
      change: 22400,
    },
    status: "success",
  },
  {
    id: "INV-20260920-0046",
    date: "2026-09-20",
    time: "13:48 WIB",
    cashierName: "Budi Santoso",
    customerName: "Bambang Sudiro",
    customerPhone: "082155443322",
    customerTier: "Silver",
    outletName: "Tokova Store - Senopati",
    orderType: "Retail",
    items: [
      {
        productId: "elk-1",
        name: "Kabel Data Type-C Braided 65W",
        emoji: "🔌",
        qty: 1,
        price: 45000,
        costPrice: 22000,
        subtotal: 45000,
      },
      {
        productId: "elk-2",
        name: "Adaptor Charger 30W GaN",
        emoji: "⚡",
        qty: 1,
        price: 125000,
        costPrice: 75000,
        subtotal: 125000,
      },
    ],
    subtotal: 170000,
    discountAmount: 0,
    taxAmount: 17000,
    total: 187000,
    paymentMethod: "debit",
    paymentDetails: {
      amountPaid: 187000,
      change: 0,
      referenceNo: "MANDIRI-EDC-449102",
    },
    status: "success",
  },
  {
    id: "INV-20260920-0045",
    date: "2026-09-20",
    time: "13:15 WIB",
    cashierName: "Dewi Lestari",
    customerName: "Pelanggan Umum (Walk-in)",
    outletName: "Tokova Store - Senopati",
    orderType: "Dine-in",
    items: [
      {
        productId: "fnb-4",
        name: "Nasi Goreng Spesial Tokova",
        emoji: "🍛",
        qty: 1,
        price: 38000,
        costPrice: 17000,
        subtotal: 38000,
        notes: "Pedas sedang, telur ceplok matang",
      },
      {
        productId: "fnb-5",
        name: "Es Teh Manis Melati",
        emoji: "🍹",
        qty: 1,
        price: 10000,
        costPrice: 3000,
        subtotal: 10000,
      },
    ],
    subtotal: 48000,
    discountAmount: 0,
    taxAmount: 4800,
    total: 52800,
    paymentMethod: "qris",
    paymentDetails: {
      amountPaid: 52800,
      change: 0,
      referenceNo: "QRIS-GOPAY-1188390",
    },
    status: "refunded",
    refundReason: "Salah input meja kasir & pesanan diganti pelanggan",
    refundedAt: "2026-09-20 13:22 WIB",
  },
  {
    id: "INV-20260920-0044",
    date: "2026-09-20",
    time: "12:50 WIB",
    cashierName: "Budi Santoso",
    customerName: "Jessica Tanuwijaya",
    customerPhone: "087811223344",
    customerTier: "Platinum",
    outletName: "Tokova Store - Senopati",
    orderType: "Retail",
    items: [
      {
        productId: "fsh-2",
        name: "Kemeja Flannel Tartan Casual",
        emoji: "👔",
        qty: 1,
        price: 165000,
        costPrice: 98000,
        subtotal: 165000,
        notes: "Size L",
      },
      {
        productId: "kck-1",
        name: "Sunscreen SPF 50 UV Shield",
        emoji: "🧴",
        qty: 2,
        price: 65000,
        costPrice: 38000,
        subtotal: 130000,
      },
    ],
    subtotal: 295000,
    discountAmount: 25000,
    discountName: "Promo Belanja Cantik 25K",
    taxAmount: 27000,
    total: 297000,
    paymentMethod: "qris",
    paymentDetails: {
      amountPaid: 297000,
      change: 0,
      referenceNo: "QRIS-SHOPEE-991823",
    },
    status: "success",
  },
  {
    id: "INV-20260920-0043",
    date: "2026-09-20",
    time: "12:05 WIB",
    cashierName: "Dewi Lestari",
    customerName: "Ahmad Fauzi",
    customerPhone: "085678901234",
    customerTier: "Bronze",
    outletName: "Tokova Store - Senopati",
    orderType: "Retail",
    items: [
      {
        productId: "sbk-1",
        name: "Beras Pandan Wangi Premium 5kg",
        emoji: "🌾",
        qty: 1,
        price: 78000,
        costPrice: 66000,
        subtotal: 78000,
      },
      {
        productId: "sbk-2",
        name: "Minyak Goreng Refill 2 Liter",
        emoji: "🍳",
        qty: 2,
        price: 36000,
        costPrice: 31000,
        subtotal: 72000,
      },
      {
        productId: "sbk-3",
        name: "Gula Pasir Kristal Putih 1kg",
        emoji: "🍚",
        qty: 1,
        price: 17500,
        costPrice: 14500,
        subtotal: 17500,
      },
    ],
    subtotal: 167500,
    discountAmount: 5000,
    discountName: "Potongan Langsung TOKOVA5K",
    taxAmount: 16250,
    total: 178750,
    paymentMethod: "cash",
    paymentDetails: {
      amountPaid: 200000,
      change: 21250,
    },
    status: "success",
  },
  {
    id: "INV-20260920-0042",
    date: "2026-09-20",
    time: "11:30 WIB",
    cashierName: "Budi Santoso",
    customerName: "Dewi Anggraini",
    customerPhone: "081344556677",
    customerTier: "Silver",
    outletName: "Tokova Store - Senopati",
    orderType: "Takeaway",
    items: [
      {
        productId: "fnb-6",
        name: "Latte Gula Aren Nusantara",
        emoji: "☕",
        qty: 3,
        price: 24000,
        costPrice: 10000,
        subtotal: 72000,
        notes: "Gula aren normal, es batu terpisah",
      },
      {
        productId: "fnb-7",
        name: "Roti Bakar Cokelat Keju",
        emoji: "🍞",
        qty: 1,
        price: 22000,
        costPrice: 9000,
        subtotal: 22000,
      },
    ],
    subtotal: 94000,
    discountAmount: 0,
    taxAmount: 9400,
    total: 103400,
    paymentMethod: "qris",
    paymentDetails: {
      amountPaid: 103400,
      change: 0,
      referenceNo: "QRIS-BCA-77162534",
    },
    status: "success",
  },
  {
    id: "INV-20260920-0041",
    date: "2026-09-20",
    time: "10:45 WIB",
    cashierName: "Budi Santoso",
    customerName: "Pelanggan Umum (Walk-in)",
    outletName: "Tokova Store - Senopati",
    orderType: "Retail",
    items: [
      {
        productId: "atk-1",
        name: "Buku Catatan Spiral A5 Hardcover",
        emoji: "📓",
        qty: 2,
        price: 25000,
        costPrice: 12000,
        subtotal: 50000,
      },
      {
        productId: "atk-2",
        name: "Gel Pen 0.5mm Smooth Black (Box 12)",
        emoji: "🖊️",
        qty: 1,
        price: 36000,
        costPrice: 20000,
        subtotal: 36000,
      },
    ],
    subtotal: 86000,
    discountAmount: 0,
    taxAmount: 8600,
    total: 94600,
    paymentMethod: "debit",
    paymentDetails: {
      amountPaid: 94600,
      change: 0,
      referenceNo: "BCA-EDC-8829102",
    },
    status: "success",
  },
];
