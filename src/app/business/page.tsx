'use client';

import { LandingPage } from '@/components/business/landing/LandingPage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';
import { WhatsAppButton } from '@/components/business/landing/WhatsAppButton';

export default function BusinessPage() {
  return (
    <>
      <BusinessNavbar />
      <LandingPage />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
