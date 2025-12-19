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

    // Seed with default data from translations - ORBIT Technical Solutions
    const settings = await AboutSettings.create({
      title: 'About ORBIT',
      titleAr: 'عن أوربيت',
      description: 'A leading Saudi company providing smart technical solutions, enabling organizations to evolve through modern technologies that ensure higher efficiency, faster communication, and an integrated digital experience',
      descriptionAr: 'المدار شركة سعودية رائدة في تقديم الحلول التقنية الذكية، نعمل على تمكين المؤسسات من التطور عبر تقنيات حديثة تضمن كفاءة أعلى، تواصل أسرع، وتجربة رقمية متكاملة',
      vision: 'VISION',
      visionAr: 'الرؤية',
      visionText: 'To be the first and most trusted technical partner in the Kingdom and beyond',
      visionTextAr: 'أن نكون الشريك التقني الأول والأكثر ثقة في المملكة وخارجها',
      mission: 'MISSION',
      missionAr: 'الرسالة',
      missionText: 'Providing innovative technical solutions with quality and professionalism that meet our clients\' changing needs',
      missionTextAr: 'تقديم حلول تقنية مبتكرة بجودة واحترافية تلبي احتياجات عملائنا المتغيرة',
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

