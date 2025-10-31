'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function JoinTeamPage() {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    mobile: '',
    backupMobile: '',
    type: 'organizer',
    photo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('/api/team-applications', {
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
        city: '',
        mobile: '',
        backupMobile: '',
        type: 'organizer',
        photo: '',
      });

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, we'll just store the file name
    // In production, you'd upload to a storage service like S3 or Cloudinary
    setFormData({
      ...formData,
      photo: file.name,
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
              {t.joinTeamPage.title}
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.joinTeamPage.subtitle}
            </p>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500 rounded-lg text-green-700 dark:text-green-300 text-center"
            >
              {t.joinTeamPage.success}
            </motion.div>
          )}

          {/* Error Message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 rounded-lg text-red-700 dark:text-red-300 text-center"
            >
              {t.joinTeamPage.error}
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
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.name}
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

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.city}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.mobile}
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Backup Mobile */}
            <div>
              <label
                htmlFor="backupMobile"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.backupMobile}
              </label>
              <input
                type="tel"
                id="backupMobile"
                name="backupMobile"
                value={formData.backupMobile}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              />
            </div>

            {/* Position Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.type}
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                <option value="organizer">{t.joinTeamPage.organizer}</option>
                <option value="non-organizer">{t.joinTeamPage.nonOrganizer}</option>
                <option value="cast">{t.joinTeamPage.cast}</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {t.joinTeamPage.photo}
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              />
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
                : t.joinTeamPage.submit}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

