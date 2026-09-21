import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isDatabaseConfigured } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { devLeads } from "@/lib/dev-store";

const MAX_LIMIT = 200;
const DEFAULT_LIMIT = 50;

export async function GET(req: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return NextResponse.json(
      { success: false, message: "Admin endpoint is not configured." },
      { status: 503 }
    );
  }

  let providedKey: string | null = null;
  try {
    providedKey = req?.headers?.get("x-admin-key") ?? null;
  } catch {
    providedKey = null;
  }

  if (!providedKey || providedKey !== adminKey) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(
    Number(searchParams.get("limit")) || DEFAULT_LIMIT,
    MAX_LIMIT
  );

  if (!isDatabaseConfigured()) {
    const leads = devLeads.slice(0, limit);
    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  }

  try {
    await connectToDatabase();

    const leads = await Lead.find({}, { ip: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (err) {
    console.error("Failed to fetch leads:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
