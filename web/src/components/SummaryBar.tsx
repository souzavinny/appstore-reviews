import { formatRelative } from "@/lib/format";
import type { Summary } from "@/schemas";

const STARS = [5, 4, 3, 2, 1];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function SummaryBar({ summary }: { summary: Summary }) {
  const max = Math.max(
    1,
    ...STARS.map((star) => summary.countByStar[String(star)] ?? 0),
  );

  return (
    <div className="flex flex-wrap items-start gap-8 rounded-2xl border bg-card p-5">
      <Stat value={String(summary.total)} label="reviews" />
      <Stat value={summary.average.toFixed(2)} label="avg score" />

      <div className="min-w-52 flex-1 space-y-1.5">
        {STARS.map((star) => {
          const count = summary.countByStar[String(star)] ?? 0;
          return (
            <div key={star} className="flex items-center gap-2.5 text-xs">
              <span className="w-3 tabular-nums text-muted-foreground">
                {star}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right tabular-nums text-muted-foreground">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {summary.total > 0 && (
        <p className="ml-auto text-xs text-muted-foreground">
          updated {formatRelative(summary.lastUpdated)}
        </p>
      )}
    </div>
  );
}
