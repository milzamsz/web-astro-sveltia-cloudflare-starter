/**
 * GitHub OAuth endpoint for Sveltia CMS — self-hosted on Cloudflare Pages.
 *
 * GET /auth?provider=github&scope=repo,user  -> redirect to GitHub OAuth
 * GET /auth/callback?code=...&state=...       -> exchange code for token -> redirect to CMS
 */

const CALLBACK_URL = "https://web-astro-sveltia-cloudflare-starter.pages.dev/auth/callback";

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.endsWith('/auth') && request.method === 'GET') {
    const provider = url.searchParams.get('provider');
    const scope = url.searchParams.get('scope') || 'repo,user';

    if (provider !== 'github') {
      return new Response('Unsupported provider', { status: 400 });
    }

    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('redirect_uri', CALLBACK_URL);
    githubAuthUrl.searchParams.set('scope', scope);
    githubAuthUrl.searchParams.set('state', crypto.randomUUID());

    return Response.redirect(githubAuthUrl.toString(), 302);
  }

  if (path.endsWith('/auth/callback') && request.method === 'GET') {
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing authorization code', { status: 400 });
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: CALLBACK_URL,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error || !tokenData.access_token) {
      return new Response(JSON.stringify({
        error: tokenData.error || 'token_exchange_failed',
        error_description: tokenData.error_description || 'Failed to get access token',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const cmsUrl = 'https://web-astro-sveltia-cloudflare-starter.pages.dev/admin/#access_token=' + tokenData.access_token + '&token_type=bearer';

    return new Response(
      '<!DOCTYPE html><html><head><title>Redirecting...</title></head><body><p>Auth successful. Redirecting...</p><script>window.location.href="' + cmsUrl + '";</script></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  }

  return new Response('Not Found', { status: 404 });
}
