'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import OrbitSectionBackground from './OrbitSectionBackground';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="relative py-32 lg:py-40 bg-white dark:bg-gray-900 overflow-hidden">
      <OrbitSectionBackground alignment="both" density="medium" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL 
                ? 'نحن هنا للإجابة على استفساراتك ومساعدتك في العثور على الحل المناسب لاحتياجاتك'
                : 'We\'re here to answer your inquiries and help you find the right solution for your needs'
              }
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className={`text-2xl font-heading font-semibold mb-6 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 mb-1 ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'هاتف' : 'Phone'}
                      </p>
                      <a href="tel:920006900" className={`text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`} dir="ltr">
                        920006900
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 mb-1 ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <a href="mailto:info@ot.com.sa" className={`text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`} dir="ltr">
                        info@ot.com.sa
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-12 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Success Message */}
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <p className={`text-green-800 dark:text-green-300 ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL 
                        ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                        : 'Your message has been sent successfully! We\'ll get back to you soon.'
                      }
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <p className={`text-red-800 dark:text-red-300 ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL 
                        ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                        : 'Failed to send message. Please try again.'
                      }
                    </p>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold mb-2 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'الاسم الكامل' : 'Full Name'} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-2 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'البريد الإلكتروني' : 'Email'} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`}
                    dir="ltr"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={`block text-sm font-semibold mb-2 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'رقم الهاتف' : 'Phone Number'} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`}
                    dir="ltr"
                    placeholder={isRTL ? '05xxxxxxxx' : '05xxxxxxxx'}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className={`block text-sm font-semibold mb-2 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'الموضوع' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${isRTL ? 'font-somar' : 'font-gotham'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    placeholder={isRTL ? 'موضوع الاستفسار' : 'Inquiry subject'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold mb-2 text-gray-900 dark:text-white ${isRTL ? 'font-somar' : 'font-gotham'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {isRTL ? 'الرسالة' : 'Message'} <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none ${isRTL ? 'font-somar' : 'font-gotham'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-primary to-[#9a2d45] text-white rounded-xl font-heading uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'font-somar' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting 
                    ? (isRTL ? 'جاري الإرسال...' : 'Sending...')
                    : (isRTL ? 'إرسال الرسالة' : 'Send Message')
                  }
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


