import { useState } from "react";
import type { ResponseOption } from "@/data/decision-knowledge";

interface ResponseCardProps {
  response: ResponseOption;
}

/**
 * Displays a single response option with expandable details
 * 
 * MVP: Simple expandable card with actor badge, assumptions visible
 */
export function ResponseCard({ response }: ResponseCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Actor color mapping
  const actorColors = {
    PhilHealth: "bg-primary text-primary-foreground",
    DOH: "bg-secondary text-secondary-foreground",
    LGU: "bg-accent text-accent-foreground",
    "Multi-stakeholder": "bg-accent-soft text-accent-foreground",
  };

  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 text-left transition-colors hover:bg-accent/5"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${actorColors[response.actor]}`}>
                {response.actor}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{response.id}</span>
            </div>
            <h4 className="mt-2 font-medium leading-snug">{response.name}</h4>
          </div>
          <svg
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {!expanded && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {response.description}
          </p>
        )}
      </button>

      {expanded && (
        <div className="space-y-4 border-t px-5 py-4">
          {/* Description */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</h5>
            <p className="mt-1 text-sm">{response.description}</p>
          </div>

          {/* Key Assumptions */}
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/20">
            <h5 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-100">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Key Assumptions (Require Validation)
            </h5>
            <div className="mt-3 space-y-3 text-sm">
              {response.assumptions.institutional.length > 0 && (
                <div>
                  <span className="font-medium text-amber-900 dark:text-amber-100">Institutional:</span>
                  <ul className="mt-1 space-y-1">
                    {response.assumptions.institutional.map((item, i) => (
                      <li key={i} className="flex gap-2 text-amber-800 dark:text-amber-200">
                        <span>⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {response.assumptions.temporal.length > 0 && (
                <div>
                  <span className="font-medium text-amber-900 dark:text-amber-100">Temporal:</span>
                  <ul className="mt-1 space-y-1">
                    {response.assumptions.temporal.map((item, i) => (
                      <li key={i} className="flex gap-2 text-amber-800 dark:text-amber-200">
                        <span>⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {response.assumptions.financial.length > 0 && (
                <div>
                  <span className="font-medium text-amber-900 dark:text-amber-100">Financial:</span>
                  <ul className="mt-1 space-y-1">
                    {response.assumptions.financial.map((item, i) => (
                      <li key={i} className="flex gap-2 text-amber-800 dark:text-amber-200">
                        <span>⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {response.assumptions.legal.length > 0 && (
                <div>
                  <span className="font-medium text-amber-900 dark:text-amber-100">Legal:</span>
                  <ul className="mt-1 space-y-1">
                    {response.assumptions.legal.map((item, i) => (
                      <li key={i} className="flex gap-2 text-amber-800 dark:text-amber-200">
                        <span>⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Validation Needed */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Validation Needed Before Implementation
            </h5>
            <ul className="mt-2 space-y-1 text-sm">
              {response.validationNeeded.map((item, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-accent">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Prerequisites (Assuming Validation Confirms Assumptions)
            </h5>
            <ul className="mt-2 space-y-1 text-sm">
              {response.prerequisites.map((item, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-offs */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trade-offs and Risks</h5>
            <ul className="mt-2 space-y-1 text-sm">
              {response.tradeoffs.map((item, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-amber-600 dark:text-amber-400">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeframe */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timeframe</h5>
            <p className="mt-1 text-sm text-muted-foreground">{response.timeframeNote}</p>
          </div>

          {/* Disclaimer */}
          <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-xs dark:bg-blue-950/20">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              This response option contains unvalidated assumptions.
            </p>
            <p className="mt-1 text-blue-800 dark:text-blue-200">
              Institutional review, legal counsel, and stakeholder consultation required before considering
              implementation. This is an illustrative example based on general health financing patterns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
