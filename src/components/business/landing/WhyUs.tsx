'use client';

import React from "react";
import { Headphones, Shield, CreditCard } from "lucide-react";

export const WhyUs = () => {
  const features = [
    {
      icon: <Headphones className="h-8 w-8 text-white" />,
      title: "دعم فني محلي",
      description: "فريق سعودي يرد عليك واتساب/هاتف على مدار الساعة لخدمتك.",
      color: "bg-primary",
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "أمان عالي",
      description: "بياناتك مشفرة ومحفوظة داخل السعودية (امتثال للأمن السيبراني).",
      color: "bg-green-600",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-white" />,
      title: "الدفع المرن",
      description: "تحويل بنكي، مدى، فيزا، أو آجل (للشركات الكبرى).",
      color: "bg-blue-600",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:translate-y-[-5px] transition-transform duration-300">
              <div className={`h-16 w-16 mx-auto ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


