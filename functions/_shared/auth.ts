/**
 * _shared/auth.ts — Better Auth server setup for Cloudflare Pages Functions.
 *
 * Environment variables required (set in Cloudflare Pages):
 *   - RESEND_API_KEY: Resend API key
 *   - SESSION_SECRET: Session encryption secret (min 32 chars)
 *   - TOTP_ISSUER: TOTP issuer name (default: "Astro Sveltia Cloudflare")
 *   - DB: D1 database binding
 *
 * Usage in a Pages Function:
 *   import { auth } from "../_shared/auth";
 *   export async function onRequest(context) { return auth.handler(context.request); }
 */

import { betterAuth } from "better-auth";
import { d1Adapter } from "better-auth/adapters/d1";
import { emailOTP } from "better-auth/plugins/email-otp";
import { twoFactor } from "better-auth/plugins/2fa";
import { apiKey } from "better-auth/plugins/api-key";

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  TOTP_ISSUER?: string;
}

/**
 * Initialize Better Auth with D1 adapter and plugins.
 * This is called lazily per request to handle Pages Functions stateless model.
 */
export function createAuth(env: Env) {
  return betterAuth({
    database: d1Adapter(env.DB),
    secret: env.SESSION_SECRET,
    baseURL: "/api/auth",
    trustedOrigins: [],

    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        // Email sending handled by Resend in a separate function
        await sendEmail({
          to: user.email,
          subject: "Verify your email address",
          html: verificationEmailTemplate(url),
        });
      },
    },

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      autoSignIn: true,
    },

    plugins: [
      emailOTP({
        async sendVerificationOTP({ email, otp }) {
          await sendEmail({
            to: email,
            subject: "Your authentication code",
            html: otpEmailTemplate(otp),
          });
        },
      }),
      twoFactor({
        issuer: env.TOTP_ISSUER || "Astro Sveltia Cloudflare",
        otpOptions: {
          async sendOTP({ email, otp }) {
            await sendEmail({
              to: email,
              subject: "Your authentication code",
              html: otpEmailTemplate(otp),
            });
          },
        },
      }),
      apiKey(),
    ],

    // Rate limiting: 5 attempts per email per 15 minutes
    rateLimit: {
      window: 15 * 60 * 1000, // 15 min
      max: 5,
    },
  });
}

// Simple email sender via Resend
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = (globalThis as any).__ENV?.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "notifications@example.com",
        to,
        subject,
        html,
      }),
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

// Email templates
function verificationEmailTemplate(url: string): string {
  return `
    <h1>Verify your email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1e40af;color:#fff;text-decoration:none;border-radius:6px;">
      Verify Email
    </a>
    <p>This link expires in 24 hours.</p>
  `;
}

function otpEmailTemplate(otp: string): string {
  return `
    <h1>Your authentication code</h1>
    <p>Use this code to complete your authentication:</p>
    <p style="font-size:24px;font-weight:bold;letter-spacing:4px;text-align:center;padding:16px;background:#f3f4f6;border-radius:8px;">
      ${otp}
    </p>
    <p>This code expires in 10 minutes.</p>
  `;
}
