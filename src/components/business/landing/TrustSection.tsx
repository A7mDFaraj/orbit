'use client';

import React from "react";
import { ShieldCheck } from "lucide-react";

export const TrustSection = () => {
  // Using placeholders for brands since we don't have local SVGs for them
  const brands = [
    { name: "هيئة الاتصالات", color: "text-slate-600" },
    { name: "سلة", color: "text-[#004D40]" },
    { name: "زد", color: "text-[#7B1FA2]" },
    { name: "الراجحي", color: "text-[#1A237E]" },
    { name: "STC", color: "text-[#4A148C]" },
    { name: "موبايلي", color: "text-[#006064]" },
  ];

  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            شريك موثوق لأكثر من 500 منشأة في المملكة
          </p>
        </div>
        
        {/* Simple Brand Grid (Using Text/Placeholders for simplicity in this demo) */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center gap-2 group cursor-default">
              {/* Fallback visual for logo */}
              <div className={`text-xl md:text-2xl font-bold ${brand.color} group-hover:scale-110 transition-transform`}>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



