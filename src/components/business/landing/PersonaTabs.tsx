'use client';

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/business/ui/tabs";
import { ShoppingBag, Code2, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/business/ui/button";

export const PersonaTabs = () => {
  return (
    <section className="py-20 bg-white" id="developers">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">منصة مصممة للجميع</h2>
          <p className="text-slate-600">سواء كنت تاجراً تبحث عن السهولة، أو مطوراً يبحث عن المرونة.</p>
        </div>

        <Tabs defaultValue="merchants" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100 rounded-2xl mb-12">
            <TabsTrigger 
              value="merchants" 
              className="py-4 rounded-xl text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                للمتاجر والمسوقين
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="developers" 
              className="py-4 rounded-xl text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                للمطورين والتقنيين
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="merchants" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                 <div className="absolute inset-0 bg-primary/10 transform rotate-2 rounded-3xl" />
                 <img 
                    src="https://images.unsplash.com/photo-1758611971897-baffb061fd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                    alt="Merchant using phone"
                    className="relative rounded-3xl shadow-xl border-4 border-white"
                 />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h3 className="text-3xl font-bold text-slate-900">أطلق حملاتك بدون تعقيد</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  لا تحتاج لخبرة تقنية. اربط متجرك في سلة أو زد بضغطة زر واحدة، وابدأ إرسال حملاتك التسويقية لآلاف العملاء فوراً.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">1</span>
                    <span className="font-medium text-slate-800">استيراد جهات الاتصال تلقائياً</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">2</span>
                    <span className="font-medium text-slate-800">قوالب رسائل جاهزة ومعتمدة</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</span>
                    <span className="font-medium text-slate-800">تقارير دقيقة للأداء (الفتح، النقر)</span>
                  </li>
                </ul>
                <Button className="mt-4" size="lg">ابدا حملتك الأولى الآن</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="developers" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
             <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 font-mono text-sm relative overflow-hidden text-left" dir="ltr">
                 <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-auto text-slate-400 text-xs">send-sms.js</span>
                 </div>
                 <code className="text-blue-300">
                    <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> fetch(<span className="text-green-300">'https://api.platform.sa/v1/send'</span>, {'{'}<br/>
                    &nbsp;&nbsp;method: <span className="text-green-300">'POST'</span>,<br/>
                    &nbsp;&nbsp;headers: {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">'Authorization'</span>: <span className="text-green-300">'Bearer YOUR_API_KEY'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">'Content-Type'</span>: <span className="text-green-300">'application/json'</span><br/>
                    &nbsp;&nbsp;{'}'},<br/>
                    &nbsp;&nbsp;body: JSON.stringify({'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;to: <span className="text-green-300">'+966500000000'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;message: <span className="text-green-300">'Hello from API!'</span><br/>
                    &nbsp;&nbsp;{'}'})<br/>
                    {'}'});
                 </code>
              </div>
              
              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  <Terminal className="h-4 w-4" />
                  Developer Friendly
                </div>
                <h3 className="text-3xl font-bold text-slate-900">API قوي ومرن</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  REST API مرن، توثيق كامل (Documentation)، ودعم فني من مطور لمطور. انسخ الكود وابدأ الإرسال في 5 دقائق.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h5 className="font-bold text-slate-900 mb-1">99.99%</h5>
                        <p className="text-sm text-slate-500">Uptime SLA</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h5 className="font-bold text-slate-900 mb-1">50ms</h5>
                        <p className="text-sm text-slate-500">Latency</p>
                    </div>
                </div>
                <Button variant="outline" size="lg" className="mt-4 gap-2">
                    تصفح ملفات الـ API
                    <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};



