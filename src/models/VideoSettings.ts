import mongoose, { Schema, Model } from 'mongoose';

export interface IVideoSettings {
  _id: string;
  videos: {
    videoUrl: string;
    titleEn?: string;
    titleAr?: string;
    order: number;
  }[];
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  playButtonTextEn: string;
  playButtonTextAr: string;
  stats: {
    numberEn: string;
    numberAr: string;
    labelEn: string;
    labelAr: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const videoSettingsSchema = new Schema<IVideoSettings>(
  {
    videos: [{
      videoUrl: {
        type: String,
        required: true,
      },
      titleEn: {
        type: String,
      },
      titleAr: {
        type: String,
      },
      order: {
        type: Number,
        default: 0,
      },
    }],
    titleEn: {
      type: String,
      required: true,
      default: 'Watch Our Work',
    },
    titleAr: {
      type: String,
      required: true,
      default: 'شاهد أعمالنا',
    },
    descriptionEn: {
      type: String,
      required: true,
      default: 'Experience the excellence and creativity in every project we deliver',
    },
    descriptionAr: {
      type: String,
      required: true,
      default: 'اختبر التميز والإبداع في كل مشروع نقدمه',
    },
    playButtonTextEn: {
      type: String,
      required: true,
      default: 'Play Showreel',
    },
    playButtonTextAr: {
      type: String,
      required: true,
      default: 'تشغيل العرض',
    },
    stats: [{
      numberEn: {
        type: String,
        required: true,
      },
      numberAr: {
        type: String,
        required: true,
      },
      labelEn: {
        type: String,
        required: true,
      },
      labelAr: {
        type: String,
        required: true,
      },
    }],
  },
  { timestamps: true }
);

export const VideoSettings = (mongoose.models.VideoSettings as Model<IVideoSettings>) || 
  mongoose.model<IVideoSettings>('VideoSettings', videoSettingsSchema);

