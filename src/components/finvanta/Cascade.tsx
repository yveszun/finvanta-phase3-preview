import { useState } from "react";
import { conversions, largestDropoff, num, pct, type Stage } from "@/data/scenarios";

export function Cascade({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(stages.length - 1);
  const max = stages[0]!.count;
  const convs = conversions(stages);
  const worst = largestDropoff(stages);
  const sel = stages[active]!;
  const selConv = active > 0 ? convs[active - 1] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <ol className="space-y-1" aria-label="Facility implementation cascade">
        {stages.map((s, i) => {
          const c = i > 0 ? convs[i - 1] : null;
          const w = Math.max((s.count / max) * 100, 1.2);
          const isActive = i === active;
          return (
            <li key={s.key}>
              {c && (
                <div className="flex items-center gap-3 py-1 pl-1 text-xs">
                  <span className="text-muted-foreground" aria-hidden>↓</span>
                  <span className={`font-mono tabular ${c.key === worst.key ? "text-accent font-semibold" : "text-muted-foreground"}`}>
                    {pct(c.rate)} {c.name.toLowerCase()}
                  </span>
                  {c.key === worst.key && <span className="eyebrow text-accent">Largest drop-off</span>}
                </div>
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group w-full rounded-lg border p-4 text-left transition-all ${isActive ? "border-primary bg-card shadow-sm" : "border-transparent hover:bg-card"}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm">{s.label}</span>
                  <span className="font-display text-3xl tabular leading-none">{num(s.count)}</span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-track">
                  <div
                    className={`animate-grow h-full rounded-full ${i === stages.length - 1 ? "bg-accent" : "bg-primary"}`}
                    style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      <aside className="rounded-xl bg-ink p-6 text-ink-foreground lg:sticky lg:top-6 lg:self-start" aria-live="polite">
        <p className="eyebrow text-ink-muted">Stage detail</p>
        <h4 className="mt-2 font-display text-2xl">{sel.label}</h4>
        <p className="mt-2 text-sm text-ink-muted">{sel.description}</p>
        <dl className="mt-6 space-y-3 text-sm">
          <Row k="Facilities at this stage" v={num(sel.count)} />
          <Row k="Share of all eligible" v={pct((sel.count / max) * 100)} />
          {selConv && (
            <>
              <Row k={`Denominator (${selConv.from.short})`} v={num(selConv.from.count)} />
              <Row k={`${selConv.name} conversion`} v={pct(selConv.rate)} />
              <p className="pt-2 font-mono text-xs text-ink-muted">
                {num(sel.count)} ÷ {num(selConv.from.count)} = {pct(selConv.rate)}
              </p>
            </>
          )}
        </dl>
        <p className="mt-6 border-t border-ink-muted/30 pt-4 text-xs text-ink-muted">
          Counts are facilities — not claims or patients.
        </p>
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink-muted/20 pb-2">
      <dt className="text-ink-muted">{k}</dt>
      <dd className="font-mono tabular">{v}</dd>
    </div>
  );
}
