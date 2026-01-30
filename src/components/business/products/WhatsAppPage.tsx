'use client';

import React from "react";
import {
  MessageCircle,
  BarChart,
  Smartphone,
  Users,
} from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

export const WhatsAppPage = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-32 md:pt-40 pb-16 min-h-screen bg-[#E8DCCB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7A1E2E] mb-6">
            {t.products.whatsapp.title}
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {t.products.whatsapp.description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white text-lg px-8 py-6 h-auto">
              {t.products.whatsapp.getApi}
            </Button>
            <Button
              variant="outline"
              className="border-[#7A1E2E] text-[#7A1E2E] hover:bg-[#7A1E2E]/10 text-lg px-8 py-6 h-auto"
            >
              {t.products.whatsapp.learnMore}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#7A1E2E]/10 flex gap-6 items-start">
            <div className="bg-green-100 p-4 rounded-xl">
              <MessageCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.products.whatsapp.interactiveConversations.title}
              </h3>
              <p className="text-slate-600">
                {t.products.whatsapp.interactiveConversations.description}
              </p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#7A1E2E]/10 flex gap-6 items-start">
            <div className="bg-blue-100 p-4 rounded-xl">
              <BarChart className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.products.whatsapp.analytics.title}
              </h3>
              <p className="text-slate-600">
                {t.products.whatsapp.analytics.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};