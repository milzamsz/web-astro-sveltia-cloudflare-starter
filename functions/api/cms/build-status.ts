/**
 * GET /api/cms/build-status — Return the current build status for the preview branch.
 * Accessible to any authenticated user with editor+ role.
 *
 * Response 200: { branch, state, url, created }
 */

import { getDeploymentStatus, previewBranchExists } from "../../_shared/github";

export interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
  GITHUB_PAT: string;
  SVELTIA_BACKEND_REPO: string;
  CF_ACCOUNT_ID?: string;
  CF_API_TOKEN?: string;
}

const VIEW_ROLES = ["editor", "reviewer", "publisher", "admin"];

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (request.method !== "GET") {
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
      `SELECT role FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    )
      .bind(token)
      .first<{ role: string }>();

    if (!session || !VIEW_ROLES.includes(session.role)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers,
      });
    }

    const branchExists = await previewBranchExists(env);
    const deployment = await getDeploymentStatus(env, "content-preview");

    return new Response(
      JSON.stringify({
        branch: "content-preview",
        exists: branchExists,
        state: deployment?.state || "unknown",
        url: deployment?.url || null,
        created: deployment?.created || null,
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Build status error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
}
