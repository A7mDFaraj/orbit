'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

interface VideoSettings {
  videos: {
    videoUrl: string;
    titleEn?: string;
    titleAr?: string;
    order: number;
  }[];
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  playButtonTextEn: string;
  playButtonTextAr: string;
  stats: {
    numberEn: string;
    numberAr: string;
    labelEn: string;
    labelAr: string;
  }[];
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [settings, setSettings] = useState<VideoSettings | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setMounted(true);
    fetch('/api/video-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data.settings))
      .catch((err) => console.error('Error fetching video settings:', err));
  }, []);

  // Auto-play video when in view, pause when out of view
  useEffect(() => {
    if (videoRef.current && mounted) {
      if (inView) {
        videoRef.current.play().catch(err => {
          console.log('Auto-play prevented:', err);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView, mounted]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleVideoChange = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    setShowControls(false);
  };

  const handlePrevVideo = () => {
    if (!settings) return;
    const newIndex = currentVideoIndex === 0 ? settings.videos.length - 1 : currentVideoIndex - 1;
    handleVideoChange(newIndex);
  };

  const handleNextVideo = () => {
    if (!settings) return;
    const newIndex = currentVideoIndex === settings.videos.length - 1 ? 0 : currentVideoIndex + 1;
    handleVideoChange(newIndex);
  };

  if (!mounted || !settings || !settings.videos || settings.videos.length === 0) {
    return (
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </section>
    );
  }

  const currentVideo = settings.videos[currentVideoIndex] || settings.videos[0];
  const hasMultipleVideos = settings.videos.length > 1;

  return (
    <section 
      id="work" 
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Modern Animated Background */}
      {inView && (
        <>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(41, 171, 226, 0.15) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Floating Video with Animation */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Title Above Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-rb-bold text-white mb-3 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {isRTL ? settings.titleAr : settings.titleEn}
            </h2>

            <p 
              className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {isRTL ? settings.descriptionAr : settings.descriptionEn}
            </p>
          </motion.div>

          {/* Video Container with Perfect Sizing */}
          <div className="relative group max-w-5xl mx-auto">
            {/* Glow Effect Behind Video */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-blue-500/30 to-primary/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Video Container with Modern Glassmorphism */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/30 backdrop-blur-xl group-hover:border-primary/70 transition-all duration-300">
              {/* Video Player */}
              <video
                key={currentVideo.videoUrl}
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={showControls}
                controlsList="nodownload"
                onPlay={handlePlay}
                onPause={handlePause}
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Play Button Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/70 via-secondary/50 to-black/70 backdrop-blur-sm cursor-pointer z-10"
                    onClick={handlePlayClick}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative flex items-center justify-center">
                      {/* Animated Rings */}
                      <motion.div
                        className="absolute rounded-full border-4 border-primary"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{ width: '96px', height: '96px' }}
                      />
                      <motion.div
                        className="absolute rounded-full border-4 border-primary"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.7,
                        }}
                        style={{ width: '96px', height: '96px' }}
                      />

                      {/* Play Button */}
                      <motion.div
                        className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl z-10"
                        animate={{
                          boxShadow: [
                            '0 0 30px rgba(41, 171, 226, 0.5)',
                            '0 0 50px rgba(41, 171, 226, 0.8)',
                            '0 0 30px rgba(41, 171, 226, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {/* Play Icon with unique design */}
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <svg
                            className="w-10 h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>

                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent overflow-hidden"
                          animate={{
                            x: ['-200%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Text Below */}
                    <motion.p
                      className="text-white text-xl font-rb-bold uppercase mt-6 text-center tracking-wider"
                      style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {isRTL ? settings.playButtonTextAr : settings.playButtonTextEn}
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
              </AnimatePresence>

              {/* Angular Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: isPlaying ? 0.3 : 1 }}></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: isPlaying ? 0.3 : 1 }}></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: isPlaying ? 0.3 : 1 }}></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: isPlaying ? 0.3 : 1 }}></div>

              {/* Video Navigation for Multiple Videos */}
              {hasMultipleVideos && (
                <>
                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={handlePrevVideo}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-primary/90 hover:bg-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={handleNextVideo}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-primary/90 hover:bg-primary text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </motion.button>

                  {/* Video Title Overlay */}
                  {(currentVideo.titleEn || currentVideo.titleAr) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full"
                    >
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                        {isRTL ? currentVideo.titleAr : currentVideo.titleEn}
                      </h3>
                    </motion.div>
                  )}

                  {/* Video Thumbnails/Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {settings.videos.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleVideoChange(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentVideoIndex 
                            ? 'w-12 bg-primary' 
                            : 'w-2 bg-white/50 hover:bg-white/80'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats Below Video - True Focus Style Animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {settings.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="group relative text-center p-8 rounded-3xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: -1 }}
                />

                {/* Number with True Focus Animation */}
                <div className="relative z-10 mb-4">
                  <motion.div className="text-6xl font-rb-bold">
                    {isRTL ? (
                      // Simple animation for Arabic numbers
                      <motion.span
                        className="inline-block text-primary"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {stat.numberAr}
                      </motion.span>
                    ) : (
                      // Character animation for English
                      stat.numberEn.split('').map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          className="inline-block"
                          animate={{
                            y: [0, -8, 0],
                            scale: [1, 1.2, 1],
                            color: ['#29ABE2', '#60d5ff', '#29ABE2'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: charIndex * 0.15 + index * 0.3,
                            ease: 'easeInOut',
                          }}
                        >
                          {char}
                        </motion.span>
                      ))
                    )}
                  </motion.div>
                </div>

                {/* Label with True Focus Letter Animation */}
                <div className="relative z-10">
                  <div className="uppercase text-sm font-montserrat font-bold tracking-[0.15em] flex flex-wrap justify-center gap-x-1">
                    {isRTL ? (
                      // Simple animation for Arabic labels
                      <motion.span
                        className="text-gray-300"
                        animate={{
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {stat.labelAr}
                      </motion.span>
                    ) : (
                      // Character animation for English
                      stat.labelEn.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-flex">
                          {word.split('').map((char, charIndex) => (
                            <motion.span
                              key={charIndex}
                              className="inline-block"
                              animate={{
                                y: [0, -5, 0],
                                scale: [1, 1.15, 1],
                                opacity: [0.8, 1, 0.8],
                                color: ['rgb(209, 213, 219)', 'rgb(41, 171, 226)', 'rgb(209, 213, 219)'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: wordIndex * 0.3 + charIndex * 0.08 + index * 0.5,
                                ease: 'easeInOut',
                              }}
                              whileHover={{
                                scale: 1.3,
                                color: 'rgb(41, 171, 226)',
                                y: -8,
                                transition: { duration: 0.2 }
                              }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

