/**
 * Preview middleware — protects the /preview surface.
 *
 * Checks:
 * 1. Valid session cookie
 * 2. User has authorized role (reviewer/publisher/admin)
 * 3. Sets noindex headers for preview deployments
 * 4. Injects preview banner
 *
 * Redirects:
 * - No session → /login
 * - Unauthorized role → 403
 */

export interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
}

const PREVIEW_ROLES = ["reviewer", "publisher", "admin"];

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  next: () => Promise<Response>;
}): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Bypass auth for the preview health/build endpoints
  const bypassPaths = [
    "/api/cms/build-status",
  ];

  if (bypassPaths.some((p) => url.pathname.startsWith(p))) {
    return await next();
  }

  // Check for session cookie
  const cookie = request.headers.get("Cookie") || "";
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;

  if (!token) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
        "Set-Cookie":
          "return_to=" +
          encodeURIComponent(url.pathname) +
          "; Path=/; HttpOnly; Secure; SameSite=Lax",
      },
    });
  }

  try {
    // Validate session against D1
    const session = await env.DB.prepare(
      `SELECT s.user_id, u.role, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    )
      .bind(token)
      .first<{ user_id: string; role: string; email: string }>();

    if (!session) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    // Check role
    if (!PREVIEW_ROLES.includes(session.role)) {
      return new Response("Forbidden: insufficient role", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Get the response from the origin
    const response = await next();

    // Add noindex headers and preview banner marker
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-Robots-Tag", "noindex, nofollow");
    newHeaders.set("X-Preview-Auth", "authenticated");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    console.error("Preview middleware error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
