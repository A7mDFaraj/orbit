'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationControls, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Orb from './Orb';
import OrbitSectionBackground from './OrbitSectionBackground';

export default function Hero() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeControls = useAnimationControls();
  const carouselRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Optimized spring for smoother performance during fast scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.01,
    mass: 1,
  });

  // Parallax transforms with smooth spring
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(smoothProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isMarqueePaused) {
        marqueeControls.start({
          x: ['0%', '-50%'],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        });
      } else {
        marqueeControls.stop();
      }
    }
  }, [isMarqueePaused, marqueeControls, mounted]);

  // Solutions data
  const solutions = [
    {
      slug: 'sms-platform',
      titleEn: 'SMS Platform',
      titleAr: 'الرسائل النصية',
      descriptionEn: 'An intelligent messaging platform that ensures your messages reach the right time with the highest delivery rate.',
      descriptionAr: 'منصة رسائل ذكية تضمن وصول رسائلك في الوقت المناسب وبأعلى نسبة تسليم',
      icon: '📱',
      image: undefined, // Will be added in future: '/solutions/sms-platform.jpg'
    },
    {
      slug: 'whatsapp-business-api',
      titleEn: 'WhatsApp Business API',
      titleAr: 'واتساب اعمال API',
      descriptionEn: 'An integrated solution for official customer communication via WhatsApp with message automation.',
      descriptionAr: 'حل متكامل للتواصل الرسمي مع العملاء عبر واتساب مع أتمتة الرسائل',
      icon: '💬',
      image: undefined, // Will be added in future: '/solutions/whatsapp.jpg'
    },
    {
      slug: 'otime',
      titleEn: 'OTime - Attendance & HR',
      titleAr: 'اوتايم OTime',
      descriptionEn: 'A smart attendance and departure system that helps you manage work hours accurately.',
      descriptionAr: 'نظام حضور وانصراف ذكي يساعدك على إدارة أوقات العمل بدقة',
      icon: '⏰',
      image: undefined, // Will be added in future: '/solutions/otime.jpg'
    },
    {
      slug: 'gov-gate',
      titleEn: 'Gov Gate - Government Portal',
      titleAr: 'البوابة الحكومية Gov Gate',
      descriptionEn: 'An official messaging portal designed for government entities with highest security levels.',
      descriptionAr: 'بوابة مراسلات رسمية مصممة للجهات الحكومية بأعلى مستويات الأمان',
      icon: '🏛️',
      image: undefined, // Will be added in future: '/solutions/gov-gate.jpg'
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (mounted && isAutoPlaying) {
      carouselRef.current = setInterval(() => {
        setCurrentSolutionIndex((prev) => (prev + 1) % solutions.length);
      }, 5000);

      return () => {
        if (carouselRef.current) {
          clearInterval(carouselRef.current);
        }
      };
    }
  }, [mounted, isAutoPlaying, solutions.length]);

  const goToSolution = (index: number) => {
    setCurrentSolutionIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Use ORBIT translations directly - no API fetch
  const heroContent = {
    title: isRTL ? 'أوربيت نجاحك' : 'ORBIT Your Success',
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at center, #0a0a0f 0%, #000000 100%)'
          : 'radial-gradient(ellipse at center, #f8f9fa 0%, #e8dccb 100%)',
      }}
    >
      {/* Living Logo Background */}
      {/* Living Logo Background - Removed as per request */}
      {/* {mounted && <OrbitSectionBackground alignment="both" density="high" />} */}

      {/* Animated Background Orbs */}
      {mounted && (
        <>
          {/* Primary Orb */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 1,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '1400px',
                maxHeight: '1400px',
                minHeight: '700px',
              }}
            >
              <Orb
                hoverIntensity={0.7}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </div>

          {/* Floating Particles - Optimized Performance (Reduced from 8 to 4) */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none gpu-accelerated"
              style={{
                width: `${20 + i * 12}px`,
                height: `${20 + i * 12}px`,
                background: `radial-gradient(circle, ${isDark ? 'rgba(122, 30, 46, 0.15)' : 'rgba(122, 30, 46, 0.1)'} 0%, transparent 70%)`,
                left: `${15 + i * 25}%`,
                top: `${15 + i * 20}%`,
                zIndex: 0,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.25, 0.6, 0.25],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}

          {/* Gradient Rings - Optimized with GPU acceleration */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {[1, 2].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border gpu-accelerated"
                style={{
                  width: `${500 + ring * 300}px`,
                  height: `${500 + ring * 300}px`,
                  borderColor: isDark ? 'rgba(122, 30, 46, 0.08)' : 'rgba(122, 30, 46, 0.05)',
                  borderWidth: '1px',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.25, 0.45, 0.25],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10 + ring * 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: ring * 1.5,
                }}
              />
            ))}
          </motion.div>

          {/* Ambient Light Glows - Optimized (reduced blur intensity) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {[
              { x: '20%', y: '30%', size: '400px' },
              { x: '80%', y: '70%', size: '500px' },
            ].map((glow, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-2xl gpu-accelerated"
                style={{
                  width: glow.size,
                  height: glow.size,
                  left: glow.x,
                  top: glow.y,
                  background: `radial-gradient(circle, ${isDark ? 'rgba(122, 30, 46, 0.18)' : 'rgba(122, 30, 46, 0.1)'} 0%, transparent 70%)`,
                  transform: 'translate(-50%, -50%) translateZ(0)',
                  willChange: 'transform, opacity',
                }}
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 2.5,
                }}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* Gradient Overlay for Better Text Readability - GPU accelerated */}
      <motion.div
        className="absolute inset-0 pointer-events-none gpu-accelerated"
        style={{
          zIndex: 2,
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(248,249,250,0.3) 60%, rgba(248,249,250,0.6) 100%)',
          opacity,
          willChange: 'opacity',
        }}
      />

      {/* Main Content - GPU accelerated for smooth parallax */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 gpu-accelerated"
        style={{
          opacity,
          scale,
          y,
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Solutions Carousel - Full Space */}
          <motion.div
            className="w-full max-w-7xl mx-auto relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Arrows - Outside content */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20">
              <motion.button
                className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg -translate-x-4 sm:-translate-x-6"
                onClick={() =>
                  goToSolution(
                    (currentSolutionIndex - 1 + solutions.length) % solutions.length
                  )
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                  />
                </svg>
              </motion.button>
              <motion.button
                className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg translate-x-4 sm:translate-x-6"
                onClick={() => goToSolution((currentSolutionIndex + 1) % solutions.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                  />
                </svg>
              </motion.button>
            </div>

            <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 dark:border-white/10 overflow-hidden">
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSolutionIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
                  >
                    {/* Icon/Image Side */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {solutions[currentSolutionIndex].image ? (
                          // Image support for future
                          <img
                            src={solutions[currentSolutionIndex].image}
                            alt={isRTL ? solutions[currentSolutionIndex].titleAr : solutions[currentSolutionIndex].titleEn}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          // Icon fallback
                          <motion.div
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            {solutions[currentSolutionIndex].icon}
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
                      <motion.h3
                        className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${isRTL ? 'font-somar' : ''}`}
                        style={{
                          color: isDark ? '#E8DCCB' : '#161616',
                          textShadow: isDark
                            ? '0 2px 10px rgba(0,0,0,0.3)'
                            : '0 1px 5px rgba(0,0,0,0.1)',
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {isRTL
                          ? solutions[currentSolutionIndex].titleAr
                          : solutions[currentSolutionIndex].titleEn}
                      </motion.h3>
                      <motion.p
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed ${isRTL ? 'font-somar' : 'font-gotham'}`}
                        style={{
                          color: isDark ? '#E8DCCB' : '#161616',
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {isRTL
                          ? solutions[currentSolutionIndex].descriptionAr
                          : solutions[currentSolutionIndex].descriptionEn}
                      </motion.p>
                      <Link href={`/solutions/${solutions[currentSolutionIndex].slug}`}>
                        <motion.div
                          whileHover={{ x: isRTL ? -5 : 5 }}
                          className="flex items-center gap-2 text-primary font-heading font-medium cursor-pointer text-base sm:text-lg md:text-xl"
                        >
                          <span className={isRTL ? 'font-somar' : ''}>
                            {isRTL ? 'اكتشف المزيد' : 'Discover More'}
                          </span>
                          <motion.svg
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, isRTL ? -5 : 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                            />
                          </motion.svg>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
                  {solutions.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-3 h-3 rounded-full transition-all ${
                        index === currentSolutionIndex
                          ? 'bg-primary'
                          : 'bg-white/40 dark:bg-white/20 hover:bg-white/60'
                      }`}
                      onClick={() => goToSolution(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {index === currentSolutionIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary"
                          layoutId="activeDot"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trusted By Section - Horizontal Looping Marquee */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 2.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Backdrop Blur/Shadow */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: isDark
              ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(248,249,250,0.95) 0%, rgba(248,249,250,0.7) 50%, transparent 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        {/* Trusted By Heading */}
        <motion.div
          className="text-center mb-4 relative z-10 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <motion.p
            className={`font-heading text-sm sm:text-base md:text-lg font-medium tracking-wider ${isRTL ? 'font-somar' : ''}`}
            style={{
              color: isDark ? '#E8DCCB' : '#161616',
              textShadow: isDark
                ? '0 2px 8px rgba(0,0,0,0.4)'
                : '0 1px 4px rgba(0,0,0,0.08)',
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {isRTL ? 'شركاء النجاح' : 'Success Partners'}
          </motion.p>
        </motion.div>

        {/* Horizontal Looping Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Fade Edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)'
                : 'linear-gradient(to right, rgba(248,249,250,0.9) 0%, transparent 100%)',
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)'
                : 'linear-gradient(to left, rgba(248,249,250,0.9) 0%, transparent 100%)',
            }}
          />

          {/* Marquee Container */}
          <motion.div
            className="flex items-center gap-12 sm:gap-16 lg:gap-20"
            animate={marqueeControls}
            style={{
              width: 'fit-content',
            }}
          >
            {/* Duplicate logos for seamless loop */}
            {[...Array(2)].map((_, duplicateIndex) => (
              <div key={duplicateIndex} className="flex items-center gap-12 sm:gap-16 lg:gap-20">
                {[
                  '/trustedby/National_Water_Company_Logo_2021.png',
                  '/trustedby/salogos.org-logo-1.svg',
                  '/trustedby/salogos.org-شركة-المياه.svg',
                ].map((logo, index) => (
                  <motion.div
                    key={`${duplicateIndex}-${index}`}
                    className="flex items-center justify-center flex-shrink-0 group"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <motion.div
                      className="relative px-4 py-2 transition-all duration-300"
                      initial={{
                        filter: isDark
                          ? 'brightness(0) invert(1) opacity(0.7)'
                          : 'brightness(0) opacity(0.6)',
                      }}
                      whileHover={{
                        filter: 'none',
                        opacity: 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={logo}
                        alt={`Trusted partner ${index + 1}`}
                        className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain gpu-accelerated"
                        style={{
                          maxWidth: '220px',
                        }}
                        loading="lazy"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}