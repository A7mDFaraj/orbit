"use client";

import { useState } from 'react';
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
                {/* Top label - Creative Marketing */}
                <motion.div
                  className="relative overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.span
                    className={`uppercase ${navbarIsDark ? 'text-gray-400' : 'text-gray-600'} text-[10px] tracking-[0.15em] font-medium leading-none block relative z-10`}
                    style={{ 
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {t.nav.creativeMarketing}
                  </motion.span>
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>

                {/* Bottom label - Made in Saudi */}
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

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-md ${navbarIsDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className={`lg:hidden border-t ${navbarIsDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-4 py-3 space-y-3">
            <div className={`flex items-center justify-between rounded-xl p-2 ${navbarIsDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {!isPortfolioPage && <ThemeToggle />}
                <LanguageSwitcher />
              </div>
              <div className="flex gap-2">
                <Link
                  href="/packages"
                  className={`${isRTL ? 'px-4 py-2.5 text-[13px]' : 'px-3.5 py-2.5 text-[11px]'} rounded-lg font-rb-bold uppercase tracking-wider whitespace-nowrap bg-white dark:bg-gray-800 text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors shadow-sm hover:shadow-md`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  }}
                >
                  {t.nav.packages}
                </Link>
                <Link
                  href="/join-team"
                  className={`${isRTL ? 'px-4 py-2.5 text-[13px]' : 'px-3.5 py-2.5 text-[11px]'} rounded-lg text-white font-rb-bold uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  }}
                >
                  {t.nav.joinUs}
                </Link>
              </div>
            </div>

            <nav className="grid gap-1">
              {centerMenuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (item.href.startsWith('/')) {
                      window.location.href = item.href;
                    } else {
                      const id = item.href.replace('#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        window.location.href = `/${item.href}`;
                      }
                    }
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-rb-bold ${navbarIsDark ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                    direction: isRTL ? 'rtl' : 'ltr',
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
