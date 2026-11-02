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
      <div className="relative z-10 border-b bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" role="status" aria-label="Data disclosure">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2.5">
          <svg className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <span className="min-w-0 text-sm text-blue-900 dark:text-blue-100">
            <strong className="font-semibold">Illustrative demonstration:</strong> All data shown are synthetic scenarios, not actual PhilHealth records.
          </span>
        </div>
      </div>
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-3">
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
          <label className="flex w-full sm:ml-auto sm:w-auto items-center gap-2 text-sm">
            <span className="eyebrow">Scenario</span>
            <select
              value={scenario.id}
              onChange={(e) => setScenarioId(e.target.value)}
              className="flex-1 rounded-md border bg-card px-3 py-1.5 text-sm sm:flex-none"
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}{s.available ? "" : " — data pending"}
                </option>
              ))}
            </select>
            <span className="mt-1 text-[11px] text-muted-foreground">Synthetic scenarios based on illustrative implementation patterns</span>
          </label>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-6 sm:py-8">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground">
          Finvanta Health · PhilHealth outpatient mental health benefit package — illustrative demonstration. Findings describe observed drop-offs, not proven causes.
        </div>
      </footer>
    </div>
  );
}

export function Unavailable({ name }: { name: string }) {
  const { setScenarioId } = useScenario();
  return (
    <div className="rounded-xl border border-dashed bg-card p-10 text-center">
      <p className="eyebrow">Data pending</p>
      <h2 className="mt-3 font-display text-3xl">{name}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        This scenario is defined but its validated data have not been integrated. Finvanta does not estimate figures it cannot source.
      </p>
      <button onClick={() => setScenarioId("moderate-bottleneck")} className="mt-5 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90">View Moderate Activity</button>
    </div>
  );
}

export function Tag({ kind }: { kind: "observed" | "rule" | "possible" | "investigate" | "illustrative" }) {
  const map = {
    observed: ["Observed metric", "border border-primary text-primary"],
    rule: ["Rule-based finding", "bg-ink text-ink-foreground"],
    possible: ["Possible explanation", "bg-secondary text-secondary-foreground border"],
    investigate: ["Suggested investigation", "bg-accent-soft text-accent-foreground"],
    illustrative: ["Not yet available", "border border-dashed text-muted-foreground"],
  } as const;
  const [label, cls] = map[kind];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${cls}`}>{label}</span>;
}
