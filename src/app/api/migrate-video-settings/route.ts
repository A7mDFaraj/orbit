import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VideoSettings } from '@/models/VideoSettings';

export async function POST() {
  try {
    await connectDB();
    
    // Find the old video settings
    const oldSettings = await VideoSettings.findOne();
    
    if (!oldSettings) {
      return NextResponse.json({ message: 'No settings found' });
    }

    // Check if already migrated
    if (oldSettings.videos && oldSettings.videos.length > 0) {
      return NextResponse.json({ 
        message: 'Already migrated',
        settings: oldSettings 
      });
    }

    // Migrate from old structure to new
    const oldDoc = oldSettings.toObject() as any;
    const videoUrl = oldDoc.videoUrl as string | undefined;
    
    if (videoUrl && (!oldSettings.videos || oldSettings.videos.length === 0)) {
      oldSettings.videos = [
        {
          videoUrl: videoUrl,
          titleEn: 'Our Showreel',
          titleAr: 'عرضنا التقديمي',
          order: 0,
        }
      ];
      await oldSettings.save();
      return NextResponse.json({ 
        message: 'Migration successful',
        settings: oldSettings 
      });
    }

    // If no old videoUrl, create default
    if (!oldSettings.videos || oldSettings.videos.length === 0) {
      oldSettings.videos = [
        {
          videoUrl: '/video/video1.mp4',
          titleEn: 'Our Showreel',
          titleAr: 'عرضنا التقديمي',
          order: 0,
        }
      ];
      await oldSettings.save();
      return NextResponse.json({ 
        message: 'Created default video',
        settings: oldSettings 
      });
    }

    return NextResponse.json({ 
      message: 'No migration needed',
      settings: oldSettings 
    });
  } catch (error) {
    console.error('Error migrating video settings:', error);
    return NextResponse.json(
      { error: 'Failed to migrate video settings' },
      { status: 500 }
    );
  }
}

