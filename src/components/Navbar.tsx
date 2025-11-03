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

  const menuItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.packages, href: '/packages' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.contact, href: '#contact' },
  ];

  // For Arabic: order from right: من نحن, خدماتنا, باقاتنا, اعمالنا, تواصل معنا
  const arabicMenuItems = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.packages, href: '/packages' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const displayMenuItems = isRTL ? arabicMenuItems : menuItems;

  // Force dark navbar on portfolio pages
  const navbarIsDark = isPortfolioPage ? true : isDark;
  
  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 ${navbarIsDark ? 'bg-gray-950' : 'bg-gray-50'} border-b ${navbarIsDark ? 'border-gray-800' : 'border-gray-200'}`}
      dir="ltr" // Keep layout LTR (logo left, menu center, buttons right)
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4 relative">
          {/* Left: Logo + tagline/badge - Fixed width to prevent shifting */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/styleguide/SVG/Mark line wordmark.svg"
                alt="Mark Line"
                className="h-[76px] w-auto"
                style={{
                  filter: navbarIsDark
                    ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.5)) drop-shadow(0 0 0 rgba(0,0,0,0))'
                    : 'drop-shadow(0 8px 20px rgba(0,0,0,0.4)) drop-shadow(0 4px 10px rgba(0,0,0,0.3)) drop-shadow(0 2px 4px rgba(0,0,0,0.25)) brightness(0.95) contrast(1.25) saturate(1.15)',
                }}
              />
            </Link>
            <div className={`hidden md:flex items-center pl-4 ml-2 ${navbarIsDark ? 'border-l border-gray-600' : 'border-l border-gray-300'}`}>
              <div className="flex flex-col leading-tight -space-y-0.5">
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`uppercase ${navbarIsDark ? 'text-gray-300' : 'text-gray-700'} text-[10px] tracking-widest`}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                >
                  {t.nav.creativeMarketing}
                </motion.span>
                <div className="relative inline-block">
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="uppercase text-[12px] font-extrabold text-primary"
                    style={{ 
                      fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                  >
                    {t.nav.madeInSaudi}
                  </motion.span>
                  <motion.span
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary/80"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.7, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center: Menu */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {(isRTL ? [...displayMenuItems].reverse() : displayMenuItems).map((item) => (
              <a
                key={item.name}
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
                className={`text-xs font-rb-bold uppercase tracking-wide whitespace-nowrap ${navbarIsDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                style={{ 
                  fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                  direction: isRTL ? 'rtl' : 'ltr',
                  textAlign: 'center',
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right: toggles + CTAs - Fixed width to prevent shifting */}
          <div className={`hidden md:flex items-center gap-2 flex-shrink-0 ${isRTL ? '' : ''}`} style={{ minWidth: '280px', justifyContent: 'flex-end' }}>
            <div className={`flex items-center rounded-full ${navbarIsDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'} p-1`}> 
              {!isPortfolioPage && <ThemeToggle />}
              <LanguageSwitcher />
            </div>
            <Link
              href="/packages"
              className="ml-2 px-4 py-2 rounded-md text-xs font-rb-bold uppercase tracking-wide shadow-sm whitespace-nowrap transition-all duration-300 bg-white dark:bg-gray-800 text-primary dark:text-primary border-2 border-primary hover:bg-primary hover:text-white"
              style={{ 
                fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                direction: isRTL ? 'rtl' : 'ltr',
                minWidth: '100px',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t.nav.packages}
            </Link>
            <Link
              href="/join-team"
              className="ml-2 px-4 py-2 rounded-md text-white text-xs font-rb-bold uppercase tracking-wide bg-gradient-to-r from-primary to-blue-600 shadow-sm whitespace-nowrap"
              style={{ 
                fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                direction: isRTL ? 'rtl' : 'ltr',
                minWidth: '120px',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t.nav.joinUs}
            </Link>
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
                  className="px-3 py-2 rounded-md text-xs font-rb-bold uppercase tracking-wide whitespace-nowrap bg-white dark:bg-gray-800 text-primary border-2 border-primary"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                    direction: isRTL ? 'rtl' : 'ltr',
                    minWidth: '100px',
                    textAlign: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {t.nav.packages}
                </Link>
                <Link
                  href="/join-team"
                  className="px-3 py-2 rounded-md text-white text-xs font-rb-bold uppercase tracking-wide bg-gradient-to-r from-primary to-blue-600 whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined,
                    direction: isRTL ? 'rtl' : 'ltr',
                    minWidth: '120px',
                    textAlign: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {t.nav.joinUs}
                </Link>
              </div>
            </div>

            <nav className="grid gap-1">
              {displayMenuItems.map((item) => (
                <a
                  key={item.name}
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
