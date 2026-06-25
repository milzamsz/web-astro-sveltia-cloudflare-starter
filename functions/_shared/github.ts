/**
 * Shared GitHub API helpers for CMS publish/discard workflow.
 * Uses a personal access token stored as GITHUB_PAT secret.
 *
 * Required env vars:
 *   GITHUB_PAT — GitHub personal access token with repo scope
 *   SVELTIA_BACKEND_REPO — "owner/repo" format
 */

const GITHUB_API = "https://api.github.com";
const PREVIEW_BRANCH = "content-preview";
const MAIN_BRANCH = "main";

function getRepo(env: Record<string, any>): string {
  return env.SVELTIA_BACKEND_REPO || "milzamsz/web-astro-sveltia-cloudflare-starter";
}

function headers(env: Record<string, any>): Record<string, string> {
  return {
    "Authorization": `Bearer ${env.GITHUB_PAT || ""}`,
    "Accept": "application/vnd.github+json",
    "User-Agent": "astro-sveltia-cloudflare-preview",
  };
}

/**
 * Get the SHA of the latest commit on a branch.
 */
export async function getBranchSha(env: Record<string, any>, branch: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${getRepo(env)}/git/refs/heads/${branch}`,
      { headers: headers(env) }
    );
    if (!res.ok) return null;
    const data = await res.json() as { object: { sha: string } };
    return data.object.sha;
  } catch {
    return null;
  }
}

/**
 * Check if preview branch exists.
 */
export async function previewBranchExists(env: Record<string, any>): Promise<boolean> {
  const sha = await getBranchSha(env, PREVIEW_BRANCH);
  return sha !== null;
}

/**
 * Create or update the preview branch from main.
 */
export async function createOrResetPreviewBranch(env: Record<string, any>): Promise<{ ok: boolean; error?: string }> {
  const mainSha = await getBranchSha(env, MAIN_BRANCH);
  if (!mainSha) return { ok: false, error: "Could not resolve main branch SHA" };

  const exists = await previewBranchExists(env);

  try {
    if (exists) {
      // Update preview branch to point at main's SHA
      const res = await fetch(
        `${GITHUB_API}/repos/${getRepo(env)}/git/refs/heads/${PREVIEW_BRANCH}`,
        {
          method: "PATCH",
          headers: headers(env),
          body: JSON.stringify({
            sha: mainSha,
            force: true,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json() as { message?: string };
        return { ok: false, error: err.message || "Failed to reset preview branch" };
      }
    } else {
      // Create preview branch from main
      const res = await fetch(
        `${GITHUB_API}/repos/${getRepo(env)}/git/refs`,
        {
          method: "POST",
          headers: headers(env),
          body: JSON.stringify({
            ref: `refs/heads/${PREVIEW_BRANCH}`,
            sha: mainSha,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json() as { message?: string };
        return { ok: false, error: err.message || "Failed to create preview branch" };
      }
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Merge preview branch into main (publish).
 * Returns merge commit SHA on success.
 */
export async function mergePreviewToMain(env: Record<string, any>): Promise<{
  ok: boolean;
  sha?: string;
  error?: string;
  conflict?: boolean;
}> {
  try {
    const mainSha = await getBranchSha(env, MAIN_BRANCH);
    if (!mainSha) return { ok: false, error: "Could not resolve main branch SHA" };

    const res = await fetch(
      `${GITHUB_API}/repos/${getRepo(env)}/merges`,
      {
        method: "POST",
        headers: headers(env),
        body: JSON.stringify({
          base: MAIN_BRANCH,
          head: PREVIEW_BRANCH,
          commit_message: "chore: publish from content-preview to main",
        }),
      }
    );

    if (res.status === 204) {
      return { ok: true, sha: mainSha, error: "Already up to date — no new changes to merge." };
    }

    if (res.ok) {
      const data = await res.json() as { sha: string };
      return { ok: true, sha: data.sha };
    }

    if (res.status === 409) {
      return { ok: false, conflict: true, error: "Merge conflict. Resolve conflicts in the content-preview branch before publishing." };
    }

    const err = await res.json() as { message?: string };
    return { ok: false, error: err.message || "Merge failed" };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Discard preview changes by resetting the preview branch to main.
 */
export async function discardPreview(env: Record<string, any>): Promise<{ ok: boolean; error?: string }> {
  return createOrResetPreviewBranch(env);
}

/**
 * Get the latest deployment status for a branch from Cloudflare Pages API.
 * Returns null if build status can't be determined.
 */
export async function getDeploymentStatus(env: Record<string, any>, branch: string = PREVIEW_BRANCH): Promise<{
  state: string;
  url?: string;
  created?: string;
} | null> {
  try {
    const accountId = env.CF_ACCOUNT_ID || null;
    if (!accountId) {
      return { state: "unknown", url: undefined, created: undefined };
    }

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/astro-sveltia-cloudflare/deployments`,
      {
        headers: {
          "Authorization": `Bearer ${env.CF_API_TOKEN || ""}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) return null;
    const data = await res.json() as {
      result: Array<{
        id: string;
        branch: string;
        url: string;
        created_on: string;
        latest_stage: { status: string; name: string };
      }>;
    };

    const previewDeployment = data.result?.find((d) => d.branch === branch);
    if (!previewDeployment) return { state: "no_deployment" };

    return {
      state: previewDeployment.latest_stage?.status || "unknown",
      url: previewDeployment.url,
      created: previewDeployment.created_on,
    };
  } catch {
    return null;
  }
}
