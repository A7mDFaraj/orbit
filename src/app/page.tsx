'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import VideoSection from '@/components/VideoSection';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function Home() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero key={`hero-${isRTL ? 'rtl' : 'ltr'}-${isDark ? 'dark' : 'light'}`} />
      <About />
      <Services />
      <VideoSection />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
