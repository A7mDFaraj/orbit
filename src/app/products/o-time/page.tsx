import { OTimePage } from '@/components/business/products/OTimePage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteCmsSnapshot } from '@/lib/cms/siteCms';
import { getCmsPageById } from '@/lib/cms/helpers';

export default async function OTimeProductPage() {
  const snapshot = await getSiteCmsSnapshot();
  const cmsPage = getCmsPageById(snapshot, 'otime');

  return (
    <>
      <Navbar />
      <OTimePage cmsPage={cmsPage} />
      <Footer />
    </>
  );
}
