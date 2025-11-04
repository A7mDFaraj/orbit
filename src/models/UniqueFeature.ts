import mongoose from 'mongoose';

const uniqueFeatureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleAr: { type: String, required: true },
    desc: { type: String, required: true },
    descAr: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UniqueFeature = mongoose.models.UniqueFeature || mongoose.model('UniqueFeature', uniqueFeatureSchema);

