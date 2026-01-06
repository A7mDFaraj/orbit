import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Client } from '@/models/Client';
import MainPageSettings from '@/models/MainPageSettings';

// Force dynamic rendering to ensure route is always available
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  try {
    await connectDB();

    // Create default admin user
    const adminExists = await User.findOne({ email: 'admin@orbit.com.sa' });
    if (!adminExists) {
      await User.create({
        email: 'admin@orbit.com.sa',
        password: 'Abd123#Abd',
        name: 'ORBIT Admin',
        role: 'admin',
      });
    }

    // Initialize Main Page Settings with default ORBIT content
    const mainPageSettings = await MainPageSettings.findOne();
    if (!mainPageSettings) {
      await MainPageSettings.create({
        hero: {
          titleEn: 'ORBIT Your Success',
          titleAr: 'أوربيت نجاحك'
        },
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
    }

    // Seed some sample success partners (clients)
    const clientCount = await Client.countDocuments();
    if (clientCount === 0) {
      const clientsData = [
        { name: 'National Water Company', nameAr: 'شركة المياه الوطنية', category: 'Government', order: 1, logo: '/trustedby/National_Water_Company_Logo_2021.png' },
        { name: 'STC', nameAr: 'stc', category: 'Communication', order: 2, logo: '/trustedby/salogos.org-logo-1.svg' },
        { name: 'Ministry of Health', nameAr: 'وزارة الصحة', category: 'Government', order: 3 },
        { name: 'Saudi Post', nameAr: 'البريد السعودي', category: 'Government', order: 4 },
      ];

      await Client.insertMany(clientsData);
    }

    return NextResponse.json({
      message: 'ORBIT database seeded successfully',
      admin: {
        email: 'admin@orbit.com.sa',
        password: 'Abd123#Abd',
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
