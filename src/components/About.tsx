'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t, isRTL } = useLanguage();
  
  const [aboutData, setAboutData] = useState<any>(null);
  const [featuresData, setFeaturesData] = useState<any[]>([]);
  const [uniqueTitle, setUniqueTitle] = useState({ en: '', ar: '' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    fetchAboutData();
    fetchFeaturesData();
    fetchUniqueSettings();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await fetch('/api/about-settings');
      const data = await res.json();
      if (data.settings) {
        setAboutData(data.settings);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const fetchFeaturesData = async () => {
    try {
      const res = await fetch('/api/unique-features');
      const data = await res.json();
      setFeaturesData(data || []);
    } catch (error) {
      console.error('Error fetching features data:', error);
    }
  };

  const fetchUniqueSettings = async () => {
    try {
      const res = await fetch('/api/unique-features-settings');
      const data = await res.json();
      if (data.settings) {
        setUniqueTitle({
          en: data.settings.sectionTitle || t.about.unique,
          ar: data.settings.sectionTitleAr || t.about.unique,
        });
      }
    } catch (error) {
      console.error('Error fetching unique settings:', error);
    }
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  const cardVariants = {
    hidden: { opacity: 0, x: -30, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] as any,
      },
    },
  };

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(41, 171, 226, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Gradient Orbs - Only animate when in view */}
      {inView && (
        <>
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
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
            className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 dark:bg-primary/10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Title Section with Modern Blur Text Animation */}
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-24"
          >
            <motion.div className="inline-block mb-6">
              <motion.span
                className="px-6 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-rb-bold uppercase tracking-wider"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                {isRTL ? 'من نحن' : 'About Us'}
              </motion.span>
            </motion.div>

                  <motion.h2 
                    className="text-5xl sm:text-6xl lg:text-8xl font-rb-bold mb-8 uppercase tracking-tighter"
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? (
                      // Simple fade for Arabic
                      <motion.span
                        className="text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                      >
                        {aboutData ? aboutData.titleAr : t.about.title}
                      </motion.span>
                    ) : (
                      // Blur animation for English
                      (aboutData ? aboutData.title : t.about.title).split(' ').map((word: string, wordIndex: number) => (
                        <span key={wordIndex} className="inline-block mr-4">
                          {word.split('').map((char: string, charIndex: number) => (
                            <motion.span
                              key={charIndex}
                              className="inline-block"
                              style={{
                                backgroundImage: 'linear-gradient(90deg, #1f2937 0%, #29ABE2 50%, #1f2937 100%)',
                                backgroundSize: '200% 100%',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                              }}
                              initial={{ filter: 'blur(10px)', opacity: 0 }}
                              animate={inView ? { filter: 'blur(0px)', opacity: 1 } : {}}
                              transition={{
                                duration: 0.6,
                                delay: (wordIndex * 0.1) + (charIndex * 0.03),
                                ease: 'easeOut',
                              }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </span>
                      ))
                    )}
                  </motion.h2>

            <motion.div
              className="h-2 w-32 bg-gradient-to-r from-primary via-blue-400 to-primary mx-auto mb-8 rounded-full relative overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={inView ? { width: 128, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-montserrat leading-relaxed"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {aboutData ? (isRTL ? aboutData.descriptionAr : aboutData.description) : t.about.description}
            </motion.p>
          </motion.div>

          {/* Vision & Mission Cards - Modern Glassmorphism Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            {/* Vision Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
              }}
              className="group relative p-10 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-primary/20 dark:border-primary/30 shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  backgroundImage: 'url(/about/vision.jpg)',
                  backgroundBlendMode: 'overlay',
                }}
              />
              
              {/* Overlay - More transparent to show the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/70 to-white/60 dark:from-gray-900/70 dark:via-gray-900/80 dark:to-gray-900/70" />

              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-400/10 to-transparent dark:from-primary/30 dark:via-blue-400/20 dark:to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />

              {/* Floating particles effect */}
              {inView && [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              <div className="relative z-10">
                {/* Icon with 3D effect */}
                <motion.div
                  className="inline-block mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-400/20 dark:from-primary/30 dark:to-blue-400/30"
                  whileHover={{ 
                    rotateY: 15,
                    rotateX: 15,
                    scale: 1.1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-6xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { 
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.05, 1],
                      opacity: 1,
                    } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    👁️
                  </motion.div>
                </motion.div>

                <h3 
                  className="text-4xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {aboutData ? (isRTL ? aboutData.visionAr : aboutData.vision) : t.about.vision}
                </h3>
                
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 64 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                <p 
                  className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-montserrat"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {aboutData ? (isRTL ? aboutData.visionTextAr : aboutData.visionText) : t.about.visionText}
                </p>
              </div>

              {/* Corner decoration */}
              {inView && (
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
              }}
              className="group relative p-10 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-secondary/20 dark:border-primary/30 shadow-2xl hover:shadow-secondary/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  backgroundImage: 'url(/about/mission.jpg)',
                  backgroundBlendMode: 'overlay',
                }}
              />
              
              {/* Overlay - More transparent to show the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/70 to-white/60 dark:from-gray-900/70 dark:via-gray-900/80 dark:to-gray-900/70" />

              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-gray-400/10 to-transparent dark:from-primary/30 dark:via-gray-600/20 dark:to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />

              {/* Floating particles effect */}
              {inView && [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary/30 dark:bg-primary/30 rounded-full"
                  style={{
                    right: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              <div className="relative z-10">
                {/* Icon with 3D effect */}
                <motion.div
                  className="inline-block mb-6 p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-gray-400/20 dark:from-primary/30 dark:to-blue-400/30"
                  whileHover={{ 
                    rotateY: -15,
                    rotateX: 15,
                    scale: 1.1,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-6xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                      opacity: 1,
                    } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🎯
                  </motion.div>
                </motion.div>

                <h3 
                  className="text-4xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {aboutData ? (isRTL ? aboutData.missionAr : aboutData.mission) : t.about.mission}
                </h3>
                
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-secondary to-gray-600 dark:from-primary dark:to-blue-400 rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 64 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                <p 
                  className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-montserrat"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {aboutData ? (isRTL ? aboutData.missionTextAr : aboutData.missionText) : t.about.missionText}
                </p>
              </div>

              {/* Corner decoration */}
              {inView && (
                <motion.div
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 dark:bg-primary/20 rounded-full blur-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>

          {/* Features Grid - Modern Bento Box Style */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.div className="text-center mb-16">
              <motion.h3 
                className="text-4xl sm:text-5xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                {uniqueTitle ? (isRTL ? uniqueTitle.ar : uniqueTitle.en) : t.about.unique}
              </motion.h3>
              <motion.div 
                className="h-1.5 w-24 bg-gradient-to-r from-primary to-blue-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: 96 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuresData.length > 0 ? featuresData : t.about.features).map((item, index) => {
                const title = featuresData.length > 0 ? (isRTL ? item.titleAr : item.title) : item.title;
                const desc = featuresData.length > 0 ? (isRTL ? item.descAr : item.desc) : item.desc;
                
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] as any,
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-primary dark:hover:border-primary transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 overflow-hidden"
                >
                  {/* Animated gradient mesh background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(41, 171, 226, 0.1) 0%, transparent 70%)',
                    }}
                  />

                  {/* Floating glow orb */}
                  {inView && (
                    <motion.div
                      className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 dark:bg-primary/30 rounded-full blur-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Icon container with 3D effect */}
                    <motion.div 
                      className="inline-block mb-6 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 backdrop-blur-sm overflow-hidden"
                      whileHover={{ 
                        rotateY: 180,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6, type: 'spring' }}
                    >
                      {index === 0 ? (
                        // Saudi Creativity - Outlined Flag Icon
                        <motion.div
                          className="w-12 h-12"
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? {
                            y: [0, -5, 0],
                            opacity: 1,
                          } : { opacity: 0, y: 10 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          {getOutlineIcon(index)}
                        </motion.div>
                      ) : (
                        <motion.div
                          className="w-12 h-12"
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? {
                            y: [0, -5, 0],
                            opacity: 1,
                          } : { opacity: 0, y: 10 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          {getOutlineIcon(index)}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Title with hover animation */}
                    <h4 
                      className="text-xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {title}
                    </h4>

                    {/* Animated underline */}
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-4"
                      initial={{ width: 0 }}
                      animate={inView ? { width: '60%' } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    />

                    {/* Description */}
                    <p 
                      className="text-gray-600 dark:text-gray-300 leading-relaxed font-montserrat text-base"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {desc}
                    </p>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-tl-3xl" />
                </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section - Modern Glass Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative text-center p-16 rounded-[2.5rem] backdrop-blur-2xl bg-gradient-to-br from-primary/90 to-blue-500/90 dark:from-primary/80 dark:to-gray-800/80 text-white overflow-hidden shadow-2xl"
          >
            {/* Animated gradient mesh background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Floating orbs */}
            {inView && [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 bg-white/10 rounded-full blur-2xl"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={inView ? {
                  scale: [1, 1.05, 1],
                  opacity: 1,
                  rotate: 0,
                } : { opacity: 0, scale: 0, rotate: -45 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="text-6xl">🚀</span>
              </motion.div>

              <motion.h3 
                className="text-4xl sm:text-5xl font-rb-bold mb-6 uppercase tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {isRTL ? 'دراسات الحالة' : 'CASE STUDIES'}
              </motion.h3>

              <motion.div 
                className="h-1 w-24 bg-white/50 mx-auto mb-8 rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: 96 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              />

              <motion.p 
                className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto font-montserrat leading-relaxed text-white/90"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {isRTL ? 'استكشف أعمالنا لترى كيف يمكننا مساعدتك في تحويل عملك وتحقيق أهدافك' : 'Explore our portfolio to see how we can help you transform your business and achieve your goals'}
              </motion.p>

              <motion.a
                href="#work"
                className="inline-block group relative px-12 py-5 bg-white text-primary rounded-full font-rb-bold uppercase tracking-wider shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  {isRTL ? 'شاهد أعمالنا' : 'View Our Work'}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function getOutlineIcon(index: number) {
  const icons = [
    // Saudi Creativity - Outlined Flag (outlined)
    <svg key="0" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>,
    // Complete Implementation - Lightning bolt (outlined)
    <svg key="1" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Diverse Expertise - Team (outlined)
    <svg key="2" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    // Attention to Detail - Eye (outlined)
    <svg key="3" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>,
    // Trust and Partnership - Shield with checkmark (outlined, fixed)
    <svg key="4" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    // Focus on Innovation - Lightbulb (outlined)
    <svg key="5" className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
  ];
  return icons[index] || icons[5];
}

