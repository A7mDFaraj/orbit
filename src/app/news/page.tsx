'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrbitSectionBackground from '@/components/OrbitSectionBackground';

export default function NewsPage() {
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <section id="news" className="relative py-32 lg:py-40 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
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
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-heading text-gray-900 dark:text-white mb-6 uppercase tracking-tighter"
                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {isRTL ? 'الاخبار' : 'News'}
              </motion.h1>
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={inView ? { width: 96 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <p
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-gotham max-w-3xl mx-auto"
                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {isRTL 
                  ? 'تابع آخر الأخبار والتحديثات من أوربيت'
                  : 'Stay updated with the latest news and updates from ORBIT'
                }
              </p>
            </motion.div>

            {/* News Content Placeholder */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + item * 0.1,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative z-10">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-6" />
                    <h3
                      className="text-xl font-heading text-gray-900 dark:text-white mb-3 uppercase"
                      style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {isRTL ? 'عنوان الخبر' : 'News Title'}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400 font-gotham line-clamp-3"
                      style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {isRTL 
                        ? 'هذا نص تجريبي لوصف الخبر. يمكنك إضافة المزيد من التفاصيل هنا.'
                        : 'This is a sample news description. You can add more details here.'
                      }
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

