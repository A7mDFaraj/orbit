'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductsShowcase from '@/components/ProductsShowcase';
import WhyOrbit from '@/components/WhyOrbit';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutUs() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen" style={{ minHeight: '100dvh' }}>
      <Navbar />
      <Hero key={`hero-${isRTL ? 'rtl' : 'ltr'}-${isDark ? 'dark' : 'light'}`} />

      <AnimatedSection delay={0.2}>
        <WhyOrbit />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <About />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <ProductsShowcase />
      </AnimatedSection>

      <Footer />
    </div>
  );
}
