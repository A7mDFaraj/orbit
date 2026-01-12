'use client';

import { GovGatePage } from '@/components/business/products/GovGatePage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';

export default function GovGateProductPage() {
  return (
    <>
      <BusinessNavbar />
      <GovGatePage />
      <Footer />
    </>
  );
}
