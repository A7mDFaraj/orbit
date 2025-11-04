'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { isRTL } = useLanguage();
  const whatsappLink = 'https://wa.me/966548467106';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white rounded-full shadow-2xl hover:shadow-green-500/60 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundSize: '200% 100%' }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-700 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />

            {/* Icon Container */}
            <div className="relative p-4">
              <motion.svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 relative z-10"
                animate={{ 
                  rotate: isHovered ? [0, -12, 12, -8, 8, 0] : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </motion.svg>
            </div>

            {/* Text - Expands on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden pr-5"
                >
                  <div className="relative z-10">
                    <span className="font-rb-bold text-base uppercase tracking-wider whitespace-nowrap block">
                      {isRTL ? 'تحدث معنا' : 'Chat with us'}
                    </span>
                    <span className="text-xs opacity-90 whitespace-nowrap block">
                      {isRTL ? 'نحن هنا لمساعدتك' : "We're here to help"}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.4, 1.4],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                repeatDelay: 0.5,
              }}
            />

            {/* Secondary pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-300"
              animate={{
                scale: [1, 1.6, 1.6],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
                repeatDelay: 0.5,
              }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.a>

          {/* Close button */}
          <motion.button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Hide"
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

