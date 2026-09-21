import React from "react";

interface StickerBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "mint" | "coral" | "sky" | "white";
  rotate?: number;
  className?: string;
  withSparkle?: boolean;
}

export default function StickerBadge({
  children,
  variant = "yellow",
  rotate = -2,
  className = "",
  withSparkle = false,
}: StickerBadgeProps) {
  const variantStyles = {
    yellow: "bg-[#FBBF24] text-[#111827] border-[#111827]",
    mint: "bg-[#10B981] text-white border-[#111827]",
    coral: "bg-[#FF6B4A] text-white border-[#111827]",
    sky: "bg-[#38BDF8] text-[#111827] border-[#111827]",
    white: "bg-white text-[#111827] border-[#111827]",
  };

  return (
    <span
      style={{ "--rotate": `${rotate}deg`, transform: `rotate(${rotate}deg)` } as React.CSSProperties}
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full border-2 neo-shadow-sm transition-transform duration-200 hover:scale-105 select-none ${variantStyles[variant]} ${className}`}
    >
      {withSparkle && <span className="text-sm">✦</span>}
      {children}
    </span>
  );
}
