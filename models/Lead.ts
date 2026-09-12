import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface LeadDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
  agreeTerms: boolean;
  source: string;
  ip?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<LeadDocument>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // One intro offer per email — enforced at the DB level as a second
      // line of defense behind the application-level check in the route.
      unique: true,
      maxlength: 254,
    },
    phone: { type: String, required: true, trim: true },
    marketingConsent: { type: Boolean, default: false },
    agreeTerms: { type: Boolean, required: true },
    source: { type: String, default: "landing-page" },
    ip: { type: String },
  },
  { timestamps: true }
);

// Guard against Next.js hot-reload / repeated serverless invocations
// re-registering the same model and throwing
// "OverwriteModelError: Cannot overwrite `Lead` model once compiled."
export const Lead: Model<LeadDocument> =
  mongoose.models.Lead || mongoose.model<LeadDocument>("Lead", LeadSchema);
