import { WhatsAppPage } from '@/components/business/products/WhatsAppPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteCmsSnapshot } from '@/lib/cms/siteCms';
import { getCmsPageById } from '@/lib/cms/helpers';

export default async function WhatsAppProductPage() {
  const snapshot = await getSiteCmsSnapshot();
  const cmsPage = getCmsPageById(snapshot, 'whatsapp');

  return (
    <>
      <Navbar />
      <WhatsAppPage cmsPage={cmsPage} />
      <Footer />
    </>
  );
}
