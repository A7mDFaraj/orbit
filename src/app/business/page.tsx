'use client';

import { useEffect } from 'react';
import { LandingPage } from '@/components/business/landing/LandingPage';
import { Navbar as BusinessNavbar } from '@/components/business/landing/Navbar';
import { Footer } from '@/components/business/landing/Footer';
import { WhatsAppButton } from '@/components/business/landing/WhatsAppButton';

export default function BusinessPage() {
  // Set RTL on mount and inject Tajawal font (same as pro App.tsx)
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";

    // Inject font style for a better Arabic experience
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');
      body {
        font-family: 'Tajawal', sans-serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#7A1E2E]/20 overflow-x-hidden" dir="rtl">
      <BusinessNavbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
