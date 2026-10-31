import { useState } from "react";
import { conversions, largestDropoff, num, pct, type Stage } from "@/data/scenarios";

/**
 * Facility implementation cascade.
 * Each stage bar is scaled to eligible facilities; each connector shows the
 * stage-to-stage conversion with its explicit denominator.
 */
export function Cascade({ stages, compact = false }: { stages: Stage[]; compact?: boolean }) {
  const [active, setActive] = useState(1);
  const max = stages[0]!.count;
  const convs = conversions(stages);
  const worst = largestDropoff(stages);
  const sel = stages[active]!;
  const selConv = active > 0 ? convs[active - 1] : undefined;

  return (
    <div>
      <ol aria-label="Facility implementation cascade">
        {stages.map((s, i) => {
          const c = i > 0 ? convs[i - 1] : undefined;
          const w = Math.max((s.count / max) * 100, 0.8);
          const isActive = i === active;
          const isWorst = c?.key === worst.key;
          return (
            <li key={s.key}>
              {c && (
                <div className="flex items-center gap-3 py-1.5 pl-[1.15rem]">
                  <span className={`h-5 w-px ${isWorst ? "bg-accent" : "bg-border"}`} aria-hidden />
                  <span className={`rounded-full px-2 py-0.5 font-mono text-xs tabular ${isWorst ? "bg-accent-soft text-accent-foreground font-semibold" : "text-muted-foreground"}`}>
                    {pct(c.rate)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.name} · {num(c.to.count)} of {num(c.from.count)} {c.from.short.toLowerCase()}
                  </span>
                  {isWorst && <span className="eyebrow hidden text-accent sm:inline">Largest drop-off</span>}
                </div>
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${s.label}: ${num(s.count)}`}
                className={`grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 rounded-lg px-1 text-left transition-colors ${compact ? "py-1.5" : "py-2"} ${isActive ? "bg-card ring-1 ring-primary/70" : "hover:bg-card"}`}
              >
                <span className={`flex h-7 w-7 items-center justify-center justify-self-center rounded-full font-mono text-[11px] ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm">{s.label}</span>
                  <span className="mt-1.5 block h-2 w-full overflow-hidden rounded-full bg-track">
                    <span
                      className={`animate-grow block h-full rounded-full ${i === stages.length - 1 ? "bg-accent" : "bg-primary"}`}
                      style={{ width: `${w}%`, animationDelay: `${i * 110}ms` }}
                    />
                  </span>
                </span>
                <span className="pr-2 text-right">
                  <span className="block font-display text-2xl leading-none tabular sm:text-3xl">{num(s.count)}</span>
                  <span className="mt-1 block font-mono text-[10px] text-muted-foreground tabular">{pct((s.count / max) * 100)} of eligible</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 rounded-lg bg-ink px-5 py-4 text-ink-foreground" aria-live="polite">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="eyebrow text-ink-muted">Stage {active + 1}</span>
          <span className="font-display text-xl">{sel.label}</span>
        </div>
        <p className="mt-1 text-sm text-ink-muted">{sel.description}</p>
        {selConv ? (
          <p className="mt-3 font-mono text-xs tabular">
            {selConv.name}: {num(sel.count)} ÷ {num(selConv.from.count)} {selConv.from.short.toLowerCase()} = <span className="text-accent">{pct(selConv.rate)}</span>
          </p>
        ) : (
          <p className="mt-3 font-mono text-xs">Base denominator for every share-of-eligible figure.</p>
        )}
        <p className="mt-2 text-[11px] text-ink-muted">Counts are facilities — not claims or patients.</p>
      </div>
    </div>
  );
}
