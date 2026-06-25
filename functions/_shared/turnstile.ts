/**
 * Turnstile verification helper.
 */
export async function verifyTurnstile(token: string, secretKey: string): Promise<{
  success: boolean;
  score?: number;
  error?: string;
}> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });
    const data = await res.json() as { success: boolean; score?: number; "error-codes"?: string[] };
    return {
      success: data.success,
      score: data.score,
      error: data["error-codes"]?.join(", "),
    };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

/**
 * Hash an IP address for privacy-safe storage.
 */
export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
