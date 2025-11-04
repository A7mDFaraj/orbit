import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { UniqueFeature } from '@/models/UniqueFeature';

export async function GET() {
  try {
    await connectDB();
    const features = await UniqueFeature.find({}).sort({ order: 1 });
    return NextResponse.json(features);
  } catch (error) {
    console.error('Error fetching unique features:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    const lastFeature = await UniqueFeature.findOne().sort({ order: -1 });
    const order = lastFeature ? lastFeature.order + 1 : 1;

    const feature = await UniqueFeature.create({ ...data, order });
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error('Error creating unique feature:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

