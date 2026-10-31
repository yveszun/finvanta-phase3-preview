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
    id: "moderate",
    name: "Moderate Activity",
    available: true,
    stages: [
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: "Facilities eligible to deliver the outpatient mental health benefit package." },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 216, description: "Eligible facilities that completed accreditation for the package." },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 84, description: "Accredited facilities that filed at least one claim under the package." },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 69, description: "Facilities filing claims that received at least one payment." },
    ],
  },
  { id: "low", name: "Low Activity", available: false },
  { id: "high", name: "High Activity", available: false },
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
    from: stages[i],
    to: s,
    rate: (s.count / stages[i].count) * 100,
  }));
}

export function largestDropoff(stages: Stage[]) {
  return conversions(stages).reduce((a, b) => (b.rate < a.rate ? b : a));
}

export const pct = (n: number) => `${n.toFixed(1)}%`;
export const num = (n: number) => n.toLocaleString("en-US");
