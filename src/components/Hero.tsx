'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LightRays from './LightRays';

interface HeroSettings {
  title: string;
  titleAr: string;
  subtitle1: string;
  subtitle1Ar: string;
  subtitle2: string;
  subtitle2Ar: string;
  subtitle3: string;
  subtitle3Ar: string;
  description: string;
  descriptionAr: string;
  cta1: string;
  cta1Ar: string;
  cta2: string;
  cta2Ar: string;
}

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [heroData, setHeroData] = useState<HeroSettings | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate stable random values for moving squares (fixes hydration error)
  const [squarePositions] = useState(() => 
    Array.from({ length: 5 }, () => ({
      left: Math.random() * 80,
      top: Math.random() * 80,
      xOffset: Math.random() * 100 - 50,
      yOffset: Math.random() * 100 - 50,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
    }))
  );

  useEffect(() => {
    setMounted(true);
    fetch('/api/hero-settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setHeroData(data.settings);
        }
      })
      .catch((err) => console.error('Error fetching hero settings:', err))
      .finally(() => {
        // Small delay to ensure smooth rendering
        setTimeout(() => setIsLoading(false), 100);
      });
  }, []);

  // Use fetched data if available, otherwise fallback to translations (memoized for performance)
  const heroContent = useMemo(() => heroData ? {
    title: isRTL ? heroData.titleAr : heroData.title,
    subtitle1: isRTL ? heroData.subtitle1Ar : heroData.subtitle1,
    subtitle2: isRTL ? heroData.subtitle2Ar : heroData.subtitle2,
    subtitle3: isRTL ? heroData.subtitle3Ar : heroData.subtitle3,
    description: isRTL ? heroData.descriptionAr : heroData.description,
    cta1: isRTL ? heroData.cta1Ar : heroData.cta1,
    cta2: isRTL ? heroData.cta2Ar : heroData.cta2,
  } : {
    title: t.hero.title,
    subtitle1: t.hero.subtitle1,
    subtitle2: t.hero.subtitle2,
    subtitle3: t.hero.subtitle3,
    description: t.hero.description,
    cta1: t.hero.cta1,
    cta2: t.hero.cta2,
  }, [heroData, isRTL, t]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
      {/* Animated Squares Background - Optimized & Performance Enhanced */}
      <div className="absolute inset-0 overflow-hidden opacity-100">
        {/* Static Grid Base - No animation for better performance */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: isDark 
              ? `
                linear-gradient(rgba(41, 171, 226, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(41, 171, 226, 0.08) 1px, transparent 1px)
              `
              : `
                linear-gradient(rgba(41, 171, 226, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(41, 171, 226, 0.15) 1px, transparent 1px)
              `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Selective Animated Squares - Reduced count for performance */}
        {mounted && (
          <div className="absolute inset-0" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gridTemplateRows: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '1px',
          }}>
            {[...Array(60)].map((_, i) => {
              // Use index-based stable calculations
              const randomDelay = (i * 0.5) % 5;
              const randomDuration = 2 + ((i * 0.3) % 3);
              const shouldAnimate = i % 3 === 0; // Only 33% of squares animate
              
              return (
                <motion.div
                  key={i}
                  className="relative gpu-accelerated"
                  style={{
                    background: 'transparent',
                  }}
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? {
                    opacity: isDark ? [0, 0.3, 0] : [0, 0.5, 0],
                    scale: [0.9, 1, 0.9],
                  } : { opacity: 0 }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="absolute inset-0 border border-primary/20 dark:border-primary/20 bg-primary/8 dark:bg-primary/10 rounded-sm" />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Moving Highlight Squares - Optimized with stable positions */}
        {mounted && squarePositions.map((pos, i) => (
          <motion.div
            key={`highlight-${i}`}
            className="absolute w-20 h-20 border-2 border-primary/50 dark:border-primary/60 bg-primary/12 dark:bg-primary/20 rounded-lg shadow-xl shadow-primary/20 dark:shadow-primary/20 gpu-accelerated"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              x: [0, pos.xOffset, 0],
              y: [0, pos.yOffset, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.15, 1],
              opacity: isDark ? [0.2, 0.5, 0.2] : [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pos.delay,
            }}
          />
        ))}

        {/* Pulsing Corner Squares - Optimized */}
        {mounted && [
          { position: 'top-0 left-0', delay: 0 },
          { position: 'top-0 right-0', delay: 1 },
          { position: 'bottom-0 left-0', delay: 2 },
          { position: 'bottom-0 right-0', delay: 3 },
        ].map((corner, i) => (
          <motion.div
            key={`corner-${i}`}
            className={`absolute ${corner.position} w-32 h-32 gpu-accelerated`}
            animate={{
              opacity: isDark ? [0.1, 0.3, 0.1] : [0.2, 0.45, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: corner.delay,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/35 to-transparent dark:from-primary/30 dark:to-transparent rounded-lg" />
          </motion.div>
        ))}

        {/* Center Glow Effect - Optimized */}
        {mounted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              scale: [1, 1.08, 1],
              opacity: isDark ? [0.2, 0.35, 0.2] : [0.3, 0.45, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-96 h-96 bg-primary/15 dark:bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        )}
      </div>

      {/* Main Content Container - Optimized Spacing & Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* COMMENTED OUT: Company Logo section - Preserved for future use if needed
             Original logo code with animated glow effects has been commented out.
             To restore: uncomment lines 213-352 and remove this comment. */}
          {false && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <motion.div
              className="relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Enhanced Multi-Layer Glow Effect - More prominent in light mode */}
              {!isDark && (
                <>
                  {/* Outer glow ring - Wide spread */}
                  <motion.div
                    className="absolute inset-0 -m-16 sm:-m-20 md:-m-24 lg:-m-28 blur-3xl"
                    animate={{
                      opacity: [0.25, 0.45, 0.25],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(41, 171, 226, 0.6) 0%, rgba(41, 171, 226, 0.35) 30%, rgba(41, 171, 226, 0.15) 50%, transparent 70%)',
                    }}
                  />
                  
                  {/* Middle glow layer - Medium spread */}
                  <motion.div
                    className="absolute inset-0 -m-10 sm:-m-12 md:-m-14 lg:-m-16 blur-2xl"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: 'radial-gradient(ellipse, rgba(41, 171, 226, 0.7) 0%, rgba(41, 171, 226, 0.4) 40%, transparent 70%)',
                    }}
                  />
                  
                  {/* Inner glow - Tight and bright */}
                  <motion.div
                    className="absolute inset-0 -m-6 blur-xl"
                    animate={{
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(41, 171, 226, 0.8) 0%, rgba(41, 171, 226, 0.5) 35%, transparent 65%)',
                    }}
                  />
                  
                  {/* Spotlight effect from above */}
                  <motion.div
                    className="absolute inset-x-0 -top-20 h-40 blur-2xl"
                    animate={{
                      opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: 'linear-gradient(to bottom, rgba(41, 171, 226, 0.4) 0%, transparent 100%)',
                    }}
                  />
                </>
              )}
              
              {/* Simple glow for dark mode */}
              {isDark && (
                <motion.div
                  className="absolute inset-0 -m-4 blur-2xl"
                  animate={{
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(41, 171, 226, 0.4) 0%, transparent 70%)',
                  }}
                />
              )}
              
              {/* Main Logo - BIGGER in light mode */}
              <motion.img
                src={isDark ? "/styleguide/SVG/Mark line logo.svg" : "/styleguide/SVG/Mark line logo 2.svg"}
                alt="Mark Line"
                key={isDark ? "dark-logo" : "light-logo"}
                className={
                  isDark 
                    ? "h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-auto object-contain relative z-10"
                    : "h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] w-auto object-contain relative z-10"
                }
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -12, 0],
                  filter: isDark 
                    ? 'drop-shadow(0 10px 30px rgba(41, 171, 226, 0.4))'
                    : [
                        'drop-shadow(0 25px 60px rgba(41, 171, 226, 0.4)) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15)) brightness(1.05) contrast(1.08) saturate(1.1)',
                        'drop-shadow(0 30px 70px rgba(41, 171, 226, 0.5)) drop-shadow(0 12px 35px rgba(0, 0, 0, 0.18)) brightness(1.08) contrast(1.1) saturate(1.15)',
                        'drop-shadow(0 25px 60px rgba(41, 171, 226, 0.4)) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15)) brightness(1.05) contrast(1.08) saturate(1.1)',
                      ],
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  filter: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </motion.div>
          </motion.div>
          )}

          {/* MAIN HERO FOCUS: Heading is the primary element - Enhanced for Longer Text */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-rb-bold mb-12 sm:mb-16 md:mb-20 uppercase tracking-tight text-center leading-[1.2] relative px-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0, scale: isLoading ? 0.95 : 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined, zIndex: 10, position: 'relative' }}
          >
            {/* Enhanced Light Rays Effect Behind Heading - Behind All Content */}
            <div 
              key={`rays-${isDark ? 'dark' : 'light'}-${isRTL ? 'rtl' : 'ltr'}`}
              className="absolute pointer-events-none" 
              style={{ 
                width: '120%', 
                height: '600px',
                top: isDark ? '-80px' : '-150px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: -10
              }}
            >
              <LightRays
                raysOrigin="top-center"
                raysColor={isDark ? "#29ABE2" : "#1a5a7a"}
                raysSpeed={0.8}
                lightSpread={isDark ? 0.6 : 0.5}
                rayLength={isDark ? 2.2 : 1.8}
                followMouse={true}
                mouseInfluence={0.08}
                noiseAmount={0.2}
                distortion={0.1}
                fadeDistance={isDark ? 1.6 : 1.4}
                saturation={isDark ? 0.9 : 0.7}
                className="hero-light-rays"
              />
            </div>

            {/* Additional Dark Mode Glow Effect for Better Visibility */}
            {isDark && (
              <motion.div
                className="absolute inset-0 -inset-x-8 -inset-y-4 blur-3xl pointer-events-none"
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(41, 171, 226, 0.3) 0%, transparent 70%)',
                  zIndex: -5,
                }}
              />
            )}

                 {/* Multi-Word Heading with Alternating Styles */}
                  {isRTL ? (
                    // Arabic version - word-by-word animation
                    <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2" style={{ zIndex: 10, position: 'relative' }}>
                      {heroContent.title.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + wordIndex * 0.1, duration: 0.6 }}
                          className={wordIndex % 2 === 0 
                            ? "text-gray-900 dark:text-white font-rb-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_2px_12px_rgba(41,171,226,0.5)]"
                            : "text-primary font-rb-bold drop-shadow-[0_2px_8px_rgba(41,171,226,0.4)] dark:drop-shadow-[0_2px_16px_rgba(41,171,226,0.8)]"
                          }
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  ) : (
                    // English version - word-by-word with lined pattern
                    <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2" style={{ zIndex: 10 }}>
                      {heroContent.title.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + wordIndex * 0.08, duration: 0.6 }}
                          className="relative inline-block"
                        >
                          <motion.span
                            className="relative inline-block"
                            animate={{
                              backgroundPosition: wordIndex % 2 === 0 
                                ? ['0px 0px', '0px 10px']
                                : ['0px 0px', '0px -10px'],
                            }}
                            transition={{
                              duration: 3 + (wordIndex % 2),
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            style={{
                              backgroundImage: wordIndex % 2 === 0
                                ? (isDark
                                  ? `repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 3px, #f0f0f0 3px, #f0f0f0 4px, transparent 4px, transparent 5px)`
                                  : `repeating-linear-gradient(0deg, #000000 0px, #000000 2px, transparent 2px, transparent 3px, #1a1a1a 3px, #1a1a1a 4px, transparent 4px, transparent 5px)`)
                                : `repeating-linear-gradient(0deg, #29ABE2 0px, #29ABE2 2px, transparent 2px, transparent 3px, #1e88b8 3px, #1e88b8 4px, transparent 4px, transparent 5px)`,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundSize: '100% 10px',
                              backgroundPosition: '0px 0px',
                              display: 'inline-block',
                              filter: wordIndex % 2 === 0
                                ? (isDark 
                                  ? 'contrast(1.2) brightness(1.15) drop-shadow(0 2px 12px rgba(255,255,255,0.3))' 
                                  : 'contrast(1.1) brightness(1.05)')
                                : (isDark
                                  ? 'drop-shadow(0 0 40px rgba(41, 171, 226, 0.7)) drop-shadow(0 0 20px rgba(41, 171, 226, 0.5)) brightness(1.15) contrast(1.1)'
                                  : 'drop-shadow(0 0 30px rgba(41, 171, 226, 0.4)) brightness(1.1)'),
                            }}
                          >
                            {word}
                          </motion.span>
                        </motion.span>
                      ))}
                    </span>
                  )}
          </motion.h1>

          {/* COMMENTED OUT: Value Proposition Tags - Hidden as per client request */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 sm:mb-10 md:mb-12 w-full"
          >
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {[heroContent.subtitle1, heroContent.subtitle2, heroContent.subtitle3].map((subtitle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -5,
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative px-5 py-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-primary/30 dark:border-primary/40 shadow-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10"
                      transition={{ duration: 0.3 }}
                    />
                    
                          <span className="relative z-10 flex items-center text-xs sm:text-sm font-rb-bold uppercase tracking-wide" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                            {isRTL ? (
                              <motion.span
                                className="inline-block"
                                style={{
                                  color: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                                }}
                                animate={{
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                              >
                                {subtitle}
                              </motion.span>
                            ) : (
                              subtitle.split('').map((char, charIndex) => (
                                <motion.span
                                  key={charIndex}
                                  className="inline-block"
                                  style={{
                                    color: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)',
                                  }}
                                  animate={{
                                    y: [0, -4, 0],
                                    scale: [1, 1.15, 1],
                                    opacity: [0.7, 1, 0.7],
                                    color: isDark 
                                      ? [
                                          'rgb(229, 231, 235)',
                                          'rgb(41, 171, 226)',
                                          'rgb(229, 231, 235)',
                                        ]
                                      : [
                                          'rgb(55, 65, 81)',
                                          'rgb(41, 171, 226)',
                                          'rgb(55, 65, 81)',
                                        ],
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: charIndex * 0.08 + index * 0.4,
                                    ease: 'easeInOut',
                                  }}
                                  whileHover={{
                                    scale: 1.35,
                                    color: 'rgb(41, 171, 226)',
                                    y: -6,
                                    transition: { duration: 0.2 }
                                  }}
                                >
                                  {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                              ))
                            )}
                          </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Description - Robust & Production-Ready */}
          <div className="text-base sm:text-lg lg:text-xl mb-12 sm:mb-14 md:mb-16 max-w-4xl mx-auto leading-[1.8] font-montserrat font-normal text-center px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              {/* Subtle Background Glow - Non-animated for stability */}
              <div
                className="absolute inset-0 -inset-x-12 -inset-y-6 blur-2xl opacity-20 pointer-events-none"
                style={{
                  background: isDark 
                    ? 'radial-gradient(ellipse, rgba(41, 171, 226, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse, rgba(41, 171, 226, 0.12) 0%, transparent 70%)',
                  zIndex: -1,
                }}
              />
              
              <motion.p
                className="relative text-gray-700 dark:text-gray-200 font-medium"
                style={{ 
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  willChange: 'opacity',
                  transform: 'translateZ(0)', // Force GPU acceleration
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {heroContent.description}
              </motion.p>
            </motion.div>
          </div>

          {/* CTA Buttons - Optimized Spacing for Layout Without Subtitle Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center mt-2 relative z-10"
          >
            {/* Primary CTA - Request Quote */}
            <motion.a
              href="/request-quote"
              className="group relative px-8 py-3 bg-primary text-white rounded-lg font-rb-bold uppercase tracking-wider overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
              {heroContent.cta1}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              
              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>

            {/* Secondary CTA - Fixed Animation */}
            <motion.a
              href="#services"
              className="group relative px-8 py-3 bg-white dark:bg-gray-800 rounded-lg font-rb-bold border-2 border-primary uppercase tracking-wider shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover background - smooth transition */}
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Button content - changes color on hover */}
              <span className="relative z-10 flex items-center gap-2 text-gray-900 dark:text-primary group-hover:text-white transition-colors duration-300">
                {heroContent.cta2}
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.span>
              </span>
              
              {/* Animated border shine effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(41, 171, 226, 0.5), transparent)',
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </motion.a>
          </motion.div>

        </motion.div>

        {/* Enhanced Scroll Indicator - Positioned Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="fixed bottom-12 right-8 z-20 cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-7 h-11 border-2 border-primary dark:border-primary/80 rounded-full flex justify-center pt-2 group-hover:border-primary dark:group-hover:border-primary transition-colors shadow-lg group-hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <motion.div 
                  className="w-1.5 h-3 bg-primary dark:bg-primary/80 rounded-full group-hover:bg-primary dark:group-hover:bg-primary"
                  animate={{ 
                    y: [0, 6, 0],
                    opacity: [1, 0.5, 1] 
                  }}
                  transition={{ 
                    duration: 1.8, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
            
            <motion.span 
              className="text-xs font-rb-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {isRTL ? 'اسحب' : 'Scroll'}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


