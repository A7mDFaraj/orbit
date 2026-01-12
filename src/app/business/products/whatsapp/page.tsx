'use client';

import { WhatsAppPage } from '@/components/business/products/WhatsAppPage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';

export default function WhatsAppProductPage() {
  return (
    <>
      <BusinessNavbar />
      <WhatsAppPage />
      <Footer />
    </>
  );
}
