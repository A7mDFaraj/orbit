'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HealthcarePage() {
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = {
    title: {
      en: 'Healthcare Solutions',
      ar: 'تحسين تجربة المرضى عبر تواصل ذكي وفعّال',
    },
    subtitle: {
      en: 'Improve patient experience through smart and effective communication',
      ar: 'تحسين تجربة المرضى عبر تواصل ذكي وفعّال',
    },
    description: {
      en: 'Our solutions help healthcare facilities reduce missed appointments, improve patient communication, and enhance service quality through smart messages and notifications.',
      ar: 'حلولنا تساعد المنشآت الصحية على تقليل المواعيد الفائتة، تحسين التواصل مع المرضى، ورفع جودة الخدمة من خلال رسائل وتنبيهات ذكية',
    },
    challenges: {
      title: {
        en: 'Challenges',
        ar: 'التحديات',
      },
      items: [
        { en: 'Missed appointments', ar: 'نسيان المواعيد' },
        { en: 'Pressure on reception teams', ar: 'ضغط على فرق الاستقبال' },
        { en: 'Weak communication with patients', ar: 'ضعف التواصل مع المرضى' },
      ],
    },
    solutions: {
      title: {
        en: 'Our Solutions for Healthcare',
        ar: 'حلولنا للقطاع الصحي',
      },
      items: [
        { en: 'Appointment reminder messages (SMS)', ar: 'رسائل تذكير بالمواعيد(5MS)' },
        { en: 'WhatsApp Business for patient communication', ar: 'واتساب أعمال للتواصل مع المرضى' },
        { en: 'Real-time delivery status reports', ar: 'تقارير فورية عن حالة الإرسال' },
      ],
    },
    benefits: {
      title: {
        en: 'Benefits',
        ar: 'الفوائد',
      },
      items: [
        { en: 'Reduced missed appointments', ar: 'تقليل الغياب عن المواعيد' },
        { en: 'Better patient experience', ar: 'تجربة أفضل للمريض' },
        { en: 'Faster and clearer communication', ar: 'تواصل أسرع وأوضح' },
      ],
    },
  };

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
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.title.ar : content.title.en}
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl mb-8 max-w-3xl  text-white/90"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
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
                href="/request-quote"
                className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-heading uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
                style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
              >
                {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenges Section */}
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
              className="text-3xl sm:text-4xl font-heading mb-12 text-gray-900 dark:text-white"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.challenges.title.ar : content.challenges.title.en}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.challenges.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <p
                    className="text-lg  text-gray-900 dark:text-white"
                    style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? item.ar : item.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
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
              className="text-3xl sm:text-4xl font-heading mb-12 text-gray-900 dark:text-white"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.solutions.title.ar : content.solutions.title.en}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.solutions.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-8 rounded-2xl border-2 border-primary/20 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl text-white">✓</span>
                  </div>
                  <p
                    className="text-lg  text-gray-900 dark:text-white"
                    style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? item.ar : item.en}
                  </p>
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
              className="text-3xl sm:text-4xl font-heading mb-12 text-gray-900 dark:text-white"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? content.benefits.title.ar : content.benefits.title.en}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.benefits.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p
                    className="text-lg  text-gray-900 dark:text-white"
                    style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {isRTL ? item.ar : item.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-[#8a2a3d] to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-heading mb-6 uppercase tracking-tight"
            style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
          </motion.h2>
          <motion.p
            className="text-xl mb-8  text-white/90"
            style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {isRTL ? 'تواصل معنا لنساعدك في تحسين تجربة مرضاك' : 'Contact us to help you improve your patient experience'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/request-quote"
              className="inline-block px-10 py-4 bg-white text-primary rounded-xl font-heading uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'IBM Plex Sans, sans-serif' }}
            >
              {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

