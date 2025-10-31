'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInHero(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    const heroElement = document.querySelector('section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  const menuItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.portfolio, href: '/portfolio' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4"
      >
        <motion.div
          animate={{
            paddingTop: isInHero ? '8px' : '5px',
            paddingBottom: isInHero ? '8px' : '5px',
            paddingLeft: isInHero ? '12px' : '10px',
            paddingRight: isInHero ? '12px' : '10px',
            width: isInHero ? 'auto' : 'auto',
            boxShadow: isInHero
              ? '0 6px 20px rgba(0, 0, 0, 0.08)'
              : '0 8px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(41, 171, 226, 0.08)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`rounded-full backdrop-blur-xl transition-colors duration-300 ${
            isDark ? 'bg-gray-900/95 border border-gray-800/50' : 'bg-white/95 border border-gray-200/50'
          }`}
        >
          <div className="flex items-center justify-between gap-1.5">
            <AnimatePresence mode="wait">
              {!isInHero && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Link href="/">
                    <motion.div whileHover={{ scale: 1.05, y: -1 }} transition={{ duration: 0.3 }} className="relative flex items-center">
                      <motion.div
                        className="absolute -inset-3 blur-2xl"
                        animate={{ opacity: isDark ? [0.5, 0.7, 0.5] : [0.4, 0.6, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          background:
                            'radial-gradient(ellipse, rgba(41, 171, 226, 0.9) 0%, rgba(41, 171, 226, 0.5) 40%, transparent 70%)',
                        }}
                      />
                      <img
                        src="/styleguide/SVG/Mark line logo.svg"
                        alt="Mark Line"
                        className="h-14 w-auto object-contain relative z-10"
                        style={{
                          maxWidth: 'none',
                          filter: isDark
                            ? 'drop-shadow(0 8px 20px rgba(41, 171, 226, 0.8)) drop-shadow(0 4px 10px rgba(41, 171, 226, 0.6)) brightness(1.2) saturate(1.4) contrast(1.15)'
                            : 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.2)) drop-shadow(0 4px 12px rgba(41, 171, 226, 0.5)) brightness(1.1) contrast(1.2) saturate(1.25)',
                        }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isInHero ? (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-1 flex-1 justify-center"
                >
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.href.startsWith('/')) {
                          window.location.href = item.href;
                        } else {
                          const sectionId = item.href.replace('#', '');
                          const targetSection = document.getElementById(sectionId);
                          if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          } else {
                            window.location.href = `/${item.href}`;
                          }
                        }
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`relative px-4 py-2 text-sm font-rb-bold transition-all rounded-full whitespace-nowrap border-2 overflow-hidden ${
                        isDark
                          ? 'text-gray-2 00 border-gray-700/50 hover:text-white hover:bg-primary/20 hover:border-primary/60'
                          : 'text-gray-800 border-gray-300/60 hover:text-primary hover:bg-primary/10 hover:border-primary/60'
                      }`}
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      whileHover={{ scale: 1.06, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </motion.a>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ctas"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:flex items-center gap-1.5"
                >
                  <motion.a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.location.href = '/#contact';
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-xs font-rb-bold uppercase tracking-wide rounded-full transition-colors whitespace-nowrap ${
                      isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {t.nav.contact}
                  </motion.a>

                  <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/join-team"
                      className="relative block px-4 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-rb-bold uppercase tracking-wide rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      <span className="relative z-10">{t.nav.joinUs}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`hidden md:flex items-center flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {isInHero && (
                <>
                  <div className="flex items-center gap-1">
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                      <ThemeToggle />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                      <LanguageSwitcher />
                    </motion.div>
                  </div>

                  <div className={`h-6 w-px mx-1.5 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`} />

                  <motion.a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.location.href = '/#contact';
                      }
                    }}
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-4 py-2 text-xs font-rb-bold uppercase tracking-wide rounded-full transition-all whitespace-nowrap border-2 ${
                      isDark ? 'text-gray-200 border-gray-700/50 hover:text-white hover:bg-primary/20 hover:border-primary/60' : 'text-gray-800 border-gray-300/60 hover:text-primary hover:bg-primary/10 hover:border-primary/60'
                    }`}
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {t.nav.contact}
                  </motion.a>

                  <motion.div whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/join-team"
                      className="relative block px-5 py-2 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-rb-bold uppercase tracking-wide rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all whitespace-nowrap border-2 border-primary/50"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      <span className="relative z-10">{t.nav.joinUs}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </motion.div>
                </>
              )}

              {!isInHero && (
                <div className="flex items-center gap-1">
                  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                    <ThemeToggle />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                    <LanguageSwitcher />
                  </motion.div>
                </div>
              )}
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/80'}`}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span className={`w-full h-0.5 origin-center ${isDark ? 'bg-gray-200' : 'bg-gray-800'}`} animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
                <motion.span className={`w-full h-0.5 ${isDark ? 'bg-gray-200' : 'bg-gray-800'}`} animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} transition={{ duration: 0.2 }} />
                <motion.span className={`w-full h-0.5 origin-center ${isDark ? 'bg-gray-200' : 'bg-gray-800'}`} animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40 rounded-3xl backdrop-blur-xl shadow-2xl md:hidden overflow-hidden ${
              isDark ? 'bg-gray-900/95 border border-gray-800/50' : 'bg-white/95 border border-gray-200/50'
            }`}
          >
            <motion.div className="p-6 space-y-2" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
              <motion.div className="flex justify-center gap-4 pb-4 mb-4 border-b border-gray-700/30 dark:border-gray-600/30" variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <ThemeToggle />
                <LanguageSwitcher />
              </motion.div>

              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (item.href.startsWith('/')) {
                      window.location.href = item.href;
                    } else {
                      const sectionId = item.href.replace('#', '');
                      const targetSection = document.getElementById(sectionId);
                      if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.location.href = `/${item.href}`;
                      }
                    }
                  }}
                  className={`block py-3 px-4 text-center font-rb-bold rounded-xl transition-all ${
                    isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className={`block py-3 px-4 text-center font-rb-bold rounded-xl transition-all ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.contact}
              </motion.a>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="pt-4">
                <Link
                  href="/join-team"
                  className="block text-center bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-full font-rb-bold uppercase tracking-wide shadow-lg"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.joinUs}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


