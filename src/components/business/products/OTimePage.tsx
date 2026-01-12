'use client';

import React from "react";
import { Clock, Calendar, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/business/ui/button";

export const OTimePage = () => {
  return (
    <div className="pt-32 md:pt-40 pb-16 min-h-screen bg-[#E8DCCB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7A1E2E] mb-6">
            O-Time برنامج الموارد البشرية
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
            الحل المتكامل لإدارة الموارد البشرية. تتبع الحضور، إدارة الرواتب، وتنظيم الإجازات في منصة واحدة سهلة الاستخدام.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white text-lg px-8 py-6 h-auto">
              جرب O-Time
            </Button>
            <Button variant="outline" className="border-[#7A1E2E] text-[#7A1E2E] hover:bg-[#7A1E2E]/10 text-lg px-8 py-6 h-auto">
              شاهد العرض التجريبي
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Clock className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">تتبع الحضور الذكي</h3>
            <p className="text-slate-600">
              تسجيل دقيق للحضور والانصراف عبر الجوال أو البصمة مع تحديد الموقع الجغرافي.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Briefcase className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">إدارة الرواتب</h3>
            <p className="text-slate-600">
              حساب تلقائي للرواتب والبدلات والخصومات متوافق مع نظام العمل السعودي.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#7A1E2E]/10 text-center">
            <Calendar className="h-16 w-16 text-[#7A1E2E] mx-auto mb-6 opacity-80" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">إدارة الإجازات</h3>
            <p className="text-slate-600">
              نظام مرن لتقديم واعتماد طلبات الإجازات والمغادرات بكل سهولة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
