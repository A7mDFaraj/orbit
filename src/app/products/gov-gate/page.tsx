import { GovGatePage } from '@/components/business/products/GovGatePage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteCmsSnapshot } from '@/lib/cms/siteCms';
import { getCmsPageById } from '@/lib/cms/helpers';

export default async function GovGateProductPage() {
  const snapshot = await getSiteCmsSnapshot();
  const cmsPage = getCmsPageById(snapshot, 'govgate');

  return (
    <>
      <Navbar />
      <GovGatePage cmsPage={cmsPage} />
      <Footer />
    </>
  );
}
