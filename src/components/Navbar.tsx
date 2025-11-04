"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const isPortfolioPage = pathname?.startsWith('/portfolio');

  // Lock body scroll when mobile menu is open
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Center navigation items - same for both languages
  const centerMenuItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.contact, href: '#contact' },
  ];

  // Force dark navbar on portfolio pages
  const navbarIsDark = isPortfolioPage ? true : isDark;
  
  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 ${navbarIsDark ? 'bg-gray-950' : 'bg-gray-50'} border-b ${navbarIsDark ? 'border-gray-800' : 'border-gray-200'}`}
      dir="ltr" // Keep layout LTR (logo left, menu center, buttons right)
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4 relative">
          {/* Left: Logo & Badge */}
          <div className="flex items-center gap-4 flex-shrink-0 min-w-[280px]">
            <Link href="/" className="flex items-center group">
              <motion.img
                key={navbarIsDark ? 'dark-logo' : 'light-logo'}
                src={navbarIsDark ? '/styleguide/SVG/Mark line wordmark.svg' : '/styleguide/SVG/Mark line wordmark light.svg'}
                alt="Mark Line"
                className="h-[68px] w-auto"
                style={{
                  filter: navbarIsDark
                    ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                    : 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
                }}
                whileHover={{ 
                  scale: 1.02,
                  filter: navbarIsDark 
                    ? 'drop-shadow(0 6px 16px rgba(41, 171, 226, 0.3))' 
                    : 'drop-shadow(0 2px 8px rgba(41, 171, 226, 0.2))',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </Link>
            <div className={`hidden xl:flex items-center pl-4 ${navbarIsDark ? 'border-l-2 border-gray-700' : 'border-l-2 border-gray-300'}`}>
              <div className="flex flex-col gap-1 relative">
                {/* Made in Saudi */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.span
                    className="uppercase text-xs font-extrabold leading-none tracking-wider relative z-10 inline-block"
                    style={{ 
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                      background: 'linear-gradient(90deg, #29ABE2 0%, #1e88b8 50%, #29ABE2 100%)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    animate={{
                      backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {t.nav.madeInSaudi}
                  </motion.span>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary via-blue-400 to-primary"
                    style={{ width: '100%' }}
                    animate={{
                      scaleX: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 blur-md opacity-40"
                    style={{
                      background: 'linear-gradient(90deg, #29ABE2, #1e88b8)',
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Center: Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center px-4">
            {(isRTL ? [...centerMenuItems].reverse() : centerMenuItems).map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (!item.href.startsWith('/')) {
                    e.preventDefault();
                    const id = item.href.replace('#', '');
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      window.location.href = `/${item.href}`;
                    }
                  }
                }}
                className={`relative ${isRTL ? 'px-4 py-2' : 'px-3.5 py-2'} ${isRTL ? 'text-[13px]' : 'text-[11px]'} font-rb-bold uppercase tracking-wider whitespace-nowrap overflow-hidden group ${navbarIsDark ? 'text-gray-300' : 'text-gray-700'}`}
                style={{ 
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  letterSpacing: isRTL ? '0.05em' : '0.08em',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ y: 0 }}
              >
                {/* Background glow on hover */}
                <motion.span
                  className={`absolute inset-0 rounded-md ${navbarIsDark ? 'bg-primary/10' : 'bg-primary/5'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.2 },
                  }}
                />
                
                {/* Text with color change */}
                <motion.span 
                  className="relative z-10 inline-block"
                  whileHover={{
                    color: '#29ABE2',
                    transition: { duration: 0.2 },
                  }}
                >
                  {item.name}
                </motion.span>
                
                {/* Bottom border with gradient */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-blue-400 to-primary rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    opacity: 1,
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                />
                
                {/* Sparkle effect on hover */}
                <motion.span
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{
                    scale: [0, 4, 0],
                    opacity: [0, 1, 0],
                    transition: { 
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  }}
                  style={{
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(41, 171, 226, 0.5)',
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 min-w-[280px] justify-end">
            <div className={`flex items-center rounded-full ${navbarIsDark ? 'bg-gray-900/80 border border-gray-700' : 'bg-white/90 border border-gray-200'} p-1.5 backdrop-blur-sm`}> 
              {!isPortfolioPage && <ThemeToggle />}
              <LanguageSwitcher />
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/packages"
                className={`${isRTL ? 'px-5 py-2.5 text-[13px]' : 'px-4 py-2.5 text-[11px]'} rounded-lg font-rb-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${navbarIsDark ? 'bg-gray-800 text-primary border-2 border-primary hover:bg-primary hover:text-white' : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md'}`}
                style={{ 
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                }}
              >
                {t.nav.packages}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/join-team"
                className={`${isRTL ? 'px-5 py-2.5 text-[13px]' : 'px-4 py-2.5 text-[11px]'} rounded-lg text-white font-rb-bold uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300`}
                style={{ 
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                }}
              >
                {t.nav.joinUs}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button - Animated Hamburger */}
          <motion.button
            className={`lg:hidden p-2 rounded-lg relative z-50 ${navbarIsDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className={`block h-0.5 w-full rounded-full ${navbarIsDark ? 'bg-gray-200' : 'bg-gray-800'}`}
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 10 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                className={`block h-0.5 w-full rounded-full ${navbarIsDark ? 'bg-gray-200' : 'bg-gray-800'}`}
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? -20 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <motion.span
                className={`block h-0.5 w-full rounded-full ${navbarIsDark ? 'bg-gray-200' : 'bg-gray-800'}`}
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -10 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen with Animations */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, pointerEvents: 'auto' },
          closed: { opacity: 0, pointerEvents: 'none' },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden"
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: navbarIsDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)',
          }}
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
          onClick={toggleMenu}
        />

        {/* Menu Panel */}
        <motion.div
          className={`absolute top-20 ${isRTL ? 'right-0' : 'left-0'} w-full max-w-md h-[calc(100vh-5rem)] overflow-y-auto ${navbarIsDark ? 'bg-gray-950/95' : 'bg-white/95'} backdrop-blur-xl border-t ${navbarIsDark ? 'border-gray-800' : 'border-gray-200'} shadow-2xl`}
          variants={{
            open: { x: 0 },
            closed: { x: isRTL ? '100%' : '-100%' },
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="p-6 space-y-8">
            {/* Theme & Language Controls */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: -20 },
              }}
              transition={{ delay: 0.1 }}
              className={`flex items-center gap-3 p-4 rounded-2xl ${navbarIsDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}
            >
              <div className="flex items-center gap-2">
                {!isPortfolioPage && (
                  <div className={`p-1.5 rounded-lg ${navbarIsDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <ThemeToggle />
                  </div>
                )}
                <div className={`p-1.5 rounded-lg ${navbarIsDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -20 },
                }}
                transition={{ delay: 0.15 }}
                className={`text-xs font-rb-bold uppercase tracking-wider px-4 py-2 ${navbarIsDark ? 'text-gray-500' : 'text-gray-400'}`}
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.nav.menu || 'Menu'}
              </motion.div>

              {centerMenuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.body.style.overflow = 'unset';
                    setIsOpen(false);
                    if (item.href.startsWith('/')) {
                      window.location.href = item.href;
                    } else {
                      const id = item.href.replace('#', '');
                      setTimeout(() => {
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          window.location.href = `/${item.href}`;
                        }
                      }, 100);
                    }
                  }}
                  className={`group flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${navbarIsDark ? 'hover:bg-gray-900/70 text-gray-200' : 'hover:bg-gray-100 text-gray-800'}`}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  }}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: isRTL ? 50 : -50 },
                  }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg font-rb-bold">{item.name}</span>
                  <motion.svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0, opacity: 0.5 }}
                    whileHover={{ x: isRTL ? -5 : 5, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                    />
                  </motion.svg>
                </motion.a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 },
              }}
              transition={{ delay: 0.4 }}
              className="space-y-3 pt-6 border-t"
              style={{
                borderColor: navbarIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/packages"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-rb-bold text-base tracking-wide transition-all duration-300 ${navbarIsDark ? 'bg-gray-900 text-primary border-2 border-primary hover:bg-primary hover:text-white' : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl'}`}
                  onClick={() => {
                    document.body.style.overflow = 'unset';
                    setIsOpen(false);
                  }}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {t.nav.packages}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/join-team"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-rb-bold text-base tracking-wide bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    document.body.style.overflow = 'unset';
                    setIsOpen(false);
                  }}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t.nav.joinUs}
                </Link>
              </motion.div>
            </motion.div>

            {/* Footer Info */}
            <motion.div
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 },
              }}
              transition={{ delay: 0.5 }}
              className={`text-center pt-6 ${navbarIsDark ? 'text-gray-500' : 'text-gray-400'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-extrabold text-primary" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                  {t.nav.madeInSaudi}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
