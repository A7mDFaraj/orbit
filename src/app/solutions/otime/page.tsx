'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import OrbitSectionBackground from '@/components/OrbitSectionBackground';

export default function OTimePage() {
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    title: {
      en: 'OTime - Attendance & HR',
      ar: 'اوتايم OTime',
    },
    description: {
      en: 'A smart attendance and departure system that helps you manage work hours accurately, monitor employee compliance in real-time, and analyze data to support HR decisions efficiently.',
      ar: 'نظام حضور وانصراف ذكي يساعدك على إدارة أوقات العمل بدقة، مراقبة الالتزام الوظيفي لحظيًا، وتحليل البيانات لدعم قرارات الموارد البشرية بكفاءة',
    },
    features: [
      {
        en: 'Employee attendance and departure tracking',
        ar: 'تسجيل حضور وانصراف الموظفين',
        icon: '⏰',
      },
      {
        en: 'Compliance and work hours monitoring',
        ar: 'متابعة الالتزام وساعات العمل',
        icon: '📊',
      },
      {
        en: 'Real-time reports',
        ar: 'تقارير فورية',
        icon: '📈',
      },
      {
        en: 'Payroll calculation',
        ar: 'حساب الرواتب',
        icon: '💰',
      },
    ],
    benefits: [
      {
        en: 'Accurate work hours management',
        ar: 'إدارة دقيقة لأوقات العمل',
      },
      {
        en: 'Real-time compliance monitoring',
        ar: 'مراقبة الالتزام لحظيًا',
      },
      {
        en: 'Efficient HR decision support',
        ar: 'دعم قرارات الموارد البشرية بكفاءة',
      },
      {
        en: 'Integrated HR system',
        ar: 'نظام موارد بشرية متكامل',
      },
    ],
  };

  const otimePackages = [
    {
      name: isRTL ? 'الباقة الأساسية' : 'Basic Package',
      nameAr: 'الباقة الأساسية',
      price: null,
      period: isRTL ? 'اشتراك شهري' : 'Monthly Subscription',
      periodAr: 'اشتراك شهري',
      users: '6',
      employees: '300',
      storage: '30000 MB',
      features: [
        isRTL ? 'إشعارات عبر البريد الإلكتروني' : 'Email Notifications',
        isRTL ? 'إشعارات SMS' : 'SMS Notifications',
        isRTL ? 'دعم 7/24' : '24/7 Support',
        isRTL ? 'مدير حساب' : 'Account Manager',
      ],
    },
    {
      name: isRTL ? 'الباقة المتقدمة بلس - شهري' : 'Advanced Plus - Monthly',
      nameAr: 'الباقة المتقدمة بلس - الاشتراك الشهري',
      price: '1650',
      period: isRTL ? 'اشتراك شهري' : 'Monthly Subscription',
      periodAr: 'اشتراك شهري',
      users: '8',
      employees: '1000',
      storage: '3072 MB',
      features: [
        isRTL ? '8 مستخدمين اداريين للحساب' : '8 Administrative Users',
        isRTL ? '1,000 حساب موظف (بصمة)' : '1,000 Employee Accounts',
        isRTL ? 'مساحة تخزين تصل الى 3 قيقا' : 'Storage up to 3 GB',
        isRTL ? 'اشعارات بريد الكتروني' : 'Email Notifications',
        isRTL ? 'دعم فني (7/24)' : 'Technical Support (24/7)',
        isRTL ? 'مدير حساب للمساعدة' : 'Account Manager',
      ],
      highlighted: true,
    },
    {
      name: isRTL ? 'الباقة المتقدمة بلس - سنوي' : 'Advanced Plus - Annual',
      nameAr: 'الباقة المتقدمة بلس - الاشتراك السنوي',
      price: '16824',
      period: isRTL ? 'اشتراك سنوي' : 'Annual Subscription',
      periodAr: 'اشتراك سنوي',
      users: '8',
      employees: '1000',
      storage: '3072 MB',
      features: [
        isRTL ? '8 مستخدمين اداريين للحساب' : '8 Administrative Users',
        isRTL ? '1,000 حساب موظف (بصمة)' : '1,000 Employee Accounts',
        isRTL ? 'مساحة تخزين تصل الى 3 قيقا' : 'Storage up to 3 GB',
        isRTL ? 'اشعارات بريد الكتروني' : 'Email Notifications',
        isRTL ? 'دعم فني (7/24)' : 'Technical Support (24/7)',
        isRTL ? 'مدير حساب للمساعدة' : 'Account Manager',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-[#8a2a3d] to-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-6 uppercase tracking-tight"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.title.ar : content.title.en}
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl mb-8 max-w-3xl font-gotham text-white/90"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.description.ar : content.description.en}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href="/packages"
                className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-heading uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              >
                {isRTL ? 'عرض الباقات' : 'View Packages'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-heading mb-12 text-gray-900 dark:text-white text-center"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'المميزات' : 'Features'}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3
                    className="text-xl font-heading mb-4 text-gray-900 dark:text-white"
                    style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? feature.ar : feature.en}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-heading mb-12 text-gray-900 dark:text-white text-center"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'الفوائد' : 'Benefits'}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p
                    className="text-lg font-gotham text-gray-900 dark:text-white"
                    style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? benefit.ar : benefit.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OTime Packages Section */}
      <section className="py-24 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <OrbitSectionBackground alignment="both" density="low" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-center mb-16"
            >
              <h2
                className="text-3xl sm:text-5xl font-heading mb-4 text-gray-900 dark:text-white uppercase tracking-tight"
                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {isRTL ? 'باقات اشتراك OTime' : 'OTime Subscription Packages'}
              </h2>
              <div className="h-1 w-24 bg-primary mx-auto rounded-full mb-4" />
              <p
                className="text-lg text-gray-600 dark:text-gray-400 font-gotham max-w-2xl mx-auto"
                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {isRTL ? 'اختر الباقة المناسبة لحجم مؤسستك' : 'Choose the package that fits your organization size'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {otimePackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`relative group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    pkg.highlighted
                      ? 'border-primary shadow-xl scale-105 ring-4 ring-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary'
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-heading font-bold uppercase rounded-full shadow-lg">
                        <span className="text-lg">⭐</span>
                        {isRTL ? 'الأكثر طلبًا' : 'Most Popular'}
                      </span>
                    </div>
                  )}

                  <h3
                    className="text-2xl font-heading font-bold mb-6 text-gray-900 dark:text-white text-center pt-4"
                    style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? pkg.nameAr : pkg.name}
                  </h3>

                  {pkg.price && (
                    <div className="text-center mb-8 pb-8 border-b-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="text-5xl font-heading font-bold text-gray-900 dark:text-white">
                          {Number(pkg.price).toLocaleString('en-US')}
                        </div>
                        <div className="flex flex-col items-start">
                          <img 
                            src="/trustedby/Saudi_Riyal_Symbol.svg.png" 
                            alt="SAR" 
                            className="w-8 h-8 opacity-70"
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-gotham font-semibold">
                            {isRTL ? 'ر.س' : 'SAR'}
                          </span>
                        </div>
                      </div>
                      <div
                        className="text-sm text-gray-600 dark:text-gray-400 font-gotham font-semibold"
                        style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {isRTL ? pkg.periodAr : pkg.period}
                      </div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-gotham font-semibold mt-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {isRTL ? 'شامل الضريبة' : 'VAT Included'}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-gotham text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'المستخدمون' : 'Users'}
                      </span>
                      <span className="font-heading font-bold text-lg text-primary">{pkg.users}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-gotham text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'الموظفون' : 'Employees'}
                      </span>
                      <span className="font-heading font-bold text-lg text-primary">{pkg.employees}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-gotham text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'التخزين' : 'Storage'}
                      </span>
                      <span className="font-heading font-bold text-sm text-gray-900 dark:text-white">{pkg.storage}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-gotham text-gray-700 dark:text-gray-300 group/item">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold group-hover/item:bg-primary group-hover/item:text-white transition-all">
                          ✓
                        </span>
                        <span style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }} dir={isRTL ? 'rtl' : 'ltr'} className="flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/request-quote?package=otime-${index + 1}&name=${encodeURIComponent(isRTL ? pkg.nameAr : pkg.name)}${pkg.price ? `&price=${pkg.price}` : ''}`}
                    className="block w-full text-center px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-heading font-bold uppercase tracking-wider hover:from-primary/90 hover:to-primary transition-all text-sm shadow-lg hover:shadow-2xl transform hover:scale-105"
                    style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  >
                    {isRTL ? 'اطلب الآن 🚀' : 'Order Now 🚀'}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center mt-12 text-gray-600 dark:text-gray-400 font-gotham text-lg"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL
                ? 'للباقات المخصصة أو الاستفسارات، تواصل مع فريق المبيعات 📞'
                : 'For custom packages or inquiries, contact our sales team 📞'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-[#8a2a3d] to-primary text-white relative overflow-hidden">
        <OrbitSectionBackground alignment="both" density="medium" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-heading mb-6 uppercase tracking-tight"
            style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {isRTL ? 'ابدأ الآن' : 'Get Started Now'}
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-white/90 font-gotham"
            style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {isRTL ? 'تواصل معنا للحصول على استشارة مجانية' : 'Contact us for a free consultation'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/request-quote"
              className="inline-block px-10 py-4 bg-white text-primary rounded-xl font-heading uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
            >
              {isRTL ? 'اطلب عرض سعر' : 'Request a Quote'}
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-heading uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

