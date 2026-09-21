export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  points: number;
  totalSpend: number;
  totalVisits: number;
  joinedDate: string;
  lastVisitDate: string;
  status: "Aktif" | "Nonaktif";
  notes?: string;
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CST-001",
    name: "Dika Pratama",
    phone: "0812-8877-6655",
    email: "dika.pratama@gmail.com",
    tier: "Platinum",
    points: 420,
    totalSpend: 3850000,
    totalVisits: 28,
    joinedDate: "10 Jan 2026",
    lastVisitDate: "Hari Ini, 12:45",
    status: "Aktif",
    notes: "Pelanggan setia kafe, pesan kopi less sugar + ekstra shot.",
  },
  {
    id: "CST-002",
    name: "Siti Rahmawati",
    phone: "0813-2233-4455",
    email: "siti.rahma@yahoo.com",
    tier: "Gold",
    points: 180,
    totalSpend: 1650000,
    totalVisits: 14,
    joinedDate: "15 Mar 2026",
    lastVisitDate: "Kemarin, 16:20",
    status: "Aktif",
    notes: "Suka beli pastry & produk fashion tote bag.",
  },
  {
    id: "CST-003",
    name: "Bambang Sudiro",
    phone: "0856-7788-9900",
    tier: "Silver",
    points: 95,
    totalSpend: 820000,
    totalVisits: 7,
    joinedDate: "02 Mei 2026",
    lastVisitDate: "16 Sep 2026",
    status: "Aktif",
    notes: "Belanja sembako dan minyak goreng harian.",
  },
  {
    id: "CST-004",
    name: "Jessica Tanuwijaya",
    phone: "0819-0011-2233",
    email: "jessica.tan@gmail.com",
    tier: "Gold",
    points: 260,
    totalSpend: 2450000,
    totalVisits: 18,
    joinedDate: "20 Feb 2026",
    lastVisitDate: "18 Sep 2026",
    status: "Aktif",
    notes: "Member kantor sekitar Senopati, sering pesan takeaway 5-10 cup.",
  },
  {
    id: "CST-005",
    name: "Ahmad Fauzi",
    phone: "0811-9988-7711",
    tier: "Bronze",
    points: 30,
    totalSpend: 280000,
    totalVisits: 3,
    joinedDate: "05 Agu 2026",
    lastVisitDate: "14 Sep 2026",
    status: "Aktif",
    notes: "Pelanggan baru area Senopati.",
  },
  {
    id: "CST-006",
    name: "Dewi Anggraini",
    phone: "0877-3344-5566",
    email: "dewi.anggraini@outlook.com",
    tier: "Bronze",
    points: 15,
    totalSpend: 150000,
    totalVisits: 2,
    joinedDate: "12 Agu 2026",
    lastVisitDate: "28 Agu 2026",
    status: "Nonaktif",
    notes: "Pindah kantor ke luar kota.",
  },
];
