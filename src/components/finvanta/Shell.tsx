import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { useScenario } from "./scenario-context";

export function Shell({ children }: { children: ReactNode }) {
  const { scenario, setScenarioId } = useScenario();
  const navCls =
    "rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";
  return (
    <div className="min-h-screen">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-2 text-xs">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span>Synthetic demonstration data. Not actual PhilHealth performance.</span>
          <span className="ml-auto hidden text-ink-muted sm:inline">Rule-based diagnostics · Design prototype</span>
        </div>
      </div>
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-4">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none">Finvanta</span>
            <span className="eyebrow">Health</span>
          </Link>
          <nav className="flex gap-1 rounded-full border bg-card p-1" aria-label="Primary">
            <Link to="/" className={navCls} activeOptions={{ exact: true }} activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}>
              Executive
            </Link>
            <Link to="/explore" className={navCls} activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}>
              Explore evidence
            </Link>
          </nav>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="eyebrow">Scenario</span>
            <select
              value={scenario.id}
              onChange={(e) => setScenarioId(e.target.value)}
              className="rounded-md border bg-card px-3 py-1.5 text-sm"
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}{s.available ? "" : " — data pending"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground">
          Finvanta Health · PhilHealth outpatient mental health benefit package — illustrative demonstration. Findings describe observed drop-offs, not proven causes.
        </div>
      </footer>
    </div>
  );
}

export function Unavailable({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-card p-10 text-center">
      <p className="eyebrow">Scenario unavailable</p>
      <h2 className="mt-3 font-display text-3xl">{name}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Validated data for this scenario have not been integrated yet. Switch to Moderate Activity to view the demonstration.
      </p>
    </div>
  );
}

export function Tag({ kind }: { kind: "observed" | "possible" | "investigate" | "illustrative" }) {
  const map = {
    observed: ["Observed metric", "bg-primary text-primary-foreground"],
    possible: ["Possible explanation", "bg-secondary text-secondary-foreground border"],
    investigate: ["Suggested investigation", "bg-accent-soft text-accent-foreground"],
    illustrative: ["Illustrative placeholder", "border border-dashed text-muted-foreground"],
  } as const;
  const [label, cls] = map[kind];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${cls}`}>{label}</span>;
}
