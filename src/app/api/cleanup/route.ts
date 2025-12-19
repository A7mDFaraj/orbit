import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/models/Service';
import { AboutSettings } from '@/models/AboutSettings';
import { UniqueFeature } from '@/models/UniqueFeature';
import { UniqueFeaturesSettings } from '@/models/UniqueFeaturesSettings';

/**
 * Cleanup endpoint to remove all old MarkLine data
 * This will clear services, about settings, and unique features
 * so they can be reseeded with ORBIT data
 */
export async function POST() {
  try {
    await connectDB();

    // Delete all old services
    const servicesDeleted = await Service.deleteMany({});
    
    // Delete old about settings (will be reseeded with ORBIT data)
    const aboutDeleted = await AboutSettings.deleteMany({});
    
    // Delete old unique features (will be reseeded with ORBIT data)
    const featuresDeleted = await UniqueFeature.deleteMany({});
    const featuresSettingsDeleted = await UniqueFeaturesSettings.deleteMany({});

    return NextResponse.json({
      message: 'Old data cleaned up successfully',
      deleted: {
        services: servicesDeleted.deletedCount,
        aboutSettings: aboutDeleted.deletedCount,
        uniqueFeatures: featuresDeleted.deletedCount,
        uniqueFeaturesSettings: featuresSettingsDeleted.deletedCount,
      },
      note: 'You can now reseed the database with ORBIT data by calling /api/about-settings/seed and /api/unique-features/seed',
    });
  } catch (error) {
    console.error('Error cleaning up old data:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup old data' },
      { status: 500 }
    );
  }
}

