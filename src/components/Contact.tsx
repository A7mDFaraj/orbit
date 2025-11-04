'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: API integration when backend is ready
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
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
                className="bg-primary text-white px-10 py-5 rounded-sm font-rb-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl uppercase tracking-wider"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.contact.email}
              </a>
              <a
                href="/request-quote"
                className="bg-transparent border-2 border-primary text-primary dark:text-white dark:border-white px-10 py-5 rounded-sm font-rb-bold text-lg hover:bg-primary hover:text-white transition-all hover:scale-105 uppercase tracking-wider"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.contact.quote}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="border border-primary/30 rounded-lg p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Contact Form */}
              <div className="space-y-6">
                <h2 
                  className="text-3xl lg:text-4xl font-rb-bold mb-2 uppercase tracking-tighter"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {isRTL ? 'للاستفسارات أو الأسئلة، لا تتردد في التواصل معنا' : 'For your inquiries or questions, do not hesitate to contact us'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isRTL ? 'الاسم' : 'Name'}
                      required
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={isRTL ? 'البريد الإلكتروني' : 'Email'}
                      required
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isRTL ? 'النص' : 'Text'}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white px-6 py-3 rounded-md font-rb-bold uppercase tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  >
                    {isRTL ? 'إرسال' : 'Submit'}
                  </button>
                </form>
              </div>

              {/* Right Column - Contact Information Grid */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {/* Email */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-rb-bold text-lg mb-1 uppercase" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </p>
                    <a href="mailto:info@markline.sa" className="text-primary hover:text-primary/80 transition-colors text-base">
                      info@markline.sa
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-rb-bold text-lg mb-1 uppercase" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                      {isRTL ? 'الموقع الإلكتروني' : 'Website'}
                    </p>
                    <a href="https://markline.sa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors text-base">
                      markline.sa
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-rb-bold text-lg mb-1 uppercase" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                      {isRTL ? 'الهاتف' : 'Phone'}
                    </p>
                    <a href="tel:+966548467106" className="text-primary hover:text-primary/80 transition-colors text-base" dir="ltr">
                      +966 54 846 7106
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-rb-bold text-lg mb-1 uppercase" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                      {isRTL ? 'وسائل التواصل' : 'Social Media'}
                    </p>
                    <p className="text-primary text-base">@markline.bs</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Logo */}
            <div className="flex flex-col">
              <img 
                src="/styleguide/SVG/Mark line wordmark.svg" 
                alt="Mark Line" 
                className="h-20 w-auto mb-4"
                style={{
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-6 uppercase text-sm font-rb-bold tracking-wider justify-center md:justify-end items-center">
              <a href="#about" className="hover:text-primary transition-colors">
                {t.nav.about}
              </a>
              <a href="#services" className="hover:text-primary transition-colors">
                {t.nav.services}
              </a>
              <a href="#work" className="hover:text-primary transition-colors">
                {t.nav.work}
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/markline.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/markline.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/markline.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.917 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/markline.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-white/80"><span className="text-primary">@</span>MARKLINE.BS</p>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/60 font-montserrat text-sm border-t border-white/10 pt-8">
            <p>{t.contact.copyright}</p>
            <p className="mt-2">{t.contact.country}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
