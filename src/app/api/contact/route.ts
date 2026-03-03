import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import SiteCms from '@/models/SiteCms';

const normalizeText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const normalizeProduct = (productValue: unknown, serviceTypeValue: unknown): string => {
  const raw = (normalizeText(productValue) || normalizeText(serviceTypeValue)).toLowerCase();
  const aliases: Record<string, string> = {
    sms: 'sms',
    'sms-platform': 'sms',
    whatsapp: 'whatsapp',
    'whatsapp-business-api': 'whatsapp',
    'o-time': 'o-time',
    otime: 'o-time',
    'gov-gate': 'gov-gate',
    govgate: 'gov-gate',
    other: 'other',
    'general-inquiry': 'other',
    general: 'other',
  };
  return aliases[raw] || 'other';
};

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = (await request.json()) as Record<string, unknown>;

    const name = normalizeText(data.name);
    const email = normalizeText(data.email);
    const phone = normalizeText(data.phone);
    const company = normalizeText(data.company);
    const subject = normalizeText(data.subject);
    const message = normalizeText(data.message);
    const source = normalizeText(data.source) || 'contact-page';
    const serviceType = normalizeText(data.serviceType) || 'general-inquiry';
    const product = normalizeProduct(data.product, serviceType);

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ClientInquiry = (await import('@/models/ClientInquiry')).default;
    const inquiry = await ClientInquiry.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
      source,
      type: 'contact',
      serviceType,
    });

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      product,
      subject,
      message,
    });

    const submission = {
      id: `cs${Date.now()}`,
      name,
      email,
      phone,
      company,
      message,
      product,
      date: new Date().toISOString(),
      read: false,
    };

    await SiteCms.findOneAndUpdate(
      { key: 'primary' },
      {
        $setOnInsert: { key: 'primary', isActive: true },
        $push: { contactSubmissions: { $each: [submission], $position: 0 } },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidateTag('site-cms', 'max');

    return NextResponse.json(
      { message: 'Contact form submitted successfully', contact, inquiry, submission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
