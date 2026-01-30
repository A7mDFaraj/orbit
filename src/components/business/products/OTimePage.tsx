'use client';

import React from "react";
import { Clock, Calendar, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

export const OTimePage = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-32 md:pt-40 pb-16 min-h-screen bg-[#E8DCCB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7A1E2E] mb-6">
            {t.products.otime.title}
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {t.products.otime.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white text-lg px-8 py-6 h-auto">
              {t.products.otime.tryIt}
            </Button>
            <Button variant="outline" className="border-[#7A1E2E] text-[#7A1E2E] hover:bg-[#7A1E2E]/10 text-lg px-8 py-6 h-auto">
              {t.products.otime.watchDemo}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Clock className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.products.otime.attendance.title}</h3>
            <p className="text-slate-600">
              {t.products.otime.attendance.description}
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Briefcase className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.products.otime.payroll.title}</h3>
            <p className="text-slate-600">
              {t.products.otime.payroll.description}
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Calendar className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t.products.otime.leaves.title}</h3>
            <p className="text-slate-600">
              {t.products.otime.leaves.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
