import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { AboutSettings } from '@/models/AboutSettings';

export async function POST() {
  try {
    await connectDB();

    // Check if settings already exist
    const existing = await AboutSettings.findOne();
    if (existing) {
      return NextResponse.json({
        message: 'About settings already exist',
        settings: existing,
      });
    }

    // Seed with default data from translations
    const settings = await AboutSettings.create({
      title: 'About Mark Line',
      titleAr: 'عن مارك لاين',
      description: 'A leading Saudi entity in providing integrated business and service solutions',
      descriptionAr: 'كيان سعودي رائد في تقديم الحلول المتكاملة للأعمال والخدمات',
      vision: 'VISION',
      visionAr: 'الرؤية',
      visionText: 'To be the first choice for delivering integrated solutions that combine marketing, production, management, and real estate in a modern approach aligned with Saudi Vision 2030',
      visionTextAr: 'أن نكون الخيار الأول لتقديم حلول متكاملة تجمع بين التسويق والإنتاج والإدارة والعقارات بأسلوب حديث يواكب رؤية السعودية 2030',
      mission: 'MISSION',
      missionAr: 'الرسالة',
      missionText: 'Providing comprehensive services that support business development and achieve impact through a specialized team across all tracks with a commitment to innovation and quality',
      missionTextAr: 'تقديم خدمات شاملة تدعم تطوير الأعمال وتحقيق الأثر من خلال فريق متخصص في كافة المسارات مع التزام بالابتكار والجودة',
    });

    return NextResponse.json({
      message: 'About settings seeded successfully',
      settings,
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding about settings:', error);
    return NextResponse.json(
      { error: 'Failed to seed about settings' },
      { status: 500 }
    );
  }
}

