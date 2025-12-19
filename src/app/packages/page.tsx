'use client';

import Navbar from '@/components/Navbar';
import PackagesHero from './PackagesHero';
import TechnicalPackages from './TechnicalPackages';
import Footer from '@/components/Footer';

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <PackagesHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <TechnicalPackages />
      </div>
      <Footer />
    </div>
  );
}

