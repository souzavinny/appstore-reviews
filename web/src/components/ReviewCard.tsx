import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatAbsolute, formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Review } from "@/schemas";

function Stars({ score }: { score: number }) {
  return (
    <div
      role="img"
      aria-label={`${score} out of 5 stars`}
      className="flex shrink-0 items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={cn(
            "size-3.5",
            n <= score
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="rounded-2xl shadow-sm transition-colors hover:border-[#34373f]">
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {review.author}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatAbsolute(review.submittedAt)} ·{" "}
              {formatRelative(review.submittedAt)}
            </p>
          </div>
          <Stars score={review.score} />
        </div>
        <p className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-foreground/90">
          {review.content}
        </p>
      </CardContent>
    </Card>
  );
}
