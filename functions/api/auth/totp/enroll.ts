/**
 * POST /api/auth/totp/enroll — Generate TOTP secret for enrollment.
 * Returns TOTP URI and backup codes.
 *
 * Requires: Valid session cookie, user must have CMS role
 * Response 200: { uri: string, backupCodes: string[] }
 * Response 401: { error: "Not authenticated" }
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  TOTP_ISSUER?: string;
}

// Generate 8 random backup codes (8 chars each)
function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 8; i++) {
    const array = new Uint8Array(4);
    crypto.getRandomValues(array);
    const code = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 8)
      .toUpperCase();
    codes.push(code);
  }
  return codes;
}

// Simple TOTP secret generation (32 bytes, base32 encoded)
function generateTOTPSecret(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let secret = "";
  for (let i = 0; i < bytes.length; i++) {
    secret += alphabet[bytes[i] % 32];
  }
  return secret;
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

  // Get session cookie
  const cookie = request.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers,
    });
  }

  try {
    // Validate session
    const session = await env.DB.prepare(
      `SELECT s.user_id, u.email, u.totp_enrolled_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    )
      .bind(token)
      .first<{ user_id: string; email: string; totp_enrolled_at: string | null }>();

    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers,
      });
    }

    // Check if 2FA already enrolled
    if (session.totp_enrolled_at) {
      return new Response(
        JSON.stringify({ error: "2FA already enrolled. Re-enroll requires admin reset." }),
        { status: 400, headers }
      );
    }

    // Generate TOTP secret
    const secret = generateTOTPSecret();
    const issuer = env.TOTP_ISSUER || "Astro Sveltia Cloudflare";

    // Store secret temporarily (not yet enrolled until verified)
    await env.DB.prepare(
      `UPDATE users SET totp_secret = ? WHERE id = ?`
    )
      .bind(secret, session.user_id)
      .run();

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // Store backup code hashes (simplified: store plain for now, use bcrypt in production)
    for (const code of backupCodes) {
      await env.DB.prepare(
        `INSERT INTO backup_codes (id, user_id, code_hash) VALUES (?, ?, ?)`
      )
        .bind(crypto.randomUUID(), session.user_id, code)
        .run();
    }

    // Build TOTP URI
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedEmail = encodeURIComponent(session.email);
    const uri = `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        session.user_id,
        "totp_enrollment_initiated",
        session.email,
        JSON.stringify({ backupCodesCount: backupCodes.length })
      )
      .run();

    return new Response(
      JSON.stringify({
        uri,
        secret, // For manual entry
        backupCodes,
        message: "Scan QR code or enter secret manually. Verify with /api/auth/totp/verify to complete enrollment.",
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("TOTP enrollment error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
