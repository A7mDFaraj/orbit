'use client';

import Navbar from '@/components/Navbar';
import PackagesHero from './PackagesHero';
import PackagesList from './PackagesList';
import Contact from '@/components/Contact';

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PackagesHero />
      <PackagesList />
      <Contact />
    </div>
  );
}

