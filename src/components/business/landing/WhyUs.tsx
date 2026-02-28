'use client';

import React from "react";
import { Headphones, Shield, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhyUs = () => {
  const { isRTL } = useLanguage();
  const features = [
    {
      icon: <Headphones className="h-8 w-8 text-white" />,
      titleEn: "Local Support",
      titleAr: "دعم فني محلي",
      descriptionEn: "A Saudi team answering you via WhatsApp/phone 24/7 to serve you.",
      descriptionAr: "فريق سعودي يرد عليك واتساب/هاتف على مدار الساعة لخدمتك.",
      color: "bg-primary",
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      titleEn: "High Security",
      titleAr: "أمان عالي",
      descriptionEn: "Your data is encrypted and stored in Saudi Arabia (Compliance with NCA).",
      descriptionAr: "بياناتك مشفرة ومحفوظة داخل السعودية (امتثال للأمن السيبراني).",
      color: "bg-green-600",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-white" />,
      titleEn: "Flexible Payment",
      titleAr: "الدفع المرن",
      descriptionEn: "Bank transfer, Mada, Visa, or Deferred (for large companies).",
      descriptionAr: "تحويل بنكي، مدى، فيزا، أو آجل (للشركات الكبرى).",
      color: "bg-blue-600",
    },
  ];

  return (
    <section 
      className="py-20 bg-slate-50"
      style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
              <div className={`h-16 w-16 mx-auto ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isRTL ? feature.titleAr : feature.titleEn}</h3>
              <p className="text-slate-600 leading-relaxed">{isRTL ? feature.descriptionAr : feature.descriptionEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


