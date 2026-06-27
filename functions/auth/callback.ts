/**
 * GitHub OAuth callback for Sveltia CMS — self-hosted on Cloudflare Pages.
 *
 * GET /auth/callback?code=...&state=...
 *   1. Validates the CSRF state against the cookie set by ../auth (index.ts).
 *   2. Exchanges the authorization code for an access token.
 *   3. Returns an HTML page that completes the Sveltia/Decap `postMessage`
 *      handshake with the CMS window that opened this popup.
 *
 * Handshake protocol (Netlify/Decap/Sveltia compatible):
 *   - popup  -> opener : "authorizing:github"
 *   - opener -> popup  : (any message, carries opener origin)
 *   - popup  -> opener : "authorization:github:success:{json}" | ":error:{json}"
 */

interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

const PROVIDER = "github";
const CALLBACK_URL =
  "https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback";

function renderHandshake(
  status: "success" | "error",
  payload: Record<string, unknown>,
): Response {
  // Token/charset from GitHub is safe; JSON.stringify guards quotes.
  const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payload)}`;
  const serialized = JSON.stringify(message);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authenticating…</title>
  </head>
  <body>
    <p>Completing authentication, you may close this window…</p>
    <script>
      (function () {
        var message = ${serialized};
        function send(origin) {
          if (window.opener) {
            window.opener.postMessage(message, origin);
          }
        }
        function receive(event) {
          if (event.data !== "authorizing:${PROVIDER}") return;
          window.removeEventListener("message", receive, false);
          send(event.origin);
        }
        window.addEventListener("message", receive, false);
        // Kick off the handshake; the CMS replies, then we post the result.
        if (window.opener) {
          window.opener.postMessage("authorizing:${PROVIDER}", "*");
        }
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Clear the CSRF cookie now that it's been used.
      "Set-Cookie": "csrf_state=; Path=/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return renderHandshake("error", {
      error: "missing_code",
      error_description: "Authorization code missing from callback.",
    });
  }

  // CSRF protection: state must match the cookie set during /auth.
  const cookie = request.headers.get("Cookie") || "";
  const cookieState = cookie.match(/csrf_state=([^;]+)/)?.[1];
  if (!cookieState || cookieState !== state) {
    return renderHandshake("error", {
      error: "invalid_state",
      error_description: "OAuth state mismatch. Please try signing in again.",
    });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return renderHandshake("error", {
      error: "server_misconfigured",
      error_description:
        "GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET are not set on the server.",
    });
  }

  let tokenData: { access_token?: string; error?: string; error_description?: string };
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: CALLBACK_URL,
        }),
      },
    );
    tokenData = await tokenResponse.json();
  } catch {
    return renderHandshake("error", {
      error: "token_request_failed",
      error_description: "Network error contacting GitHub for the access token.",
    });
  }

  if (tokenData.error || !tokenData.access_token) {
    return renderHandshake("error", {
      error: tokenData.error || "token_exchange_failed",
      error_description:
        tokenData.error_description || "Failed to obtain access token.",
    });
  }

  return renderHandshake("success", {
    token: tokenData.access_token,
    provider: PROVIDER,
  });
}
