import { useState } from "react";
import { HypothesisCard } from "./HypothesisCard";
import { ResponseCard } from "./ResponseCard";
import type { Hypothesis, ResponseOption } from "@/data/decision-knowledge";

interface DecisionSectionProps {
  hypotheses: Hypothesis[];
  responses: ResponseOption[];
}

export function DecisionSection({ hypotheses, responses }: DecisionSectionProps) {
  const [activeTab, setActiveTab] = useState<"hypotheses" | "responses">("hypotheses");

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-1 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("hypotheses")}
          className={`px-3 py-2 text-sm font-medium transition-colors -mb-px border-b-2 whitespace-nowrap sm:px-4 ${
            activeTab === "hypotheses"
              ? "border-accent text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          aria-current={activeTab === "hypotheses" ? "page" : undefined}
        >
          Hypotheses ({hypotheses.length})
        </button>
        <button
          onClick={() => setActiveTab("responses")}
          className={`px-3 py-2 text-sm font-medium transition-colors -mb-px border-b-2 whitespace-nowrap sm:px-4 ${
            activeTab === "responses"
              ? "border-accent text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          aria-current={activeTab === "responses" ? "page" : undefined}
        >
          Response Options ({responses.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "hypotheses" && (
          <div className="space-y-4">
            {hypotheses.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                No hypotheses identified for this stage.
              </p>
            ) : (
              <div className="space-y-3">
                {hypotheses.map((hypothesis) => (
                  <HypothesisCard key={hypothesis.id} hypothesis={hypothesis} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "responses" && (
          <div className="space-y-4">
            {responses.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                No response options identified for this stage.
              </p>
            ) : (
              <div className="space-y-3">
                {responses.map((response) => (
                  <ResponseCard key={response.id} response={response} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
