import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import SiteCms from '@/models/SiteCms';
import { mergePartnersWithTrustedLogos } from '@/lib/cms/trustedLogos';

interface ExistingSiteDoc {
  pages?: unknown[];
  partners?: unknown[];
  socialLinks?: unknown[];
  contactSubmissions?: unknown[];
  notificationEmail?: string;
  footerData?: Record<string, unknown>;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const site = (await SiteCms.findOne({ key: 'primary', isActive: true }).lean()) as (ExistingSiteDoc & {
      key?: string;
      isActive?: boolean;
      pages?: unknown[];
      socialLinks?: unknown[];
      contactSubmissions?: unknown[];
      notificationEmail?: string;
      footerData?: Record<string, unknown>;
    }) | null;
    const partners = await mergePartnersWithTrustedLogos(Array.isArray(site?.partners) ? site.partners : []);
    const responseSite = site
      ? { ...site, partners }
      : {
          key: 'primary',
          isActive: true,
          pages: [],
          partners,
          socialLinks: [],
          contactSubmissions: [],
          notificationEmail: 'sales@orbit.sa',
          footerData: {},
        };
    return NextResponse.json(
      { success: true, site: responseSite },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch site CMS';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { pages, partners, socialLinks, contactSubmissions, notificationEmail, footerData } = body || {};
    const existing = (await SiteCms.findOne({ key: 'primary' }).lean()) as ExistingSiteDoc | null;

    const site = await SiteCms.findOneAndUpdate(
      { key: 'primary' },
      {
        key: 'primary',
        isActive: true,
        pages: Array.isArray(pages) ? pages : (Array.isArray(existing?.pages) ? existing.pages : []),
        partners: Array.isArray(partners) ? partners : (Array.isArray(existing?.partners) ? existing.partners : []),
        socialLinks: Array.isArray(socialLinks) ? socialLinks : (Array.isArray(existing?.socialLinks) ? existing.socialLinks : []),
        contactSubmissions: Array.isArray(contactSubmissions) ? contactSubmissions : (Array.isArray(existing?.contactSubmissions) ? existing.contactSubmissions : []),
        notificationEmail: typeof notificationEmail === 'string'
          ? notificationEmail
          : (typeof existing?.notificationEmail === 'string' ? existing.notificationEmail : 'sales@orbit.sa'),
        footerData: footerData && typeof footerData === 'object'
          ? footerData
          : (existing?.footerData && typeof existing.footerData === 'object' ? existing.footerData : {}),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    revalidateTag('site-cms', 'max');
    return NextResponse.json(
      { success: true, site },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save site CMS';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
