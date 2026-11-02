import { useState } from "react";
import type { Hypothesis } from "@/data/decision-knowledge";

interface HypothesisCardProps {
  hypothesis: Hypothesis;
}

/**
 * Displays a single hypothesis with expandable details
 * 
 * MVP: Simple expandable card, no color-coding by evidence status
 */
export function HypothesisCard({ hypothesis }: HypothesisCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border bg-card @container">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 text-left transition-colors hover:bg-accent/5"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Hypothesis
              </span>
              <span className="font-mono text-xs text-muted-foreground">{hypothesis.id}</span>
            </div>
            <h4 className="mt-2 font-medium leading-snug">{hypothesis.name}</h4>
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
            {hypothesis.statement}
          </p>
        )}
      </button>

      {expanded && (
        <div className="border-t px-4 py-3 sm:px-5 sm:py-4">
          {/* Statement - Full Width */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Statement</h5>
            <p className="mt-1.5 text-sm leading-relaxed">{hypothesis.statement}</p>
          </div>

          {/* Container query: two columns when container is 800px+ wide */}
          <div className="grid gap-6 @[800px]:grid-cols-2">
            {/* Left Column: Plausibility & Context */}
            <div className="space-y-4">
              {/* Plausibility Basis */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Why This Is Plausible
                </h5>
                <div className="mt-1.5 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Theory:</span>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">{hypothesis.plausibilityBasis.theory}</p>
                  </div>
                  <div>
                    <span className="font-medium">Analogous Cases:</span>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">{hypothesis.plausibilityBasis.analogousCases}</p>
                  </div>
                  <div>
                    <span className="font-medium">Context:</span>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">{hypothesis.plausibilityBasis.contextualFactors}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Verification Status */}
            <div className="space-y-4">
              {/* Verification Status */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Verification Status
                </h5>
                <div className="mt-1.5 space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Direct Evidence:</span>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">{hypothesis.verificationStatus.directEvidence}</p>
                  </div>
                  <div>
                    <span className="font-medium">Alternative Explanations:</span>
                    <ul className="mt-1 space-y-0.5 text-muted-foreground">
                      {hypothesis.verificationStatus.alternativeExplanations.map((alt) => (
                        <li key={alt} className="flex gap-2 leading-relaxed">
                          <span className="text-accent">•</span>
                          <span className="flex-1">{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Quantified Contribution:</span>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">{hypothesis.verificationStatus.quantifiedContribution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Needed - Container query: two columns when 600px+ wide */}
          <div className="mt-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data Needed to Verify or Refute
            </h5>
            <div className="mt-2 grid gap-4 @[600px]:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">To Verify (would support):</span>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {hypothesis.verificationData.toVerify.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="shrink-0 text-green-600 dark:text-green-400">✓</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">To Refute (would contradict):</span>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {hypothesis.verificationData.toRefute.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="shrink-0 text-red-600 dark:text-red-400">✗</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer - Full Width */}
          <div className="mt-4 rounded border-l-4 border-amber-500 bg-amber-50 p-3 text-xs leading-relaxed dark:bg-amber-950/20">
            <p className="font-medium text-amber-900 dark:text-amber-100">
              This is a plausible hypothesis requiring verification.
            </p>
            <p className="mt-1 text-amber-800 dark:text-amber-200">
              The observed implementation gap alone does not establish that this explanation is the cause.
              Multiple barriers may contribute simultaneously.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
