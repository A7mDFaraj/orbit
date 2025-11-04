import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { AboutSettings } from '@/models/AboutSettings';

export async function GET() {
  try {
    await connectDB();
    const settings = await AboutSettings.findOne();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching about settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    const settings = await AboutSettings.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error updating about settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

