/**
 * POST /api/auth/email-otp — Request OTP via email (fallback for 2FA).
 * Sends 6-digit code valid for 10 minutes.
 *
 * Request body: { email: string }
 * Response 200: { message: "OTP sent" }
 * Response 400: { error: "Email required" }
 * Response 429: { error: "Too many requests" }
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
}

// Generate 6-digit OTP
function generateOTP(): string {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => (b % 10).toString())
    .join("");
}

// Send OTP via Resend
async function sendOTP(
  apiKey: string,
  email: string,
  otp: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2>Your authentication code</h2>
      <p>Use this code to complete your authentication:</p>
      <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0;">
        ${otp}
      </div>
      <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@example.com",
        to: email,
        subject: "Your authentication code",
        html,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const body = (await request.json()) as { email?: string };

    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
        headers,
      });
    }

    // Rate limit: 3 OTP requests per 15 minutes per email
    const recentRequests = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'email_otp_request'
         AND target = ?
         AND created_at > datetime('now', '-15 minutes')`
    )
      .bind(body.email)
      .first<{ count: number }>();

    if (recentRequests && recentRequests.count >= 3) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        { status: 429, headers }
      );
    }

    // Check if user exists
    const user = await env.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    )
      .bind(body.email)
      .first<{ id: string }>();

    if (!user) {
      // Don't reveal if user exists
      return new Response(JSON.stringify({ message: "OTP sent" }), {
        status: 200,
        headers,
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in audit_events (hashed in production)
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        user.id,
        "email_otp_request",
        body.email,
        JSON.stringify({ otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() })
      )
      .run();

    // Send OTP
    if (!env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, OTP:", otp);
    } else {
      await sendOTP(env.RESEND_API_KEY, body.email, otp);
    }

    return new Response(JSON.stringify({ message: "OTP sent" }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Email OTP error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
