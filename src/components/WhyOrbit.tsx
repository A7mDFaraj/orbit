'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import OrbitSectionBackground from './OrbitSectionBackground';

export default function WhyOrbit() {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = t.about.stats?.items || [
    { number: '20+', label: isRTL ? 'عامًا خبرة' : 'Years of Experience' },
    { number: '20,000+', label: isRTL ? 'جهة حكومية وخاصة' : 'Government and Private Entities' },
    { number: '180+', label: isRTL ? 'مليون رسالة شهريًا' : 'Million Messages Monthly' },
    { number: '98%+', label: isRTL ? 'نسبة رضا عملاء تتجاوز' : 'Customer Satisfaction Rate' },
  ];

  const features = [
    {
      text: isRTL ? 'خبرة محلية وفهم لاحتياجات السوق' : 'Local Expertise',
      textAr: 'خبرة محلية وفهم لاحتياجات السوق',
    },
    {
      text: isRTL ? 'بنية تقنية عالية الأداء' : 'High-Performance Infrastructure',
      textAr: 'بنية تقنية عالية الأداء',
    },
    {
      text: isRTL ? 'دعم فني واستشارات متخصصة' : 'Specialized Support',
      textAr: 'دعم فني واستشارات متخصصة',
    },
    {
      text: isRTL ? 'حلول قابلة للتوسع' : 'Scalable Solutions',
      textAr: 'حلول قابلة للتوسع',
    },
    {
      text: isRTL ? 'توافق كامل مع المتطلبات الحكومية' : 'Government Compliance',
      textAr: 'توافق كامل مع المتطلبات الحكومية',
    },
    {
      text: isRTL ? 'سرعة تشغيل وتكامل سلس مع الأنظمة' : 'Fast Deployment',
      textAr: 'سرعة تشغيل وتكامل سلس مع الأنظمة',
    },
  ];

  return (
    <section id="why-orbit" className="py-32 lg:py-40 bg-gradient-to-br from-primary via-[#8a2a3d] to-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-60 z-0">
        <OrbitSectionBackground alignment="both" density="high" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-[#8a2a3d]/70 to-primary/70 z-0" />

      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${350 + i * 300}px`,
              height: `${350 + i * 300}px`,
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(232, 220, 203, 0.4) 0%, transparent 70%)',
              left: `${5 + i * 25}%`,
              top: `${15 + i * 18}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
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
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Title */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-7xl font-heading mb-8 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
            >
              {t.about.stats?.title || (isRTL ? 'لماذا المدار التقني؟' : 'Why ORBIT Technical?')}
            </motion.h2>
            <motion.div
              className="h-1 w-40 bg-white/70 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 160 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          {/* Features - First (Clean List Design) */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-5xl mx-auto mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: isRTL ? 30 : -30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group relative"
                >
                  <div className="relative pl-6 border-l-2 border-white/20 group-hover:border-white/60 transition-colors duration-500">
                    <motion.h4
                      className="text-lg sm:text-xl font-heading text-white uppercase tracking-wide mb-2 group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {isRTL ? feature.textAr : feature.text}
                    </motion.h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats - Numbers UNDER text - Moved Down */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  className="text-xl sm:text-2xl font-heading text-white/90 mb-4 uppercase tracking-wide"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                >
                  {stat.label}
                </motion.p>
                <motion.div
                  className="text-5xl sm:text-6xl lg:text-7xl font-heading text-white"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  className="h-0.5 w-16 bg-white/50 mx-auto mt-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 64 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
