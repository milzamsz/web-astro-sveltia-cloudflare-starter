/**
 * GET /api/auth/backup-codes — List remaining backup codes for the current user.
 * Requires valid session and totp_secret (at least initiated enrollment).
 *
 * Response 200: { remaining: number, codes: string[] }
 * Response 401: { error: "Not authenticated" }
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

  if (request.method !== "GET") {
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
      `SELECT user_id
       FROM sessions
       WHERE token = ? AND expires_at > datetime('now') AND revoked_at IS NULL`
    )
      .bind(token)
      .first<{ user_id: string }>();

    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers,
      });
    }

    // Count remaining backup codes
    const remaining = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM backup_codes
       WHERE user_id = ? AND used_at IS NULL`
    )
      .bind(session.user_id)
      .first<{ count: number }>();

    return new Response(
      JSON.stringify({
        remaining: remaining?.count || 0,
        regenerateAvailable: (remaining?.count || 0) === 0,
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Backup codes list error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
