'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GoogleDriveMedia from '@/components/GoogleDriveMedia';
import { convertGoogleDriveVideoUrl, isGoogleDriveVideo } from '@/utils/googleDrive';

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

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isRTL } = useLanguage();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlogExpanded, setIsBlogExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/clients/slug/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.client) {
            setClient(data.client);
          } else {
            toast.error('Client not found');
            router.push('/portfolio');
          }
        })
        .catch(() => {
          toast.error('Error loading client');
          router.push('/portfolio');
        })
        .finally(() => setLoading(false));
    }
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!client) {
    return null;
  }

  const workImages = client.workImages && client.workImages.length > 0 
    ? client.workImages 
    : [];
  
  const allMedia: Array<{ type: 'image' | 'video'; src: string }> = [];
  
  // Add videos first if they exist (support both array and single string for backward compatibility)
  if (client.workVideo) {
    if (Array.isArray(client.workVideo)) {
      client.workVideo.forEach(video => {
        if (video) allMedia.push({ type: 'video', src: video });
      });
    } else {
      allMedia.push({ type: 'video', src: client.workVideo });
    }
  }
  
  workImages.forEach(img => {
    allMedia.push({ type: 'image', src: img });
  });
  
  if (allMedia.length === 0) {
    allMedia.push(
      { type: 'image', src: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop' },
    );
  }

  const services = client.services && client.services.length > 0
    ? client.services
    : ['Branding & Identity', 'Marketing Strategy', 'Content Production', 'Digital Marketing'];

  const nextMedia = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const previousMedia = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };
  
  const currentMedia = allMedia[currentIndex];
  
  // Convert Google Drive video URLs to playable format
  const getVideoUrl = (src: string) => {
    if (isGoogleDriveVideo(src)) {
      return convertGoogleDriveVideoUrl(src);
    }
    return src;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Media Gallery */}
          <div className="relative bg-black/40 rounded-2xl overflow-hidden mb-8">
            <div className="relative aspect-video overflow-hidden group">
              <AnimatePresence mode="wait">
                {currentMedia && currentMedia.type === 'video' ? (
                  isGoogleDriveVideo(currentMedia.src) ? (
                    <motion.iframe
                      key={`drive-video-${currentIndex}`}
                      src={getVideoUrl(currentMedia.src)}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.video
                      key={`video-${currentIndex}`}
                      ref={videoRef}
                      src={currentMedia.src}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                  )
                ) : (
                  <motion.div
                    key={`image-${currentIndex}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
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
                )}
              </AnimatePresence>

              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                <span className="text-white text-sm font-bold">
                  {currentIndex + 1} / {allMedia.length}
                </span>
              </div>

              {client.logo && (
                <div className="absolute top-4 left-4 bg-white/98 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/50 z-20">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-24 h-24 object-contain drop-shadow-lg"
                    style={{
                      filter: 'brightness(1.05) contrast(1.15)',
                    }}
                  />
                </div>
              )}
            </div>

            {allMedia.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-10">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allMedia.map((media, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.pause();
                        }
                        setCurrentIndex(idx);
                      }}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentIndex
                          ? 'border-primary shadow-lg shadow-primary/50 scale-110'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <>
                          {isGoogleDriveVideo(media.src) ? (
                            <iframe
                              src={getVideoUrl(media.src)}
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
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Client Details */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 space-y-6">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl lg:text-5xl font-rb-bold text-white uppercase tracking-tight mb-3">
                {client.name}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-4 py-1.5 bg-primary/20 border border-primary/40 rounded-full text-primary font-bold text-sm uppercase">
                  {client.category}
                </span>
              </div>
            </div>

            {client.description && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/80 text-base leading-relaxed">
                  {client.description}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-lg font-rb-bold text-white mb-4 uppercase">
                {isRTL ? 'الخدمات المقدمة' : 'Services Provided'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 text-sm transition-all flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {client.blogText && (
              <div className="pt-4 border-t border-white/10">
                <motion.button
                  onClick={() => setIsBlogExpanded(!isBlogExpanded)}
                  className="w-full flex items-center justify-between text-left"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className="text-lg font-rb-bold text-white uppercase">
                    {isRTL ? 'تفاصيل المشروع' : 'Project Details'}
                  </h3>
                  <motion.div
                    animate={{ rotate: isBlogExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {isBlogExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 max-h-[70vh] overflow-y-auto">
                        <div 
                          className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/80"
                          dangerouslySetInnerHTML={{ __html: client.blogText }}
                          style={{
                            '--tw-prose-body': '#e5e7eb',
                            '--tw-prose-headings': '#ffffff',
                            '--tw-prose-links': '#3b82f6',
                            '--tw-prose-bold': '#ffffff',
                            '--tw-prose-code': '#e5e7eb',
                            '--tw-prose-pre-code': '#e5e7eb',
                            '--tw-prose-pre-bg': '#1f2937',
                            '--tw-prose-th-borders': '#374151',
                            '--tw-prose-td-borders': '#374151',
                          } as React.CSSProperties}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/request-quote" className="flex-1">
                <motion.button
                  className="w-full px-8 py-4 bg-primary hover:bg-primary/90 text-white font-rb-bold uppercase tracking-wider rounded-lg shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'} →
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-rb-bold uppercase tracking-wider rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isRTL ? 'العودة للمحفظة' : 'Back to Portfolio'}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

