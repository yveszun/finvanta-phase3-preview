import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Shell, Tag, Unavailable } from "@/components/finvanta/Shell";
import { Cascade } from "@/components/finvanta/Cascade";
import { useScenario } from "@/components/finvanta/scenario-context";
import { conversions, largestDropoff, num, pct, type Stage } from "@/data/scenarios";

const SECTIONS = [
  { id: "overview", label: "Overview", lede: "The four facility stages of the benefit, as observed." },
  { id: "cascade", label: "Facility cascade", lede: "Stage-to-stage conversion, with every denominator shown." },
  { id: "claims", label: "Claims processing", lede: "What the facility data can and cannot say about claims." },
  { id: "regional", label: "Regional analysis", lede: "Geographic variation in the cascade." },
  { id: "insights", label: "Diagnostic insights", lede: "How a measured drop-off becomes a question to investigate." },
] as const;
type SectionId = (typeof SECTIONS)[number]["id"];

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): { section?: SectionId } => {
    const v = s.section;
    return SECTIONS.some((x) => x.id === v) ? { section: v as SectionId } : {};
  },
  head: () => ({
    meta: [
      { title: "Explore the Evidence — Finvanta Health" },
      { name: "description", content: "Analyst workspace: facility cascade, claims, regional analysis and rule-based diagnostic insights (synthetic demo)." },
      { property: "og:title", content: "Explore the Evidence — Finvanta Health" },
      { property: "og:description", content: "Observed metrics, rule-based findings and suggested investigations — kept distinct." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { scenario } = useScenario();
  const { section = "overview" } = Route.useSearch();
  const idx = SECTIONS.findIndex((s) => s.id === section);
  const cur = SECTIONS[idx]!;
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Analyst workspace · {scenario.name}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Explore the evidence</h1>
        </div>
        <Legend />
      </div>

      {!scenario.stages ? (
        <div className="mt-8"><Unavailable name={scenario.name} /></div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[200px_1fr] md:gap-10">
          <nav aria-label="Evidence sections" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ol className="flex gap-1 border-b md:flex-col md:border-b-0 md:border-l">
              {SECTIONS.map((s, i) => {
                const on = s.id === section;
                return (
                  <li key={s.id}>
                    <Link
                      to="/explore"
                      search={{ section: s.id }}
                      aria-current={on ? "page" : undefined}
                      className={`-mb-px flex shrink-0 items-baseline gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors md:-mb-0 md:-ml-px md:border-b-0 md:border-l-2 ${on ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    >
                      <span className="font-mono text-[10px] opacity-60">0{i + 1}</span>
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <section className="min-w-0" aria-labelledby="sec-title">
            <h2 id="sec-title" className="font-display text-3xl">{cur.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{cur.lede}</p>
            <div className="mt-6">
              {section === "overview" && <Overview stages={scenario.stages} />}
              {section === "cascade" && <Cascade stages={scenario.stages} />}
              {section === "claims" && <Claims stages={scenario.stages} />}
              {section === "regional" && <Regional />}
              {section === "insights" && <Insights stages={scenario.stages} />}
            </div>
            <div className="mt-10 flex justify-between gap-4 border-t pt-4 text-sm">
              {prev ? <Link to="/explore" search={{ section: prev.id }} className="text-muted-foreground hover:text-foreground">← {prev.label}</Link> : <span />}
              {next && <Link to="/explore" search={{ section: next.id }} className="text-muted-foreground hover:text-foreground">{next.label} →</Link>}
            </div>
          </section>
        </div>
      )}
    </Shell>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Evidence types">
      <Tag kind="observed" />
      <Tag kind="rule" />
      <Tag kind="investigate" />
    </div>
  );
}

function Overview({ stages }: { stages: Stage[] }) {
  const max = stages[0]!.count;
  return (
    <div>
      <Tag kind="observed" />
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
        {stages.map((s) => (
          <div key={s.key} className="border-t pt-3">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 font-display text-4xl tabular">{num(s.count)}</dd>
            <dd className="font-mono text-[11px] text-muted-foreground">{pct((s.count / max) * 100)} of eligible</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Claims({ stages }: { stages: Stage[] }) {
  const c = conversions(stages).slice(1);
  return (
    <div className="space-y-8">
      <div>
        <Tag kind="observed" />
        <dl className="mt-4 grid gap-6 sm:grid-cols-2">
          {c.map((x) => (
            <div key={x.key} className="border-t pt-3">
              <dt className="text-sm text-muted-foreground">{x.name}</dt>
              <dd className="font-mono text-2xl tabular">{pct(x.rate)}</dd>
              <dd className="text-xs text-muted-foreground">{num(x.to.count)} of {num(x.from.count)} {x.from.short.toLowerCase()} facilities</dd>
            </div>
          ))}
        </dl>
      </div>
      <EmptyState
        title="Claim volumes, turnaround times and denial reasons"
        body="This demonstration holds facility-level counts only. Claim-level records are needed before claims can be counted or processing delays measured."
        needs={["Claim-level submission records", "Adjudication and payment dates", "Denial reason codes"]}
      />
    </div>
  );
}

function Regional() {
  return (
    <EmptyState
      title="No validated regional data yet"
      body="Regional figures are intentionally not shown. Displaying estimated values would suggest an operational analysis that has not been performed."
      needs={["Facility region assignments", "Stage status by facility", "Validated regional denominators"]}
    />
  );
}

function Insights({ stages }: { stages: Stage[] }) {
  const w = largestDropoff(stages);
  return (
    <ol className="relative space-y-6 border-l pl-6">
      <Step kind="observed" n={1} title="What the data show">
        {w.name} has the lowest stage conversion: {pct(w.rate)} ({num(w.to.count)} of {num(w.from.count)} eligible facilities).
      </Step>
      <Step kind="rule" n={2} title="What the rule concludes">
        The stage with the lowest conversion is flagged as the largest proportional drop-off. This locates the drop-off; it does not explain it.
      </Step>
      <Step kind="possible" n={3} title="What might explain it">
        Accreditation requirements may be demanding relative to facility readiness, or administrative processes may be slow. These are hypotheses to test, not findings.
      </Step>
      <Step kind="investigate" n={4} title="What to investigate next">
        Examine facility accreditation requirements, readiness, and administrative processes to understand the observed drop-off.
      </Step>
      <li className="text-xs text-muted-foreground">
        Finvanta uses predefined rule-based logic. No AI model generates these findings.
      </li>
    </ol>
  );
}

function Step({ kind, n, title, children }: { kind: Parameters<typeof Tag>[0]["kind"]; n: number; title: string; children: ReactNode }) {
  return (
    <li className="relative">
      <span className="absolute -left-[2.05rem] top-0 flex h-5 w-5 items-center justify-center rounded-full border bg-background font-mono text-[10px]">{n}</span>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-medium">{title}</h3>
        <Tag kind={kind} />
      </div>
      <p className="mt-1.5 max-w-2xl text-muted-foreground">{children}</p>
    </li>
  );
}

function EmptyState({ title, body, needs }: { title: string; body: string; needs: string[] }) {
  return (
    <div className="rounded-lg border border-dashed px-6 py-8">
      <Tag kind="illustrative" />
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{body}</p>
      <p className="eyebrow mt-6">Data required</p>
      <ul className="mt-2 space-y-1 text-sm">
        {needs.map((n) => (
          <li key={n} className="flex gap-2"><span className="text-accent" aria-hidden>—</span>{n}</li>
        ))}
      </ul>
    </div>
  );
}
