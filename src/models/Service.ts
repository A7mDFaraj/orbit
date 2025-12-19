import mongoose, { Schema, Model } from 'mongoose';

export interface IServiceItem {
  text: string;
  textAr: string;
}

export interface IService {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon?: string;
  category: string;
  order: number;
  items?: IServiceItem[];
  slug?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    titleAr: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionAr: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      default: 'Business Services',
    },
    order: {
      type: Number,
      default: 0,
    },
    items: [{
      text: { type: String, required: true },
      textAr: { type: String, required: true },
    }],
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Service = (mongoose.models.Service as Model<IService>) || 
  mongoose.model<IService>('Service', serviceSchema);

