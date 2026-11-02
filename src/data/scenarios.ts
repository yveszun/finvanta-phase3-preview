export type Stage = {
  key: string;
  label: string;
  short: string;
  count: number;
  description: string;
};

export type Scenario = {
  id: string;
  name: string;
  available: boolean;
  stages?: Stage[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "low-bottleneck",
    name: "Low Activity (Mixed Bottlenecks)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 69, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 15, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 12, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  {
    id: "low-neutral",
    name: "Low Activity (No Payment Bottleneck)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 69, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 14, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 14, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  {
    id: "moderate-bottleneck",
    name: "Moderate Activity (Mixed Bottlenecks)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 216, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 84, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 69, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  {
    id: "moderate-neutral",
    name: "Moderate Activity (No Payment Bottleneck)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 222, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 89, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 89, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  {
    id: "high-bottleneck",
    name: "High Activity (Mixed Bottlenecks)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 514, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 358, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 292, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  {
    id: "high-neutral",
    name: "High Activity (No Payment Bottleneck)",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 528, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 370, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 370, description: "Facilities filing claims that received at least one payment." },
    ],
  },
];

export const conversionNames: Record<string, string> = {
  accredited: "Accreditation",
  claims: "Claims activity",
  paid: "Payment receipt",
};

export function conversions(stages: Stage[]) {
  return stages.slice(1).map((s, i) => ({
    key: s.key,
    name: conversionNames[s.key] ?? s.label,
    from: stages[i]!,
    to: s,
    rate: (s.count / stages[i]!.count) * 100,
  }));
}

export function largestDropoff(stages: Stage[]) {
  return conversions(stages).reduce((a, b) => (b.rate < a.rate ? b : a));
}

export const pct = (n: number) => `${n.toFixed(1)}%`;
export const num = (n: number) => n.toLocaleString("en-US");

/**
 * Calculate absolute gaps (facility count differences between consecutive stages).
 * Provides facility counts alongside proportional measures.
 */
export function absoluteGaps(stages: Stage[]) {
  return stages.slice(1).map((s, i) => ({
    key: s.key,
    name: conversionNames[s.key] ?? s.label,
    from: stages[i]!,
    to: s,
    gap: stages[i]!.count - s.count,
  }));
}

/**
 * Find the stage with the largest absolute gap (most facilities between stages).
 */
export function largestAbsoluteGap(stages: Stage[]) {
  return absoluteGaps(stages).reduce((a, b) => (b.gap > a.gap ? b : a));
}

/**
 * Generate diagnostic insights based on the identified bottleneck stage.
 * Returns context-specific text for observed data, rule conclusions, hypotheses, and investigations.
 */
export function getDiagnosticInsights(stages: Stage[]) {
  const bottleneck = largestDropoff(stages);
  
  const insights = {
    accredited: {
      hypothesis: "Accreditation requirements may be demanding relative to facility readiness, or administrative processes may be slow. These are hypotheses to test, not findings.",
      investigation: "Examine facility accreditation requirements, readiness assessments, and administrative processing timelines to understand the observed drop-off."
    },
    claims: {
      hypothesis: "Accredited facilities may lack operational capacity to file claims, face technical barriers in claims submission systems, or have insufficient patient volume. These are hypotheses to test, not findings.",
      investigation: "Examine claims submission infrastructure, facility operational readiness, staff training on claims processes, and patient service volumes to understand the observed drop-off."
    },
    paid: {
      hypothesis: "Claims may face adjudication delays, documentation issues, or payment processing bottlenecks. These are hypotheses to test, not findings.",
      investigation: "Examine claims adjudication timelines, common rejection reasons, payment processing workflows, and documentation requirements to understand the observed drop-off."
    }
  };

  const key = bottleneck.key as keyof typeof insights;
  return {
    bottleneck,
    hypothesis: insights[key]?.hypothesis || insights.accredited.hypothesis,
    investigation: insights[key]?.investigation || insights.accredited.investigation,
  };
}
