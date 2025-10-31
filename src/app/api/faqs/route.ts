import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { FAQ } from '@/models/FAQ';
import { requireAdmin } from '@/lib/auth';

// GET all FAQs
export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new FAQ (Admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    await connectDB();
    
    const faq = await FAQ.create(body);
    return NextResponse.json({ faq }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

