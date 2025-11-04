import mongoose from 'mongoose';

const teamApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    backupMobile: {
      type: String,
      trim: true,
    },
    photo: {
      type: String, // URL to uploaded photo
    },
    type: {
      type: String,
      enum: ['organizer', 'non-organizer', 'cast'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
    // Casting-specific fields
    isCasting: {
      type: Boolean,
      default: false,
    },
    age: {
      type: String,
    },
    nationality: {
      type: String,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'boy', 'girl', ''],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    photos: {
      type: [String], // Array of base64 images or URLs
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TeamApplication ||
  mongoose.model('TeamApplication', teamApplicationSchema);

