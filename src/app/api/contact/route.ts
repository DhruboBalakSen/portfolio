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

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 320;
const MAX_COMPANY_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const getRateLimitStore = () => {
  const globalForRateLimit = globalThis as typeof globalThis & {
    __contactRateLimit?: Map<string, RateLimitEntry>;
  };

  if (!globalForRateLimit.__contactRateLimit) {
    globalForRateLimit.__contactRateLimit = new Map();
  }

  return globalForRateLimit.__contactRateLimit;
};

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
};

const checkRateLimit = (ip: string) => {
  const store = getRateLimitStore();
  const now = Date.now();
  const current = store.get(ip);

  if (!current || current.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }

  current.count += 1;
  store.set(ip, current);
  return { allowed: true, retryAfter: 0 };
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export async function POST(request: Request) {
  if (!resend || !resendFromEmail || !contactToEmail) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  if (!recaptchaSecret) {
    return NextResponse.json({ error: "reCAPTCHA is not configured." }, { status: 500 });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
    );
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

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedCompany = company.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length > MAX_NAME_LENGTH || trimmedName.length === 0) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }

  if (trimmedEmail.length > MAX_EMAIL_LENGTH || !isValidEmail(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  if (trimmedCompany.length > MAX_COMPANY_LENGTH || trimmedCompany.length === 0) {
    return NextResponse.json({ error: "Invalid company." }, { status: 400 });
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH || trimmedMessage.length === 0) {
    return NextResponse.json({ error: "Invalid message length." }, { status: 400 });
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
      console.warn("reCAPTCHA verification failed", { ip, errors: verifyResult["error-codes"] });
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
    }

    if (verifyResult.action && verifyResult.action !== recaptchaAction) {
      console.warn("reCAPTCHA action mismatch", { ip, action: verifyResult.action });
      return NextResponse.json({ error: "reCAPTCHA action mismatch." }, { status: 400 });
    }

    if (typeof verifyResult.score === "number" && verifyResult.score < recaptchaMinScore) {
      console.warn("reCAPTCHA score too low", { ip, score: verifyResult.score });
      return NextResponse.json({ error: "reCAPTCHA score too low." }, { status: 400 });
    }
  } catch {
    console.warn("reCAPTCHA verification error", { ip });
    return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeCompany = escapeHtml(trimmedCompany);
  const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br />");

  try {
    await resend.emails.send({
      from: resendFromEmail,
      to: contactToEmail,
      replyTo: trimmedEmail,
      subject: `Recruiter inquiry from ${safeName} (${safeCompany})`,
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.5;">
          <h2>New recruiter message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `
    });
  } catch {
    console.error("Failed to send email", { ip });
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
