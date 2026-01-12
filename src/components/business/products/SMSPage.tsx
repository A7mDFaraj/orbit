'use client';

import React, { useState } from "react";
import { 
  Rocket, 
  Headphones, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Code2, 
  Smartphone,
  MessageSquare,
  ArrowLeft,
  Store,
  Globe,
  Calendar,
  Handshake,
  Star,
  ShoppingBag,
  Building2,
  Truck,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { Input } from "@/components/business/ui/input";

export const SMSPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const heroTabs = [
    {
      id: "retail",
      title: "حول السلات المتروكة إلى مبيعات فورية",
      description: "ارفع مبيعات متجرك بنسبة 20% عبر استهداف العملاء بعروض حصرية وتذكيرات ذكية تصلهم أينما كانوا.",
      cta: "جرب حملة تسويقية مجاناً",
      icon: ShoppingBag,
      label: "متاجر إلكترونية",
      message: "أهلاً محمد 👋، نسيت عطورك في السلة! أكمل طلبك الآن واستخدم كود (Welcome10) لخصم إضافي 🛒.",
      sender: "Store",
      color: "bg-pink-50",
      imgColor: "bg-pink-100"
    },
    {
      id: "finance",
      title: "أمان عالي ووصول موثوق في أجزاء من الثانية",
      description: "مسارات مباشرة (Direct Routes) تضمن وصول رموز التحقق (OTP) والإشعارات الحكومية والبنكية بسرعة فائقة وأمان سيبراني كامل.",
      cta: "تواصل مع فريق المؤسسات",
      icon: Building2,
      label: "مالية وحكومي",
      message: "عميلنا العزيز، رمز التحقق للدخول هو: 5921. لا تشارك الرمز مع أحد لأمان حسابك البنكي 🔒.",
      sender: "Bank",
      color: "bg-blue-50",
      imgColor: "bg-blue-100"
    },
    {
      id: "logistics",
      title: "عملاؤك ينتظرون شحناتهم؟ طمئنهم برسالة",
      description: "قلل ضغط الاتصالات على خدمة العملاء من خلال إشعارات آلية بحالة الشحنة وموقع المندوب خطوة بخطوة.",
      cta: "ابدأ الربط البرمجي (API)",
      icon: Truck,
      label: "نقل ولوجستيك",
      message: "مرحباً سارة، مندوبنا (خالد) في طريقه إليك لتسليم شحنتك رقم #9920. تتبعي الموقع من هنا: bit.ly/track 🚚",
      sender: "Delivery",
      color: "bg-orange-50",
      imgColor: "bg-orange-100"
    },
    {
      id: "health",
      title: "ذكّر مرضاك بمواعيدهم وقلل نسبة الغياب",
      description: "نظام جدولة آلي يرسل تذكيرات المواعيد ونتائج التحاليل للمراجعين، لضمان سير عمل العيادة بكفاءة.",
      cta: "جرب نظام التذكير الآلي",
      icon: Stethoscope,
      label: "صحة وخدمات",
      message: "عزيزي المراجع، نذكرك بموعدك غداً في (عيادات النخبة) الساعة 4:00 عصراً. لتأكيد الحضور أجب بـ (نعم) 📅.",
      sender: "Clinic",
      color: "bg-green-50",
      imgColor: "bg-green-100"
    }
  ];

  const packages = [
    { messages: 1000, price: 100, perMsg: 10.0, feature: "مساعدة في التفعيل", description: "للمتاجر الناشئة" },
    { messages: 3000, price: 310, perMsg: 10.3, feature: "مساعدة في التفعيل", description: "للبداية القوية" },
    { messages: 5000, price: 489, perMsg: 9.8, feature: "مساعدة في التفعيل", description: "للمتاجر المتوسطة" },
    { messages: 10000, price: 893, perMsg: 8.9, feature: "دعم كامل واعتماد الاسم", description: "الأكثر طلباً ⭐", featured: true },
    { messages: 20000, price: 1610, perMsg: 8.0, feature: "✨ اسم مرسل مجاني", description: "للمحترفين" },
    { messages: 50000, price: 3738, perMsg: 7.5, feature: "✨ اسم مرسل مجاني", description: "للشركات الكبرى" },
    { messages: 100000, price: 6900, perMsg: 6.9, feature: "🔥 اسمين مجاناً", description: "للمؤسسات الضخمة" },
  ];

  return (
    <div className="font-sans" dir="rtl">
      
      {/* 1. Tabbed Hero Section */}
      <section className={`pt-32 pb-8 md:pt-40 md:pb-20 overflow-hidden transition-colors duration-500 ${heroTabs[activeTab].color} min-h-[90vh] md:min-h-0 flex flex-col justify-center`}>
        <div className="container mx-auto px-4 md:px-6 flex flex-col h-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center flex-1">
            {/* Right Content */}
            <div className="space-y-4 md:space-y-8 max-w-2xl animate-in slide-in-from-right-8 duration-500 fade-in key={activeTab} text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-xs md:text-sm font-medium text-slate-600 mx-auto lg:mx-0">
                {React.createElement(heroTabs[activeTab].icon, { className: "w-3 h-3 md:w-4 md:h-4 text-[#7A1E2E]" })}
                <span>حلول {heroTabs[activeTab].label}</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-extrabold text-[#7A1E2E] leading-tight">
                {heroTabs[activeTab].title}
              </h1>
              <p className="text-sm md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {heroTabs[activeTab].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
                <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold rounded-xl shadow-lg shadow-[#7A1E2E]/20 w-full sm:w-auto">
                  {heroTabs[activeTab].cta}
                </Button>
                <div className="hidden sm:flex items-center gap-3 px-4 py-2">
                   <div className="flex -space-x-3 space-x-reverse">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                     ))}
                   </div>
                   <div className="text-sm">
                     <p className="font-bold text-slate-900">+5000</p>
                     <p className="text-slate-500 text-xs">عميل يثق بنا</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Left Content (Visual & Message Bubble) */}
            <div className="relative flex justify-center lg:justify-end animate-in slide-in-from-left-8 duration-700 fade-in key={activeTab + '-img'} z-10 mt-4 md:mt-0">
               {/* Abstract Background Blob */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl opacity-50 ${heroTabs[activeTab].imgColor}`}></div>

               <div className="relative w-full max-w-[280px] md:max-w-md">
                 {/* Main Image Placeholder - Representative of the sector */}
                 <div className="aspect-[4/5] md:aspect-[4/5] rounded-2xl md:rounded-[2rem] bg-slate-900/5 backdrop-blur-sm border border-white/20 shadow-xl md:shadow-2xl overflow-hidden relative group">
                    <div className={`absolute inset-0 opacity-20 ${heroTabs[activeTab].imgColor}`}></div>
                    
                    {/* Floating SMS Bubble */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[90%] transform transition-transform duration-500 hover:scale-105">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-white/50">
                        <div className="flex items-center justify-between mb-3 md:mb-4 pb-3 md:pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7A1E2E] flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-md">
                              {heroTabs[activeTab].sender.charAt(0)}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-slate-900 text-sm md:text-base">{heroTabs[activeTab].sender}</p>
                              <p className="text-[10px] md:text-xs text-slate-400">الآن</p>
                            </div>
                          </div>
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        </div>
                        <p className="text-slate-800 font-medium leading-relaxed text-sm md:text-lg text-right">
                          {heroTabs[activeTab].message}
                        </p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 md:mt-20">
            <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 md:gap-4 justify-start md:justify-center px-2 md:px-0 scrollbar-hide">
              {heroTabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`
                      flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 font-bold text-xs md:text-base whitespace-nowrap shrink-0
                      ${activeTab === index 
                        ? "bg-[#7A1E2E] text-white shadow-md md:shadow-lg shadow-[#7A1E2E]/20 scale-100 md:scale-105" 
                        : "bg-white/60 md:bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 md:border-transparent"
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === index ? "text-white" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="py-10 bg-[#F9FAFB] border-y border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">تقنية معتمدة وموثوقة من قبل قادة الصناعة</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Globe className="w-5 h-5" /> هيئة الاتصالات</span>
            <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Store className="w-5 h-5" /> سلة</span>
            <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><Store className="w-5 h-5" /> زد</span>
            <span className="text-xl font-bold text-slate-800 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> الأمن السيبراني</span>
            <span className="text-xl font-bold text-slate-800 italic">VISA</span>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7A1E2E] mb-4">لماذا يختارنا أصحاب المتاجر الذكية؟</h2>
            <p className="text-slate-500">حلول مصممة خصيصاً للتجارة الإلكترونية والشركات الناشئة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#7A1E2E]/10 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-[#7A1E2E]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">وصول فوري (Zero Latency)</h3>
              <p className="text-slate-600 leading-relaxed">
                مساراتنا المحلية المباشرة تضمن وصول رموز التحقق (OTP) في أقل من 3 ثوانٍ. لا تجعل عميلك ينتظر.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#7A1E2E]/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#7A1E2E]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">اسم مرسل خاص بك</h3>
              <p className="text-slate-600 leading-relaxed">
                تخلص من الأرقام العشوائية. نساعدك في اعتماد اسم متجرك (Sender ID) لدى هيئة الاتصالات مجاناً.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#7A1E2E]/10 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7 text-[#7A1E2E]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">دعم فني سريع</h3>
              <p className="text-slate-600 leading-relaxed">
                لا تضيع وقتك في الانتظار. فريقنا التقني جاهز لمساعدتك في الربط وحل المشاكل على مدار الساعة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Special Offer (The Hook) */}
      <section className="py-20 bg-gradient-to-r from-[#7A1E2E] to-[#5a1622] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-6 border border-white/20">
            ✨ عرض المؤسسين (لفترة محدودة)
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            اشحن أي باقة اليوم واحصل على <span className="text-[#E8DCCB] underline decoration-wavy decoration-2 underline-offset-8">20% رصيد إضافي</span> مجاناً
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button className="bg-white text-[#7A1E2E] hover:bg-[#E8DCCB] h-14 px-10 text-lg font-bold rounded-xl shadow-2xl shadow-black/20 transform hover:scale-105 transition-all">
              اشحن رصيدك وضاعف الرسائل
            </Button>
            <p className="text-white/60 text-sm">العرض ساري لأول 50 مشترك فقط 🔥</p>
          </div>
        </div>
      </section>

      {/* 5. Use Cases */}
      <section className="py-24 bg-[#E8DCCB]/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#7A1E2E] mb-8">حلول متكاملة لكل احتياجاتك</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#7A1E2E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">رسائل التحقق (OTP)</h3>
                    <p className="text-slate-600">دخول آمن وسريع لعملائك. معدل وصول 99.9% في أقل من 5 ثوانٍ.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#7A1E2E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">إشعارات حالة الطلب</h3>
                    <p className="text-slate-600">
                      "تم استلام طلبك"، "تم الشحن"، "وصل المندوب". اربطها تلقائياً مع متجرك في سلة أو زد.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#7A1E2E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">الحملات التسويقية</h3>
                    <p className="text-slate-600">
                      استهدف قاعدة عملائك بعروض خاصة بمعدل فتح رسائل يتجاوز 98% مقارنة بالبريد الإلكتروني.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#7A1E2E]/10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">سجل الإرسال المباشر</h4>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                     متصل الآن
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center w-full gap-8 mb-1">
                        <span className="text-xs font-bold text-slate-700">96650xxxxxxx</span>
                        <span className="text-[10px] text-slate-400">الآن</span>
                      </div>
                      <p className="text-xs text-slate-500">تم استلام طلبك رقم #8821 بنجاح وسيتم تجهيزه...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing - Grid of Cards */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          
          {/* Header & Global Features */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#7A1E2E] mb-4">
              اختر الباقة التي تناسبك، واضمن راحة بالك
            </h2>
            <p className="text-slate-500 text-lg mb-8">
              أسعار شاملة الضريبة، بدون رسوم خفية، ومعك خطوة بخطوة حتى الإرسال.
            </p>

            {/* Benefits Bar */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 inline-flex mx-auto">
              <div className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                <div className="bg-[#7A1E2E]/10 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-[#7A1E2E]" />
                </div>
                <span><span className="font-bold">صلاحية سنة كاملة:</span> رصيدك متاح لمدة 365 يوم</span>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-200"></div>
              <div className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                <div className="bg-[#7A1E2E]/10 p-2 rounded-full">
                  <Handshake className="w-5 h-5 text-[#7A1E2E]" />
                </div>
                <span><span className="font-bold">دعم تفعيل الاسم:</span> نساعدك في اعتماد اسم المرسل</span>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-200"></div>
              <div className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                <div className="bg-[#7A1E2E]/10 p-2 rounded-full">
                  <Zap className="w-5 h-5 text-[#7A1E2E]" />
                </div>
                <span><span className="font-bold">تفعيل فوري:</span> اشحن وابدأ الإرسال مباشرة</span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`
                  relative flex flex-col p-6 rounded-2xl transition-all duration-300
                  ${pkg.featured 
                    ? "border-2 border-[#7A1E2E] bg-white shadow-xl scale-105 z-10" 
                    : "border border-slate-200 bg-white hover:border-[#7A1E2E]/30 hover:shadow-lg"
                  }
                `}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#7A1E2E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md whitespace-nowrap">
                    الأكثر طلباً
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{pkg.messages.toLocaleString()} رسالة</h3>
                  <p className="text-sm text-slate-500 mt-1">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#7A1E2E]">{pkg.price.toLocaleString()}</span>
                    <span className="text-slate-500 text-sm">ريال</span>
                  </div>
                  <p className={`text-sm font-medium mt-1 ${pkg.featured ? "text-green-600" : "text-slate-500"}`}>
                    {pkg.perMsg} هللة / رسالة
                  </p>
                </div>

                <div className={`
                  mt-auto bg-slate-50 rounded-xl p-3 mb-6 text-center border
                  ${pkg.featured ? "bg-[#7A1E2E]/5 border-[#7A1E2E]/10" : "border-transparent"}
                `}>
                  <p className="text-sm text-slate-700 font-medium">{pkg.feature}</p>
                </div>

                <Button 
                  className={`w-full font-bold ${pkg.featured ? "bg-[#7A1E2E] hover:bg-[#601824] text-white" : "bg-transparent border border-[#7A1E2E] text-[#7A1E2E] hover:bg-[#7A1E2E]/5"}`}
                >
                  {pkg.featured ? "اشحن الآن" : "اختر الباقة"}
                </Button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Developers */}
      <section className="py-20 bg-[#F9FAFB] border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-[#7A1E2E] bg-[#7A1E2E]/10 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <Code2 className="w-4 h-4" /> منطقة المطورين
              </div>
              <h2 className="text-3xl font-bold text-[#7A1E2E] mb-4">جاهز للربط مع أدواتك المفضلة</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                سواء كنت تستخدم منصة جاهزة أو برمجة خاصة، لدينا (Plugins) و (API) جاهز بتوثيق كامل يدعم جميع لغات البرمجة.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                {/* Platform Badges */}
                <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">Salla</span>
                <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">Zid</span>
                <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">WooCommerce</span>
                <span className="bg-white border px-3 py-1 rounded text-sm font-bold text-slate-600">Magento</span>
              </div>

              <a href="#" className="flex items-center gap-2 text-[#7A1E2E] font-bold hover:underline">
                تصفح ملفات المطورين (API Docs) <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
            
            <div className="w-full max-w-md bg-[#1E293B] rounded-xl p-6 shadow-2xl overflow-hidden font-mono text-xs text-blue-300">
              <div className="flex gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-slate-400 mb-2">// Send SMS Example</p>
              <p className="mb-1"><span className="text-purple-400">await</span> orbit.send({`{`}</p>
              <p className="pl-4"><span className="text-blue-400">to</span>: <span className="text-green-400">"96650xxxxxxx"</span>,</p>
              <p className="pl-4"><span className="text-blue-400">body</span>: <span className="text-green-400">"Your OTP is 1234"</span>,</p>
              <p className="pl-4"><span className="text-blue-400">sender</span>: <span className="text-green-400">"MyStore"</span></p>
              <p className="mb-1">{`}`});</p>
              <p className="mt-2 text-green-500">// Result: Message Sent ✅</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Footer */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <MessageSquare className="w-16 h-16 text-[#7A1E2E] mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl font-bold text-[#7A1E2E] mb-6">لا تترك عميلك ينتظر الكود..</h2>
          <Button size="lg" className="bg-[#7A1E2E] hover:bg-[#601824] text-white text-lg px-10 h-16 rounded-xl shadow-xl shadow-[#7A1E2E]/20">
            أنشئ حسابك وابدأ بـ 50 رسالة مجانية
          </Button>
          <p className="mt-4 text-slate-400 text-sm">بدون بطاقة ائتمان - تفعيل فوري للحساب</p>
        </div>
      </section>

    </div>
  );
};
