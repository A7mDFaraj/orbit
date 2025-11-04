import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Package } from '@/models/Package';

export async function POST() {
  try {
    await connectDB();

    // Check if packages already exist
    const existingPackages = await Package.countDocuments();
    if (existingPackages > 0) {
      return NextResponse.json({
        message: 'Packages already exist',
        count: existingPackages,
      });
    }

    // Seed packages
    const packagesToSeed = [
      {
        id: 'basic',
        name: 'Basic Package',
        nameAr: 'الباقة الأساسية',
        description: 'Perfect for small businesses and startups',
        descriptionAr: 'مناسبة للشركات الصغيرة والناشئة',
        duration: '3 Months',
        durationAr: 'لمدة 3 أشهر',
        icon: '🌱',
        highlighted: false,
        order: 1,
        features: [
          'Managing 2 social media platforms',
          'Creating and setting up social media accounts',
          'Optimizing accounts with company data',
          '30 engaging and distinctive posts (10 monthly)',
          'Daily monitoring of social media accounts',
          'Monthly report with statistics and account status',
        ],
        featuresAr: [
          'إدارة 2 منصات من منصات السوشيال ميديا',
          'إنشاء الحسابات على السوشيال ميديا',
          'تهيئة وتحسين الحسابات وتزويدها بالبيانات الخاصة بالشركة',
          'كتابة 30 محتوى جذاب ومتميز (10 شهريًا)',
          'متابعة يومية لحسابات السوشيال ميديا',
          'تقرير شهري بإحصائيات وحالة الحسابات',
        ],
      },
      {
        id: 'professional',
        name: 'Professional Package',
        nameAr: 'الباقة الاحترافية',
        description: 'Ideal for medium businesses and stores',
        descriptionAr: 'مناسبة للشركات المتوسطة والمتاجر',
        duration: '3 Months',
        durationAr: 'لمدة 3 أشهر',
        icon: '🚀',
        highlighted: true,
        order: 2,
        features: [
          'Managing 3 social media platforms',
          'Creating and optimizing social media accounts',
          'Professional business card design (double-sided)',
          '45 interactive posts with creative designs (15 monthly)',
          'Professional photography session (1 monthly)',
          'Video production (1 promotional video monthly)',
          'Paid advertising campaigns management',
          'Performance analysis and detailed monthly reports',
        ],
        featuresAr: [
          'إدارة 3 منصات من منصات السوشيال ميديا',
          'إنشاء وتحسين حسابات السوشيال ميديا',
          'تصميم كارت شخصي احترافي طرفين',
          'كتابة 45 محتوى تفاعلي مع تصاميم إبداعية (15 شهريًا)',
          'جلسة تصوير احترافية (جلسة واحدة شهريًا)',
          'إنتاج فيديو (فيديو دعائي واحد شهريًا)',
          'إدارة حملات إعلانية ممولة',
          'تحليل الأداء وتقارير شهرية تفصيلية',
        ],
      },
      {
        id: 'premium',
        name: 'Premium Package',
        nameAr: 'الباقة المتميزة',
        description: 'Complete solution for large enterprises',
        descriptionAr: 'حل متكامل للمؤسسات الكبيرة',
        duration: '6 Months',
        durationAr: 'لمدة 6 أشهر',
        icon: '👑',
        highlighted: false,
        order: 3,
        features: [
          'Managing 4+ social media platforms',
          'Complete brand identity development',
          'Professional website design and development',
          '90 premium posts with advanced designs (15 monthly)',
          'Professional photography sessions (2 monthly)',
          'Video production (2 promotional videos monthly)',
          'Comprehensive paid advertising campaigns',
          'SEO optimization and Google Ads management',
          'Dedicated account manager',
          'Weekly performance reports and analytics',
          '24/7 priority support',
        ],
        featuresAr: [
          'إدارة 4+ منصات من منصات السوشيال ميديا',
          'تطوير هوية تجارية كاملة',
          'تصميم وتطوير موقع إلكتروني احترافي',
          '90 محتوى متميز مع تصاميم متقدمة (15 شهريًا)',
          'جلسات تصوير احترافية (2 جلسة شهريًا)',
          'إنتاج فيديو (فيديوهين دعائيين شهريًا)',
          'حملات إعلانية ممولة شاملة',
          'تحسين محركات البحث وإدارة إعلانات جوجل',
          'مدير حساب مخصص',
          'تقارير أسبوعية للأداء والتحليلات',
          'دعم فني على مدار الساعة',
        ],
      },
      {
        id: 'charity-launch',
        name: 'Launch Package',
        nameAr: 'باقة الانطلاقة',
        description: 'Perfect starting point for charity organizations',
        descriptionAr: 'نقطة انطلاق مثالية للجمعيات الخيرية',
        duration: '3 Months',
        durationAr: 'لمدة 3 أشهر',
        icon: '💚',
        highlighted: false,
        order: 4,
        features: [
          'Social Media Management (2 platforms)',
          'Content Creation (20 posts)',
          'Basic Photography (1 session)',
          'Campaign Setup',
          'Monthly Reports',
        ],
        featuresAr: [
          'إدارة وسائل التواصل الاجتماعي (منصتين)',
          'إنشاء المحتوى (20 منشور)',
          'تصوير أساسي (جلسة واحدة)',
          'إعداد الحملات',
          'تقارير شهرية',
        ],
      },
      {
        id: 'charity-expansion',
        name: 'Expansion Package',
        nameAr: 'باقة التوسع',
        description: 'Growing your charity impact',
        descriptionAr: 'توسيع تأثير جمعيتكم الخيرية',
        duration: '6 Months',
        durationAr: 'لمدة 6 أشهر',
        icon: '🌟',
        highlighted: true,
        order: 5,
        features: [
          'Social Media Management (3 platforms)',
          'Content Creation (40 posts)',
          'Professional Photography (2 sessions)',
          'Video Production (1 video)',
          'Paid Campaign Management',
          'Bi-weekly Reports',
        ],
        featuresAr: [
          'إدارة وسائل التواصل الاجتماعي (3 منصات)',
          'إنشاء المحتوى (40 منشور)',
          'تصوير احترافي (جلستين)',
          'إنتاج فيديو (فيديو واحد)',
          'إدارة الحملات الممولة',
          'تقارير نصف شهرية',
        ],
      },
      {
        id: 'charity-professional',
        name: 'Professional Package',
        nameAr: 'باقة الاحتراف',
        description: 'Complete solution for established charities',
        descriptionAr: 'حل متكامل للجمعيات الخيرية المتقدمة',
        duration: '12 Months',
        durationAr: 'لمدة 12 شهر',
        icon: '🎯',
        highlighted: false,
        order: 6,
        features: [
          'Full Social Media Management (4+ platforms)',
          'Premium Content Creation (80 posts)',
          'Professional Photography (4 sessions)',
          'Video Production (2 videos)',
          'Complete Campaign Management',
          'Brand Development',
          'Weekly Reports',
          'Priority Support',
        ],
        featuresAr: [
          'إدارة كاملة لوسائل التواصل (4+ منصات)',
          'إنشاء محتوى مميز (80 منشور)',
          'تصوير احترافي (4 جلسات)',
          'إنتاج فيديو (فيديوهين)',
          'إدارة كاملة للحملات',
          'تطوير العلامة التجارية',
          'تقارير أسبوعية',
          'دعم ذو أولوية',
        ],
      },
    ];

    // Insert all packages
    const result = await Package.insertMany(packagesToSeed);

    return NextResponse.json({
      message: 'Packages seeded successfully',
      count: result.length,
      packages: result,
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding packages:', error);
    return NextResponse.json(
      { error: 'Failed to seed packages' },
      { status: 500 }
    );
  }
}

