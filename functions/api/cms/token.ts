/**
 * GET /api/cms/token — issues the GitHub content token to an authenticated editor.
 *
 * This is what lets editors sign in with email/password only: after they pass
 * Better Auth (handled by the /admin middleware), the admin page fetches this
 * endpoint and pre-seeds Sveltia's session, so the GitHub sign-in screen never
 * appears.
 *
 * Security:
 *   - Gated by the Better Auth session cookie + role + 2FA (see _shared/session).
 *   - Same-origin only: the httpOnly cookie + CORS (no ACAO header) prevent
 *     cross-site pages from reading the response.
 *   - Returns GITHUB_CMS_TOKEN — a fine-grained PAT scoped to the content repo
 *     (Contents: read/write). Keep the privileged GITHUB_PAT (publish→main)
 *     server-only; never return it here.
 *
 * Response 200: { token: "<github-token>" }
 * Response 401: { error: "unauthenticated" }
 * Response 500: { error: "token_not_configured" }
 */

import { getEditorSession } from "../../_shared/session";

export interface Env {
  DB: D1Database;
  GITHUB_CMS_TOKEN?: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };

  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers,
    });
  }

  const session = await getEditorSession(request, env);
  if (!session) {
    return new Response(JSON.stringify({ error: "unauthenticated" }), {
      status: 401,
      headers,
    });
  }

  if (!env.GITHUB_CMS_TOKEN) {
    return new Response(JSON.stringify({ error: "token_not_configured" }), {
      status: 500,
      headers,
    });
  }

  return new Response(JSON.stringify({ token: env.GITHUB_CMS_TOKEN }), {
    status: 200,
    headers,
  });
}
