import React from "react";

interface ReceiptEdgeProps {
  fillColor?: string;
  className?: string;
  teethCount?: number;
}

export default function ReceiptEdge({
  fillColor = "#FFFFFF",
  className = "",
  teethCount = 20,
}: ReceiptEdgeProps) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`}>
      <svg
        className="w-full h-3 sm:h-4 block"
        viewBox="0 0 400 16"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            "M 0,0 " +
            Array.from({ length: teethCount })
              .map((_, i) => {
                const step = 400 / teethCount;
                const x1 = i * step + step / 2;
                const x2 = (i + 1) * step;
                return `L ${x1},16 L ${x2},0`;
              })
              .join(" ") +
            " L 400,0 Z"
          }
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
