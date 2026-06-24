/**
 * POST /api/auth/sign-in — Email + password sign in.
 * Returns session cookie on success.
 *
 * Request body: { email: string, password: string }
 * Response 200: { user: { id, email, role }, session: { token } }
 * Response 401: { error: "Invalid credentials" }
 * Response 429: { error: "Too many attempts" }
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  TOTP_ISSUER?: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  }

  try {
    const body = await request.json() as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: 'Email and password required' }),
        { status: 400, headers }
      );
    }

    // Rate limiting check: count attempts in the last 15 min
    const recentAttempts = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM audit_events
       WHERE action = 'sign_in_attempt'
         AND target = ?
         AND created_at > datetime('now', '-15 minutes')`
    ).bind(body.email).first<{ count: number }>();

    if (recentAttempts && recentAttempts.count >= 5) {
      return new Response(
        JSON.stringify({ error: 'Too many attempts. Try again later.' }),
        { status: 429, headers }
      );
    }

    // Find user
    const user = await env.DB.prepare(
      `SELECT id, email, password_hash, role, totp_enrolled_at
       FROM users WHERE email = ?`
    ).bind(body.email).first();

    if (!user) {
      // Log attempt (generic response, don't reveal if user exists)
      await logAuditEvent(env.DB, null, 'sign_in_attempt', body.email);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers }
      );
    }

    // Verify password (simple hash comparison for now — use bcrypt in production)
    const passwordValid = await verifyPassword(body.password, (user as any).password_hash);
    if (!passwordValid) {
      await logAuditEvent(env.DB, (user as any).id, 'sign_in_attempt', body.email);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers }
      );
    }

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    await env.DB.prepare(
      `INSERT INTO sessions (id, user_id, token, expires_at, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      (user as any).id,
      sessionToken,
      expiresAt,
      'default'
    ).run();

    // Log successful sign-in
    await logAuditEvent(env.DB, (user as any).id, 'sign_in', body.email);

    // Check if 2FA is required
    const needs2FA = !(user as any).totp_enrolled_at;

    // Set session cookie
    const response = new Response(
      JSON.stringify({
        user: {
          id: (user as any).id,
          email: (user as any).email,
          role: (user as any).role,
        },
        session: { token: sessionToken, expiresAt },
        needs2FA,
      }),
      { status: 200, headers }
    );

    response.headers.set(
      'Set-Cookie',
      `session_token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`
    );

    return response;
  } catch (err) {
    console.error('Sign-in error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    );
  }
}

async function logAuditEvent(
  db: D1Database,
  actorId: string | null,
  action: string,
  target: string
) {
  try {
    await db.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, ip_address, organization_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      actorId,
      action,
      target,
      'unknown',
      'default'
    ).run();
  } catch {
    // Audit logging failure should not block the auth flow
    console.warn('Failed to log audit event:', action, target);
  }
}

function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

// Simple password verification — placeholder; use bcrypt or Argon2 in production
async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  if (!hash || !hash.startsWith('$2')) return plaintext === hash; // fallback for dev
  // In production: use bcrypt.compare(plaintext, hash)
  // For now: use TextEncoder + subtle for basic verification
  try {
    const { compareSync } = await import('bcryptjs');
    return compareSync(plaintext, hash);
  } catch {
    return plaintext === hash; // fallback: direct compare (dev only)
  }
}
