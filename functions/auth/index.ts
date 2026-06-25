/**
 * GitHub OAuth endpoint for Sveltia CMS
 * Self-hosted on Cloudflare Pages — no external auth service needed.
 *
 * Endpoints:
 *   GET /auth?provider=github&scope=repo,user  → redirect to GitHub
 *   GET /auth/callback?code=...&state=...       → GitHub callback → CMS redirect
 */

import type { PagesFunction } from "@cloudflare/workers-types";

// The GitHub OAuth callback URL (must match GitHub OAuth App settings)
const CALLBACK_URL = "https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback";

export const onRequest: PagesFunction<{
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // GET /auth?provider=github&scope=...
  if (path.endsWith("/auth") && request.method === "GET") {
    const provider = url.searchParams.get("provider");
    const scope = url.searchParams.get("scope") || "repo,user";

    if (provider !== "github") {
      return new Response("Unsupported provider", { status: 400 });
    }

    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set("redirect_uri", CALLBACK_URL);
    githubAuthUrl.searchParams.set("scope", scope);
    githubAuthUrl.searchParams.set("state", crypto.randomUUID());

    return Response.redirect(githubAuthUrl.toString(), 302);
  }

  // GET /auth/callback?code=...&state=...
  if (path.endsWith("/auth/callback") && request.method === "GET") {
    const code = url.searchParams.get("code");

    if (!code) {
      return new Response("Missing authorization code", { status: 400 });
    }

    // Exchange code for access token
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
      }
    );

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (tokenData.error || !tokenData.access_token) {
      return new Response(
        JSON.stringify({
          error: tokenData.error || "token_exchange_failed",
          error_description: tokenData.error_description || "Failed to get access token",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Redirect back to CMS admin with the token in the URL fragment
    // Sveltia CMS reads the token from the URL and stores it
    const cmsUrl = `https://web-astro-sveltia-cloudflare-starter.pages.dev/admin/#access_token=${tokenData.access_token}&token_type=bearer`;

    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Redirecting...</title></head>
      <body>
        <p>Authentication successful. Redirecting to CMS...</p>
        <script>
          window.location.href = "${cmsUrl}";
        </script>
      </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  return new Response("Not Found", { status: 404 });
};
