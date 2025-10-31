'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  _id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => setFaqs(data.faqs || []))
      .catch((err) => console.error('Error fetching FAQs:', err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-rb-bold text-gray-900 mb-6 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.faq.title}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq._id}
                variants={itemVariants}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-rb-bold text-lg text-gray-900 pr-4" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                    {isRTL ? faq.questionAr : faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 text-blue-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-gray-600 leading-relaxed font-montserrat" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                        {isRTL ? faq.answerAr : faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {faqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Loading FAQs...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

