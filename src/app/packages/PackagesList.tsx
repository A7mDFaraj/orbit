'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

interface Package {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  durationAr: string;
  features: string[];
  featuresAr: string[];
  highlighted?: boolean;
  icon: string;
}

export default function PackagesList() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Basic Package',
      nameAr: 'الباقة الأساسية',
      description: 'Perfect for small businesses and startups',
      descriptionAr: 'مناسبة للشركات الصغيرة والناشئة',
      duration: '3 Months',
      durationAr: 'لمدة 3 أشهر',
      icon: '🌱',
      features: [
        'Managing 2 social media platforms',
        'Creating and setting up social media accounts',
        'Optimizing accounts with company data',
        '30 engaging and distinctive posts (10 monthly)',
        'Daily monitoring of social media accounts',
        'Monthly report with statistics and account status',
      ],
      featuresAr: [
        'إدارة 2 منصات من منصات السوشيال ميديا',
        'إنشاء الحسابات على السوشيال ميديا',
        'تهيئة وتحسين الحسابات وتزويدها بالبيانات الخاصة بالشركة',
        'كتابة 30 محتوى جذاب ومتميز (10 شهريًا)',
        'متابعة يومية لحسابات السوشيال ميديا',
        'تقرير شهري بإحصائيات وحالة الحسابات',
      ],
    },
    {
      id: 'professional',
      name: 'Professional Package',
      nameAr: 'الباقة الاحترافية',
      description: 'Ideal for medium businesses and stores',
      descriptionAr: 'مناسبة للشركات المتوسطة والمتاجر',
      duration: '3 Months',
      durationAr: 'لمدة 3 أشهر',
      icon: '🚀',
      highlighted: true,
      features: [
        'Managing 3 social media platforms',
        'Creating and optimizing social media accounts',
        'Professional business card design (double-sided)',
        '45 interactive posts with creative designs (15 monthly)',
        'Professional photography session (1 monthly)',
        'Video production (1 promotional video monthly)',
        'Paid advertising campaigns management',
        'Performance analysis and detailed monthly reports',
      ],
      featuresAr: [
        'إدارة 3 منصات من منصات السوشيال ميديا',
        'إنشاء وتحسين حسابات السوشيال ميديا',
        'تصميم كارت شخصي احترافي طرفين',
        'كتابة 45 محتوى تفاعلي مع تصاميم إبداعية (15 شهريًا)',
        'جلسة تصوير احترافية (جلسة واحدة شهريًا)',
        'إنتاج فيديو (فيديو دعائي واحد شهريًا)',
        'إدارة حملات إعلانية ممولة',
        'تحليل الأداء وتقارير شهرية تفصيلية',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Package',
      nameAr: 'الباقة المتميزة',
      description: 'Complete solution for large enterprises',
      descriptionAr: 'حل متكامل للمؤسسات الكبيرة',
      duration: '6 Months',
      durationAr: 'لمدة 6 أشهر',
      icon: '👑',
      features: [
        'Managing 4+ social media platforms',
        'Complete brand identity development',
        'Professional website design and development',
        '90 premium posts with advanced designs (15 monthly)',
        'Professional photography sessions (2 monthly)',
        'Video production (2 promotional videos monthly)',
        'Comprehensive paid advertising campaigns',
        'SEO optimization and Google Ads management',
        'Dedicated account manager',
        'Weekly performance reports and analytics',
        '24/7 priority support',
      ],
      featuresAr: [
        'إدارة 4+ منصات من منصات السوشيال ميديا',
        'تطوير هوية تجارية كاملة',
        'تصميم وتطوير موقع إلكتروني احترافي',
        '90 محتوى متميز مع تصاميم متقدمة (15 شهريًا)',
        'جلسات تصوير احترافية (2 جلسة شهريًا)',
        'إنتاج فيديو (فيديوهين دعائيين شهريًا)',
        'حملات إعلانية ممولة شاملة',
        'تحسين محركات البحث وإدارة إعلانات جوجل',
        'مدير حساب مخصص',
        'تقارير أسبوعية للأداء والتحليلات',
        'دعم فني على مدار الساعة',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {isRTL ? 'اختر الباقة المناسبة لك' : 'Choose Your Perfect Package'}
            </motion.h2>
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 128 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {isRTL 
                ? 'باقات مصممة خصيصًا لتلبية احتياجاتك التسويقية والإبداعية'
                : 'Packages specially designed to meet your marketing and creative needs'
              }
            </motion.p>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative rounded-3xl backdrop-blur-xl border-2 shadow-2xl overflow-hidden transition-all duration-500 ${
                  pkg.highlighted
                    ? 'bg-gradient-to-br from-primary/95 to-blue-600/95 border-primary text-white scale-105 lg:scale-110'
                    : 'bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* Highlighted Badge */}
                {pkg.highlighted && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-6 py-2 rounded-bl-2xl font-rb-bold text-sm uppercase tracking-wide">
                    {isRTL ? '⭐ الأكثر طلبًا' : '⭐ Most Popular'}
                  </div>
                )}

                {/* Animated Background */}
                {!pkg.highlighted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-400/5 dark:from-primary/10 dark:to-blue-400/10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                )}

                {pkg.highlighted && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </>
                )}

                <div className="relative p-8 lg:p-10">
                  {/* Icon */}
                  <motion.div
                    className={`text-6xl mb-6 ${pkg.highlighted ? '' : 'opacity-80'}`}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {pkg.icon}
                  </motion.div>

                  {/* Package Name */}
                  <h3 
                    className={`text-3xl font-rb-bold mb-3 uppercase tracking-tight ${
                      pkg.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? pkg.nameAr : pkg.name}
                  </h3>

                  {/* Description */}
                  <p 
                    className={`text-base mb-2 font-montserrat ${
                      pkg.highlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? pkg.descriptionAr : pkg.description}
                  </p>

                  {/* Duration */}
                  <p 
                    className={`text-sm mb-8 font-rb-bold uppercase ${
                      pkg.highlighted ? 'text-yellow-300' : 'text-primary'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? pkg.durationAr : pkg.duration}
                  </p>

                  {/* Divider */}
                  <div className={`h-1 w-16 rounded-full mb-8 ${
                    pkg.highlighted ? 'bg-white/30' : 'bg-gradient-to-r from-primary to-blue-400'
                  }`} />

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {(isRTL ? pkg.featuresAr : pkg.features).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                      >
                        <span className={`flex-shrink-0 mt-1 ${
                          pkg.highlighted ? 'text-yellow-300' : 'text-primary'
                        }`}>
                          ✓
                        </span>
                        <span 
                          className={`text-sm font-montserrat leading-relaxed ${
                            pkg.highlighted ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                          }`}
                          style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                        >
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/request-quote"
                    className={`block w-full text-center px-8 py-4 rounded-xl font-rb-bold uppercase tracking-wider transition-all duration-300 ${
                      pkg.highlighted
                        ? 'bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl'
                        : 'bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? 'اطلب الباقة' : 'Request Package'}
                  </Link>
                </div>

                {/* Corner Decoration */}
                {!pkg.highlighted && (
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-tl-3xl" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            variants={cardVariants}
            className="mt-20 text-center"
          >
            <div className="inline-block p-12 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 border-2 border-primary/30 dark:border-primary/40 shadow-2xl">
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                💡
              </motion.div>
              <h3 
                className="text-3xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL ? 'هل تحتاج باقة مخصصة؟' : 'Need a Custom Package?'}
              </h3>
              <p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-montserrat"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL
                  ? 'نصمم باقات مخصصة تناسب احتياجاتك وميزانيتك بالضبط. تواصل معنا للحصول على استشارة مجانية'
                  : 'We design custom packages that perfectly match your needs and budget. Contact us for a free consultation'
                }
              </p>
              <Link
                href="/request-quote"
                className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-rb-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-blue-600 transition-all duration-300"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

