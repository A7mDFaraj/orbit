'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { encodeImagePath } from '@/utils/imagePath';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.solutions, href: '#solutions' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const solutions = [
    { name: isRTL ? 'الرسائل النصية' : 'SMS Platform', href: '/products/sms' },
    { name: isRTL ? 'واتساب اعمال API' : 'WhatsApp Business API', href: '/products/whatsapp' },
    { name: isRTL ? 'اوتايم OTime' : 'OTime - Attendance & HR', href: '/products/o-time' },
    { name: isRTL ? 'البوابة الحكومية Gov Gate' : 'Gov Gate - Government Portal', href: '/products/gov-gate' },
  ];

  return (
    <footer
      id="footer"
      ref={ref}
      className="bg-[#161616] text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Logo & Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              className="relative h-48 w-full mb-8 -ml-4 pr-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src={isDark ? encodeImagePath("/logo/شعار المدار0-0٤.png") : encodeImagePath("/logo/شعار المدار1-0١.png")}
                alt="ORBIT Logo"
                fill
                className="object-contain object-left"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
              />
            </motion.div>
            <p
              className={`text-gray-400 mb-4 ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL
                ? 'شركة رسمية مرخصة من هيئة الاتصالات وتقنية المعلومات السعودية'
                : 'Official company licensed by the Saudi Communications and Information Technology Commission'}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className={`font-heading ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {t.nav.madeInSaudi}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-heading mb-4 text-white ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    onClick={(e) => {
                      if (!link.href.startsWith('/')) {
                        e.preventDefault();
                        const id = link.href.replace('#', '');
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    className={`text-gray-400 hover:text-primary transition-colors ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4
              className={`text-lg font-heading mb-4 text-white ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'حلولنا' : 'Our Solutions'}
            </h4>
            <ul className="space-y-3">
              {solutions.map((solution, index) => (
                <li key={solution.href}>
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={solution.href}
                      className={`text-gray-400 hover:text-primary transition-colors ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {solution.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`text-lg font-heading mb-6 text-white ${isRTL ? 'font-ibm-plex-arabic' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
            </h4>
            <ul className="space-y-4">

              {/* Phone */}
              <li className="flex items-start gap-3">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-3 w-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-gray-400 text-sm mb-1 ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? 'هاتف' : 'Phone'}
                    </p>
                    <a href="tel:920006900" className={`text-white hover:text-primary transition-colors ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir="ltr">
                      920006900
                    </a>
                  </div>
                </motion.div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-3 w-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-gray-400 text-sm mb-1 ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? 'ايميل' : 'Email'}
                    </p>
                    <a href="mailto:marketing@corbit.sa" className={`text-white hover:text-primary transition-colors ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir="ltr">
                      marketing@corbit.sa
                    </a>
                  </div>
                </motion.div>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-start gap-3 w-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-gray-400 text-sm mb-1 ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? 'العنوان' : 'Address'}
                    </p>
                    <p className={`text-white ${isRTL ? 'font-ibm-plex-arabic' : ''}`} dir="rtl">
                      المدينة المنورة، طريق الملك عبدالله - حي الراية - 8443 طابق 6
                    </p>
                  </div>
                </motion.div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-8">
              <motion.a
                href="https://instagram.com/orbit.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/orbit.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-white/60  text-sm border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <p>{t.contact.copyright}</p>
          <p className="mt-2">{t.contact.country}</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-white/40">
            <span>السجل التجاري : 7012398264</span>
            <span>التصريح : LGP0921-22</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
