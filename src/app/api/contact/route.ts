import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

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
    const data = await request.json();

    // Also save to ClientInquiry for unified management
    const ClientInquiry = (await import('@/models/ClientInquiry')).default;
    const inquiry = await ClientInquiry.create({
      ...data,
      type: 'contact',
      serviceType: data.serviceType || 'general-inquiry',
    });

    // Keep the old Contact model for backwards compatibility (optional)
    const contact = await Contact.create(data);

    return NextResponse.json(
      { message: 'Contact form submitted successfully', contact, inquiry },
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










