'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Testimonial {
  _id: string;
  name: string;
  nameAr?: string;
  position: string;
  positionAr?: string;
  company?: string;
  companyAr?: string;
  content: string;
  contentAr?: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials || []))
      .catch((err) => console.error('Error fetching testimonials:', err));

    // Inject custom Swiper styles only on client side
    const styleId = 'testimonials-swiper-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .testimonials-slider .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-slider .swiper-pagination-bullet {
          background: #29abe2 !important;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .testimonials-slider .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: translateY(-50%) scale(1.1);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-rb-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tighter"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.testimonials.title}
            </h2>
            <p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-montserrat"
              style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
            >
              {t.testimonials.description}
            </p>
          </motion.div>

          {testimonials.length > 0 && mounted ? (
            <div className="relative testimonials-slider" dir={isRTL ? 'rtl' : 'ltr'}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  reverseDirection: isRTL,
                }}
                loop={true}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                  slideShadows: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="pb-16"
                key={isRTL ? 'rtl' : 'ltr'}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial._id}>
                    <motion.div
                      variants={itemVariants}
                      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all h-full border-2 border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
                      whileHover={{ y: -5 }}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {(isRTL && testimonial.nameAr ? testimonial.nameAr : testimonial.name).charAt(0)}
                        </div>
                        <div className={isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {isRTL && testimonial.nameAr ? testimonial.nameAr : testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {isRTL && testimonial.positionAr ? testimonial.positionAr : testimonial.position}
                          </p>
                        </div>
                      </div>

                      <div className={`flex mb-4 gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <div className="relative">
                        <svg className={`absolute -top-2 ${isRTL ? '-right-2' : '-left-2'} w-8 h-8 text-primary/20 dark:text-primary/30`} fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
                        </svg>
                        <p className={`text-gray-700 dark:text-gray-300 leading-relaxed italic font-montserrat ${isRTL ? 'pr-6 text-right' : 'pl-6 text-left'}`}
                          style={{ fontFamily: isRTL ? 'Tajawal, sans-serif' : undefined }}
                        >
                          {isRTL && testimonial.contentAr ? testimonial.contentAr : testimonial.content}
                        </p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary hover:bg-secondary text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary hover:bg-secondary text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Loading testimonials...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

