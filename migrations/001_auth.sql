-- 001_auth.sql
-- D1 schema for Better Auth integration
-- This defines users, sessions, roles, invitations, audit events,
-- trusted devices, and backup codes tables.
--
-- All scoped tables include 'organization_id' for multi-tenant support.
-- Run on each environment (local, preview, production) via:
--   wrangler d1 execute DB --file migrations/001_auth.sql --env <env>

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  email_verified INTEGER NOT NULL DEFAULT 0,           -- boolean
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK(role IN ('admin','publisher','reviewer','editor')),
  organization_id TEXT NOT NULL DEFAULT 'default',
  totp_secret TEXT,                                     -- encrypted TOTP shared secret
  totp_enrolled_at TEXT,                                -- ISO 8601 timestamp
  trusted_device_fingerprint TEXT,                      -- device fingerprint hash
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,                             -- ISO 8601 timestamp
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  revoked_at TEXT,                                      -- set on revocation
  organization_id TEXT NOT NULL DEFAULT 'default'
);

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE CHECK(name IN ('admin','publisher','reviewer','editor')),
  description TEXT,
  permissions TEXT NOT NULL DEFAULT '[]',               -- JSON array of permission strings
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invitations (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,                           -- signed invite token (hash stored)
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK(role IN ('admin','publisher','reviewer','editor')),
  invited_by TEXT REFERENCES users(id),
  organization_id TEXT NOT NULL DEFAULT 'default',
  expires_at TEXT NOT NULL,                             -- ISO 8601, 24h TTL
  used_at TEXT,                                         -- set when accepted
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,                                 -- 'sign_in', 'invite_sent', 'role_change', '2fa_enrolled', 'session_revoked', etc.
  target TEXT,                                          -- affected resource (email, user_id)
  metadata TEXT,                                        -- JSON with extra context
  ip_address TEXT,
  organization_id TEXT NOT NULL DEFAULT 'default',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS trusted_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_fingerprint TEXT NOT NULL,                     -- hashed device identifier
  user_agent TEXT,
  last_used_at TEXT NOT NULL DEFAULT (datetime('now')),
  organization_id TEXT NOT NULL DEFAULT 'default'
);

CREATE TABLE IF NOT EXISTS backup_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,                              -- BCrypt hash of backup code
  used_at TEXT,                                         -- null if unused
  organization_id TEXT NOT NULL DEFAULT 'default'
);

-- Seed default roles
INSERT OR IGNORE INTO roles (id, name, description, permissions) VALUES
  ('role-admin', 'admin', 'Full system access', '["*"]'),
  ('role-publisher', 'publisher', 'Can publish content to production', '["content:read","content:write","content:publish"]'),
  ('role-reviewer', 'reviewer', 'Can review and approve content', '["content:read","content:approve"]'),
  ('role-editor', 'editor', 'Can create and edit content', '["content:read","content:write"]');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_organization ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_events(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_events(created_at);
CREATE INDEX IF NOT EXISTS idx_backup_codes_user ON backup_codes(user_id);
