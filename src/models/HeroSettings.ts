import mongoose from 'mongoose';

const heroSettingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Creative Marketing Solutions',
    },
    titleAr: {
      type: String,
      required: true,
      default: 'حلول تسويقية إبداعية',
    },
    subtitle1: {
      type: String,
      required: true,
      default: 'REAL ESTATE',
    },
    subtitle1Ar: {
      type: String,
      required: true,
      default: 'العقارات',
    },
    subtitle2: {
      type: String,
      required: true,
      default: 'ADVERTISING',
    },
    subtitle2Ar: {
      type: String,
      required: true,
      default: 'الإعلان',
    },
    subtitle3: {
      type: String,
      required: true,
      default: 'EVENTS',
    },
    subtitle3Ar: {
      type: String,
      required: true,
      default: 'الفعاليات',
    },
    description: {
      type: String,
      required: true,
      default: 'Leading Saudi entity in creative marketing solutions and a benchmark in quality and innovation',
    },
    descriptionAr: {
      type: String,
      required: true,
      default: 'كيان سعودي رائد في الحلول التسويقية الإبداعية ومعيار للجودة والابتكار',
    },
    cta1: {
      type: String,
      required: true,
      default: 'Request Quote',
    },
    cta1Ar: {
      type: String,
      required: true,
      default: 'اطلب عرض سعر',
    },
    cta2: {
      type: String,
      required: true,
      default: 'Our Services',
    },
    cta2Ar: {
      type: String,
      required: true,
      default: 'خدماتنا',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HeroSettings || mongoose.model('HeroSettings', heroSettingsSchema);

