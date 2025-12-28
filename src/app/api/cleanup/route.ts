import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import MainPageSettings from '@/models/MainPageSettings';

/**
 * Cleanup endpoint for ORBIT project
 * This will reset the main page settings to defaults
 */
export async function POST() {
  try {
    await connectDB();

    // Delete existing main page settings
    const mainPageDeleted = await MainPageSettings.deleteMany({});

    return NextResponse.json({
      message: 'ORBIT data cleaned up successfully',
      deleted: {
        mainPageSettings: mainPageDeleted.deletedCount,
      },
      note: 'You can now reseed the database with ORBIT data by calling /api/seed',
    });
  } catch (error) {
    console.error('Error cleaning up ORBIT data:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup ORBIT data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
