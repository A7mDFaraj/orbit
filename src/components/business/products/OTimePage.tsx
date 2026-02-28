import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users, Shield, Smartphone, Globe, Cloud, Lock, Languages, Zap,
  CheckCircle2, Calendar, DollarSign, Target, TrendingUp, 
  FileText, Briefcase, Award, Clock, Settings, ChevronLeft, ChevronRight,
  ArrowRight, Play, Download, Star, Building2, BarChart3, Sparkles,
  MessageCircle, Bell, FileSpreadsheet, GraduationCap, Server, Monitor,
  CheckSquare, CreditCard, MapPin, Mail, Phone, Video
} from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

// استخدام الصور من المجلد العام
const dashboardImg = "/otime/dashboardOtime.png";
const payrollImg = "/otime/payrollOtime.png";
const attendanceImg = "/otime/attendenceOtime.png";

export const OTimePage = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [currentModule, setCurrentModule] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Screenshots للنظام
  const screenshots = [
    {
      title: "لوحة التحكم - مركز القيادة",
      description: "نظرة شاملة على جميع عمليات الموارد البشرية في لوحة واحدة",
      image: dashboardImg
    },
    {
      title: "نظام الرواتب الذكي",
      description: "حساب وإصدار الرواتب تلقائياً مع التوافق الكامل مع نظام حماية الأجور",
      image: payrollImg
    },
    {
      title: "الحضور والانصراف",
      description: "تتبع دقيق لساعات العمل مع دعم البصمة والموقع الجغرافي",
      image: attendanceImg
    }
  ];

  // إعادة تعيين currentScreenshot إذا كان خارج النطاق
  React.useEffect(() => {
    if (currentScreenshot >= screenshots.length) {
      setCurrentScreenshot(0);
    }
  }, [currentScreenshot, screenshots.length]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentScreenshot(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
    }
    if (touchStart - touchEnd < -75) {
      setCurrentScreenshot(prev => (prev === 0 ? screenshots.length - 1 : prev - 1));
    }
  };

  const valueProps = [
    {
      icon: TrendingUp,
      title: "التميز التشغيلي",
      description: "توحيد عمليات الموارد البشرية وتقليل العمل اليدوي والأخطاء بنسبة تصل إلى 80%",
      color: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "قرارات مبنية على البيانات",
      description: "لوحات تحكم تعرض تحليلات فورية للرواتب، الحضور، والأداء لدعم اتخاذ القرار",
      color: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "أمان وسهولة",
      description: "نظام سحابي مشفر، متوافق مع كافة الأجهزة، ويدعم الامتثال للأنظمة المحلية",
      color: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  const modules = [
    {
      icon: Users,
      title: "إدارة الموظفين والملفات",
      description: "سجلات رقمية شاملة لدورة حياة الموظف الكاملة، إدارة العقود، الوثائق، والهيكل التنظيمي الديناميكي",
      color: "bg-gradient-to-br from-[#104E8B] to-[#0d3d6e]",
      features: ["ملفات رقمية شاملة", "إدارة العقود والوثائق", "الهيكل التنظيمي", "المسار المهني"]
    },
    {
      icon: DollarSign,
      title: "نظام الرواتب الذكي",
      description: "إعداد مسيرات الرواتب تلقائياً، حساب البدلات والخصومات، وإصدار قسائم الدفع بما يتوافق مع نظام حماية الأجور",
      color: "bg-gradient-to-br from-[#FFA502] to-[#e69302]",
      features: ["حساب آلي للرواتب", "نظام حماية الأجور", "قسائم الراتب", "تقارير مالية"]
    },
    {
      icon: Clock,
      title: "الحضور والانصراف",
      description: "تتبع دقيق لساعات العمل عبر الأجهزة البيومترية أو الموقع الجغرافي، مع إدارة سهلة للإجازات والمغادرات",
      color: "bg-gradient-to-br from-[#00BCD4] to-[#0097a7]",
      features: ["تتبع البصمة", "الموقع الجغرافي", "إدارة الإجازات", "نظام الورديات"]
    },
    {
      icon: Target,
      title: "إدارة الأداء والتقييم",
      description: "نظام KPIs متطور، تقييمات دورية، ومتابعة أهداف الموظفين لرفع الإنتاجية وتحقيق التميز",
      color: "bg-gradient-to-br from-[#104E8B] to-[#0d3d6e]",
      features: ["نظام KPIs", "تقييمات دورية", "متابعة الأهداف", "تقارير الأداء"]
    },
    {
      icon: Briefcase,
      title: "التوظيف والتهيئة",
      description: "إدارة دورة التوظيف الكاملة من نشر الوظائف، فرز السير الذاتية، وحتى تهيئة الموظف الجديد (Onboarding)",
      color: "bg-gradient-to-br from-[#FFA502] to-[#e69302]",
      features: ["نظام ATS", "نشر الوظائف", "إدارة المقابلات", "Onboarding"]
    },
    {
      icon: CreditCard,
      title: "الإدارة المالية والعهدة",
      description: "تتبع المصروفات، العهد العينية (Assets)، السلف والقروض، وإدارة ميزانية الموارد البشرية بدقة",
      color: "bg-gradient-to-br from-[#00BCD4] to-[#0097a7]",
      features: ["إدارة العهد", "السلف والقروض", "المصروفات", "الميزانية"]
    },
    {
      icon: Smartphone,
      title: "الخدمة الذاتية للموظف",
      description: "تطبيق وبوابة تتيح للموظف تقديم الطلبات (إجازات، خطابات، سلف) ومتابعتها دون الرجوع لموظف HR",
      color: "bg-gradient-to-br from-[#104E8B] to-[#0d3d6e]",
      features: ["بوابة الموظف", "تقديم الطلبات", "قسائم الراتب", "السجل الوظيفي"]
    },
    {
      icon: GraduationCap,
      title: "التدريب والتطوير",
      description: "جدولة الدورات التدريبية، تتبع سجلات التدريب، وإدارة الشهادات لضمان النمو المستمر للموظفين",
      color: "bg-gradient-to-br from-[#FFA502] to-[#e69302]",
      features: ["إدارة الدورات", "سجلات التدريب", "الشهادات", "خطط التطوير"]
    }
  ];

  const uxFeatures = [
    {
      icon: Bell,
      title: "تنبيهات فورية",
      description: "قوالب إشعارات جاهزة للرواتب، الإجازات، والقرارات الإدارية"
    },
    {
      icon: MessageCircle,
      title: "تواصل فعال",
      description: "نظام رسائل داخلي متكامل وتكامل مع Zoom للاجتماعات"
    },
    {
      icon: FileSpreadsheet,
      title: "تقارير بضغطة زر",
      description: "أكثر من 20 تقرير جاهز للتصدير (Excel/PDF) لدعم اتخاذ القرار"
    },
    {
      icon: Languages,
      title: "واجهة متعددة اللغات",
      description: "دعم كامل للعربية والإنجليزية مع إمكانية التبديل الفوري"
    }
  ];

  const technicalSpecs = [
    {
      category: "المنصات المدعومة",
      items: ["Windows", "macOS", "Android", "iOS", "Web Browsers"]
    },
    {
      category: "المتصفحات",
      items: ["Chrome", "Safari", "Firefox", "Edge", "Opera"]
    },
    {
      category: "الأمان",
      items: ["تشفير SSL/TLS", "مصادقة ثنائية (2FA)", "صلاحيات دقيقة", "نسخ احتياطي يومي"]
    },
    {
      category: "التكامل",
      items: ["Zoom", "Microsoft Teams", "البنوك السعودية", "أجهزة البصمة"]
    }
  ];

  const localFeatures = [
    "دعم التقويم الهجري والميلادي",
    "العطلات الرسمية السعودية",
    "نظام حماية الأجور (WPS)",
    "تكامل مع منصة قوى",
    "دعم الهويات الوطنية والإقامات",
    "إدارة التأشيرات والجوازات"
  ];

  const stats = [
    { value: "10,000+", label: "موظف يستخدم النظام" },
    { value: "500+", label: "شركة تثق في O-Time" },
    { value: "99.9%", label: "وقت التشغيل" },
    { value: "24/7", label: "دعم فني متواصل" }
  ];

  return (
    <div className="min-h-screen bg-white font-['IBM_Plex_Sans_Arabic']" data-page="otime" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-[#E8DCCB] via-white to-[#D4CEC0] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdBMUUyRSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* النص - اليمين */}
            <div className="text-right space-y-4 md:space-y-6">
              <Badge className="bg-gradient-to-r from-[#104E8B] to-[#0d3d6e] text-white border-none px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 ml-2 inline" />
                نظام الموارد البشرية السحابي المتكامل
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#161616] leading-tight">
                مركز قيادة متكامل
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#104E8B] to-[#00BCD4]">لإدارة الموارد البشرية</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#606161] leading-relaxed max-w-xl">
                من التوظيف إلى التقاعد، O-Time يمنحك السيطرة الكاملة على الرواتب، الحضور، الأداء، والتوظيف في منصة سحابية واحدة آمنة وقابلة للتوسع.
              </p>
              
              <div className="flex gap-4 flex-wrap">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#104E8B] to-[#0d3d6e] hover:from-[#0d3d6e] hover:to-[#0a2f56] text-white font-bold px-8 h-14 text-lg shadow-lg shadow-[#104E8B]/30"
                  onClick={() => window.open('https://wa.me/966920006900?text=%E2%80%8E%20%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A7%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20otime', '_blank')}
                >
                  احجز ديمو الآن
                  <Play className="w-5 h-5 mr-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#FFA502] text-[#FFA502] hover:bg-[#FFA502] hover:text-white font-bold px-8 h-14 text-lg"
                  onClick={() => window.open('https://otime.mobile.sa/register', '_blank')}
                >
                  جرب النظام مجاناً
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
              </div>
            </div>

            {/* صورة Dashboard - اليسار */}
            <div className="relative hidden md:block">
              <div className="relative">
                {/* Dashboard Mockup - Laptop */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-200 bg-white mb-6">
                  <div className="bg-gradient-to-r from-[#104E8B] to-[#00BCD4] p-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-white text-sm mr-2">مركز القيادة - O-Time</div>
                  </div>
                  <div className="p-6 bg-gray-50">
                    {/* محاكاة Dashboard */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">إجمالي الموظفين</div>
                          <div className="text-2xl font-bold text-blue-600">247</div>
                          <div className="text-xs text-green-500 mt-1">↑ 12 هذا الشهر</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">حاضر اليوم</div>
                          <div className="text-2xl font-bold text-green-600">234</div>
                          <div className="text-xs text-gray-500 mt-1">94.7%</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">في إجازة</div>
                          <div className="text-2xl font-bold text-orange-600">13</div>
                          <div className="text-xs text-gray-500 mt-1">5.3%</div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-bold text-gray-700">معدل الحضور - هذا الأسبوع</div>
                          <Badge className="bg-green-100 text-green-700 text-xs">ممتاز</Badge>
                        </div>
                        <div className="flex items-end gap-2 h-20">
                          {[85, 92, 88, 95, 90, 93, 91].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div 
                                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" 
                                style={{height: `${val}%`}}
                              ></div>
                              <div className="text-[10px] text-gray-400">
                                {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'][i]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                          <div className="text-xs text-purple-700 mb-1">طلبات معلقة</div>
                          <div className="text-xl font-bold text-purple-700">8</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200">
                          <div className="text-xs text-orange-700 mb-1">وظائف مفتوحة</div>
                          <div className="text-xl font-bold text-orange-700">5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Preview - متداخل */}
                <div className="absolute bottom-0 right-6 w-32 bg-gray-900 rounded-[1.5rem] shadow-2xl p-2 border-4 border-gray-800">
                  <div className="bg-white rounded-[1rem] overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-center">
                      <div className="text-white text-[10px] font-bold">O-Time</div>
                    </div>
                    <div className="p-2 space-y-2 bg-gray-50">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="text-[8px] text-gray-500">الحضور</div>
                        <div className="text-xs font-bold text-green-600">8:30 ص</div>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="text-[8px] text-gray-500">الإجازات</div>
                        <div className="text-xs font-bold text-blue-600">12 يوم</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* شارة التميز */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-xl border-4 border-indigo-100">
                  <Award className="w-12 h-12 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* لماذا O-Time */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <Badge className="bg-blue-100 text-blue-700 border-none px-4 py-2 text-sm mb-3 md:mb-4">
              لماذا O-Time؟
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#161616] mb-3 md:mb-4">
              القيمة الاستراتيجية التي تحتاجها
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              منصة سحابية متكاملة تحول إدارة الموارد البشرية من عملية روتينية إلى ميزة تنافسية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {valueProps.map((prop, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`${prop.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <prop.icon className={`w-8 h-8 ${prop.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#161616] mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* المميزات الرئيسية - 8 وحدات */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 border-none px-4 py-2 text-sm mb-3 md:mb-4">
              الوحدات الأساسية
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#161616] mb-3 md:mb-4">
              نظام شامل لكل احتياجاتك
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              من التوظيف إلى التقاعد - إدارة دورة حياة الموظف الكاملة في منصة واحدة متكاملة
            </p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                <div className={`${module.color} p-5 text-white`}>
                  <module.icon className="w-10 h-10 mb-3" />
                  <h3 className="text-lg font-bold leading-tight">{module.title}</h3>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    {module.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: Slider */}
          <div className="md:hidden relative">
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 pb-4 px-1">
              {modules.map((module, index) => (
                <div key={index} className="snap-center flex-shrink-0 w-[85%]">
                  <Card className="border-0 shadow-lg overflow-hidden h-full">
                    <div className={`${module.color} p-5 text-white`}>
                      <module.icon className="w-10 h-10 mb-3" />
                      <h3 className="text-lg font-bold leading-tight">{module.title}</h3>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {module.description}
                      </p>
                      <div className="space-y-2">
                        {module.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* نقاط التنقل للجوال */}
            <div className="flex justify-center gap-2 mt-4">
              {modules.map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-2 rounded-full bg-gray-300"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* تجربة المستخدم */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm mb-3 md:mb-4">
              UX/UI متقدم
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4">
              تجربة مستخدم لا تضاهى
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              واجهة بديهية مصممة بعناية لتوفير أفضل تجربة لجميع المستخدمين
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {uxFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* صورة توضيحية للتنبيهات */}
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">التنبيهات الأخيرة</h4>
                    <Badge className="bg-red-100 text-red-700">3 جديد</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: DollarSign, text: "تم إصدار مسير رواتب شهر يناير", time: "قبل ساعة", color: "green" },
                      { icon: Calendar, text: "طلب إجازة جديد من أحمد محمد", time: "قبل ساعتين", color: "blue" },
                      { icon: Users, text: "5 متقدمين جدد لوظيفة مدير تسويق", time: "قبل 3 ساعات", color: "orange" }
                    ].map((notif, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`bg-${notif.color}-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <notif.icon className={`w-5 h-5 text-${notif.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{notif.text}</div>
                          <div className="text-xs text-gray-500">{notif.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* لقطات من النظام */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#E8DCCB] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <Badge className="bg-[#FFA502]/10 text-[#FFA502] border-none px-4 py-2 text-sm mb-3 md:mb-4">
              جولة في النظام
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#161616] mb-3 md:mb-4">
              شاهد O-Time في العمل
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              لقطات حقيقية من داخل النظام توضح سهولة الاستخدام والقوة الشاملة
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Carousel */}
            <div className="relative">
              <div 
                className="overflow-hidden rounded-2xl shadow-2xl bg-white border-8 border-gray-200"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="bg-gradient-to-r from-[#104E8B] to-[#00BCD4] p-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-white text-sm mr-4 font-semibold">{screenshots[currentScreenshot].title}</div>
                </div>
                
                {/* محتوى Screenshot - الصور الحقيقية */}
                <div className="bg-white">
                  <ImageWithFallback 
                    src={screenshots[currentScreenshot].image} 
                    alt={screenshots[currentScreenshot].title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* أزرار التنقل */}
              <button
                onClick={() => setCurrentScreenshot(prev => (prev === 0 ? screenshots.length - 1 : prev - 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-[#00BCD4]/10 text-[#104E8B] rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentScreenshot(prev => (prev === screenshots.length - 1 ? 0 : prev + 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-[#00BCD4]/10 text-[#104E8B] rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* نقاط التنقل */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentScreenshot ? 'bg-[#104E8B] w-8' : 'bg-gray-300 w-2'
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            <div className="text-center mt-8 bg-[#00BCD4]/10 border-2 border-[#00BCD4]/30 rounded-xl p-4">
              <p className="text-sm text-[#161616]">
                💡 <strong>نصيحة:</strong> احجز عرضاً توضيحياً مباشراً لرؤية جميع المميزات والتفاعل مع النظام الحي
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* المواصفات التقنية والتكامل */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm mb-3 md:mb-4">
              <Server className="w-4 h-4 ml-2 inline" />
              المواصفات التقنية
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4">
              بنية تحتية قوية وآمنة
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              تقنية حديثة مع أعلى معايير الأمان والتوافق
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {technicalSpecs.map((spec, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    {index === 0 && <Monitor className="w-5 h-5" />}
                    {index === 1 && <Globe className="w-5 h-5" />}
                    {index === 2 && <Shield className="w-5 h-5" />}
                    {index === 3 && <Zap className="w-5 h-5" />}
                    {spec.category}
                  </h3>
                  <div className="space-y-2">
                    {spec.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* أنواع الصلاحيات */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">نظام صلاحيات متقدم</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { role: "Admin", desc: "صلاحيات كاملة", icon: Settings, color: "red" },
                    { role: "HR Manager", desc: "إدارة الموارد البشرية", icon: Users, color: "blue" },
                    { role: "Employee", desc: "الخدمة الذاتية", icon: Smartphone, color: "green" }
                  ].map((role, i) => (
                    <div key={i} className="bg-white/10 rounded-lg p-4 text-center">
                      <div className={`bg-${role.color}-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <role.icon className={`w-6 h-6 text-${role.color}-400`} />
                      </div>
                      <div className="font-bold text-white mb-1">{role.role}</div>
                      <div className="text-sm text-white/70">{role.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* التوافق المحلي */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="bg-white/20 text-white border-none px-4 py-2 text-sm mb-3 md:mb-4">
                <MapPin className="w-4 h-4 ml-2 inline" />
                مصمم للسوق السعودي
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4">
                متوافق 100% مع الأنظمة المحلية
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                دعم كامل للأنظمة واللوائح السعودية مع تحديثات مستمرة
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="text-white font-semibold">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">معتمد من الجهات الرسمية</h4>
              <p className="text-white/80">
                متوافق مع متطلبات وزارة الموارد البشرية والتنمية الاجتماعية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#104E8B] via-[#0d3d6e] to-[#0a2f56] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGQTUwMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-[#FFA502] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              هل أنت مستعد لنقل إدارة الموارد البشرية إلى مستوى جديد؟
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              انضم إلى الشركات التي تعتمد على O-Time لتحقيق الكفاءة والامتثال
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-[#FFA502] text-white hover:bg-[#e69302] font-bold px-10 h-14 text-lg shadow-2xl"
                onClick={() => window.open('https://otime.mobile.sa/register', '_blank')}
              >
                جرب النظام مجاناً
                <ArrowRight className="w-6 h-6 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-2 border-[#00BCD4] text-[#00BCD4] hover:bg-[#00BCD4] hover:text-white font-bold px-10 h-14 text-lg backdrop-blur-sm"
                onClick={() => window.open('https://wa.me/966920006900?text=%E2%80%8E%20%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A7%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9%20%D9%85%D9%86%D8%B5%D8%A9%20otime', '_blank')}
              >
                <Play className="w-6 h-6 ml-2" />
                احجز ديمو مباشر
              </Button>
            </div>

            {/* معلومات التواصل */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#FFA502]" />
                <span className="text-sm">920006900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FFA502]" />
                <span className="text-sm">info@corbit.sa</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#FFA502]" />
                <span className="text-sm">احجز ديمو</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};