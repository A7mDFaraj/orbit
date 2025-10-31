'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-rb-bold mb-6 uppercase tracking-tighter"
            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
          >
            {t.contact.title}
          </h2>
          <p 
            className="text-2xl mb-12 max-w-3xl mx-auto font-montserrat font-medium"
            style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
          >
            {t.contact.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="mailto:info@markline.sa"
              className="bg-white text-primary px-10 py-5 rounded-sm font-rb-bold text-lg hover:bg-neutral transition-all hover:scale-105 shadow-xl uppercase tracking-wider"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.contact.email}
            </a>
            <a
              href="#"
              className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-sm font-rb-bold text-lg hover:bg-white hover:text-primary transition-all hover:scale-105 uppercase tracking-wider"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.contact.quote}
            </a>
          </div>

          <div className="border-t border-white/30 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Logo */}
              <div className="flex flex-col items-center md:items-start">
                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/styleguide/Mark line logo.png" 
                    alt="Mark Line" 
                    className="h-24 md:h-28 w-auto object-contain"
                    style={{
                      filter: 'brightness(0) invert(1)',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center gap-6 uppercase text-sm font-rb-bold tracking-wider">
                <a href="#about" className="hover:text-primary transition-colors">
                  About
                </a>
                <a href="#services" className="hover:text-primary transition-colors">
                  Services
                </a>
                <a href="#work" className="hover:text-primary transition-colors">
                  Portfolio
                </a>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center md:items-end gap-3">
                <a
                  href="mailto:info@markline.sa"
                  className="hover:text-primary transition-colors font-montserrat flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@markline.sa
                </a>
                <a
                  href="tel:+966548467106"
                  className="hover:text-primary transition-colors font-montserrat flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +966 54 846 7106
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>

                {/* Twitter/X */}
                <motion.a
                  href="https://twitter.com/markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  href="https://facebook.com/markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/company/markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                {/* TikTok */}
                <motion.a
                  href="https://tiktok.com/@markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </motion.a>

                {/* Snapchat */}
                <motion.a
                  href="https://snapchat.com/add/markline.bs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-1.5.675-2.088 1.498-2.088.78 0 1.32.465 1.32 1.134 0 .63-.39 1.085-1.169 1.35-.18.06-.539.21-.539.391 0 .15.045.255.21.5.12.21.285.51.525.945.555 1.05 1.32 2.484 2.09 3.479.135.165.287.342.443.522.63.705 1.32 1.484 1.32 2.384 0 .99-.646 1.619-1.971 1.619-1.26 0-2.085-.3-2.85-.629-.494-.21-.899-.39-1.335-.39-.346 0-.674.09-.945.21-.405.21-.9.42-1.47.63-.645.24-1.275.465-1.875.465-.675 0-1.14-.165-1.575-.21-.09-.015-.21-.045-.315-.045-.69-.03-1.605.09-2.79.75-1.095.615-2.25 1.05-3.105 1.05-1.065 0-1.74-.855-1.74-2.22 0-1.23.705-2.025 1.38-2.775.15-.165.285-.33.405-.495.555-.795 1.095-1.83 1.515-2.775.135-.3.255-.6.36-.9.21-.615.45-1.35.21-1.875-.12-.255-.495-.375-.99-.51-1.005-.24-1.65-1.05-1.65-2.1 0-1.17.75-1.83 1.5-1.83.945 0 1.245.69 1.425 1.32.09.33.18.66.345.96.42.675.99 1.155 1.545 1.575.435.33.825.63 1.095 1.005.135.165.195.27.195.39 0 .21-.03.39-.135.63-.09.18-.195.39-.36.63-.195.255-.45.555-.69.825-.24.255-.525.555-.72.735-.15.15-.21.255-.21.405 0 .195.045.3.06.3.255.015 1.035.135 1.545.21.48.045.96.105 1.395.105.495 0 .96-.06 1.41-.165.165-.03.315-.06.465-.09.24-.045.48-.09.72-.09.495 0 .99.21 1.44.45.69.375 1.41.78 2.355.78.69 0 1.245-.225 1.725-.585.48-.345.795-.855 1.035-1.425.15-.345.27-.645.405-.9.27-.51.555-.87.945-1.005.075-.03.15-.045.225-.06.165-.03.33-.045.495-.045z"/>
                  </svg>
                </motion.a>
              </div>
              <motion.p 
                className="text-sm font-montserrat text-white/80"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                @MARKLINE.BS
              </motion.p>
            </div>

            <div 
              className="mt-12 text-center text-white/60 font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              <p>{t.contact.copyright}</p>
              <p className="mt-2">{t.contact.country}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

