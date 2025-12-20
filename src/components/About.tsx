'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import OrbitSectionBackground from './OrbitSectionBackground';

export default function About() {
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const vision = {
    title: isRTL ? 'الرؤية' : 'Vision',
    titleAr: 'الرؤية',
    text: isRTL 
      ? 'أن نكون الشريك التقني الأول والأكثر ثقة في المملكة وخارجها'
      : 'To be the first and most trusted technical partner in the Kingdom and beyond',
    textAr: 'أن نكون الشريك التقني الأول والأكثر ثقة في المملكة وخارجها',
  };

  const mission = {
    title: isRTL ? 'الرسالة' : 'Mission',
    titleAr: 'الرسالة',
    text: isRTL
      ? 'تقديم حلول تقنية مبتكرة بجودة واحترافية تلبي احتياجات عملائنا المتغيرة'
      : 'Providing innovative technical solutions with quality and professionalism that meet our clients\' changing needs',
    textAr: 'تقديم حلول تقنية مبتكرة بجودة واحترافية تلبي احتياجات عملائنا المتغيرة',
  };

  const promises = {
    title: isRTL ? 'نعدكم' : 'We Promise You',
    titleAr: 'نعدكم',
    items: [
      {
        text: isRTL ? 'دعم فني على مدار الساعة' : '24/7 Technical Support',
        textAr: 'دعم فني على مدار الساعة',
      },
      {
        text: isRTL ? 'سرعة وصول' : 'Fast Access',
        textAr: 'سرعة وصول',
      },
      {
        text: isRTL ? 'التطوير المستمر' : 'Continuous Development',
        textAr: 'التطوير المستمر',
      },
      {
        text: isRTL ? 'أفضل الأسعار' : 'Best Prices',
        textAr: 'أفضل الأسعار',
      },
    ],
  };

  // Font sizes - hierarchy: 0 (largest), 2 (medium-large), 1 (medium), 3 (smallest)
  const getFontSize = (index: number) => {
    if (index === 0) return 'text-xl sm:text-2xl lg:text-3xl xl:text-3xl'; // Largest - reduced size
    if (index === 2) return 'text-xl sm:text-2xl lg:text-3xl xl:text-3xl'; // Medium-large (bigger than index 1)
    if (index === 1) return 'text-lg sm:text-xl lg:text-2xl xl:text-2xl'; // Medium
    return 'text-sm sm:text-base lg:text-lg xl:text-lg'; // Smallest (index 3) - noticeably smaller
  };

  // Padding sizes - hierarchy: 0 (largest), 2 (medium-large), 1 (medium), 3 (smallest)
  const getPadding = (index: number) => {
    if (index === 0) return 'pt-7 pb-6 px-5 sm:px-6 lg:px-7'; // Largest - reduced padding
    if (index === 2) return 'pt-7 pb-5 px-5 sm:px-6 lg:px-7'; // Medium-large (bigger than index 1)
    if (index === 1) return 'pt-6 pb-5 px-4 sm:px-5 lg:px-6'; // Medium
    return 'pt-5 pb-4 px-4 sm:px-5 lg:px-5'; // Smallest (index 3)
  };

  return (
    <section id="about" className="relative py-32 lg:py-40 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <OrbitSectionBackground alignment="both" density="medium" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl opacity-20 dark:opacity-10"
            style={{
              width: `${250 + i * 200}px`,
              height: `${250 + i * 200}px`,
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(122, 30, 46, 0.35) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(232, 220, 203, 0.35) 0%, transparent 70%)',
              left: `${15 + i * 35}%`,
              top: `${25 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.25, 0.12],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
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
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Vision & Mission Row - Back to Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-24">
            {/* Vision Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-10 lg:p-12 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-primary/20 dark:border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl sm:text-4xl font-heading text-primary dark:text-primary mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {isRTL ? vision.titleAr : vision.title}
                </motion.h3>

                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                <motion.p
                  className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-gotham"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {isRTL ? vision.textAr : vision.text}
                </motion.p>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-10 lg:p-12 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-secondary/20 dark:border-secondary/30 shadow-xl hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl sm:text-4xl font-heading text-secondary dark:text-secondary mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {isRTL ? mission.titleAr : mission.title}
                </motion.h3>

                <motion.div
                  className="h-1 w-20 bg-gradient-to-r from-secondary to-primary rounded-full mb-8"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />

                <motion.p
                  className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-gotham"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {isRTL ? mission.textAr : mission.text}
                </motion.p>
              </div>

              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-secondary/5 to-transparent rounded-br-full" />
            </motion.div>
          </div>

          {/* Promises - Creative Design with Proper Responsive Sizing */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h3
              className="text-4xl sm:text-5xl lg:text-7xl font-heading text-gray-900 dark:text-white mb-20 uppercase tracking-tighter text-center"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              dir={isRTL ? 'rtl' : 'ltr'}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isRTL ? promises.titleAr : promises.title}
            </motion.h3>

            {/* Responsive Grid - First one larger, others smaller */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {promises.items.map((promise, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + index * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className={`group relative ${
                    index === 0 
                      ? 'sm:col-span-2 lg:col-span-1' // First one spans 2 columns on sm, normal on lg
                      : ''
                  }`}
                >
                  {/* Decorative Circle Badge - Without Number */}
                  <div 
                    className={`absolute ${isRTL ? '-top-3 -right-3' : '-top-3 -left-3'} rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${
                      index === 0 ? 'w-14 h-14' : 'w-12 h-12'
                    }`}
                    style={index === 2 ? { width: '3.25rem', height: '3.25rem' } : {}}
                  />

                  {/* Content Card */}
                  <div className={`relative rounded-2xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 group-hover:border-primary dark:group-hover:border-primary transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:shadow-primary/20 overflow-hidden ${getPadding(index)}`}>
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Decorative Corner */}
                    {isRTL ? (
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    ) : (
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}

                    <div className="relative z-10">
                      <motion.h4
                        className={`font-heading text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 ${getFontSize(index)} ${isRTL ? 'font-somar' : 'font-heading'} leading-tight`}
                        style={{ 
                          fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif',
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.12 }}
                      >
                        {isRTL ? promise.textAr : promise.text}
                      </motion.h4>

                      {/* Elegant Underline */}
                      <motion.div
                        className={`h-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full ${
                          index === 0 ? 'mt-4' : index === 2 ? 'mt-4' : index === 1 ? 'mt-3' : 'mt-3'
                        }`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: '100%' } : {}}
                        transition={{ duration: 0.8, delay: 1.4 + index * 0.12 }}
                      />
                    </div>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
