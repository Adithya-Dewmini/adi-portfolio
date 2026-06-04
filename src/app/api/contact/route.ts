import { NextResponse } from "next/server";
import { createContactMessage } from "@/app/admin/actions/message-actions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const result = await createContactMessage({
      firstName,
      lastName: lastName || null,
      email,
      subject: subject || null,
      message
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to save message right now." }, { status: 500 });
  }
}
