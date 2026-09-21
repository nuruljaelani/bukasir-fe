import React from "react";
import { CATEGORIES, PRODUCTS } from "../data/mockData";

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryBar({
  activeCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      {CATEGORIES.map((cat) => {
        const count =
          cat.id === "semua"
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.category === cat.id).length;

        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all select-none ${
              isActive
                ? "bg-[#111827] text-white border-[#111827] neo-shadow-sm scale-102"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#111827] hover:bg-[#FBF9F5]"
            }`}
          >
            <span className="text-base">{cat.emoji}</span>
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold ${
                isActive ? "bg-[#10B981] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
