/**
 * POST /api/auth/reset-password — Request password reset email.
 * Sends reset link valid for 1 hour.
 *
 * Request body: { email: string }
 * Response 200: { message: "If account exists, reset email sent" }
 * Response 400: { error: "Email required" }
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
}

// Generate secure reset token
function generateResetToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Send reset email
async function sendResetEmail(
  apiKey: string,
  email: string,
  resetUrl: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #1e40af; color: #fff; text-decoration: none; border-radius: 6px; margin: 16px 0;">
        Reset Password
      </a>
      <p style="color: #666; font-size: 14px;">This link expires in 1 hour.</p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
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
        subject: "Password Reset Request",
        html,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send reset email:", err);
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

    // Rate limit: 3 reset requests per hour per email
    const recentRequests = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'password_reset_request'
         AND target = ?
         AND created_at > datetime('now', '-1 hour')`
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

    if (user) {
      // Generate reset token
      const token = generateResetToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      // Store token in audit_events
      await env.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, metadata)
         VALUES (?, ?, ?, ?, ?)`
      )
        .bind(
          crypto.randomUUID(),
          user.id,
          "password_reset_request",
          body.email,
          JSON.stringify({ token, expiresAt })
        )
        .run();

      // Send reset email
      const siteUrl = new URL(request.url).origin;
      const resetUrl = `${siteUrl}/admin/reset-password?token=${token}`;

      if (env.RESEND_API_KEY) {
        await sendResetEmail(env.RESEND_API_KEY, body.email, resetUrl);
      } else {
        console.warn("RESEND_API_KEY not configured, reset URL:", resetUrl);
      }

      // Audit event
      await env.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, metadata)
         VALUES (?, ?, ?, ?, ?)`
      )
        .bind(
          crypto.randomUUID(),
          user.id,
          "password_reset_request",
          body.email,
          JSON.stringify({ resetUrl })
        )
        .run();
    }

    // Always return success to prevent user enumeration
    return new Response(
      JSON.stringify({ message: "If account exists, reset email sent" }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Reset password error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
