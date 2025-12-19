import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { UniqueFeature } from '@/models/UniqueFeature';
import { UniqueFeaturesSettings } from '@/models/UniqueFeaturesSettings';

export async function POST() {
  try {
    await connectDB();

    // Check if features already exist
    const existing = await UniqueFeature.countDocuments();
    if (existing > 0) {
      return NextResponse.json({
        message: 'Unique features already exist',
        count: existing,
      });
    }

    // Seed section title
    await UniqueFeaturesSettings.findOneAndUpdate(
      {},
      {
        sectionTitle: 'What Makes Us Unique',
        sectionTitleAr: 'ما يميزنا',
      },
      { upsert: true }
    );

    // Seed features with ORBIT Technical Solutions data
    const features = [
      {
        title: 'Local Expertise',
        titleAr: 'خبرة محلية وفهم لاحتياجات السوق',
        desc: 'Local experience and understanding of market needs',
        descAr: 'خبرة محلية عميقة بفهم احتياجات السوق',
        order: 1,
      },
      {
        title: 'High-Performance Infrastructure',
        titleAr: 'بنية تقنية عالية الأداء',
        desc: 'High-performance technical infrastructure',
        descAr: 'بنية تقنية متطورة وعالية الأداء',
        order: 2,
      },
      {
        title: 'Specialized Support',
        titleAr: 'دعم فني واستشارات متخصصة',
        desc: 'Technical support and specialized consultations',
        descAr: 'دعم فني واستشارات متخصصة',
        order: 3,
      },
      {
        title: 'Scalable Solutions',
        titleAr: 'حلول قابلة للتوسع',
        desc: 'Solutions that can grow with your business',
        descAr: 'حلول قابلة للتوسع والنمو',
        order: 4,
      },
      {
        title: 'Government Compliance',
        titleAr: 'توافق كامل مع المتطلبات الحكومية',
        desc: 'Full compliance with government requirements',
        descAr: 'توافق كامل مع المتطلبات الحكومية',
        order: 5,
      },
      {
        title: 'Fast Deployment',
        titleAr: 'سرعة تشغيل وتكامل سلس مع الأنظمة',
        desc: 'Quick deployment and seamless system integration',
        descAr: 'سرعة تشغيل وتكامل سلس مع الأنظمة',
        order: 6,
      },
    ];

    const result = await UniqueFeature.insertMany(features);

    return NextResponse.json({
      message: 'Unique features seeded successfully',
      count: result.length,
      features: result,
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding unique features:', error);
    return NextResponse.json(
      { error: 'Failed to seed unique features' },
      { status: 500 }
    );
  }
}

