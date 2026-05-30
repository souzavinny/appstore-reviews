import { cn } from "@/lib/utils";

const WINDOWS = [
  { label: "24h", hours: 24 },
  { label: "48h", hours: 48 },
  { label: "7d", hours: 168 },
];

export function WindowSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (hours: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border bg-[#14161a] p-1">
      {WINDOWS.map((window) => {
        const active = value === window.hours;
        return (
          <button
            key={window.hours}
            type="button"
            onClick={() => onChange(window.hours)}
            className={cn(
              "rounded-lg px-3 py-1 text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {window.label}
          </button>
        );
      })}
    </div>
  );
}
