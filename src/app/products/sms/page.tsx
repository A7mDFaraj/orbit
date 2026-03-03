import { SMSPage } from '@/components/business/products/SMSPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteCmsSnapshot } from '@/lib/cms/siteCms';
import { getCmsPageById } from '@/lib/cms/helpers';

export default async function SMSProductPage() {
  const snapshot = await getSiteCmsSnapshot();
  const cmsPage = getCmsPageById(snapshot, 'sms');
  const partners = snapshot?.partners ?? [];

  return (
    <>
      <Navbar />
      <SMSPage cmsPage={cmsPage} partners={partners} />
      <Footer />
    </>
  );
}
