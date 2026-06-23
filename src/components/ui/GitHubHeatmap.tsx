import type { ContributionDay } from "@/lib/github";

const LEVEL_COLORS = [
  "rgba(236,233,228,0.06)", // 0 — empty
  "rgba(134,71,151,0.35)", // 1
  "rgba(134,71,151,0.6)", // 2
  "rgba(177,144,193,0.8)", // 3
  "rgba(233,200,75,0.9)", // 4 — gold for the busiest days
];

interface GitHubHeatmapProps {
  weeks: ContributionDay[][];
}

/** Compact contribution heatmap (presentational). Renders nothing if no data. */
export default function GitHubHeatmap({ weeks }: GitHubHeatmapProps) {
  if (!weeks?.length) return null;

  return (
    <div className="flex gap-[3px]" aria-hidden="true">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => (
            <div
              key={di}
              title={`${day.count} contributions on ${day.date}`}
              style={{
                width: 9,
                height: 9,
                borderRadius: 2,
                background: LEVEL_COLORS[Math.min(day.level, 4)] ?? LEVEL_COLORS[0],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
