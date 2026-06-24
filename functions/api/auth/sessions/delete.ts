/**
 * DELETE /api/auth/sessions/:id — Revoke a specific session.
 * Requires valid admin session.
 *
 * Response 200: { success: true, message: "Session revoked" }
 * Response 401: { error: "Not authenticated" }
 * Response 403: { error: "Forbidden" }
 * Response 404: { error: "Session not found" }
 */

export interface Env {
  DB: D1Database;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: { id: string };
}): Promise<Response> {
  const { request, env, params } = context;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (request.method !== "DELETE") {
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
    // Validate admin session
    const session = await env.DB.prepare(
      `SELECT s.user_id, u.role, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    )
      .bind(token)
      .first<{ user_id: string; role: string; email: string }>();

    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers,
      });
    }

    if (session.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers,
      });
    }

    // Find target session
    const targetSession = await env.DB.prepare(
      `SELECT s.id, s.user_id, s.revoked_at
       FROM sessions s WHERE s.id = ?`
    )
      .bind(params.id)
      .first<{ id: string; user_id: string; revoked_at: string | null }>();

    if (!targetSession) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 404,
        headers,
      });
    }

    if (targetSession.revoked_at) {
      return new Response(JSON.stringify({ error: "Session already revoked" }), {
        status: 400,
        headers,
      });
    }

    // Revoke session
    await env.DB.prepare(
      `UPDATE sessions SET revoked_at = datetime('now') WHERE id = ?`
    )
      .bind(params.id)
      .run();

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        session.user_id,
        "session_revoked",
        targetSession.user_id,
        JSON.stringify({ targetSessionId: params.id, revokedBy: session.email })
      )
      .run();

    return new Response(
      JSON.stringify({ success: true, message: "Session revoked" }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Session revoke error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
