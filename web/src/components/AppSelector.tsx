import type { App } from "@/schemas";

// A native <select> keeps the bundle lean — a styled dropdown component would
// pull in a positioning engine for a short, static list.
export function AppSelector({
  apps,
  value,
  onChange,
}: {
  apps: App[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Select app"
      className="h-9 rounded-xl border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
    >
      {apps.map((app) => (
        <option key={app.id} value={app.id} className="bg-card text-foreground">
          {app.name ?? app.id}
        </option>
      ))}
    </select>
  );
}
