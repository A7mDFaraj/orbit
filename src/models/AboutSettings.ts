import mongoose from 'mongoose';

const aboutSettingsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleAr: { type: String, required: true },
    description: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    vision: { type: String, required: true },
    visionAr: { type: String, required: true },
    visionText: { type: String, required: true },
    visionTextAr: { type: String, required: true },
    mission: { type: String, required: true },
    missionAr: { type: String, required: true },
    missionText: { type: String, required: true },
    missionTextAr: { type: String, required: true },
  },
  { timestamps: true }
);

export const AboutSettings = mongoose.models.AboutSettings || mongoose.model('AboutSettings', aboutSettingsSchema);

