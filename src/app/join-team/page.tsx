'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Link from 'next/link';

export default function JoinTeamPage() {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    mobile: '',
    backupMobile: '',
    type: 'organizer',
    photo: '',
    // Casting-specific fields
    age: '',
    nationality: '',
    weight: '',
    height: '',
    gender: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      // Add casting flag and photos to submission
      const submissionData = {
        ...formData,
        isCasting: isCastingForm,
        photos: isCastingForm ? uploadedPhotos : undefined,
      };

      const response = await fetch('/api/team-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
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
        age: '',
        nationality: '',
        weight: '',
        height: '',
        gender: '',
        email: '',
      });
      setUploadedPhotos([]);

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

  // Drag and drop handlers for casting photos
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedPhotos(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleCastingPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedPhotos(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const isCastingForm = formData.type === 'cast';

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

            {/* Casting-Specific Fields */}
            <AnimatePresence>
              {isCastingForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 pt-4 border-t-2 border-primary/20"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-rb-bold uppercase text-primary mb-2" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                      {isRTL ? 'معلومات التمثيل' : 'Casting Information'}
                    </h3>
                  </div>

                  {/* Age */}
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {isRTL ? 'عمرك' : 'Age'}
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required={isCastingForm}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {isRTL ? 'جنسيتك' : 'Nationality'}
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required={isCastingForm}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>

                  {/* Weight & Height - Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? 'وزنك (كجم)' : 'Weight (kg)'}
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required={isCastingForm}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="height"
                        className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? 'طولك (سم)' : 'Height (cm)'}
                      </label>
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        required={isCastingForm}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {isRTL ? 'جنسك' : 'Gender'}
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required={isCastingForm}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                      <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                      <option value="female">{isRTL ? 'انثى' : 'Female'}</option>
                      <option value="boy">{isRTL ? 'طفل' : 'Boy'}</option>
                      <option value="girl">{isRTL ? 'طفلة' : 'Girl'}</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {isRTL ? 'ايميلك' : 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={isCastingForm}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    />
                  </div>

                  {/* Multiple Photo Upload with Drag & Drop */}
                  <div>
                    <label
                      className="block text-sm font-rb-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                    >
                      {isRTL ? 'صور شخصية لك' : 'Personal Photos'}
                    </label>
                    
                    {/* Drag & Drop Zone */}
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                        dragActive
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="castingPhotos"
                        multiple
                        accept="image/*"
                        onChange={handleCastingPhotoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="pointer-events-none">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                          {isRTL ? 'اسحب الصور هنا أو انقر للتحميل' : 'Drag photos here or click to upload'}
                        </p>
                        <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}>
                          {isRTL ? 'PNG, JPG, GIF حتى 10 ميجا' : 'PNG, JPG, GIF up to 10MB'}
                        </p>
                      </div>
                    </div>

                    {/* Preview Uploaded Photos */}
                    {uploadedPhotos.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {uploadedPhotos.map((photo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative group"
                          >
                            <img
                              src={photo}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Photo Upload (for non-casting) */}
            {!isCastingForm && (
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
            )}

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
      <FloatingWhatsApp />
    </div>
  );
}

