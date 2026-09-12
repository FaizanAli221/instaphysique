import { z } from "zod";

// Loose but real-world phone matcher: accepts (916) 555-0142, 916-555-0142,
// 916.555.0142, 9165550142, and optional leading +1 / country code.
const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const leadSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(1, "First name is required.")
    .max(60, "First name is too long."),

  lastName: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(1, "Last name is required.")
    .max(60, "Last name is too long."),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),

  phone: z
    .string({ required_error: "Phone number is required." })
    .trim()
    .regex(PHONE_RE, "Enter a valid phone number."),

  marketingConsent: z.boolean().optional().default(false),

  agreeTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the Terms of Service and Privacy Policy.",
    }),
  }),

  // Honeypot field: real users never see or fill this (hidden via CSS in the
  // form). Any non-empty value here means a bot filled every field it found.
  // Optional so legitimate clients that omit it entirely still validate.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Formats Zod's flattened field errors into a single readable string for the
// API's error response, and keeps the per-field map for clients that want it.
export function formatZodError(error: z.ZodError) {
  const fieldErrors = error.flatten().fieldErrors;
  const firstMessage =
    Object.values(fieldErrors).flat().find(Boolean) ?? "Invalid submission.";
  return { message: firstMessage, fieldErrors };
}
