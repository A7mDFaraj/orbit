'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden">
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              initial={{ opacity: 0, y: -30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {t.services.title}
            </motion.h2>
            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 128, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.p 
              className="text-2xl text-primary font-rb-bold mb-4 tracking-wide"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              360 {isRTL ? 'حلول متكاملة' : 'Solutions'}
            </motion.p>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.services.subtitle}
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.05,
                  boxShadow: '0 25px 50px rgba(41, 171, 226, 0.25)',
                }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg transition-all cursor-pointer group relative overflow-hidden border-2 border-transparent dark:border-gray-700 hover:border-primary w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="text-4xl mb-4 inline-block"
                    whileHover={{ 
                      rotate: [0, -15, 15, -10, 10, 0],
                      scale: 1.3,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {getCategoryIcon(service.category)}
                  </motion.div>
                  <h3 
                    className="text-xl font-rb-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors uppercase tracking-wider"
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? service.titleAr : service.title}
                  </h3>
                  <p 
                    className="text-gray-600 dark:text-gray-300 leading-relaxed font-montserrat"
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? service.descriptionAr : service.description}
                  </p>
                </div>
                <motion.div
                  className="absolute bottom-0 right-0 w-20 h-20 bg-primary/10 rounded-tl-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Loading services...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Real Estate': '🏢',
    'Marketing': '📱',
    'Creative': '🎨',
    'Advertising': '📢',
    'Events': '🎉',
  };
  return icons[category] || '✨';
}

