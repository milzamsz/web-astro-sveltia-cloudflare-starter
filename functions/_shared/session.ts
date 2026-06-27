/**
 * Shared session validation for CMS-capable users.
 *
 * Validates the Better Auth `session_token` cookie against D1 and enforces the
 * same access rules as the /admin middleware: an active (non-revoked, unexpired)
 * session, an authorized role, and completed 2FA enrollment.
 *
 * Used by:
 *   - functions/api/cms/token.ts   (issues the GitHub CMS token to the browser)
 *   - functions/auth/index.ts      (session-gated OAuth handshake fallback)
 */

export interface SessionEnv {
  DB: D1Database;
}

export interface EditorSession {
  userId: string;
  email: string;
  role: string;
}

// Roles permitted to use the CMS (mirrors functions/admin/_middleware.ts).
export const CMS_ROLES = ["admin", "publisher", "reviewer", "editor"];

/**
 * Returns the validated editor session, or null if the request is not an
 * authenticated, authorized, 2FA-enrolled CMS user.
 */
export async function getEditorSession(
  request: Request,
  env: SessionEnv,
): Promise<EditorSession | null> {
  const cookie = request.headers.get("Cookie") || "";
  const token = cookie.match(/session_token=([^;]+)/)?.[1];
  if (!token) return null;

  try {
    const row = await env.DB.prepare(
      `SELECT s.user_id, u.role, u.totp_enrolled_at, u.email
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND s.revoked_at IS NULL`,
    )
      .bind(token)
      .first<{
        user_id: string;
        role: string;
        totp_enrolled_at: string | null;
        email: string;
      }>();

    if (!row) return null;
    if (!CMS_ROLES.includes(row.role)) return null;
    // 2FA is mandatory for CMS access.
    if (!row.totp_enrolled_at) return null;

    return { userId: row.user_id, email: row.email, role: row.role };
  } catch {
    return null;
  }
}
