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
  image?: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  const toggleFlip = (serviceId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  // Split description into bullet points for numbered list
  const parseDescription = (desc: string) => {
    const points = desc.split(/(?:\d+\)|\d+\.|[-•])\s*/).filter(p => p.trim().length > 0);
    return points.length > 0 ? points : [desc];
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const descriptionPoints = parseDescription(isRTL ? service.descriptionAr : service.description);
              const isFlipped = flippedCards.has(service._id);
              
              return (
                <motion.div
                  key={service._id}
                  variants={itemVariants}
                  className="relative h-[500px] perspective-1000"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    className="relative w-full h-full preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    onClick={() => toggleFlip(service._id)}
                    onMouseEnter={() => toggleFlip(service._id)}
                    onMouseLeave={() => toggleFlip(service._id)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Side - Image */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={isRTL ? service.titleAr : service.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-7xl">
                              {getCategoryIcon(service.category)}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 
                            className="text-2xl font-rb-bold text-white mb-2 uppercase tracking-wide"
                            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                          >
                            {isRTL ? service.titleAr : service.title}
                          </h3>
                          <p className="text-white/80 text-sm font-montserrat">
                            {isRTL ? 'انقر أو مرر للتفاصيل' : 'Click or hover for details'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Text Content */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg overflow-y-auto"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <h3 
                        className="text-2xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? service.titleAr : service.title}
                      </h3>
                      
                      {/* Description as numbered list */}
                      <div className="space-y-3">
                        {descriptionPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="text-primary font-rb-bold text-lg flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p 
                              className="text-gray-600 dark:text-gray-300 leading-relaxed font-montserrat flex-1"
                              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                            >
                              {point.trim()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Loading services...
              </p>
            </div>
          )}
          {!loading && services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No services available
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
