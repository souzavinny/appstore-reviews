import { useState } from "react";
import type { App } from "@/schemas";

// App header: icon + name, falling back to the id. The icon URL is a
// third-party CDN, so it's rendered with fixed dimensions and an onError
// fallback that hides a broken image.
export function AppBanner({ app }: { app: App }) {
  const [iconFailed, setIconFailed] = useState(false);
  const showIcon = Boolean(app.iconUrl) && !iconFailed;

  return (
    <div className="flex items-center gap-3">
      {showIcon && (
        <img
          src={app.iconUrl}
          alt=""
          width={48}
          height={48}
          onError={() => setIconFailed(true)}
          className="size-12 rounded-xl border bg-card object-cover"
        />
      )}
      <span className="font-heading text-lg font-semibold text-foreground">
        {app.name || app.id}
      </span>
    </div>
  );
}
