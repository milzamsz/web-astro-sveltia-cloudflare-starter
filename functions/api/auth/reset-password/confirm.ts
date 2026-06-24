/**
 * POST /api/auth/reset-password/confirm — Complete password reset.
 * Validates token and sets new password.
 *
 * Request body: { token: string, newPassword: string }
 * Response 200: { success: true, message: "Password reset successfully" }
 * Response 400: { error: "Invalid or expired token" }
 */

export interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
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
    const body = (await request.json()) as {
      token?: string;
      newPassword?: string;
    };

    if (!body.token || !body.newPassword) {
      return new Response(
        JSON.stringify({ error: "Token and new password required" }),
        { status: 400, headers }
      );
    }

    // Find reset request in audit_events
    const resetRequest = await env.DB.prepare(
      `SELECT actor_id, metadata
       FROM audit_events
       WHERE action = 'password_reset_request'
         AND metadata LIKE ?
       ORDER BY created_at DESC
       LIMIT 1`
    )
      .bind(`%"token":"${body.token}"%`)
      .first<{ actor_id: string; metadata: string }>();

    if (!resetRequest) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400, headers }
      );
    }

    const metadata = JSON.parse(resetRequest.metadata);
    const expiresAt = new Date(metadata.expiresAt);

    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ error: "Token expired" }),
        { status: 400, headers }
      );
    }

    // Hash new password (simplified - use bcrypt in production)
    const passwordHash = body.newPassword; // Placeholder

    // Update password
    await env.DB.prepare(
      `UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?`
    )
      .bind(passwordHash, resetRequest.actor_id)
      .run();

    // Revoke all existing sessions for security
    await env.DB.prepare(
      `UPDATE sessions SET revoked_at = datetime('now')
       WHERE user_id = ? AND revoked_at IS NULL`
    )
      .bind(resetRequest.actor_id)
      .run();

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        resetRequest.actor_id,
        "password_reset_completed",
        resetRequest.actor_id,
        JSON.stringify({ completedAt: new Date().toISOString() })
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password reset successfully. Please sign in with your new password.",
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Reset password confirm error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
