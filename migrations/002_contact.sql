-- 002_contact.sql
-- D1 schema for contact submissions
-- Run on each environment (local, preview, production):
--   wrangler d1 execute DB --file migrations/002_contact.sql --env <env>

CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  ip_hash TEXT,                              -- SHA256 of IP address (no raw IP stored)
  turnstile_score REAL,                      -- Turnstile validation score (0.0 to 1.0)
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  organization_id TEXT NOT NULL DEFAULT 'default'
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_org ON contact_submissions(organization_id);
