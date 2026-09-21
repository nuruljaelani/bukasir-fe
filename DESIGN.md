---
name: Tokova Neo-Pop POS
version: 1.0.0
colors:
  primary: "#10B981"
  primary-dark: "#059669"
  primary-light: "#D1FAE5"
  secondary: "#FF6B4A"
  secondary-dark: "#EA580C"
  secondary-light: "#FFEDD5"
  accent-yellow: "#FBBF24"
  accent-blue: "#38BDF8"
  accent-purple-forbidden: "none"
  neutral-canvas: "#FBF9F5"
  surface: "#FFFFFF"
  surface-subtle: "#F3F4F6"
  text-primary: "#111827"
  text-secondary: "#4B5563"
  text-muted: "#9CA3AF"
  border-bold: "#111827"
  border-subtle: "#E5E7EB"
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.03em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  mono-price:
    fontFamily: Geist Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  badge-sticker:
    backgroundColor: "{colors.accent-yellow}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  card-tactile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 24px
---

# Tokova - Neo-Pop & Tactile Retail Design Specification

## Overview
Tokova adalah platform SaaS Kasir Modern (POS) untuk UMKM, toko retail, kafe, dan restoran. Pendekatan visual mengusung gaya **"Vibrant Neo-Pop & Tactile Retail"** yang memadukan kehangatan retail tradisional dengan kepraktisan teknologi kasir digital modern.

Ciri khas desain:
- **Playful yet Professional:** Penggunaan ornamen stiker fisik (badge mengambang, stempel "Laris Manis ⚡", nota bergerigi).
- **Tactile Shadows & Borders:** Elemen kartu berdimensi dengan bayangan halus atau aksen offset shadow kontras yang memuaskan saat disentuh (*finger-friendly*).
- **Anti-Boring SaaS:** Menghindari warna ungu generik dan template monokrom dingin. Menggunakan warna hijau mint kasir (*emerald/mint*), oranye koral (*tangerine*), dan kuning hangat (*sunshine amber*).

## Colors
- **Primary Mint (#10B981 & #059669):** Menandakan kelancaran transaksi, penjualan berhasil, saldo bertambah, dan tombol aksi utama.
- **Secondary Tangerine (#FF6B4A):** Aksen energi tinggi untuk diskon promo, badge "Coba Gratis", dan highlight interaktif.
- **Accent Sunshine (#FBBF24):** Stiker ornamen, rating bintang, tag kategori populer.
- **Neutral Canvas (#FBF9F5):** Latar belakang lembut bernuansa kertas nota kasir hangat, nyaman di mata kasir yang bekerja berjam-jam.
- **Surface & Cards (#FFFFFF):** Permukaan kartu menu produk, modal kasir, dan keranjang belanja.
- **Ink Dark (#111827):** Warna teks berkontras tinggi (WCAG AAA) untuk memastikan harga dan nama menu terbaca jelas di bawah lampu toko/sinar matahari.

## Typography
- **Heading & UI:** `Plus Jakarta Sans` — modern, bersahabat, geometris, dan sangat terbaca di layar kasir tablet/smartphone.
- **Numeric & Struk:** `Geist Mono` / Monospace tabular — agar nominal Rupiah (Rp) dan kalkulasi kembalian rata kanan secara presisi.

## Layout & Ornaments
1. **Ornamen Nota Kasir (Zig-Zag Receipt Pattern):** Elemen batas bergerigi di bagian bawah kartu struk belanja atau testimoni.
2. **Sticker Badges:** Tag kecil melayang dengan rotasi ringan (-2deg sampai +3deg) seperti `⚡ Transaksi 3 Detik`, `☕ Ramah Kafe & Resto`, `🧾 Cetak Struk Bluetooth`.
3. **Floating Metric Pills:** Menampilkan status dinamis seperti `🟢 Kasir Siap`, `⚡ 120 Transaksi Hari Ini`, `💳 QRIS Auto-Confirm`.
4. **Bento Feature Grid:** Bagian fitur di landing page yang menampilkan preview interaktif:
   - Live POS Demo Widget (user bisa klik menu, langsung masuk ke keranjang simulasi).
   - Speed Calculator (hemat waktu berapa menit per antrean).
   - Multi-Device Showcase (Tablet, HP, Desktop).

## Do's and Don'ts
- **DO:** Gunakan ornamen visual (stiker, badge, ikon tebal, nota kasir bergerigi) untuk memberi kepribadian dan menghidupkan antarmuka.
- **DO:** Pastikan tombol kasir di modul POS memiliki ukuran target sentuh minimal 44x44px untuk kenyamanan layar sentuh.
- **DO:** Buat alur POS responsif: di layar mobile (Bottom Sheet keranjang) dan di desktop/tablet (Split layout 2-kolom: Menu di kiri, Keranjang & Checkout di kanan).
- **DON'T:** Jangan gunakan gradasi ungu klise ala template SaaS kecerdasan buatan generik (Sesuai aturan *Purple Ban*).
- **DON'T:** Jangan biarkan ornamen menutupi tombol transaksi kasir yang krusial.
