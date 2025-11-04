'use client';

import Navbar from '@/components/Navbar';
import PackagesHero from './PackagesHero';
import PackagesList from './PackagesList';
import Contact from '@/components/Contact';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PackagesHero />
      <PackagesList />
      <Contact />
      <FloatingWhatsApp />
    </div>
  );
}

