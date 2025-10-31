import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import TeamApplication from '@/models/TeamApplication';

export async function GET() {
  try {
    await connectDB();
    const applications = await TeamApplication.find().sort({ createdAt: -1 });
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching team applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    const application = await TeamApplication.create(data);

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating team application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

