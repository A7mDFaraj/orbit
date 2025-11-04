import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { UniqueFeaturesSettings } from '@/models/UniqueFeaturesSettings';

export async function GET() {
  try {
    await connectDB();
    const settings = await UniqueFeaturesSettings.findOne();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching unique features settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    const settings = await UniqueFeaturesSettings.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error updating unique features settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

