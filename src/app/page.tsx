import { LandingPage } from '@/components/business/landing/LandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WhatsAppButton } from '@/components/business/landing/WhatsAppButton';
import { getSiteCmsSnapshot } from '@/lib/cms/siteCms';
import { getCmsPageById } from '@/lib/cms/helpers';

const SHOW_WHATSAPP_BUTTON = false; // set true to re-enable

export default async function Home() {
  const snapshot = await getSiteCmsSnapshot();
  const homePage = getCmsPageById(snapshot, 'home');
  const partners = snapshot?.partners ?? [];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#7A1E2E]/20 overflow-x-hidden">
      <Navbar />
      <main>
        <LandingPage pageData={homePage} partners={partners} />
      </main>
      <Footer />
      {SHOW_WHATSAPP_BUTTON && <WhatsAppButton />}
    </div>
  );
}
