'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItem {
  text: string;
  textAr: string;
}

interface Service {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon?: string;
  category: string;
  items?: ServiceItem[];
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
                    {/* Front Side - Icon/Image */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 overflow-hidden">
                        {/* Animated background elements - only show when no image */}
                        {!service.image && (
                          <>
                            {/* Floating gradient orbs */}
                            <motion.div
                              className="absolute top-0 left-0 w-40 h-40 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl"
                              animate={{
                                x: [0, 100, 0],
                                y: [0, 80, 0],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                            <motion.div
                              className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400/15 dark:bg-blue-400/20 rounded-full blur-3xl"
                              animate={{
                                x: [0, -80, 0],
                                y: [0, -60, 0],
                                scale: [1, 1.3, 1],
                              }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                              }}
                            />
                            
                            {/* Animated grid pattern */}
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: `
                                  linear-gradient(rgba(41, 171, 226, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(41, 171, 226, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '30px 30px',
                              }}
                              animate={{
                                backgroundPosition: ['0px 0px', '30px 30px'],
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                            
                            {/* Rotating light beam */}
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(45deg, transparent 40%, rgba(41, 171, 226, 0.2) 50%, transparent 60%)',
                              }}
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                          </>
                        )}
                        
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={isRTL ? service.titleAr : service.title}
                            className="w-full h-full object-cover relative z-10"
                          />
                        ) : (
                          <div className="relative z-10 w-full h-full flex items-center justify-center p-0">
                            <motion.img
                              src={getCategorySVG(service.category)}
                              alt={isRTL ? service.titleAr : service.title}
                              className="w-full h-full object-cover"
                              style={{
                                filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                              }}
                              animate={{
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
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

                    {/* Back Side - Text Content with Items */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg overflow-y-auto custom-scrollbar"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {service.icon && (
                          <span className="text-4xl">{service.icon}</span>
                        )}
                        <h3 
                          className="text-2xl font-rb-bold text-gray-900 dark:text-white uppercase tracking-wide"
                          style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                        >
                          {isRTL ? service.titleAr : service.title}
                        </h3>
                      </div>
                      
                      {/* Render HTML description - Safe for all formats */}
                      <div 
                        className="text-gray-600 dark:text-gray-400 text-sm font-montserrat leading-relaxed prose prose-sm dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_p]:mb-3"
                        style={{ 
                          fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                          direction: isRTL ? 'rtl' : 'ltr',
                        }}
                        dangerouslySetInnerHTML={{ 
                          __html: (isRTL ? service.descriptionAr : service.description) || 'No description available'
                        }}
                      />
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

function getCategorySVG(category: string): string {
  const svgs: Record<string, string> = {
    'Real Estate': '/serivces/real estate.svg',
    'Marketing': '/serivces/Markting.svg',
    'Production': '/serivces/Production.svg',
    'Events': '/serivces/Event.svg',
    'Event Management': '/serivces/Event.svg',
    'Casting': '/serivces/casting.svg',
    'Casting Services': '/serivces/casting.svg',
    'Crowd Management': '/serivces/Crowd.svg',
    'Creative': '/serivces/Production.svg',
    'Advertising': '/serivces/Markting.svg',
  };
  return svgs[category] || '/serivces/Markting.svg';
}
