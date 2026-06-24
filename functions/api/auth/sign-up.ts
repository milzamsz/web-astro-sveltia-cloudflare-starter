/**
 * POST /api/auth/sign-up — Create a new user account (invite-only).
 * Requires a valid invite token.
 *
 * Request body: { email: string, password: string, inviteToken: string }
 * Response 201: { user: { id, email, role }, requiresEmailVerification: true }
 */

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const headers = { 'Content-Type': 'application/json' };

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
      inviteToken?: string;
    };

    if (!body.email || !body.password || !body.inviteToken) {
      return new Response(
        JSON.stringify({ error: 'Email, password, and invite token required' }),
        { status: 400, headers }
      );
    }

    // Validate invite token
    const invite = await env.DB.prepare(
      `SELECT id, email, role, expires_at
       FROM invitations WHERE token = ? AND used_at IS NULL`
    ).bind(body.inviteToken).first<{
      id: string;
      email: string;
      role: string;
      expires_at: string;
    }>();

    if (!invite) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired invitation' }),
        { status: 401, headers }
      );
    }

    if (new Date(invite.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Invitation has expired' }),
        { status: 410, headers }
      );
    }

    if (invite.email !== body.email) {
      return new Response(
        JSON.stringify({ error: 'Email does not match invitation' }),
        { status: 400, headers }
      );
    }

    // Check if user already exists
    const existing = await env.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(body.email).first();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'An account with this email already exists' }),
        { status: 409, headers }
      );
    }

    // Create user
    const userId = crypto.randomUUID();
    // In production: hash password with bcrypt
    // const { hashSync } = await import('bcryptjs');
    // const passwordHash = hashSync(body.password, 10);
    const passwordHash = body.password; // placeholder — hash in production

    await env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, role, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(userId, body.email, passwordHash, invite.role, 'default').run();

    // Mark invite as used
    await env.DB.prepare(
      `UPDATE invitations SET used_at = datetime('now') WHERE id = ?`
    ).bind(invite.id).run();

    // Log audit event
    try {
      await env.DB.prepare(
        `INSERT INTO audit_events (id, actor_id, action, target, organization_id)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), userId, 'account_created', body.email, 'default').run();
    } catch {}

    return new Response(
      JSON.stringify({
        user: { id: userId, email: body.email, role: invite.role },
        requiresEmailVerification: true,
      }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error('Sign-up error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    );
  }
}
