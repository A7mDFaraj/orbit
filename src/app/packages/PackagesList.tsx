'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

interface Package {
  _id?: string;
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  durationAr: string;
  features: string[];
  featuresAr: string[];
  highlighted?: boolean;
  icon: string;
}

export default function PackagesList() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) {
        const data = await res.json();
        
        // If no packages exist, seed the database
        if (data.length === 0) {
          console.log('No packages found, seeding database...');
          const seedRes = await fetch('/api/packages/seed', { method: 'POST' });
          if (seedRes.ok) {
            // Fetch again after seeding
            const newRes = await fetch('/api/packages');
            if (newRes.ok) {
              const newData = await newRes.json();
              setPackages(newData);
              setLoading(false);
              return;
            }
          }
        }
        
        setPackages(data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  // Separate regular and charity packages
  const regularPackages = packages.filter(pkg => !pkg.id.startsWith('charity-'));
  const charityPackages = packages.filter(pkg => pkg.id.startsWith('charity-'));

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Regular Packages Section */}
          {regularPackages.length > 0 && (
            <>
              <motion.div variants={cardVariants} className="text-center mb-16">
                <motion.h2 
                  className="text-4xl sm:text-5xl lg:text-6xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {isRTL ? 'اختر الباقة المناسبة لك' : 'Choose Your Perfect Package'}
                </motion.h2>
                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 128 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-montserrat"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                >
                  {isRTL 
                    ? 'باقات مصممة خصيصًا لتلبية احتياجاتك التسويقية والإبداعية'
                    : 'Packages specially designed to meet your marketing and creative needs'
                  }
                </motion.p>
              </motion.div>

              {/* Regular Packages Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch mb-16">
                {regularPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    variants={cardVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`relative rounded-3xl backdrop-blur-xl border-2 shadow-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                      pkg.highlighted
                        ? 'bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 border-primary dark:border-primary'
                        : 'bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-rb-bold uppercase tracking-wider shadow-lg">
                        ⭐ Popular
                      </div>
                    )}

                    <div className="p-8 lg:p-10 flex flex-col flex-1">
                      <motion.div
                        className="text-6xl mb-6"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {pkg.icon}
                      </motion.div>

                      <h3 
                        className="text-3xl font-rb-bold mb-3 uppercase tracking-tight text-gray-900 dark:text-white"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? pkg.nameAr : pkg.name}
                      </h3>

                      <div className="mb-4">
                        <span className="text-lg text-gray-600 dark:text-gray-400 font-montserrat">
                          {isRTL ? pkg.durationAr : pkg.duration}
                        </span>
                      </div>

                      <p 
                        className="text-base mb-6 font-montserrat text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? pkg.descriptionAr : pkg.description}
                      </p>

                      <div className="h-1 w-16 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-8" />

                      <div className="space-y-4 mb-8 flex-1">
                        {(isRTL ? pkg.featuresAr : pkg.features).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-1 text-primary">✓</span>
                            <span 
                              className="text-sm font-montserrat leading-relaxed text-gray-700 dark:text-gray-300"
                              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/request-quote?package=${pkg.id}&name=${encodeURIComponent(isRTL ? pkg.nameAr : pkg.name)}`}
                        className="block w-full text-center px-8 py-4 rounded-xl font-rb-bold uppercase tracking-wider transition-all duration-300 bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? 'اطلب الباقة' : 'Request Package'}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Charity Packages Section */}
          {charityPackages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-32"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="inline-block mb-6"
                >
                  <span className="px-6 py-2 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-sm font-rb-bold uppercase tracking-wider">
                    {isRTL ? '💚 للجمعيات الخيرية' : '💚 For Charity Organizations'}
                  </span>
                </motion.div>

                <motion.h2 
                  className="text-4xl sm:text-5xl lg:text-6xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {isRTL ? 'باقات مارك لاين للجمعيات الخيرية' : 'Mark Line Charity Organization Packages'}
                </motion.h2>

                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-green-500 to-green-400 mx-auto mb-6 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 128 } : {}}
                  transition={{ duration: 1, delay: 1.1 }}
                />

                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-montserrat"
                  style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {isRTL 
                    ? 'باقات مصممة خصيصًا لدعم الجمعيات الخيرية في تحقيق رسالتها وتوسيع أثرها المجتمعي'
                    : 'Packages specially designed to support charitable organizations in achieving their mission and expanding their social impact'
                  }
                </motion.p>
              </div>

              {/* Charity Packages Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
                {charityPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`relative rounded-3xl backdrop-blur-xl border-2 shadow-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                      pkg.highlighted
                        ? 'bg-gradient-to-br from-green-50/90 to-green-100/90 dark:from-green-900/30 dark:to-green-800/30 border-green-400 dark:border-green-500 scale-105 lg:scale-110'
                        : 'bg-white/90 dark:bg-gray-800/90 border-green-200 dark:border-green-700'
                    }`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-6 py-2 rounded-bl-2xl font-rb-bold text-sm uppercase tracking-wide">
                        {isRTL ? '⭐ الأكثر طلبًا' : '⭐ Most Popular'}
                      </div>
                    )}

                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-500" />
                    
                    <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                      <motion.div
                        className="text-6xl mb-6"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {pkg.icon}
                      </motion.div>

                      <h3 
                        className={`text-3xl font-rb-bold mb-3 uppercase tracking-tight ${pkg.highlighted ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? pkg.nameAr : pkg.name}
                      </h3>

                      <div className="mb-4">
                        <span className={`text-lg font-montserrat ${pkg.highlighted ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {isRTL ? pkg.durationAr : pkg.duration}
                        </span>
                      </div>

                      <p 
                        className={`text-base mb-6 font-montserrat ${pkg.highlighted ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? pkg.descriptionAr : pkg.description}
                      </p>

                      <div className={`h-1 w-16 rounded-full mb-8 ${pkg.highlighted ? 'bg-white/30' : 'bg-gradient-to-r from-green-500 to-green-400'}`} />

                      <div className="space-y-4 mb-8 flex-1">
                        {(isRTL ? pkg.featuresAr : pkg.features).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className={`flex-shrink-0 mt-1 ${pkg.highlighted ? 'text-yellow-300' : 'text-green-600'}`}>✓</span>
                            <span 
                              className={`text-sm font-montserrat leading-relaxed ${pkg.highlighted ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/request-quote?package=${pkg.id}&name=${encodeURIComponent(isRTL ? pkg.nameAr : pkg.name)}&type=charity`}
                        className={`block w-full text-center px-8 py-4 rounded-xl font-rb-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl ${
                          pkg.highlighted
                            ? 'bg-white text-blue-600 hover:bg-gray-100'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                        style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      >
                        {isRTL ? 'اطلب الباقة' : 'Request Package'}
                      </Link>
                    </div>

                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-500/10 to-transparent rounded-tl-3xl" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom CTA Section */}
          <motion.div
            variants={cardVariants}
            className="mt-20 text-center"
          >
            <div className="inline-block p-12 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 border-2 border-primary/30 dark:border-primary/40 shadow-2xl">
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                💡
              </motion.div>
              <h3 
                className="text-3xl font-rb-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL ? 'هل تحتاج باقة مخصصة؟' : 'Need a Custom Package?'}
              </h3>
              <p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-montserrat"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL
                  ? 'نصمم باقات مخصصة تناسب احتياجاتك وميزانيتك بالضبط. تواصل معنا للحصول على استشارة مجانية'
                  : 'We design custom packages that perfectly match your needs and budget. Contact us for a free consultation'
                }
              </p>
              <Link
                href="/request-quote?package=custom"
                className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-rb-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:bg-blue-600 transition-all duration-300"
                style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
              >
                {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
