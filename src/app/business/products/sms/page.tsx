'use client';

import { SMSPage } from '@/components/business/products/SMSPage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';

export default function SMSProductPage() {
  return (
    <>
      <BusinessNavbar />
      <SMSPage />
      <Footer />
    </>
  );
}
