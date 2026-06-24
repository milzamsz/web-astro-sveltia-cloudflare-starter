/**
 * POST /api/auth/bootstrap — Create the first admin user (one-time only).
 * Only works when the users table is empty.
 *
 * Request body: { email: string, password: string }
 * Response 201: { user: { id, email, role }, message: "First admin created" }
 * Response 400: { error: "Users already exist" }
 */

export interface Env {
  DB: D1Database;
}

export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    // Check if any users exist
    const existingUsers = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM users`
    ).first<{ count: number }>();

    if (existingUsers && existingUsers.count > 0) {
      return new Response(
        JSON.stringify({ error: "Users already exist. Bootstrap is only available for the first admin." }),
        { status: 400, headers }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400, headers }
      );
    }

    if (body.password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters" }),
        { status: 400, headers }
      );
    }

    // Create admin user (placeholder password hash — use bcrypt in production)
    const userId = crypto.randomUUID();
    const passwordHash = body.password; // placeholder

    await env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, role, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(userId, body.email, passwordHash, "admin", "default")
      .run();

    // Audit event
    await env.DB.prepare(
      `INSERT INTO audit_events (id, actor_id, action, target, organization_id)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(userId, userId, "admin_bootstrap", body.email, "default")
      .run();

    return new Response(
      JSON.stringify({
        user: { id: userId, email: body.email, role: "admin" },
        message: "First admin created successfully. You can now sign in at /login.",
      }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error("Bootstrap error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers }
    );
  }
}
