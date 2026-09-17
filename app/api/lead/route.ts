import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isDatabaseConfigured } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { leadSchema, formatZodError } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendConfirmationEmail } from "@/lib/email";
import { devLeads, StoredLead } from "@/lib/dev-store";

export const dynamic = "force-static";

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP — cheap first line of defense, no DB hit required.
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(`lead:${ip}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many attempts. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  // 2. Parse body defensively — malformed JSON shouldn't 500.
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // 3. Validate with Zod. This also runs the honeypot check (`company`
  // must be empty) — a filled honeypot fails validation like any other bad
  // field, so bots get a normal-looking 400 with no special signal.
  const parsed = leadSchema.safeParse(rawBody);
  if (!parsed.success) {
    const { message, fieldErrors } = formatZodError(parsed.error);
    return NextResponse.json(
      { success: false, message, fieldErrors },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phone, marketingConsent, agreeTerms } =
    parsed.data;

  // If MongoDB is not yet configured, use the local in-memory store so
  // frontend testing works immediately out of the box.
  if (!isDatabaseConfigured()) {
    const existing = devLeads.find((l) => l.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email has already claimed the intro offer.",
        },
        { status: 409 }
      );
    }

    const newLead: StoredLead = {
      _id: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName,
      lastName,
      email,
      phone,
      marketingConsent: Boolean(marketingConsent),
      agreeTerms,
      source: "landing-page",
      ip,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    devLeads.unshift(newLead);

    sendConfirmationEmail({ to: email, firstName }).catch((err) => {
      console.error("Confirmation email failed:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Intro pass reserved!",
        leadId: newLead._id,
      },
      { status: 201 }
    );
  }

  try {
    await connectToDatabase();

    // 4. Duplicate prevention: one intro offer per email.
    const existing = await Lead.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email has already claimed the intro offer.",
        },
        { status: 409 }
      );
    }

    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone,
      marketingConsent,
      agreeTerms,
      ip,
    });

    // 5. Confirmation email is best-effort and never blocks the response.
    sendConfirmationEmail({ to: email, firstName }).catch((err) => {
      console.error("Confirmation email failed:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Intro pass reserved!",
        leadId: lead._id.toString(),
      },
      { status: 201 }
    );
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      return NextResponse.json(
        {
          success: false,
          message: "This email has already claimed the intro offer.",
        },
        { status: 409 }
      );
    }

    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { success: false, message: err instanceof Error ? err.message : "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function isDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: number }).code === 11000
  );
}
