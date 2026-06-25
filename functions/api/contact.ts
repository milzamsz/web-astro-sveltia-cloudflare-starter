/**
 * POST /api/contact — Handle contact form submission.
 * Validates Turnstile, checks honeypot, rate limits, deduplicates, stores in D1.
 *
 * Request body: { name, email, subject?, message, cf-turnstile-response }
 * Response 201: { ok: true, id: "<uuid>" }
 * Response 400: { error: "Validation failed", fields?: [...] }
 * Response 429: { error: "Too many requests" }
 * Response 409: { error: "Duplicate submission" }
 */

import { verifyTurnstile, hashIP } from "../_shared/turnstile";

export interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  SVELTIA_BACKEND_BRANCH?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // Disable in preview mode
  if (env.SVELTIA_BACKEND_BRANCH === "content-preview") {
    return new Response(JSON.stringify({ ok: true, preview: true }), {
      status: 200,
      headers,
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await hashIP(ip);

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      website?: string; // honeypot
      "cf-turnstile-response"?: string;
    };

    // Honeypot check — if filled, silently accept (bot trapped)
    if (body.website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    // Validate required fields
    const errors: string[] = [];

    if (!body.name || body.name.length < 2 || body.name.length > 100) {
      errors.push("name: required, 2-100 characters");
    }
    if (!body.email || !validateEmail(body.email)) {
      errors.push("email: valid email required");
    }
    if (body.subject && body.subject.length > 200) {
      errors.push("subject: max 200 characters");
    }
    if (!body.message || body.message.length < 10 || body.message.length > 5000) {
      errors.push("message: required, 10-5000 characters");
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: "Validation failed", fields: errors }),
        { status: 400, headers }
      );
    }

    // Turnstile verification
    if (env.TURNSTILE_SECRET_KEY && body["cf-turnstile-response"]) {
      const turnstileResult = await verifyTurnstile(
        body["cf-turnstile-response"],
        env.TURNSTILE_SECRET_KEY
      );
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({ error: "Verification failed. Please try again." }),
          { status: 400, headers }
        );
      }
    }

    // Rate limiting: 5 submissions per IP hash per 15 minutes
    const recentCount = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM contact_submissions
       WHERE ip_hash = ? AND created_at > datetime('now', '-15 minutes')`
    ).bind(ipHash).first<{ count: number }>();

    if (recentCount && recentCount.count >= 5) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers }
      );
    }

    // Duplicate detection: same email + message within 1 hour
    const duplicate = await env.DB.prepare(
      `SELECT id FROM contact_submissions
       WHERE email = ? AND message = ? AND created_at > datetime('now', '-1 hour')
       LIMIT 1`
    ).bind(body.email, body.message).first<{ id: string }>();

    if (duplicate) {
      return new Response(
        JSON.stringify({ error: "Duplicate submission", existingId: duplicate.id }),
        { status: 409, headers }
      );
    }

    // Store submission
    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO contact_submissions (id, name, email, subject, message, ip_hash, turnstile_score)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.name,
      body.email,
      body.subject || null,
      body.message,
      ipHash,
      null
    ).run();

    // Send email notifications (fire-and-forget, don't block response)
    if (env.RESEND_API_KEY) {
      // Business notification
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "notifications@example.com",
          to: "admin@example.com",
          subject: `New contact form submission from ${body.name}`,
          html: `<h2>New Contact Submission</h2>
<p><strong>Name:</strong> ${body.email}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Subject:</strong> ${body.subject || "(none)"}</p>
<p><strong>Message:</strong></p>
<p>${body.message}</p>`,
        }),
      }).catch(() => {});

      // Visitor confirmation
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "notifications@example.com",
          to: body.email,
          subject: "We received your message",
          html: `<h2>Thank you for contacting us!</h2>
<p>We have received your message and will get back to you as soon as possible.</p>
<hr />
<p><strong>Your message:</strong></p>
<p>${body.message}</p>`,
        }),
      }).catch(() => {});
    }

    return new Response(
      JSON.stringify({ ok: true, id }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers }
    );
  }
}
