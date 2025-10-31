import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { requireAdmin } from '@/lib/auth';

// GET all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new testimonial (Admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    await connectDB();
    
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

