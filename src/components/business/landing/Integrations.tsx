'use client';

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Integrations = () => {
  const { isRTL } = useLanguage();
    const integrations = [
        { name: "سلة", icon: "/1/salla.svg" },
        { name: "دفترة", icon: "/1/daftra.png" },
        { name: "نور", icon: "/1/noor.png" },
        { name: "اتقان", icon: "/1/etqan.jpeg" },
        { name: "حضوري", icon: "/1/huddari.png" },
    ];

  return (
    <section 
      className="py-16 bg-slate-50 border-t border-slate-200"
      style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
    >
      <div className="container mx-auto px-4 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {isRTL ? 'نعمل مع أدواتك المفضلة' : 'We Work with Your Favorite Tools'}
        </h3>
        <p className="text-slate-500 mb-10">
          {isRTL ? 'لن تضطر لتغيير نظام عملك الحالي، نحن نندمج معه بسهولة.' : 'You won\'t have to change your current workflow; we integrate with it seamlessly.'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
            {integrations.map((item) => (
                <div key={item.name} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
                    {item.icon.startsWith('/') ? (
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="h-16 w-16 object-contain group-hover:scale-110 transition-transform"
                        />
                    ) : (
                        <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {item.icon.substring(0, 2)}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};



