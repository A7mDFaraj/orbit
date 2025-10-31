import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Testimonial } from '@/models/Testimonial';
import { requireAdmin } from '@/lib/auth';

// GET single testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update testimonial (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    
    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ testimonial });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

// DELETE testimonial (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    
    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

