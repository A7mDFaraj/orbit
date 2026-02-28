'use client';

import { LandingPage } from '@/components/business/landing/LandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppButton } from '@/components/business/landing/WhatsAppButton';

const SHOW_WHATSAPP_BUTTON = false; // set true to re-enable

export default function Home() {

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#7A1E2E]/20 overflow-x-hidden">
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
      {SHOW_WHATSAPP_BUTTON && <WhatsAppButton />}
    </div>
  );
}
