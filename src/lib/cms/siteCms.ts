import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import SiteCms from '@/models/SiteCms';
import type { CmsFooterData, CmsPage, CmsPartner, SiteCmsSnapshot } from '@/lib/cms/types';

async function readSiteCmsInternal(): Promise<SiteCmsSnapshot | null> {
  await connectDB();
  const doc = (await SiteCms.findOne({ key: 'primary', isActive: true }).lean()) as {
    pages?: CmsPage[];
    partners?: CmsPartner[];
    footerData?: CmsFooterData;
  } | null;
  if (!doc) {
    return null;
  }

  return {
    pages: Array.isArray(doc.pages) ? (doc.pages as CmsPage[]) : [],
    partners: Array.isArray(doc.partners) ? (doc.partners as CmsPartner[]) : [],
    footerData: (doc.footerData && typeof doc.footerData === 'object')
      ? (doc.footerData as CmsFooterData)
      : undefined,
  };
}

export const getSiteCmsSnapshot = unstable_cache(
  async () => {
    try {
      return await readSiteCmsInternal();
    } catch (error) {
      console.error('Failed to load Site CMS snapshot:', error);
      return null;
    }
  },
  ['site-cms-snapshot-v1'],
  {
    revalidate: 300,
    tags: ['site-cms'],
  }
);
