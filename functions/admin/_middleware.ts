/**
 * Admin middleware — protects the /admin surface.
 *
 * Checks:
 * 1. Valid session cookie
 * 2. User has authorized role (editor/reviewer/publisher/admin)
 * 3. User has completed 2FA enrollment
 *
 * Redirects:
 * - No session → /login (same origin)
 * - No 2FA → /admin/totp-enroll
 * - Unauthorized role → 403 page
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  TOTP_ISSUER?: string;
  SVELTIA_BACKEND_REPO?: string;
  SVELTIA_BACKEND_BRANCH?: string;
}

// Hard-coded allowed roles for admin access
const ADMIN_ROLES = ['admin', 'publisher', 'reviewer', 'editor'];

export async function onRequest(context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  next: () => Promise<Response>;
}): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Bypass auth for login page, auth API, and public assets
  const bypassPaths = [
    '/login',
    '/api/auth/sign-in',
    '/api/auth/sign-up',
    '/api/auth/verify-email',
    '/api/auth/reset-password',
    '/api/auth/reset-password/confirm',
    '/api/auth/bootstrap',
    '/api/auth/invite/accept',
    '/api/auth/totp/enroll',
    '/api/auth/totp/verify',
    '/api/auth/email-otp',
    '/api/auth/backup-codes',
    '/api/auth/backup-codes/verify',
    '/admin/config.yml',
    '/admin/index.html',
  ];

  if (bypassPaths.some(p => url.pathname.startsWith(p))) {
    return await next();
  }

  // Check for session cookie
  const cookie = request.headers.get('Cookie') || '';
  const sessionMatch = cookie.match(/session_token=([^;]+)/);
  const token = sessionMatch ? sessionMatch[1] : null;

  if (!token) {
    // No session → redirect to login
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
        'Set-Cookie': 'return_to=' + encodeURIComponent(url.pathname) + '; Path=/; HttpOnly; Secure; SameSite=Lax',
      },
    });
  }

  try {
    // Validate session against D1
    const session = await env.DB.prepare(
      `SELECT s.user_id, u.role, u.totp_enrolled_at, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`
    ).bind(token).first<{
      user_id: string;
      role: string;
      totp_enrolled_at: string | null;
      email: string;
    }>();

    if (!session) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      });
    }

    // Check role
    if (!ADMIN_ROLES.includes(session.role)) {
      return new Response('Forbidden: insufficient role', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Check 2FA enrollment (mandatory for all CMS-capable users)
    if (!session.totp_enrolled_at) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/admin/totp-enroll' },
      });
    }

    // Attach user info to request for downstream handlers
    const clonedRequest = new Request(request);
    (clonedRequest as any).user = {
      id: session.user_id,
      email: session.email,
      role: session.role,
    };

    return await next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    return new Response('Internal server error', { status: 500 });
  }
}
