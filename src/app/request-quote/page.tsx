'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function RequestQuotePage() {
  const { t, isRTL } = useLanguage();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: '',
    budget: '',
    selectedPackage: '',
    packageName: '',
    packageType: '',
    packagePrice: '',
  });

  // Get package info from URL params
  useEffect(() => {
    const packageId = searchParams.get('package');
    const packageName = searchParams.get('name');
    const packageType = searchParams.get('type');
    const packagePrice = searchParams.get('price');

    if (packageId) {
      setFormData(prev => ({
        ...prev,
        selectedPackage: packageId,
        packageName: packageName || '',
        packageType: packageType || 'regular',
        packagePrice: packagePrice || '',
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('/api/client-inquiries', {
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
        company: '',
        serviceType: '',
        message: '',
        budget: '',
        selectedPackage: '',
        packageName: '',
        packageType: '',
        packagePrice: '',
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Link
              href="/"
              className="inline-block mb-6 text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-6 h-6 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.clientInquiryPage.title}
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.clientInquiryPage.subtitle}
            </p>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500 rounded-lg text-green-700 dark:text-green-300 text-center"
            >
              {t.clientInquiryPage.success}
            </motion.div>
          )}

          {/* Error Message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 rounded-lg text-red-700 dark:text-red-300 text-center"
            >
              {t.clientInquiryPage.error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12 space-y-6"
          >
            {/* Package Info Display */}
            {formData.selectedPackage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-xl p-6 border-2 border-primary/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {formData.packageType === 'charity' ? '💚' : '📦'}
                  </span>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-rb-bold text-gray-900 dark:text-white mb-1"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {formData.packageName}
                    </h3>
                    {formData.packagePrice && (
                      <p className="text-sm text-primary font-rb-bold">
                        {formData.packagePrice} {isRTL ? 'ريال' : 'SAR'}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, selectedPackage: '', packageName: '', packageType: '', packagePrice: '' }))}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                {formData.packageType === 'charity' && (
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {isRTL ? '🌟 باقة خيرية مميزة' : '🌟 Special Charity Package'}
                  </p>
                )}
              </motion.div>
            )}

            {/* Package Selection Dropdown */}
            <div>
              <label
                htmlFor="selectedPackage"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL ? 'اختر الباقة (اختياري)' : 'Select Package (Optional)'}
              </label>
              <select
                id="selectedPackage"
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={(e) => {
                  const selected = e.target.value;
                  const packages: Record<string, { name: string, nameAr: string, type: string, price?: string }> = {
                    'basic': { name: 'Basic Package', nameAr: 'الباقة الأساسية', type: 'regular' },
                    'professional': { name: 'Professional Package', nameAr: 'الباقة الاحترافية', type: 'regular' },
                    'premium': { name: 'Premium Package', nameAr: 'الباقة المتميزة', type: 'regular' },
                    'charity-launch': { name: 'Launch Package', nameAr: 'باقة الانطلاقة', type: 'charity', price: '20000' },
                    'charity-expansion': { name: 'Expansion Package', nameAr: 'باقة التوسع', type: 'charity', price: '50000' },
                    'charity-professional': { name: 'Professional Package', nameAr: 'باقة الاحتراف', type: 'charity', price: '80000' },
                    'custom': { name: 'Custom Package', nameAr: 'باقة مخصصة', type: 'custom' },
                  };
                  
                  const pkg = packages[selected];
                  setFormData(prev => ({
                    ...prev,
                    selectedPackage: selected,
                    packageName: isRTL ? (pkg?.nameAr || '') : (pkg?.name || ''),
                    packageType: pkg?.type || '',
                    packagePrice: pkg?.price || '',
                  }));
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                <option value="">{isRTL ? 'لم يتم تحديد باقة' : 'No package selected'}</option>
                <optgroup label={isRTL ? 'باقات الأعمال' : 'Business Packages'}>
                  <option value="basic">{isRTL ? 'الباقة الأساسية' : 'Basic Package'}</option>
                  <option value="professional">{isRTL ? 'الباقة الاحترافية' : 'Professional Package'}</option>
                  <option value="premium">{isRTL ? 'الباقة المتميزة' : 'Premium Package'}</option>
                </optgroup>
                <optgroup label={isRTL ? 'باقات الجمعيات الخيرية' : 'Charity Packages'}>
                  <option value="charity-launch">{isRTL ? 'باقة الانطلاقة (20,000 ريال)' : 'Launch Package (20,000 SAR)'}</option>
                  <option value="charity-expansion">{isRTL ? 'باقة التوسع (50,000 ريال)' : 'Expansion Package (50,000 SAR)'}</option>
                  <option value="charity-professional">{isRTL ? 'باقة الاحتراف (80,000 ريال)' : 'Professional Package (80,000 SAR)'}</option>
                </optgroup>
                <option value="custom">{isRTL ? 'باقة مخصصة' : 'Custom Package'}</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.company}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Service Type */}
            <div>
              <label
                htmlFor="serviceType"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.serviceType}
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                <option value="">
                  {isRTL ? 'اختر نوع الخدمة' : 'Select Service Type'}
                </option>
                <option value="branding">
                  {isRTL ? 'الهوية التجارية' : 'Branding'}
                </option>
                <option value="marketing">
                  {isRTL ? 'التسويق' : 'Marketing'}
                </option>
                <option value="events">
                  {isRTL ? 'الفعاليات' : 'Events'}
                </option>
                <option value="real-estate">
                  {isRTL ? 'العقارات' : 'Real Estate'}
                </option>
                <option value="advertising">
                  {isRTL ? 'الإعلان' : 'Advertising'}
                </option>
                <option value="other">{isRTL ? 'أخرى' : 'Other'}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.clientInquiryPage.budget}
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                <option value="">
                  {isRTL ? 'اختر الميزانية' : 'Select Budget Range'}
                </option>
                <option value="10k-50k">
                  {isRTL ? '10,000 - 50,000 ريال' : '10,000 - 50,000 SAR'}
                </option>
                <option value="50k-100k">
                  {isRTL ? '50,000 - 100,000 ريال' : '50,000 - 100,000 SAR'}
                </option>
                <option value="100k-500k">
                  {isRTL ? '100,000 - 500,000 ريال' : '100,000 - 500,000 SAR'}
                </option>
                <option value="500k+">
                  {isRTL ? '500,000+ ريال' : '500,000+ SAR'}
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 px-8 rounded-lg font-rb-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {isSubmitting
                ? isRTL
                  ? 'جاري الإرسال...'
                  : 'Submitting...'
                : t.clientInquiryPage.submit}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

