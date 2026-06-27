/**
 * GET /auth?provider=github — session-gated token handshake for Sveltia CMS.
 *
 * This is the FALLBACK path for the email/password-only login model. The primary
 * path pre-seeds Sveltia's session in /admin/index.html via /api/cms/token, so
 * editors normally never reach this endpoint. If they do (e.g. they click
 * "Sign In with GitHub" because the pre-seed failed), we do NOT redirect to
 * GitHub. Instead, if the editor has a valid Better Auth session, we complete
 * Sveltia's `postMessage` handshake with the server-held GitHub token — so no
 * GitHub screen ever appears. No session → redirect the popup to /login.
 *
 * Required environment variable:
 *   - GITHUB_CMS_TOKEN — fine-grained PAT (content repo, Contents: read/write)
 */

import { getEditorSession } from "../_shared/session";

const PROVIDER = "github";

export interface Env {
  DB: D1Database;
  GITHUB_CMS_TOKEN?: string;
}

function renderHandshake(
  status: "success" | "error",
  payload: Record<string, unknown>,
): Response {
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payload)}`;
  const serialized = JSON.stringify(message);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Authenticating…</title></head>
  <body>
    <p>Completing sign-in, you may close this window…</p>
    <script>
      (function () {
        var message = ${serialized};
        function receive(event) {
          if (event.data !== "authorizing:${PROVIDER}") return;
          window.removeEventListener("message", receive, false);
          if (window.opener) window.opener.postMessage(message, event.origin);
        }
        window.addEventListener("message", receive, false);
        if (window.opener) window.opener.postMessage("authorizing:${PROVIDER}", "*");
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const session = await getEditorSession(request, env);
  if (!session) {
    // Not logged in → send them to the email/password login first.
    return new Response(null, {
      status: 302,
      headers: { Location: "/login?return_to=/admin/" },
    });
  }

  if (!env.GITHUB_CMS_TOKEN) {
    return renderHandshake("error", {
      error: "server_misconfigured",
      error_description: "GITHUB_CMS_TOKEN is not set on the server.",
    });
  }

  return renderHandshake("success", {
    token: env.GITHUB_CMS_TOKEN,
    provider: PROVIDER,
  });
}
