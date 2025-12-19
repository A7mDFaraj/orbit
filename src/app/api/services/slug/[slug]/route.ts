import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/models/Service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    // Find service by slug or by title (converted to slug)
    const service = await Service.findOne({
      $or: [
        { slug: slug },
        { title: { $regex: new RegExp(`^${slug.replace(/-/g, ' ')}$`, 'i') } },
        { titleAr: slug },
      ],
      isActive: true,
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}




