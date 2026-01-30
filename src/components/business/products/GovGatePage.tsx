'use client';

import React from "react";
import { Building2, FileCheck, Lock, Network } from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

export const GovGatePage = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-32 md:pt-40 pb-16 min-h-screen bg-[#E8DCCB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7A1E2E] mb-6">
            {t.products.govgate.title}
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {t.products.govgate.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white text-lg px-8 py-6 h-auto">
              {t.products.govgate.contactUs}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-[#7A1E2E]/10 p-3 rounded-lg h-fit">
                <Building2 className="h-8 w-8 text-[#7A1E2E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.govgate.directLink.title}</h3>
                <p className="text-slate-600">
                  {t.products.govgate.directLink.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#7A1E2E]/10 p-3 rounded-lg h-fit">
                <FileCheck className="h-8 w-8 text-[#7A1E2E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.govgate.contracts.title}</h3>
                <p className="text-slate-600">
                  {t.products.govgate.contracts.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#7A1E2E]/10 p-3 rounded-lg h-fit">
                <Lock className="h-8 w-8 text-[#7A1E2E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t.products.govgate.security.title}</h3>
                <p className="text-slate-600">
                  {t.products.govgate.security.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#7A1E2E]/10">
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-[#7A1E2E]">{t.products.govgate.infrastructure.title}</h4>
              <p className="text-sm text-slate-500 mt-2">{t.products.govgate.infrastructure.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
