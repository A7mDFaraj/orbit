'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import WhyOrbit from '@/components/WhyOrbit';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutUs() {
  useLanguage();

  return (
    <div className="min-h-screen" style={{ minHeight: '100dvh' }}>
      <Navbar />

      <AnimatedSection delay={0.2}>
        <About />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <WhyOrbit />
      </AnimatedSection>

      <Footer />
    </div>
  );
}
