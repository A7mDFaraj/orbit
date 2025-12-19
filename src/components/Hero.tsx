'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Orb from './Orb';
import OrbitSectionBackground from './OrbitSectionBackground';

export default function Hero() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Use ORBIT translations directly - no API fetch
  const heroContent = {
    title: isRTL ? 'أوربيت نجاحك' : 'ORBIT Your Success',
    description: isRTL
      ? 'المدار شركة سعودية رائدة في تقديم الحلول التقنية الذكية، نعمل على تمكين المؤسسات من التطور عبر تقنيات حديثة تضمن كفاءة أعلى، تواصل أسرع، وتجربة رقمية متكاملة'
      : 'ORBIT is a leading Saudi company providing smart technical solutions. We work to enable organizations to evolve through modern technologies that ensure higher efficiency, faster communication, and an integrated digital experience',
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 gpu-accelerated"
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
          {/* Enhanced Glow Behind Title - Optimized blur */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none gpu-accelerated"
            style={{ zIndex: -1, willChange: 'transform, opacity' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: [0.25, 0.45, 0.25],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full max-w-5xl h-40 blur-2xl"
              style={{
                background: `radial-gradient(ellipse, ${isDark ? 'rgba(122, 30, 46, 0.4)' : 'rgba(122, 30, 46, 0.2)'} 0%, transparent 70%)`,
                transform: 'translateZ(0)',
              }}
            />
          </motion.div>

          {/* Main Title - Enhanced Staggered Word Animation */}
          <motion.h1
            className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 sm:mb-12 leading-tight relative ${isRTL ? 'font-somar' : ''}`}
            style={{
              color: isDark ? '#FFFFFF' : '#161616',
              textShadow: isDark
                ? '0 0 80px rgba(122, 30, 46, 0.5), 0 0 120px rgba(122, 30, 46, 0.4), 0 4px 20px rgba(0,0,0,0.6)'
                : '0 2px 40px rgba(122, 30, 46, 0.25), 0 4px 20px rgba(0,0,0,0.15)',
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {heroContent.title.split(' ').map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block relative gpu-accelerated"
                initial={{
                  opacity: 0,
                  y: 50,
                  rotateX: -90,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                style={{
                  ...{
                    marginRight: isRTL ? '0' : '0.25em',
                    marginLeft: isRTL ? '0.25em' : '0',
                    transformStyle: 'preserve-3d',
                  },
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.6 + wordIndex * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <span className="relative z-10">{word}</span>
                {/* Subtle underline effect on hover */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            ))}
          </motion.h1>

          {/* Enhanced Animated Divider with Gradient Flow */}
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mb-8 sm:mb-12 rounded-full overflow-hidden relative"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {/* Pulsing dot in center */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>

          {/* Enhanced Description with Character Reveal Effect */}
          <motion.p
            className={`font-gotham text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed relative ${isRTL ? 'font-somar' : ''}`}
            style={{
              color: isDark ? '#E8DCCB' : '#161616',
              textShadow: isDark
                ? '0 2px 15px rgba(0,0,0,0.4)'
                : '0 1px 8px rgba(0,0,0,0.15)',
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 2,
                ease: 'easeOut',
              }}
              className="inline-block gpu-accelerated"
              style={{ willChange: 'opacity' }}
            >
              {heroContent.description}
            </motion.span>
          </motion.p>

          {/* Decorative Elements - Subtle Accents */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-12 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 2.3,
              ease: 'easeOut',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i === 1 ? '#7A1E2E' : '#E8DCCB',
                  opacity: 0.6,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator with Magnetic Effect */}
      <motion.div
        className="absolute bottom-8 right-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
          whileHover={{ scale: 1.15, y: 0 }}
        >
          <motion.span
            className={`font-gotham text-sm text-neutral transition-colors ${isRTL ? 'font-somar' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ color: '#7A1E2E' }}
          >
            {isRTL ? 'انتقل للأسفل' : 'Scroll'}
          </motion.span>
          <motion.div
            className="w-6 h-10 border-2 border-neutral rounded-full flex items-start justify-center p-2 relative overflow-hidden transition-colors"
            whileHover={{ borderColor: '#7A1E2E' }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full relative z-10"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}