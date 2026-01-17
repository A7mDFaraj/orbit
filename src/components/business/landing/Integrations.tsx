'use client';

import React from "react";
import Image from "next/image";

export const Integrations = () => {
    const integrations = [
        { name: "سلة", icon: "/1/salla.svg" },
        { name: "زد", icon: "/1/zid.svg" },
        { name: "WooCommerce", icon: "/1/WooCommerce.svg" },
        { name: "Excel", icon: "/1/Excel.svg" },
        { name: "Sheets", icon: "/1/sheet.svg" },
        { name: "Zapier", icon: "/1/Zapier_logo.svg" },
    ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">نعمل مع أدواتك المفضلة</h3>
        <p className="text-slate-500 mb-10">لن تضطر لتغيير نظام عملك الحالي، نحن نندمج معه بسهولة.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((item) => (
                <div key={item.name} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="h-12 w-12 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};



