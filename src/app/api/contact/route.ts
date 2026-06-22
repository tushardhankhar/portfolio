import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(20, "Message too short")
    .max(2000, "Message too long"),
});

// Lazy-init so the build doesn't fail when env var is absent
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: result.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const resend = getResend();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "tdhankhar@viamedia.ai",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="font-family: sans-serif; background: #f9fafb; padding: 32px;">
            <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
              <div style="background: linear-gradient(135deg, #864797, #0CC0DF); padding: 24px 32px;">
                <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">
                  New Portfolio Contact
                </h1>
              </div>
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-weight: 600; width: 80px;">FROM</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-weight: 600;">EMAIL</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #111827;">
                      <a href="mailto:${email}" style="color: #864797;">${email}</a>
                    </td>
                  </tr>
                </table>
                <div style="background: #f9fafb; border-radius: 8px; padding: 20px; border-left: 3px solid #864797;">
                  <p style="font-size: 13px; color: #6b7280; font-weight: 600; margin: 0 0 12px;">MESSAGE</p>
                  <p style="font-size: 14px; color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
                  Sent from tushardhankhar.dev portfolio contact form.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
