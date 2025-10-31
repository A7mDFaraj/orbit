import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { FAQ } from '@/models/FAQ';
import { requireAdmin } from '@/lib/auth';

// GET single FAQ
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const faq = await FAQ.findById(id);
    
    if (!faq) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ faq });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update FAQ (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    
    await connectDB();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    
    if (!faq) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ faq });
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

// DELETE FAQ (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    
    await connectDB();
    const faq = await FAQ.findByIdAndDelete(id);
    
    if (!faq) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

