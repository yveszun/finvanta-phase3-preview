import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, Tag, Unavailable } from "@/components/finvanta/Shell";
import { Cascade } from "@/components/finvanta/Cascade";
import { useScenario } from "@/components/finvanta/scenario-context";
import { conversions, largestDropoff, num, pct, type Stage } from "@/data/scenarios";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the Evidence — Finvanta Health" },
      { name: "description", content: "Analyst workspace: overview, facility cascade, claims processing, regional analysis and rule-based diagnostic insights (synthetic demo)." },
      { property: "og:title", content: "Explore the Evidence — Finvanta Health" },
      { property: "og:description", content: "Analyst workspace for health benefit implementation diagnostics." },
    ],
  }),
  component: Explore,
});

const SECTIONS = ["Overview", "Facility Implementation Cascade", "Claims Processing", "Regional Analysis", "Diagnostic Insights"];

function Explore() {
  const { scenario } = useScenario();
  const [sec, setSec] = useState(0);
  return (
    <Shell>
      <p className="eyebrow">Analyst workspace</p>
      <h1 className="mt-3 font-display text-5xl">Explore the evidence</h1>
      {!scenario.stages ? (
        <div className="mt-10"><Unavailable name={scenario.name} /></div>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
          <nav aria-label="Sections" className="flex gap-1 overflow-x-auto md:flex-col">
            {SECTIONS.map((s, i) => (
              <button
                key={s}
                onClick={() => setSec(i)}
                aria-current={sec === i}
                className={`shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors ${sec === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
              >
                <span className="mr-2 font-mono text-xs opacity-60">0{i + 1}</span>{s}
              </button>
            ))}
          </nav>
          <div className="min-w-0">
            <h2 className="mb-6 font-display text-3xl">{SECTIONS[sec]}</h2>
            {sec === 0 && <Overview stages={scenario.stages} />}
            {sec === 1 && <Cascade stages={scenario.stages} />}
            {sec === 2 && <Claims stages={scenario.stages} />}
            {sec === 3 && <Regional />}
            {sec === 4 && <Insights stages={scenario.stages} />}
          </div>
        </div>
      )}
    </Shell>
  );
}

function Overview({ stages }: { stages: Stage[] }) {
  return (
    <div className="space-y-6">
      <Tag kind="observed" />
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
        {stages.map((s) => (
          <div key={s.key} className="bg-card p-6">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-4xl tabular">{num(s.count)}</p>
            <p className="mt-2 text-xs text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Claims({ stages }: { stages: Stage[] }) {
  const c = conversions(stages);
  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-6">
        <Tag kind="observed" />
        <p className="mt-4 text-sm text-muted-foreground">Facility-level claims progression</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {c.slice(1).map((x) => (
            <div key={x.key}>
              <p className="text-sm">{x.name}</p>
              <p className="font-mono text-2xl tabular">{pct(x.rate)}</p>
              <p className="text-xs text-muted-foreground">{num(x.to.count)} of {num(x.from.count)} facilities</p>
            </div>
          ))}
        </div>
      </div>
      <Placeholder title="Claim volumes, processing times and denial reasons" note="Claim-level data (counts, turnaround, denial categories) are not part of this demonstration. Facility counts above must not be read as claim counts." />
    </div>
  );
}

function Regional() {
  return (
    <Placeholder
      title="Regional breakdown of the facility cascade"
      note="Validated regional data have not been integrated. No regional figures are shown to avoid implying operational analysis."
      grid
    />
  );
}

function Insights({ stages }: { stages: Stage[] }) {
  const w = largestDropoff(stages);
  const rows = [
    { kind: "observed" as const, text: `${w.name} has the lowest stage conversion: ${pct(w.rate)} (${num(w.to.count)} of ${num(w.from.count)}).` },
    { kind: "possible" as const, text: "Accreditation requirements may be demanding relative to facility readiness, or administrative processes may be slow. These are hypotheses, not findings." },
    { kind: "investigate" as const, text: "Examine facility accreditation requirements, readiness, and administrative processes to understand the observed drop-off." },
  ];
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.kind} className="rounded-xl border bg-card p-6">
          <Tag kind={r.kind} />
          <p className="mt-3">{r.text}</p>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        How this works: Finvanta applies rule-based logic — the stage with the lowest conversion triggers a predefined investigation prompt. No AI model is used.
      </p>
    </div>
  );
}

function Placeholder({ title, note, grid }: { title: string; note: string; grid?: boolean }) {
  return (
    <div className="rounded-xl border border-dashed p-6">
      <Tag kind="illustrative" />
      <p className="mt-4 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      {grid && (
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-hidden>
          {Array.from({ length: 17 }).map((_, i) => (
            <div key={i} className="h-12 rounded bg-track" />
          ))}
        </div>
      )}
      <p className="mt-4 eyebrow">Not yet implemented</p>
    </div>
  );
}
