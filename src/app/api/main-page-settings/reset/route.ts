import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import MainPageSettings from '@/models/MainPageSettings';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    
    // Delete existing settings
    await MainPageSettings.deleteMany({});
    
    // Create fresh default settings with ALL content
    const settings = await MainPageSettings.create({
      about: {
        visionTitleEn: 'Vision',
        visionTitleAr: 'الرؤية',
        visionTextEn: 'To be the first and most trusted technical partner in the Kingdom and beyond',
        visionTextAr: 'أن نكون الشريك التقني الأول والأكثر ثقة في المملكة وخارجها',
        missionTitleEn: 'Mission',
        missionTitleAr: 'الرسالة',
        missionTextEn: 'Providing innovative technical solutions with quality and professionalism that meet our clients\' changing needs',
        missionTextAr: 'تقديم حلول تقنية مبتكرة بجودة واحترافية تلبي احتياجات عملائنا المتغيرة',
        promisesTitleEn: 'We Promise You',
        promisesTitleAr: 'نعدكم',
        promises: [
          { textEn: '24/7 Technical Support', textAr: 'دعم فني على مدار الساعة' },
          { textEn: 'Fast Access', textAr: 'سرعة وصول' },
          { textEn: 'Continuous Development', textAr: 'التطوير المستمر' },
          { textEn: 'Best Prices', textAr: 'أفضل الأسعار' }
        ]
      },
      whyOrbit: {
        stats: [
          { number: '20+', labelEn: 'Years of Experience', labelAr: 'عامًا خبرة' },
          { number: '20,000+', labelEn: 'Government and Private Entities', labelAr: 'جهة حكومية وخاصة' },
          { number: '180+', labelEn: 'Million Messages Monthly', labelAr: 'مليون رسالة شهريًا' },
          { number: '98%+', labelEn: 'Customer Satisfaction Rate', labelAr: 'نسبة رضا عملاء تتجاوز' }
        ],
        features: [
          {
            textEn: 'Local Expertise',
            textAr: 'خبرة محلية وفهم لاحتياجات السوق',
            descriptionEn: 'Deep understanding of local market needs',
            descriptionAr: 'فهم عميق للسوق المحلي واحتياجاته الفريدة'
          },
          {
            textEn: 'High-Performance Infrastructure',
            textAr: 'بنية تقنية عالية الأداء',
            descriptionEn: 'Robust and stable infrastructure supporting your operations',
            descriptionAr: 'بنية تحتية قوية ومستقرة تدعم عملياتك'
          },
          {
            textEn: 'Specialized Support',
            textAr: 'دعم فني واستشارات متخصصة',
            descriptionEn: 'Professional support team ready to assist you every step',
            descriptionAr: 'فريق دعم محترف جاهز لمساعدتك في كل خطوة'
          },
          {
            textEn: 'Scalable Solutions',
            textAr: 'حلول قابلة للتوسع',
            descriptionEn: 'Solutions that grow with your business expansion',
            descriptionAr: 'حلول تنمو مع نمو أعمالك وتوسعها'
          },
          {
            textEn: 'Government Compliance',
            textAr: 'توافق كامل مع المتطلبات الحكومية',
            descriptionEn: 'Full compliance with government standards and regulations',
            descriptionAr: 'امتثال تام للمعايير واللوائح الحكومية'
          },
          {
            textEn: 'Fast Deployment',
            textAr: 'سرعة تشغيل وتكامل سلس مع الأنظمة',
            descriptionEn: 'Quick and seamless integration with your existing systems',
            descriptionAr: 'تكامل سريع وسلس مع أنظمتك الحالية'
          }
        ]
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Main page settings reset to defaults successfully! All 4 promises, 6 features, and 4 stats created.',
      settings,
      details: {
        promises: settings.about.promises.length,
        features: settings.whyOrbit.features.length,
        stats: settings.whyOrbit.stats.length
      }
    });
  } catch (error: any) {
    console.error('Reset error:', error);
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Support both GET and POST
  return GET();
}

