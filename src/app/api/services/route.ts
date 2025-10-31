import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { requireAdmin } from '@/lib/auth';

// GET all services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new service (Admin only)
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    await connectDB();
    
    const service = await Service.create(body);
    return NextResponse.json({ service }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

