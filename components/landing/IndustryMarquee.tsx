import React from "react";
import StickerBadge from "../ornaments/StickerBadge";

const industries = [
  { name: "Coffee Shop & Kafe", emoji: "☕", color: "yellow" as const, rotate: -2 },
  { name: "Toko Retail & Distro", emoji: "👕", color: "mint" as const, rotate: 2 },
  { name: "Restoran & Rumah Makan", emoji: "🍛", color: "coral" as const, rotate: -1 },
  { name: "Bakery & Pastry Shop", emoji: "🥐", color: "yellow" as const, rotate: 3 },
  { name: "Minimarket & Kelontong", emoji: "🛒", color: "sky" as const, rotate: -3 },
  { name: "Barbershop & Salon", emoji: "💈", color: "mint" as const, rotate: 1 },
  { name: "Food Truck & Booth UMKM", emoji: "🚚", color: "coral" as const, rotate: -2 },
  { name: "Pet Shop & Klinik", emoji: "🐾", color: "yellow" as const, rotate: 2 },
];

export default function IndustryMarquee() {
  return (
    <div id="industri" className="py-6 bg-[#111827] text-white overflow-hidden border-b-2 border-[#111827]">
      <div className="flex items-center">
        {/* Double array for seamless infinite marquee loop */}
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
          {[...industries, ...industries].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <StickerBadge
                variant={item.color}
                rotate={item.rotate}
                className="text-xs sm:text-sm font-bold border-white"
              >
                <span className="mr-1">{item.emoji}</span>
                {item.name}
              </StickerBadge>
              <span className="text-gray-500 font-extrabold text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
