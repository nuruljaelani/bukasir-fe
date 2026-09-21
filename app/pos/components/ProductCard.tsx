import React from "react";
import { Plus, Check, Barcode } from "lucide-react";
import { Product } from "../data/mockData";
import StickerBadge from "@/components/ornaments/StickerBadge";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onAddToCart(product)}
      className="group relative bg-white rounded-2xl border-2 border-[#111827] p-4 flex flex-col justify-between cursor-pointer neo-shadow-sm neo-shadow-hover transition-all duration-150 select-none active:scale-97"
    >
      {/* Badge if present */}
      {product.badge && (
        <div className="absolute -top-2.5 -right-2 z-10">
          <StickerBadge variant="yellow" rotate={2} className="text-[9px] py-0.5 px-2">
            {product.badge}
          </StickerBadge>
        </div>
      )}

      <div>
        {/* Visual / Emoji Header */}
        <div className="w-full h-24 rounded-xl bg-[#FBF9F5] border border-gray-200 flex items-center justify-center text-4xl mb-2.5 group-hover:scale-105 transition-transform">
          {product.emoji}
        </div>

        {/* SKU tag */}
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
          <span className="font-bold text-gray-500">{product.sku}</span>
          <span>{product.stock} {product.unit}</span>
        </div>

        {/* Name and description */}
        <h4 className="font-extrabold text-[#111827] text-sm leading-snug line-clamp-1 mb-1">
          {product.name}
        </h4>
        <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed mb-3">
          {product.description}
        </p>
      </div>

      {/* Bottom price and action */}
      <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase block">
            Harga / {product.unit}
          </span>
          <span className="text-sm font-extrabold text-[#111827] font-mono">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {quantityInCart > 0 && (
            <span className="px-2 py-0.5 bg-[#D1FAE5] text-[#059669] font-mono text-xs font-black rounded-lg border border-[#10B981]/50">
              {quantityInCart}x
            </span>
          )}

          <button
            type="button"
            className={`w-8 h-8 rounded-xl border-2 border-[#111827] flex items-center justify-center transition-colors ${
              quantityInCart > 0
                ? "bg-[#10B981] text-white"
                : "bg-[#F3F4F6] group-hover:bg-[#10B981] text-[#111827] group-hover:text-white"
            }`}
          >
            {quantityInCart > 0 ? (
              <Check className="w-4 h-4 stroke-3" />
            ) : (
              <Plus className="w-4 h-4 stroke-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
