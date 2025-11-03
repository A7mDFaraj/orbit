'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function PackagesHero() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: isDark 
              ? `linear-gradient(rgba(41, 171, 226, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(41, 171, 226, 0.08) 1px, transparent 1px)`
              : `linear-gradient(rgba(41, 171, 226, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(41, 171, 226, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-rb-bold uppercase tracking-wider">
              {isRTL ? 'باقاتنا الشاملة' : 'Our Complete Packages'}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rb-bold mb-6 uppercase tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {isRTL ? 'باقات التسويق المتكاملة' : 'Integrated Marketing Packages'}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-primary via-blue-400 to-primary mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-montserrat leading-relaxed"
            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isRTL 
              ? 'باقات شاملة تجمع بين التسويق والإنتاج الفني والإدارة الرقمية لتحقيق نموك وتفوقك في السوق'
              : 'Comprehensive packages combining marketing, artistic production, and digital management to achieve your growth and market excellence'
            }
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

