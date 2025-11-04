import mongoose from 'mongoose';

const uniqueFeaturesSettingsSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, required: true },
    sectionTitleAr: { type: String, required: true },
  },
  { timestamps: true }
);

export const UniqueFeaturesSettings = mongoose.models.UniqueFeaturesSettings || mongoose.model('UniqueFeaturesSettings', uniqueFeaturesSettingsSchema);

