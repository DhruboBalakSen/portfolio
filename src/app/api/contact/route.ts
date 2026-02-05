import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
const recaptchaAction = process.env.RECAPTCHA_ACTION ?? "contact_form";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  token: string;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export async function POST(request: Request) {
  if (!resend || !resendFromEmail || !contactToEmail) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  if (!recaptchaSecret) {
    return NextResponse.json({ error: "reCAPTCHA is not configured." }, { status: 500 });
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, message, token } = payload;

  if (![name, email, company, message, token].every(isNonEmptyString)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: token
      })
    });

    const verifyResult: {
      success: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    } = await verifyResponse.json();

    if (!verifyResult.success) {
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
    }

    if (verifyResult.action && verifyResult.action !== recaptchaAction) {
      return NextResponse.json({ error: "reCAPTCHA action mismatch." }, { status: 400 });
    }

    if (typeof verifyResult.score === "number" && verifyResult.score < recaptchaMinScore) {
      return NextResponse.json({ error: "reCAPTCHA score too low." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: resendFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `Recruiter inquiry from ${name} (${company})`,
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.5;">
          <h2>New recruiter message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `
    });
  } catch {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
