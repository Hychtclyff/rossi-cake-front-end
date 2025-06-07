// src/components/icons/FallenCakeIcon.tsx
import React from "react";

/**
 * Komponen ikon SVG untuk ilustrasi kue jatuh.
 * Menerima semua props standar SVG.
 */
export const FallenCakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    {...props}
  >
    <g transform="rotate(15 60 60)">
      {/* Noda di lantai */}
      <path
        d="M 20 110 C 30 120, 50 100, 60 115 C 70 100, 90 120, 100 110 C 115 105, 110 85, 100 90 C 90 80, 70 95, 60 85 C 50 95, 30 80, 20 90 C 10 85, 5 105, 20 110 Z"
        fill="currentColor"
        className="text-pink-200"
      />
      {/* Kertas cupcake */}
      <path
        d="M 35 60 L 40 90 L 90 90 L 95 60 Z"
        fill="currentColor"
        className="text-amber-700"
      />
      <path
        d="M 40 90 Q 65 98, 90 90"
        fill="currentColor"
        className="text-amber-800"
      />
      {/* Garis kertas */}
      <line
        x1="50"
        y1="60"
        x2="53"
        y2="90"
        stroke="currentColor"
        className="text-amber-600"
        strokeWidth="2"
      />
      <line
        x1="65"
        y1="60"
        x2="65"
        y2="90"
        stroke="currentColor"
        className="text-amber-600"
        strokeWidth="2"
      />
      <line
        x1="80"
        y1="60"
        x2="77"
        y2="90"
        stroke="currentColor"
        className="text-amber-600"
        strokeWidth="2"
      />
      {/* Krim cupcake */}
      <path
        d="M 30 60 C 25 40, 45 30, 65 35 C 85 40, 105 40, 100 60 Z"
        fill="currentColor"
        className="text-pink-400"
      />
      {/* Ceri */}
      <circle
        cx="65"
        cy="30"
        r="8"
        fill="currentColor"
        className="text-red-500"
      />
      <path
        d="M 65 30 C 70 20, 80 20, 80 15"
        stroke="currentColor"
        className="text-green-600"
        strokeWidth="2.5"
        fill="none"
      />
    </g>
  </svg>
);
