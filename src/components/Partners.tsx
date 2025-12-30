'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Partners() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [partners, setPartners] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeControls = useAnimationControls();
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Fetch partners from database
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersRes = await fetch('/api/partners');
        const partnersData = await partnersRes.json();
        if (partnersData.success && partnersData.partners && partnersData.partners.length > 0) {
          const mappedPartners = partnersData.partners
            .filter((p: any) => p.isActive)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((p: any) => ({
              name: p.name,
              logo: p.logo,
              website: p.website,
            }));
          setPartners(mappedPartners);
        } else {
          // Fallback to default partners
          setPartners([
            { name: 'Partner 1', logo: '/partners/partner1.png', website: '#' },
            { name: 'Partner 2', logo: '/partners/partner2.png', website: '#' },
            { name: 'Partner 3', logo: '/partners/partner3.png', website: '#' },
            { name: 'Partner 4', logo: '/partners/partner4.png', website: '#' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
        // Fallback to default partners
        setPartners([
          { name: 'Partner 1', logo: '/partners/partner1.png', website: '#' },
          { name: 'Partner 2', logo: '/partners/partner2.png', website: '#' },
          { name: 'Partner 3', logo: '/partners/partner3.png', website: '#' },
          { name: 'Partner 4', logo: '/partners/partner4.png', website: '#' },
        ]);
      } finally {
        setMounted(true);
      }
    };

    fetchPartners();
  }, []);

  // Start marquee animation after mounted - Smart RTL/LTR support with seamless infinite loop from edge
  useEffect(() => {
    if (mounted && !isMarqueePaused && partners.length > 0) {
      const startAnimation = () => {
        if (marqueeRef.current) {
          const firstSet = marqueeRef.current.querySelector('.marquee-set') as HTMLElement;
          if (firstSet && firstSet.offsetWidth > 0) {
            const setWidth = firstSet.offsetWidth;
            // For RTL: start from right edge (0), move right (positive), logos appear from left
            // For LTR: start from left edge (0), move left (negative), logos appear from right
            const direction = isRTL ? 1 : -1;
            marqueeControls.start({
              x: [0, direction * setWidth],
              transition: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: Math.max(20, partners.length * 4),
                ease: 'linear',
              },
            });
            return;
          }
        }
        // Fallback: use percentage-based animation
        const direction = isRTL ? 1 : -1;
        marqueeControls.start({
          x: ['0%', `${direction * 33.333}%`],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: Math.max(20, partners.length * 4),
            ease: 'linear',
          },
        });
      };

      startAnimation();
      const timeout = setTimeout(startAnimation, 100);
      
      return () => clearTimeout(timeout);
    } else if (isMarqueePaused) {
      marqueeControls.stop();
    }
  }, [isMarqueePaused, marqueeControls, mounted, partners.length, isRTL]);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.2,
        delay: 2.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: '100%' }}
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
        className="text-center mb-4 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
      >
        <motion.p
          className={`font-heading text-sm sm:text-base md:text-lg font-medium tracking-wider ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
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

      {/* Horizontal Looping Marquee - Smart RTL/LTR & Full Width Infinite Loop from Edge */}
      <div className="relative w-full overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Gradient Fade Edges - RTL/LTR aware */}
        <div
          className={`absolute top-0 bottom-0 z-20 pointer-events-none ${
            isRTL ? 'right-0' : 'left-0'
          } w-16 sm:w-24 md:w-32`}
          style={{
            background: isDark
              ? `linear-gradient(to ${isRTL ? 'left' : 'right'}, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)`
              : `linear-gradient(to ${isRTL ? 'left' : 'right'}, rgba(248,249,250,0.95) 0%, rgba(248,249,250,0.8) 50%, transparent 100%)`,
          }}
        />
        <div
          className={`absolute top-0 bottom-0 z-20 pointer-events-none ${
            isRTL ? 'left-0' : 'right-0'
          } w-16 sm:w-24 md:w-32`}
          style={{
            background: isDark
              ? `linear-gradient(to ${isRTL ? 'right' : 'left'}, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)`
              : `linear-gradient(to ${isRTL ? 'right' : 'left'}, rgba(248,249,250,0.95) 0%, rgba(248,249,250,0.8) 50%, transparent 100%)`,
          }}
        />

        {/* Marquee Container - Infinite seamless loop using full width from edge */}
        {partners.length > 0 && (
          <div className="relative w-full overflow-hidden" style={{ margin: 0, padding: 0 }}>
            <motion.div
              ref={marqueeRef}
              className="flex items-center"
              animate={marqueeControls}
              initial={{ x: isRTL ? 0 : 0 }}
              style={{
                display: 'flex',
                width: 'max-content',
                willChange: 'transform',
                position: 'relative',
                margin: 0,
                padding: 0,
              }}
            >
              {/* Create 3 sets for seamless infinite loop - logos appear from opposite side, starting at edge */}
              {[...Array(3)].map((_, setIndex) => (
                <div
                  key={setIndex}
                  className="marquee-set flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 flex-shrink-0"
                  style={{ 
                    display: 'flex',
                    marginLeft: setIndex === 0 && !isRTL ? 0 : undefined,
                    marginRight: setIndex === 0 && isRTL ? 0 : undefined,
                  }}
                >
                  {partners.map((partner, index) => (
                    <motion.div
                      key={`${setIndex}-${index}`}
                      className="flex items-center justify-center flex-shrink-0 group cursor-pointer"
                      style={{
                        marginLeft: setIndex === 0 && index === 0 && !isRTL ? 0 : undefined,
                        marginRight: setIndex === 0 && index === 0 && isRTL ? 0 : undefined,
                      }}
                      whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 transition-all duration-300"
                        style={{
                          paddingLeft: setIndex === 0 && index === 0 && !isRTL ? '0.5rem' : undefined,
                          paddingRight: setIndex === 0 && index === 0 && isRTL ? '0.5rem' : undefined,
                        }}
                        initial={{
                          filter: isDark
                            ? 'brightness(0) invert(1) opacity(0.6)'
                            : 'brightness(0) opacity(0.5)',
                        }}
                        whileHover={{
                          filter: 'none',
                          opacity: 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name || `Trusted partner ${index + 1}`}
                          className="h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain gpu-accelerated select-none"
                          style={{
                            maxWidth: 'clamp(80px, 15vw, 180px)',
                            height: 'auto',
                          }}
                          loading="lazy"
                          draggable={false}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

