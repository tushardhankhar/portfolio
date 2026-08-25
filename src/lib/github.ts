/**
 * Lightweight GitHub data fetcher.
 *
 * Contribution calendar, in order of preference:
 *   1. GitHub GraphQL API — only when `GITHUB_TOKEN` is set. This is the sole
 *      source that includes *private* contributions, so it matches the total
 *      shown on your own profile page.
 *   2. GitHub's own public calendar endpoint (`/users/<u>/contributions`).
 *      No auth needed and always current, but counts public activity only.
 *   3. The github-contributions-api proxy, as a last resort.
 *
 * Profile stats (repos, followers, stars) come from the public REST API
 * (unauthenticated: 60 req/hr — fine with 1h revalidation).
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

const MAX_WEEKS = 26;

interface Calendar {
  total: number;
  weeks: ContributionDay[][];
}

/** Buckets a raw daily count into GitHub's 0–4 intensity scale. */
function levelFor(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function chunkWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/**
 * The heatmap shows a trailing window, but the headline total covers the whole
 * year — so trim the weeks only, after the total has been computed.
 */
function trimWeeks(weeks: ContributionDay[][]): ContributionDay[][] {
  return weeks.slice(-MAX_WEEKS);
}

/** 1. GraphQL — includes private contributions. Requires GITHUB_TOKEN. */
async function calendarFromGraphQL(username: string): Promise<Calendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;

  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: Array<{
              contributionDays?: Array<{
                date?: string;
                contributionCount?: number;
                contributionLevel?: string;
              }>;
            }>;
          };
        };
      };
    };
  };

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal?.weeks?.length) return null;

  const weeks = cal.weeks.map((w) =>
    (w.contributionDays ?? []).map((d) => {
      const count = d.contributionCount ?? 0;
      return { date: d.date ?? "", count, level: levelFor(count) };
    })
  );

  const total =
    cal.totalContributions ??
    weeks.flat().reduce((a, d) => a + d.count, 0);

  return { total, weeks };
}

/**
 * 2. GitHub's own calendar HTML. Each cell is a `<td>` carrying the date and
 * intensity; the exact count lives in the paired `<tool-tip>` element, keyed by
 * the cell's id. Cell ids encode position as `...-{dayOfWeek}-{weekIndex}`.
 */
async function calendarFromGitHubHtml(username: string): Promise<Calendar | null> {
  const res = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      next: { revalidate: 3600 },
      headers: {
        Accept: "text/html",
        // GitHub serves this endpoint to plain clients, but a UA avoids edge-case blocks.
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-site)",
      },
    }
  );
  if (!res.ok) return null;

  const html = await res.text();

  // id → count, from the screen-reader tooltips ("4 contributions on …",
  // "No contributions on …").
  const counts = new Map<string, number>();
  const tipRe = /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
  for (let m = tipRe.exec(html); m; m = tipRe.exec(html)) {
    const n = /^(\d+)\s+contribution/.exec(m[2].trim());
    counts.set(m[1], n ? Number(n[1]) : 0);
  }

  // One entry per calendar cell.
  const byWeek = new Map<number, ContributionDay[]>();
  let total = 0;
  const cellRe = /<td\b[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  for (let m = cellRe.exec(html); m; m = cellRe.exec(html)) {
    const tag = m[0];
    const date = /\bdata-date="([^"]+)"/.exec(tag)?.[1];
    const id = /\bid="([^"]+)"/.exec(tag)?.[1];
    if (!date || !id) continue;

    const pos = /-(\d+)-(\d+)$/.exec(id);
    if (!pos) continue;
    const week = Number(pos[2]);

    const count = counts.get(id) ?? 0;
    const level = Number(/\bdata-level="(\d)"/.exec(tag)?.[1] ?? levelFor(count));
    total += count;

    const bucket = byWeek.get(week) ?? [];
    bucket.push({ date, count, level });
    byWeek.set(week, bucket);
  }

  if (!byWeek.size) return null;

  const weeks = [...byWeek.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, days]) => days.sort((a, b) => a.date.localeCompare(b.date)));

  return { total, weeks };
}

/** 3. Third-party proxy — last resort; known to lag behind GitHub. */
async function calendarFromProxy(username: string): Promise<Calendar | null> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;

  const cal = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: ContributionDay[];
  };
  const days = cal.contributions ?? [];
  if (!days.length) return null;

  const summed = days.reduce((a, d) => a + d.count, 0);
  return {
    total: cal.total?.lastYear ?? summed,
    weeks: chunkWeeks(days),
  };
}

/** Walks the calendar sources in order, taking the first that yields data. */
async function getCalendar(username: string): Promise<Calendar | null> {
  const sources = [
    calendarFromGraphQL,
    calendarFromGitHubHtml,
    calendarFromProxy,
  ];

  for (const source of sources) {
    try {
      const cal = await source(username);
      if (cal?.weeks.length) return cal;
    } catch {
      // try the next source
    }
  }
  return null;
}

export async function getGitHubData(username: string): Promise<GitHubData | null> {
  if (!username) return null;

  try {
    const [calRes, userRes, reposRes] = await Promise.allSettled([
      getCalendar(username),
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
    const cal = calRes.status === "fulfilled" ? calRes.value : null;
    const totalContributions = cal?.total ?? 0;
    const weeks = cal ? trimWeeks(cal.weeks) : [];

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
