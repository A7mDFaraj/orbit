import mongoose from 'mongoose';

const clientInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
      default: 'new',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ClientInquiry ||
  mongoose.model('ClientInquiry', clientInquirySchema);

