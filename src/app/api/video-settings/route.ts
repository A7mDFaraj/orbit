import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VideoSettings } from '@/models/VideoSettings';
import { requireAdmin } from '@/lib/auth';

// GET video settings
export async function GET() {
  try {
    await connectDB();
    let settings = await VideoSettings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await VideoSettings.create({
        videos: [
          {
            videoUrl: '/video/video1.mp4',
            titleEn: 'Our Showreel',
            titleAr: 'عرضنا التقديمي',
            order: 0,
          }
        ],
        titleEn: 'Watch Our Work',
        titleAr: 'شاهد أعمالنا',
        descriptionEn: 'Experience the excellence and creativity in every project we deliver',
        descriptionAr: 'اختبر التميز والإبداع في كل مشروع نقدمه',
        playButtonTextEn: 'Play Showreel',
        playButtonTextAr: 'تشغيل العرض',
        stats: [
          {
            numberEn: '500+',
            numberAr: '+500',
            labelEn: 'Projects Completed',
            labelAr: 'مشروع مكتمل',
          },
          {
            numberEn: '200+',
            numberAr: '+200',
            labelEn: 'Happy Clients',
            labelAr: 'عميل سعيد',
          },
          {
            numberEn: '5+',
            numberAr: '+5',
            labelEn: 'Years Experience',
            labelAr: 'سنة خبرة',
          },
        ],
      });
    }
    
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching video settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update video settings (Admin only)
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    await connectDB();
    
    let settings = await VideoSettings.findOne();
    
    if (!settings) {
      settings = await VideoSettings.create(body);
    } else {
      settings = await VideoSettings.findOneAndUpdate({}, body, { new: true });
    }
    
    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Error updating video settings:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Unauthorized - Admin access required' ? 401 : 500 }
    );
  }
}

