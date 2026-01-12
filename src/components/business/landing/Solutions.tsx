'use client';

import React from "react";
import { MessageCircle, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/business/ui/card";

export const Solutions = () => {
  return (
    <section className="py-20 bg-slate-50" id="products">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">حلول تناسب احتياجاتك</h2>
          <p className="text-slate-600 text-lg">اختر الطريقة المثالية للتواصل مع عملائك، سواء عبر الواتساب الموثق أو الرسائل النصية السريعة.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* WhatsApp Card */}
          <Card className="border-2 border-transparent hover:border-green-500/20 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <CardHeader className="relative pb-2">
              <div className="h-14 w-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:rotate-6 transition-transform">
                <MessageCircle className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">واتساب للأعمال API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <p className="text-slate-600 mb-4">
                تواصل بشكل رسمي وموثق. ارفع نسبة التفاعل مع عملائك عبر منصتهم المفضلة.
              </p>
              <ul className="space-y-3">
                {[
                  "شات بوت ذكي للرد الآلي",
                  "توثيق الحساب (العلامة الخضراء)",
                  "رسائل تسويقية لا محدودة",
                  "دعم الوسائط المتعددة (صور، فيديو، ملفات)"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6 relative">
              <Button className="w-full bg-slate-900 hover:bg-green-600 text-white transition-colors group-hover:shadow-lg">
                اكتشف حلول الواتساب
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* SMS Card */}
          <Card className="border-2 border-transparent hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            
            <CardHeader className="relative pb-2">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:-rotate-6 transition-transform">
                <MessageSquare className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">الرسائل النصية SMS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <p className="text-slate-600 mb-4">
                الحل الأسرع والأكثر ضماناً للوصول لجميع الهواتف. مثالي للإشعارات ورموز التحقق.
              </p>
              <ul className="space-y-3">
                {[
                  "رموز تحقق (OTP) فائقة السرعة",
                  "إشعارات الطلبات والشحنات",
                  "تغطية لجميع الشبكات المحلية والدولية",
                  "تقارير تسليم فورية ودقيقة"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6 relative">
              <Button className="w-full bg-slate-900 hover:bg-primary text-white transition-colors group-hover:shadow-lg">
                اكتشف خدمات SMS
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};


