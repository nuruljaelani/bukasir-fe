import React from "react";
import { Star, Store, MapPin, CheckCircle2 } from "lucide-react";
import StickerBadge from "../ornaments/StickerBadge";
import ReceiptEdge from "../ornaments/ReceiptEdge";

const testimonials = [
  {
    store: "Kopi Kenanga & Toast",
    category: "Coffee Shop & Eatery",
    city: "Bandung, Jawa Barat",
    owner: "Dimas & Sarah",
    role: "Co-Owner",
    rating: 5,
    quote:
      "Antrean jam makan siang biasanya bikin kasir kewalahan hitung uang kembalian. Sejak pakai Tokova dengan QRIS otomatis, proses checkout cuma butuh 3 detik per orang! Omset naik 35% karena antrean gak pernah kabur.",
    itemsSummary: "3.420 Transaksi/Bulan",
    ticketNo: "#RC-09142",
  },
  {
    store: "Sora Streetwear Studio",
    category: "Fashion Retail & Distro",
    city: "Jakarta Selatan",
    owner: "Reza Pratama",
    role: "Founder",
    rating: 5,
    quote:
      "Gak perlu beli mesin scanner barcode mahal. Tinggal sorot kamera tablet atau HP, ukuran baju & warna langsung kebaca. Laporan stok real-time ngebantu banget pas lagi ada promo bazaar weekend.",
    itemsSummary: "1.890 SKU Terkelola",
    ticketNo: "#RC-08721",
  },
  {
    store: "Bakmi & Pangsit Pakde Kumis",
    category: "Restoran & Kedai Kuliner",
    city: "Surabaya, Jawa Timur",
    owner: "Pak Bambang H.",
    role: "Pemilik Usaha",
    rating: 5,
    quote:
      "Bapak-bapak kayak saya awalnya takut pegang aplikasi kasir digital. Tapi Tokova tampilannya jelas, tombolnya gede-gede dan enak disentuh. Struk langsung tercetak rapi di printer Bluetooth kecil di meja.",
    itemsSummary: "4.200 Porsi/Bulan",
    ticketNo: "#RC-11029",
  },
];

export default function TestimonialsReceipts() {
  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-[#F3F4F6] border-b-2 border-[#111827] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block">
            <StickerBadge variant="yellow" rotate={2} withSparkle>
              Kisah Sukses Merchant
            </StickerBadge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
            Cerita Nyata dari Meja Kasir{" "}
            <span className="text-[#10B981]">Ribuan UMKM</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Bukan sekadar kata kami. Dengarkan langsung pengalaman para pemilik usaha yang hari-harinya jadi lebih tenang berkat Tokova.
          </p>
        </div>

        {/* Receipt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-3 border-[#111827] neo-shadow flex flex-col justify-between relative overflow-hidden transition-transform hover:-translate-y-2 duration-200"
            >
              {/* Receipt Header */}
              <div className="p-6 border-b border-dashed border-gray-300 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span>{t.ticketNo}</span>
                  <span className="flex items-center gap-1 text-[#059669] font-bold font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-extrabold text-[#111827] text-base sm:text-lg font-sans">
                    {t.store}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs font-sans">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{t.city}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 my-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
              </div>

              {/* Quote Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-700 text-sm font-medium italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-sm text-[#111827] block">
                      {t.owner}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{t.role}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-1 bg-[#D1FAE5] text-[#059669] rounded-lg border border-[#10B981]/30">
                    {t.itemsSummary}
                  </span>
                </div>
              </div>

              {/* Jagged Sawtooth Edge */}
              <ReceiptEdge fillColor="#F3F4F6" teethCount={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
