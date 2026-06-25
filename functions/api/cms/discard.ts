/**
 * POST /api/cms/discard — Discard content-preview changes by resetting to main.
 * Requires publisher or admin role.
 *
 * Response 200: { ok: true, message: "Preview discarded. Branch reset to main." }
 * Response 403: { ok: false, message: "Forbidden" }
 */

import { discardPreview } from "../../_shared/github";

export interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
  GITHUB_PAT: string;
  SVELTIA_BACKEND_REPO: string;
}

const DISCARD_ROLES = ["publisher", "admin"];

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  // Authenticate via session
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
    const session = await env.DB.prepare(
      `SELECT user_id, role, email FROM sessions s
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

    if (!DISCARD_ROLES.includes(session.role)) {
      return new Response(JSON.stringify({ error: "Forbidden: insufficient role" }), {
        status: 403,
        headers,
      });
    }

    // Execute discard (reset preview branch to main)
    const result = await discardPreview(env);

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, metadata)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        session.user_id,
        result.ok ? "discard_success" : "discard_failed",
        "content-preview → main (reset)",
        JSON.stringify({
          email: session.email,
          error: result.error || null,
        })
      )
      .run();

    if (!result.ok) {
      return new Response(
        JSON.stringify({ ok: false, message: result.error || "Discard failed" }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Preview discarded. Branch reset to main.",
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Discard error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
