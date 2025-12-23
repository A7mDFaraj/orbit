'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrbitSectionBackground from '@/components/OrbitSectionBackground';
import Link from 'next/link';
import GoogleDriveMedia from '@/components/GoogleDriveMedia';
import { convertGoogleDriveVideoUrl, isGoogleDriveVideo } from '@/utils/googleDrive';
import toast from 'react-hot-toast';

interface Client {
  _id: string;
  name: string;
  logo?: string;
  category: string;
  description?: string;
  blogText?: string;
  workImages?: string[];
  workVideo?: string | string[];
  services?: string[];
  slug?: string;
}

// Category translations
const categoryTranslations: Record<string, { en: string; ar: string }> = {
  'Automotive': { en: 'Automotive', ar: 'السيارات' },
  'Communication': { en: 'Communication', ar: 'الاتصالات' },
  'Corporate': { en: 'Corporate', ar: 'الشركات' },
  'Food & Beverages': { en: 'Food & Beverages', ar: 'الطعام والمشروبات' },
  'Construction & Real Estate': { en: 'Construction & Real Estate', ar: 'البناء والعقارات' },
  'Health': { en: 'Health', ar: 'الصحة' },
  'Governmental': { en: 'Governmental', ar: 'حكومي' },
  'Fashion & Beauty': { en: 'Fashion & Beauty', ar: 'الموضة والجمال' },
  'Home & Furniture': { en: 'Home & Furniture', ar: 'المنزل والأثاث' },
  'Hospitality & Entertainment': { en: 'Hospitality & Entertainment', ar: 'الضيافة والترفيه' },
  'Sports': { en: 'Sports', ar: 'الرياضة' },
};

export default function OffersPage() {
  const { isRTL } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await res.json();
        console.log('Fetched clients:', data);
        setClients(data.clients || data || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
        toast.error(isRTL ? 'فشل تحميل الأعمال' : 'Failed to load work');
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, [isRTL]);

  const getFirstMedia = (client: Client) => {
    if (client.workVideo) {
      const video = Array.isArray(client.workVideo) ? client.workVideo[0] : client.workVideo;
      if (video && typeof video === 'string') {
        return { type: 'video' as const, src: video };
      }
    }
    if (client.workImages && client.workImages.length > 0 && client.workImages[0]) {
      return { type: 'image' as const, src: client.workImages[0] };
    }
    if (client.logo && typeof client.logo === 'string') {
      return { type: 'image' as const, src: client.logo };
    }
    return null;
  };

  const getCategoryName = (category: string) => {
    const translation = categoryTranslations[category];
    if (!translation) return category;
    return isRTL ? translation.ar : translation.en;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <section id="offers" className="relative py-24 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
        <OrbitSectionBackground alignment="both" density="medium" />

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-10 dark:opacity-5"
              style={{
                width: `${300 + i * 150}px`,
                height: `${300 + i * 150}px`,
                background: i % 3 === 0
                  ? 'radial-gradient(circle, rgba(122, 30, 46, 0.4) 0%, transparent 70%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(232, 220, 203, 0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(167, 169, 172, 0.3) 0%, transparent 70%)',
                left: `${10 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="text-center mb-20"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-5xl sm:text-6xl lg:text-8xl font-heading text-gray-900 dark:text-white mb-6 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL ? 'معرض أعمالنا' : 'OUR WORK'}
            </motion.h1>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1 },
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1.5 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mx-auto mb-8"
            />

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-gotham max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {isRTL 
                ? 'اكتشف مجموعة مختارة من مشاريعنا الناجحة التي تعكس التميز والإبداع'
                : 'Discover a curated selection of our successful projects that reflect excellence and creativity'
              }
            </motion.p>
          </motion.div>

          {/* Work Showcase Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          ) : clients.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {clients.map((client, index) => {
                const media = getFirstMedia(client);
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={client._id}
                    variants={{
                      hidden: { opacity: 0, y: 50, scale: 0.95 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      },
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="group relative"
                  >
                    <motion.div
                      onClick={() => setSelectedClient(client)}
                      className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 transition-all duration-500"
                      whileHover={{ 
                        y: -12,
                        borderColor: 'rgba(122, 30, 46, 0.5)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Media Container */}
                      <div className="relative h-[60%] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                        {media && media.src ? (
                          <>
                            {media.type === 'video' && media.src ? (
                              <div className="w-full h-full relative">
                                {isGoogleDriveVideo(media.src) ? (
                                  <iframe
                                    src={convertGoogleDriveVideoUrl(media.src)}
                                    className="w-full h-full object-cover"
                                    allow="autoplay; fullscreen"
                                  />
                                ) : (
                                  <video
                                    src={media.src}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => {
                                      const video = e.currentTarget;
                                      video.play().catch(() => {});
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.pause();
                                    }}
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              </div>
                            ) : media.type === 'image' && media.src ? (
                              <div className="relative w-full h-full">
                                <GoogleDriveMedia
                                  src={media.src}
                                  alt={client.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  type="image"
                                  objectFit="cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {client.logo ? (
                              <img
                                src={client.logo}
                                alt={client.name}
                                className="max-w-[50%] max-h-[50%] object-contain opacity-30"
                              />
                            ) : (
                              <div className="text-7xl text-gray-300 dark:text-gray-600">💼</div>
                            )}
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 bg-primary/95 backdrop-blur-md text-white rounded-full text-xs font-heading uppercase tracking-wider shadow-xl"
                            style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          >
                            {getCategoryName(client.category)}
                          </motion.div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center"
                          initial={false}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: isHovered ? 1 : 0,
                              opacity: isHovered ? 1 : 0,
                            }}
                            className="bg-white/95 backdrop-blur-md rounded-full p-6 shadow-2xl"
                          >
                            <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Content Section */}
                      <div className="relative h-[40%] p-6 flex flex-col justify-between">
                        {/* Logo */}
                        {client.logo && (
                          <div className="mb-4 h-12 flex items-center">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-h-full max-w-[80%] object-contain"
                              style={{
                                filter: 'brightness(1.1) contrast(1.2)',
                              }}
                            />
                          </div>
                        )}

                        {/* Client Name */}
                        <h3
                          className="text-2xl lg:text-3xl font-heading text-gray-900 dark:text-white mb-2 uppercase tracking-tight"
                          style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          {client.name}
                        </h3>

                        {/* Description */}
                        {client.description && (
                          <p
                            className="text-gray-600 dark:text-gray-400 font-gotham text-sm mb-4 line-clamp-2 flex-1"
                            style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                            dir={isRTL ? 'rtl' : 'ltr'}
                          >
                            {client.description}
                          </p>
                        )}

                        {/* Services Preview */}
                        {client.services && client.services.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {client.services.slice(0, 2).map((service, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-heading uppercase tracking-wide"
                                style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                              >
                                {service}
                              </span>
                            ))}
                            {client.services.length > 2 && (
                              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-heading">
                                +{client.services.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* View Button */}
                        <motion.div
                          className="flex items-center gap-2 text-primary font-heading uppercase tracking-wider text-sm"
                          style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                          whileHover={{ x: isRTL ? -5 : 5 }}
                        >
                          <span>{isRTL ? 'عرض المشروع' : 'View Project'}</span>
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, isRTL ? -5 : 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                            />
                          </motion.svg>
                        </motion.div>
                      </div>

                      {/* Gradient Border on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(122, 30, 46, 0.1), rgba(232, 220, 203, 0.1))',
                          opacity: 0,
                        }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="text-6xl mb-6">📂</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-gotham">
                {isRTL ? 'لا توجد أعمال متاحة حالياً' : 'No work available at the moment'}
              </p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24 text-center"
          >
            <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20 rounded-3xl p-12 lg:p-16 border-2 border-primary/20 dark:border-primary/30 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-heading text-gray-900 dark:text-white mb-6 uppercase tracking-tighter"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {isRTL ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
                </h3>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 mb-10 font-gotham max-w-2xl mx-auto"
                  style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {isRTL 
                    ? 'دعنا نعمل معاً لتحويل رؤيتك إلى واقع ملموس'
                    : 'Let\'s work together to turn your vision into reality'
                  }
                </p>
                <Link href="/request-quote">
                  <motion.button
                    className="px-12 py-5 bg-primary text-white rounded-xl font-heading uppercase tracking-wider shadow-2xl hover:shadow-primary/30 text-lg transition-all duration-300 relative overflow-hidden group"
                    style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isRTL ? 'اطلب عرض سعر' : 'Request a Quote'}
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, isRTL ? -5 : 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                      </motion.svg>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-[#9a2d45] to-primary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientDetailModal 
            client={selectedClient} 
            onClose={() => setSelectedClient(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Modern Client Detail Modal - Redesigned with ORBIT Identity
function ClientDetailModal({ client, onClose }: { client: Client; onClose: () => void }) {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const workImages = client.workImages && client.workImages.length > 0 ? client.workImages : [];
  const allMedia: Array<{ type: 'image' | 'video'; src: string }> = [];
  
  if (client.workVideo) {
    if (Array.isArray(client.workVideo)) {
      client.workVideo.forEach(video => {
        if (video && typeof video === 'string') {
          allMedia.push({ type: 'video', src: video });
        }
      });
    } else if (typeof client.workVideo === 'string') {
      allMedia.push({ type: 'video', src: client.workVideo });
    }
  }
  
  workImages.forEach(img => {
    if (img && typeof img === 'string') {
      allMedia.push({ type: 'image', src: img });
    }
  });
  
  if (allMedia.length === 0 && client.logo && typeof client.logo === 'string') {
    allMedia.push({ type: 'image', src: client.logo });
  }

  const services = client.services && client.services.length > 0
    ? client.services
    : [];

  const nextMedia = () => {
    if (allMedia.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    }
  };
  const previousMedia = () => {
    if (allMedia.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    }
  };
  const currentMedia = allMedia.length > 0 ? (allMedia[currentIndex] || allMedia[0]) : null;

  const getCategoryName = (category: string) => {
    const translation = categoryTranslations[category];
    if (!translation) return category;
    return isRTL ? translation.ar : translation.en;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-2 border-primary/20 dark:border-primary/30 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: isRTL ? 'Somar, sans-serif' : 'Gotham, sans-serif' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-3 hover:bg-primary/10 dark:hover:bg-primary/20 shadow-lg"
          aria-label={isRTL ? 'إغلاق' : 'Close'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Section with Logo */}
        <div className="relative p-8 lg:p-12 border-b-2 border-primary/10 dark:border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            {client.logo && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-24 h-24 object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.2)',
                  }}
                />
              </motion.div>
            )}

            {/* Title and Category */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 dark:text-white uppercase tracking-tight mb-4"
              >
                {client.name}
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
                className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mb-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-block px-6 py-2 bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 dark:border-primary/40 text-primary rounded-full text-sm font-heading uppercase tracking-wider shadow-lg">
                  {getCategoryName(client.category)}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Description */}
          {client.description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-gotham leading-relaxed"
            >
              {client.description}
            </motion.p>
          )}
        </div>

        {/* Media Gallery */}
        {allMedia.length > 0 && (
          <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-y-2 border-primary/10 dark:border-primary/20">
            <div className="relative aspect-video overflow-hidden group bg-black/5">
              <AnimatePresence mode="wait">
                {currentMedia && currentMedia.src && typeof currentMedia.src === 'string' ? (
                  currentMedia.type === 'video' ? (
                    isGoogleDriveVideo(currentMedia.src) ? (
                      <motion.iframe
                        key={`drive-video-${currentIndex}`}
                        src={convertGoogleDriveVideoUrl(currentMedia.src)}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    ) : (
                      <motion.video
                        key={`video-${currentIndex}`}
                        src={currentMedia.src}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )
                  ) : (
                    <motion.div
                      key={`image-${currentIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <GoogleDriveMedia
                        src={currentMedia.src}
                        alt={`${client.name} work ${currentIndex + 1}`}
                        className="w-full h-full"
                        type="image"
                        objectFit="contain"
                      />
                    </motion.div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <p className="text-gray-400">{isRTL ? 'لا توجد وسائط متاحة' : 'No media available'}</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-primary hover:bg-primary hover:text-white p-4 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label={isRTL ? 'السابق' : 'Previous'}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                    </svg>
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-primary hover:bg-primary hover:text-white p-4 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label={isRTL ? 'التالي' : 'Next'}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                    </svg>
                  </button>
                  <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl z-10 border-2 border-primary/20">
                    <span className="text-gray-900 dark:text-white text-sm font-heading font-bold">
                      {currentIndex + 1} / {allMedia.length}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="p-6 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-800 dark:to-transparent">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20">
                  {allMedia.map((media, idx) => {
                    if (!media || !media.src || typeof media.src !== 'string') return null;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentIndex(idx);
                        }}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                          idx === currentIndex
                            ? 'border-primary shadow-lg shadow-primary/50 scale-110'
                            : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {media.type === 'video' ? (
                          <>
                            {isGoogleDriveVideo(media.src) ? (
                              <iframe
                                src={convertGoogleDriveVideoUrl(media.src)}
                                className="w-full h-full border-0 pointer-events-none"
                                style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
                              />
                            ) : (
                              <video
                                src={media.src}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                              />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </>
                        ) : (
                          <GoogleDriveMedia
                            src={media.src}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full"
                            type="image"
                            objectFit="cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 lg:p-12 space-y-8">
          {/* Services */}
          {services.length > 0 && (
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
                {isRTL ? 'الخدمات المقدمة' : 'Services Provided'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                      <span className="text-gray-900 dark:text-white font-gotham text-base">
                        {service}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-primary/10 dark:border-primary/20">
            <Link href="/request-quote" className="flex-1">
              <motion.button
                className="w-full px-8 py-5 bg-primary hover:bg-primary/90 text-white font-heading uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, isRTL ? -5 : 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-[#9a2d45] to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </Link>
            <motion.button
              onClick={onClose}
              className="px-8 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary font-heading uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isRTL ? 'إغلاق' : 'Close'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
