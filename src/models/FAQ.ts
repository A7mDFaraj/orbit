import mongoose, { Schema, Model } from 'mongoose';

export interface IFAQ {
  _id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
    },
    questionAr: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    answerAr: {
      type: String,
      required: true,
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

export const FAQ = (mongoose.models.FAQ as Model<IFAQ>) || 
  mongoose.model<IFAQ>('FAQ', faqSchema);

