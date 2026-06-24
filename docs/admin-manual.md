# Admin Manual

This document is for technical administrators responsible for initial setup, user management, and recovery operations.

---

## Initial Setup

### 1. Owner Bootstrap

When the system starts with no users, the bootstrap endpoint creates the first administrator account.

```bash
curl -X POST https://<site>/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"<strong-password>"}'
```

This creates an `admin` role account with full system access. The bootstrap endpoint only works when `users` table is empty.

### 2. Environment Variables

Set the following secrets in Cloudflare Pages:

| Secret | Description | Required |
|--------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for email delivery | Yes |
| `SESSION_SECRET` | Secret for session encryption (min 32 chars) | Yes |
| `TOTP_ISSUER` | Issuer name shown in authenticator apps | No |
| `R2_ACCESS_KEY_ID` | R2 S3-compatible access key ID | Yes |
| `R2_SECRET_ACCESS_KEY` | R2 S3-compatible secret access key | Yes |
| `R2_BUCKET_NAME` | R2 bucket name | Yes |

### 3. D1 Database Setup

Run the migration:

```bash
wrangler d1 execute DB --file migrations/001_auth.sql --env production
```

This creates all auth tables and seeds default roles.

### 4. Deployment

```bash
pnpm build
wrangler pages deploy dist --branch main
```

---

## User Management

### Inviting New Users

Only admins can send invitations:

```bash
curl -X POST https://<site>/api/auth/invite \
  -H "Authorization: Bearer <admin-session-token>" \
  -H "Content-Type: application/json" \
  -d '{"email":"editor@example.com","role":"editor"}'
```

Available roles:
- `admin` — Full system access
- `publisher` — Can publish content to production
- `reviewer` — Can review and approve content
- `editor` — Can create and edit content

### Changing User Roles

```sql
UPDATE users SET role = 'publisher' WHERE email = 'user@example.com';
```

Role changes automatically revoke all active sessions for that user.

---

## Security Procedures

### Lost 2FA Device

If an editor loses access to their authenticator app:

1. Verify the user's identity through an alternate channel.
2. Admin resets their 2FA enrollment:

```sql
UPDATE users SET totp_secret = NULL, totp_enrolled_at = NULL WHERE email = 'user@example.com';
DELETE FROM trusted_devices WHERE user_id = (SELECT id FROM users WHERE email = 'user@example.com');
DELETE FROM backup_codes WHERE user_id = (SELECT id FROM users WHERE email = 'user@example.com');
```

3. The user will be prompted to re-enroll 2FA on their next login.

### Session Revocation

To revoke all sessions for a user (e.g., after a security incident):

```sql
UPDATE sessions SET revoked_at = datetime('now')
WHERE user_id = (SELECT id FROM users WHERE email = 'user@example.com')
  AND revoked_at IS NULL;
```

### Password Reset

Users can reset their own password via the "Forgot Password" flow on the login page.
Admins cannot directly set a user's password — the user must use the reset flow.

---

## Monitoring

### Audit Events

All auth-related events are logged in the `audit_events` table:

```sql
SELECT * FROM audit_events WHERE created_at > datetime('now', '-7 days') ORDER BY created_at DESC;
```

Key events to monitor:
- `sign_in_attempt` — login attempts (watch for patterns of repeated failures)
- `invite_sent` — invitation creation
- `role_change` — role modifications
- `2fa_enrolled` / `2fa_disabled` — 2FA status changes

### Rate Limiting

Auth endpoints are rate-limited to 5 attempts per email per 15-minute window. When exceeded, the endpoint returns HTTP 429.

---

## Recovery

### Database Backup

D1 databases are backed up automatically by Cloudflare. To create a manual backup:

```bash
wrangler d1 backup create DB
```

To restore:

```bash
wrangler d1 backup restore DB <backup-id>
```

### Full Account Recovery

If the admin account is locked out:

1. Connect to D1 directly:
   ```bash
   wrangler d1 execute DB --command "SELECT id, email, role FROM users WHERE role = 'admin'"
   ```
2. Reset the admin's password via the password reset flow.
3. If necessary, clear the rate limit counters:
   ```sql
   DELETE FROM audit_events WHERE action = 'sign_in_attempt' AND target = 'admin@example.com';
   ```
