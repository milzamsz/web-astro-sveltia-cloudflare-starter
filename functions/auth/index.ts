/**
 * GitHub OAuth initiation for Sveltia CMS — self-hosted on Cloudflare Pages.
 *
 * GET /auth?provider=github&scope=repo,user
 *   -> sets a short-lived CSRF state cookie and redirects to GitHub.
 *
 * The callback (GET /auth/callback) is handled by ./callback.ts, which performs
 * the token exchange and the Sveltia/Decap `postMessage` handshake.
 *
 * Required environment variables (Cloudflare Pages → Settings → Variables):
 *   - GITHUB_CLIENT_ID     (public)
 *   - GITHUB_CLIENT_SECRET (secret, used in callback.ts)
 *
 * The GitHub OAuth App's "Authorization callback URL" must be:
 *   https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback
 */

interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

const CALLBACK_URL =
  "https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback";

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const provider = url.searchParams.get("provider") ?? "github";
  const scope = url.searchParams.get("scope") || "repo,user";

  if (provider !== "github") {
    return new Response("Unsupported provider", { status: 400 });
  }

  if (!env.GITHUB_CLIENT_ID) {
    return new Response("GITHUB_CLIENT_ID is not configured", { status: 500 });
  }

  const state = crypto.randomUUID();

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set("redirect_uri", CALLBACK_URL);
  githubAuthUrl.searchParams.set("scope", scope);
  githubAuthUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: githubAuthUrl.toString(),
      // Short-lived, HttpOnly CSRF cookie validated in callback.ts.
      "Set-Cookie": `csrf_state=${state}; Path=/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
