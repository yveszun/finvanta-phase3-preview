import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell, Tag, Unavailable } from "@/components/finvanta/Shell";
import { Cascade } from "@/components/finvanta/Cascade";
import { DecisionSummary } from "@/components/finvanta/decision/DecisionSummary";
import { useScenario } from "@/components/finvanta/scenario-context";
import { conversions, getDiagnosticInsights, largestDropoff, largestAbsoluteGap, num, pct, type Stage } from "@/data/scenarios";
import { getDecisionSupport } from "@/data/decision-support";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Intelligence — Finvanta Health" },
      { name: "description", content: "See where health benefit implementation stalls and what to investigate next — PhilHealth outpatient mental health package (synthetic demo)." },
      { property: "og:title", content: "Executive Intelligence — Finvanta Health" },
      { property: "og:description", content: "From benefit coverage to actual implementation." },
    ],
  }),
  component: Executive,
});

function Executive() {
  const { scenario } = useScenario();
  return <Shell>{scenario.stages ? <Content stages={scenario.stages} name={scenario.name} scenario={scenario} /> : <Unavailable name={scenario.name} />}</Shell>;
}

function Content({ stages, name, scenario }: { stages: Stage[]; name: string; scenario: any }) {
  const first = stages[0]!;
  const last = stages[stages.length - 1]!;
  const worst = largestDropoff(stages);
  const convs = conversions(stages);
  const { investigation } = getDiagnosticInsights(stages);
  const largestAbsolute = largestAbsoluteGap(stages);
  const decisionSupport = getDecisionSupport(scenario);

  return (
    <div className="space-y-7 sm:space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end lg:gap-10">
        <div>
          <p className="eyebrow">Outpatient mental health benefit · {name} scenario</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl xl:text-[3.5rem]">
            Only <span className="text-accent">{last.count}</span> of {num(first.count)} eligible facilities have received payment.
          </h1>
          <p className="mt-3 text-muted-foreground">
            {pct((last.count / first.count) * 100)} of eligible facilities in this synthetic demonstration scenario. Measures facility participation — not patient access.
          </p>
        </div>
        <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Finvanta</span> shows health insurers where a benefit that exists on paper stalls before it reaches delivery — and what to investigate next.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div aria-labelledby="journey">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 id="journey" className="font-display text-2xl">Where implementation stalls</h2>
            <span className="eyebrow hidden sm:inline">Select a stage</span>
          </div>
          <Cascade stages={stages} compact />
        </div>

        <div className="space-y-6 lg:border-l lg:pl-8">
          <article>
            <Tag kind="rule" />
            <h3 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">Largest proportional drop-off: {worst.name.toLowerCase()}.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Only {pct(worst.rate)} of facilities progress through this stage ({num(worst.to.count)} of {num(worst.from.count)} facilities). This locates where the proportional drop-off is largest, but does not establish its cause.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              <strong>Proportional:</strong> {worst.name} has the lowest conversion rate ({pct(worst.rate)}).{' '}
              <strong>Absolute:</strong> {num(largestAbsolute.gap)}-facility gap between {largestAbsolute.from.label.toLowerCase()} and {largestAbsolute.to.label.toLowerCase()}.
              {worst.key === largestAbsolute.key ? (
                <span> Proportional and absolute measures both identify this stage.</span>
              ) : (
                <span className="text-accent"> Note: Proportional and absolute measures identify different stages.</span>
              )}
            </p>
          </article>
          <article className="rounded-lg bg-accent-soft p-5">
            <Tag kind="investigate" />
            <p className="mt-3 font-display text-xl leading-snug">
              {investigation}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              These findings identify where progression through the implementation cascade is limited. They do not establish why the gaps occur or which interventions would be effective. Further investigation is needed.
            </p>
          </article>
          
          {/* Decision Support Summary */}
          {decisionSupport.hypotheses.length > 0 && (
            <DecisionSummary 
              hypotheses={decisionSupport.hypotheses}
              stageName={worst.name}
            />
          )}
          
          <Link to="/explore" search={{ section: "insights" }} className="inline-flex text-sm font-medium underline decoration-accent underline-offset-4 hover:text-accent">
            See the reasoning in Explore the Evidence →
          </Link>
        </div>
      </section>

      <section aria-label="Supporting indicators" className="border-t pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="eyebrow">Stage conversion · observed</p>
          <Link to="/explore" search={{ section: "cascade" }} className="text-xs text-muted-foreground hover:text-foreground">Full cascade →</Link>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-4">
          {convs.map((c) => (
            <div key={c.key}>
              <dt className="text-xs text-muted-foreground sm:text-sm">{c.name}</dt>
              <dd className={`font-mono text-lg tabular sm:text-2xl ${c.key === worst.key ? "text-accent" : ""}`}>{pct(c.rate)}</dd>
              <dd className="text-[11px] text-muted-foreground">{num(c.to.count)} / {num(c.from.count)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
