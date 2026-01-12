'use client';

import React from "react";

export const Integrations = () => {
    const integrations = [
        { name: "سلة", icon: "Salla" },
        { name: "زد", icon: "Zid" },
        { name: "WooCommerce", icon: "Woo" },
        { name: "Excel", icon: "XLS" },
        { name: "Sheets", icon: "Google" },
        { name: "Zapier", icon: "Zapier" },
    ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">نعمل مع أدواتك المفضلة</h3>
        <p className="text-slate-500 mb-10">لن تضطر لتغيير نظام عملك الحالي، نحن نندمج معه بسهولة.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((item) => (
                <div key={item.name} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3 text-slate-600 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {/* Placeholder for actual logos */}
                        {item.icon.substring(0, 2)}
                    </div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};



