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

    // Seed features with default data
    const features = [
      {
        title: 'Saudi Creativity',
        titleAr: 'إبداع سعودي',
        desc: 'Local expertise with global standards',
        descAr: 'خبرة محلية بمعايير عالمية',
        order: 1,
      },
      {
        title: 'End-to-End Execution',
        titleAr: 'تنفيذ شامل',
        desc: 'From idea to impact, we handle it all',
        descAr: 'من الفكرة إلى التأثير، نتولى كل شيء',
        order: 2,
      },
      {
        title: 'Diverse Expertise',
        titleAr: 'خبرات متنوعة',
        desc: 'Team of specialized professionals',
        descAr: 'فريق من المحترفين المتخصصين',
        order: 3,
      },
      {
        title: 'Attention to Detail',
        titleAr: 'الاهتمام بالتفاصيل',
        desc: 'Excellence in every aspect',
        descAr: 'التميز في كل جانب',
        order: 4,
      },
      {
        title: 'Trust & Partnership',
        titleAr: 'الثقة والشراكة',
        desc: 'Building long-term relationships',
        descAr: 'بناء علاقات طويلة الأمد',
        order: 5,
      },
      {
        title: 'Innovation Focus',
        titleAr: 'التركيز على الابتكار',
        desc: 'Creative solutions that work',
        descAr: 'حلول إبداعية تعمل',
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

