/**
 * POST /api/auth/backup-codes/verify — Verify a backup code (2FA fallback).
 * Each backup code is single-use.
 *
 * Request body: { code: string }
 * Response 200: { success: true, message: "2FA verified via backup code" }
 * Response 400: { error: "Invalid or already used backup code" }
 */

export interface Env {
  DB: D1Database;
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
    const body = (await request.json()) as { code?: string };

    if (!body.code) {
      return new Response(JSON.stringify({ error: "Code required" }), {
        status: 400,
        headers,
      });
    }

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

    // Find unused backup code
    const backupCode = await env.DB.prepare(
      `SELECT id, code_hash FROM backup_codes
       WHERE user_id = ? AND used_at IS NULL
       ORDER BY id ASC
       LIMIT 1`
    )
      .bind(session.user_id)
      .first<{ id: string; code_hash: string }>();

    if (!backupCode) {
      return new Response(
        JSON.stringify({ error: "No unused backup codes available. Contact an admin." }),
        { status: 400, headers }
      );
    }

    // Verify code (simplified comparison - use bcrypt verify in production)
    if (backupCode.code_hash !== body.code) {
      return new Response(JSON.stringify({ error: "Invalid backup code" }), {
        status: 400,
        headers,
      });
    }

    // Mark code as used
    await env.DB.prepare(
      `UPDATE backup_codes SET used_at = datetime('now') WHERE id = ?`
    )
      .bind(backupCode.id)
      .run();

    // Complete 2FA enrollment if not already enrolled
    if (!session.totp_enrolled_at) {
      await env.DB.prepare(
        `UPDATE users SET totp_enrolled_at = datetime('now') WHERE id = ?`
      )
        .bind(session.user_id)
        .run();
    }

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        session.user_id,
        "2fa_backup_code_used",
        session.email,
        JSON.stringify({ remainingCodes: "check backup_codes table" })
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Backup code accepted. 2FA verified.",
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Backup code verify error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
