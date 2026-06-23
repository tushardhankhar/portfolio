/**
 * Lightweight GitHub data fetcher — no auth token required.
 *
 * - Contribution calendar via the public proxy github-contributions-api
 *   (https://github-contributions-api.jogruber.de) which returns JSON.
 * - Profile stats (repos, followers, stars) via the public REST API
 *   (unauthenticated: 60 req/hr — fine with 1h revalidation).
 *
 * Every function is defensive: any failure returns `null` and the UI shows
 * a graceful fallback. Nothing here ever throws.
 */

export interface ContributionDay {
  date: string;
  count: number;
  /** intensity bucket 0–4 */
  level: number;
}

export interface GitHubData {
  username: string;
  totalContributions: number;
  /** weeks → 7 days each (most recent weeks last) */
  weeks: ContributionDay[][];
  publicRepos: number | null;
  followers: number | null;
  totalStars: number | null;
}

/** Pull a github username out of a profile URL, or return a sensible default. */
export function githubUsernameFrom(url?: string): string {
  if (url) {
    const m = url.match(/github\.com\/([^/?#]+)/i);
    if (m?.[1]) return m[1];
  }
  return process.env.GITHUB_USERNAME || "tushardhankhar";
}

function chunkWeeks(days: ContributionDay[], maxWeeks = 26): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks.slice(-maxWeeks);
}

export async function getGitHubData(username: string): Promise<GitHubData | null> {
  if (!username) return null;

  try {
    const [calRes, userRes, reposRes] = await Promise.allSettled([
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
    ]);

    // Contributions
    let totalContributions = 0;
    let weeks: ContributionDay[][] = [];
    if (calRes.status === "fulfilled" && calRes.value.ok) {
      const cal = (await calRes.value.json()) as {
        total?: Record<string, number>;
        contributions?: ContributionDay[];
      };
      const days = cal.contributions ?? [];
      weeks = chunkWeeks(days);
      totalContributions =
        cal.total?.lastYear ??
        Object.values(cal.total ?? {}).reduce((a, b) => a + b, 0) ??
        days.reduce((a, d) => a + d.count, 0);
    }

    // Profile
    let publicRepos: number | null = null;
    let followers: number | null = null;
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const u = (await userRes.value.json()) as {
        public_repos?: number;
        followers?: number;
      };
      publicRepos = u.public_repos ?? null;
      followers = u.followers ?? null;
    }

    // Stars (sum of stargazers across public repos)
    let totalStars: number | null = null;
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const repos = (await reposRes.value.json()) as Array<{ stargazers_count?: number }>;
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((a, r) => a + (r.stargazers_count ?? 0), 0);
      }
    }

    if (!weeks.length && publicRepos === null) return null;

    return {
      username,
      totalContributions,
      weeks,
      publicRepos,
      followers,
      totalStars,
    };
  } catch {
    return null;
  }
}
