'use client';

import { OTimePage } from '@/components/business/products/OTimePage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';

export default function OTimeProductPage() {
  return (
    <>
      <BusinessNavbar />
      <OTimePage />
      <Footer />
    </>
  );
}
