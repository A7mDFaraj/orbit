'use client';

import React from "react";
import { Button } from "@/components/business/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/20 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              منصة معتمدة وموثوقة
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              تواصل مع عملائك <span className="text-primary">بذكاء</span>..
              <br />
              منصة رسائل وواتساب موثوقة للأعمال السعودية.
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              ارفع مبيعات متجرك واضمن وصول رموز التحقق (OTP) في ثوانٍ. ربط مباشر، معتمد من هيئة الاتصالات، وتجربة مجانية فورية.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 text-lg shadow-lg shadow-primary/25">
                ابدأ بـ 50 رسالة مجانية
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-slate-300 hover:bg-slate-50 text-slate-700">
                <MessageCircle className="ml-2 h-5 w-5" />
                تحدث مع المبيعات
              </Button>
            </div>

            <div className="pt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200" />
                ))}
              </div>
              <p>يثق بنا أكثر من 500+ شركة سعودية</p>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract Background Shapes for Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl transform rotate-3 scale-95" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="لوحة تحكم النظام" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating Notification Card */}
              <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 animate-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm">تم إرسال الحملة بنجاح</h4>
                    <p className="text-xs text-slate-500 mt-1">وصلت رسالتك إلى 10,000 عميل بنسبة فتح 98%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


