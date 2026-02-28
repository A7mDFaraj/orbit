'use client';

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/business/ui/tabs";
import { ShoppingBag, Code2, Terminal, FileText, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const API_DOCS_PDF_URL = "https://drive.google.com/file/d/1xhdFti973PHqik0T5rGGDipm_30gq064/view?usp=drive_link";

export const PersonaTabs = () => {
  const { isRTL } = useLanguage();

  return (
    <section 
      className="py-20 bg-white" 
      id="developers"
      style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
    >
      <div className={`container mx-auto px-4 md:px-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{isRTL ? 'منصة مصممة للجميع' : 'A Platform Designed for Everyone'}</h2>
          <p className="text-slate-600">{isRTL ? 'سواء كنت تاجراً تبحث عن السهولة، أو مطوراً يبحث عن المرونة.' : 'Whether you are a merchant looking for simplicity, or a developer seeking flexibility.'}</p>
        </div>

        <Tabs defaultValue="merchants" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100 rounded-2xl mb-12">
            <TabsTrigger 
              value="merchants" 
              className="py-4 rounded-xl text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {isRTL ? 'للمتاجر والمسوقين' : 'For Merchants & Marketers'}
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="developers" 
              className="py-4 rounded-xl text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                {isRTL ? 'للمطورين والتقنيين' : 'For Developers & Techies'}
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
                <h3 className="text-3xl font-bold text-slate-900">{isRTL ? 'أطلق حملاتك بدون تعقيد' : 'Launch Campaigns Without Complexity'}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {isRTL ? 'لا تحتاج لخبرة تقنية. اربط متجرك في سلة أو زد بضغطة زر واحدة، وابدأ إرسال حملاتك التسويقية لآلاف العملاء فوراً.' : 'No technical experience required. Connect your store in Salla or Zid with one click, and start sending your marketing campaigns to thousands of customers immediately.'}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">1</span>
                    <span className="font-medium text-slate-800">{isRTL ? 'استيراد جهات الاتصال تلقائياً' : 'Automatically Import Contacts'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">2</span>
                    <span className="font-medium text-slate-800">{isRTL ? 'قوالب رسائل جاهزة ومعتمدة' : 'Ready & Approved Message Templates'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</span>
                    <span className="font-medium text-slate-800">{isRTL ? 'تقارير دقيقة للأداء (الفتح، النقر)' : 'Accurate Performance Reports (Opens, Clicks)'}</span>
                  </li>
                </ul>
                <Button 
                  className="mt-4 group gap-2 px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-2xl bg-primary hover:bg-primary/90 text-white border-0" 
                  size="lg"
                >
                  {isRTL ? 'ابدأ حملتك الأولى الآن' : 'Start Your First Campaign Now'}
                  {isRTL ? (
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="developers" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 font-mono text-sm relative overflow-hidden text-left" dir="ltr">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-slate-400 mb-2">{`// Send SMS Example`}</p>
                <p className="mb-1"><span className="text-purple-400">await</span> orbit.send({`{`}</p>
                <p className="pl-4"><span className="text-blue-400">to</span>: <span className="text-green-400">&quot;96650xxxxxxx&quot;</span>,</p>
                <p className="pl-4"><span className="text-blue-400">body</span>: <span className="text-green-400">&quot;Your OTP is 1234&quot;</span>,</p>
                <p className="pl-4"><span className="text-blue-400">sender</span>: <span className="text-green-400">&quot;MyStore&quot;</span></p>
                <p className="mb-1">{`}`});</p>
                <p className="mt-2 text-green-500">{`// Result: Message Sent ✅`}</p>
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  <Terminal className="h-4 w-4" />
                  {isRTL ? 'صديق للمطورين' : 'Developer Friendly'}
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{isRTL ? 'API قوي ومرن' : 'Powerful & Flexible API'}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {isRTL ? 'REST API مرن، توثيق كامل (Documentation)، ودعم فني من مطور لمطور. انسخ الكود وابدأ الإرسال في 5 دقائق.' : 'REST API is flexible, features complete documentation, and offers developer-to-developer technical support. Copy the code and start sending in 5 minutes.'}
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
                <h4 className="text-xl font-bold text-[#7A1E2E] mb-4">{isRTL ? 'جاهز للربط مع أدواتك المفضلة' : 'Ready to Connect with Your Favorite Tools'}</h4>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">{isRTL ? 'دفترة' : 'Daftra'}</span>
                  <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">{isRTL ? 'سلة' : 'Salla'}</span>
                  <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">{isRTL ? 'نظام نور' : 'Noor'}</span>
                  <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">{isRTL ? 'إتقان' : 'Itqan'}</span>
                </div>
                <Button
                  size="lg"
                  className="gap-2.5 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-0"
                  asChild
                >
                  <a
                    href={API_DOCS_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5"
                  >
                    <FileText className={`h-5 w-5 shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} aria-hidden />
                    {isRTL ? 'تصفح ملفات الـ API' : 'Browse API Docs'}
                    <ExternalLink className={`h-4 w-4 shrink-0 opacity-90 ${isRTL ? 'mr-2' : 'ml-2'}`} aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};



