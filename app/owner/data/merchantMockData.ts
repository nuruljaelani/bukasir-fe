import { Outlet, SubscriptionPlan, INITIAL_OUTLETS, INITIAL_SUBSCRIPTION } from "./ownerMockData";

export interface Merchant {
  id: string;
  ownerUserId: string;
  brandName: string;
  companyName: string;
  businessCategory: string;
  businessType: "PT" | "CV" | "Perorangan / UMKM";
  taxId: string; // NPWP
  email: string;
  phone: string;
  headquartersAddress: string;
  city: string;
  bankAccount: {
    bankName: "BCA" | "Mandiri" | "BRI" | "BNI";
    accountNumber: string;
    accountHolder: string;
  };
  subscription: SubscriptionPlan;
  outlets: Outlet[];
  createdAt: string;
}

export const INITIAL_MERCHANT: Merchant = {
  id: "MCH-2026-0042",
  ownerUserId: "USR-001", // Akun Ahmad Rifai (Owner)
  brandName: "Tokova Retail & Coffee Group",
  companyName: "PT Tokova Kuliner Retail Nusantara",
  businessCategory: "Food & Beverage, Fashion, dan Retail Modern",
  businessType: "PT",
  taxId: "09.876.543.2-012.000",
  email: "corporate@tokova.id",
  phone: "0812-9988-7766",
  headquartersAddress: "Gedung Sahid Sudirman Center Lt. 18, Jl. Jend. Sudirman No. 86",
  city: "Jakarta Pusat",
  bankAccount: {
    bankName: "BCA",
    accountNumber: "8820-192-881",
    accountHolder: "PT TOKOVA KULINER RETAIL NUSANTARA",
  },
  subscription: INITIAL_SUBSCRIPTION, // Pro Kafe & Retail (Maks 3 Outlet)
  outlets: INITIAL_OUTLETS, // 2 dari 3 outlet aktif (Senopati & Bintaro)
  createdAt: "2024-01-05",
};
