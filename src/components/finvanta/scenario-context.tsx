import { createContext, useContext, useState, type ReactNode } from "react";
import { SCENARIOS, type Scenario } from "@/data/scenarios";

type Ctx = { scenario: Scenario; setScenarioId: (id: string) => void };
const ScenarioCtx = createContext<Ctx | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [id, setScenarioId] = useState("moderate-bottleneck");
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]!;
  return <ScenarioCtx.Provider value={{ scenario, setScenarioId }}>{children}</ScenarioCtx.Provider>;
}

export function useScenario() {
  const c = useContext(ScenarioCtx);
  // Fallback keeps the page rendering if the provider is missing (e.g. after hot reload).
  return c ?? { scenario: SCENARIOS[0]!, setScenarioId: () => {} };
}
