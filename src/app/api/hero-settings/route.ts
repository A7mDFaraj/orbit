import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HeroSettings from '@/models/HeroSettings';

export async function GET() {
  try {
    await connectDB();
    let settings = await HeroSettings.findOne();
    
    // If no settings exist, create default
    if (!settings) {
      settings = await HeroSettings.create({
        title: 'Creative Marketing Solutions',
        titleAr: 'حلول تسويقية إبداعية',
        subtitle1: 'REAL ESTATE',
        subtitle1Ar: 'العقارات',
        subtitle2: 'ADVERTISING',
        subtitle2Ar: 'الإعلان',
        subtitle3: 'EVENTS',
        subtitle3Ar: 'الفعاليات',
        description: 'Leading Saudi entity in creative marketing solutions and a benchmark in quality and innovation',
        descriptionAr: 'كيان سعودي رائد في الحلول التسويقية الإبداعية ومعيار للجودة والابتكار',
        cta1: 'Request Quote',
        cta1Ar: 'اطلب عرض سعر',
        cta2: 'Our Services',
        cta2Ar: 'خدماتنا',
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching hero settings:', error);
    return NextResponse.json({ error: 'Failed to fetch hero settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    let settings = await HeroSettings.findOne();
    
    if (!settings) {
      // Create new settings if none exist
      settings = await HeroSettings.create(data);
    } else {
      // Update existing settings
      Object.assign(settings, data);
      await settings.save();
    }

    return NextResponse.json({ settings, message: 'Hero settings updated successfully' });
  } catch (error) {
    console.error('Error updating hero settings:', error);
    return NextResponse.json({ error: 'Failed to update hero settings' }, { status: 500 });
  }
}

