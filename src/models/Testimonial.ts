import mongoose, { Schema, Model } from 'mongoose';

export interface ITestimonial {
  _id: string;
  name: string;
  nameAr?: string;
  position: string;
  positionAr?: string;
  company?: string;
  companyAr?: string;
  content: string;
  contentAr: string;
  rating: number;
  avatar?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    positionAr: {
      type: String,
    },
    company: {
      type: String,
    },
    companyAr: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    contentAr: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    avatar: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Testimonial = (mongoose.models.Testimonial as Model<ITestimonial>) || 
  mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

