import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Tag, Unavailable } from "@/components/finvanta/Shell";
import { Cascade } from "@/components/finvanta/Cascade";
import { useScenario } from "@/components/finvanta/scenario-context";
import { conversions, largestDropoff, num, pct } from "@/data/scenarios";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Intelligence — Finvanta Health" },
      { name: "description", content: "Where health benefit implementation breaks down: the facility cascade for PhilHealth's outpatient mental health package (synthetic demo)." },
      { property: "og:title", content: "Executive Intelligence — Finvanta Health" },
      { property: "og:description", content: "From benefit coverage to actual implementation." },
    ],
  }),
  component: Executive,
});

function Executive() {
  const { scenario } = useScenario();
  return <Shell>{scenario.stages ? <Content stages={scenario.stages} name={scenario.name} /> : <Unavailable name={scenario.name} />}</Shell>;
}

function Content({ stages, name }: { stages: NonNullable<ReturnType<typeof useScenario>["scenario"]["stages"]>; name: string }) {
  const first = stages[0]!;
  const last = stages[stages.length - 1]!;
  const worst = largestDropoff(stages);
  const convs = conversions(stages);

  return (
    <div className="space-y-20">
      <section>
        <p className="eyebrow">Executive intelligence · {name} scenario</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          Only <span className="text-accent">{last.count}</span> of {num(first.count)} eligible facilities have received payment.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          {pct((last.count / first.count) * 100)} of eligible facilities in this synthetic demonstration scenario. This measures facility participation — not patient access.
        </p>
      </section>

      <section aria-labelledby="journey">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">01 · Where is implementation breaking down?</p>
            <h2 id="journey" className="mt-2 font-display text-3xl">Implementation journey</h2>
          </div>
          <p className="text-sm text-muted-foreground">Select a stage to inspect its denominator.</p>
        </div>
        <Cascade stages={stages} />
      </section>

      <section className="grid gap-6 md:grid-cols-2" aria-label="Diagnosis and next step">
        <article className="rounded-xl border bg-card p-7">
          <p className="eyebrow">02 · How significant is the drop-off?</p>
          <div className="mt-4"><Tag kind="observed" /></div>
          <h3 className="mt-4 font-display text-3xl">Largest proportional drop-off: {worst.name.toLowerCase()}.</h3>
          <p className="mt-3 text-muted-foreground">
            Only {pct(worst.rate)} of {worst.from.label.toLowerCase()} progressed to {worst.name.toLowerCase()} in the illustrative dataset ({num(worst.to.count)} of {num(worst.from.count)}).
          </p>
          <p className="mt-4 text-xs text-muted-foreground">This identifies where the drop-off is observed. It does not establish its cause.</p>
        </article>
        <article className="rounded-xl border border-accent/40 bg-accent-soft p-7">
          <p className="eyebrow">03 · What to investigate next</p>
          <div className="mt-4"><Tag kind="investigate" /></div>
          <h3 className="mt-4 font-display text-3xl">Examine facility accreditation requirements, readiness, and administrative processes.</h3>
          <p className="mt-3 text-sm">To understand the observed drop-off between eligibility and accreditation.</p>
          <p className="mt-4 text-xs text-muted-foreground">Rule-based suggestion triggered by the lowest stage conversion. Not an AI-generated or causal conclusion.</p>
        </article>
      </section>

      <section aria-label="Supporting indicators">
        <p className="eyebrow mb-4">Supporting indicators · stage conversion</p>
        <div className="grid divide-y rounded-xl border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {convs.map((c) => (
            <div key={c.key} className="p-5">
              <p className="text-sm text-muted-foreground">{c.name}</p>
              <p className="mt-1 font-mono text-2xl tabular">{pct(c.rate)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{num(c.to.count)} of {num(c.from.count)} facilities</p>
            </div>
          ))}
        </div>
        <Link to="/explore" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90">
          Explore the evidence →
        </Link>
      </section>
    </div>
  );
}
