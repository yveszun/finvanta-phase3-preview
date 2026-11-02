import { useState } from "react";
import type { DecisionSupport } from "@/data/decision-support";
import { HypothesisCard } from "./HypothesisCard";

interface DecisionSummaryProps {
  decisionSupport: DecisionSupport;
}

/**
 * Executive view decision summary - single collapsible card
 * Shows all hypotheses for the identified gap stage
 */
export function DecisionSummary({ decisionSupport }: DecisionSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const { hypotheses } = decisionSupport;

  return (
    <section className="mt-8">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong className="font-semibold">Decision support based on synthetic scenarios.</strong> These hypotheses
            represent plausible explanations requiring investigation, not verified causes.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded-lg border bg-card p-5 text-left transition-colors hover:bg-accent/5"
          aria-expanded={expanded}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl">What might explain this gap?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {hypotheses.length} plausible hypotheses requiring investigation
              </p>
            </div>
            <svg
              className={`h-6 w-6 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {hypotheses.map((hypothesis) => (
              <HypothesisCard key={hypothesis.id} hypothesis={hypothesis} />
            ))}
            
            <div className="mt-6 rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                These hypotheses are plausible explanations based on implementation science literature and health
                financing patterns. They require verification with facility-level data before informing policy decisions.
                See full analysis and response options in{" "}
                <a href="/explore?section=decision" className="font-medium text-accent hover:underline">
                  Explore Evidence →
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
